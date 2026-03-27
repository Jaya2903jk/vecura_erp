<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // dd($request->all());

        $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);

        $user = DB::connection('sqlsrv')
            ->table('User_Master')
            ->where(function ($q) use ($request) {
                $q->where('UserID', $request->login)
                    ->orWhere('UserCode', $request->login);
                // ->orWhere('email', $request->login);
            })
            ->first();
        if (! $user) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $dbPassword = trim((string) $user->Password);
        $inputPassword = trim((string) $request->password);

        if ($dbPassword !== $inputPassword) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = Str::random(64);
        $hashed = hash('sha256', $token);

        // (Optional) store token in DB if you want logout support
        DB::table('user_tokens')->insert([
            'user_id' => $user->UserID,
            // 'token' => hash('sha256', $token),
            'token' => $hashed,
            'created_at' => now(),
            'expires_at' => now()->addHours(8),

        ]);

        return response()->json([
            'status' => true,
            'token' => $token,
            'user' => [
                'id' => $user->UserID,
                'code' => $user->UserCode,
                'name' => $user->FullName ?? $user->UserName,
                // 'email' => $user->Email ?? null
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        if (! $token) {
            return response()->json(['status' => false], 401);
        }

        DB::table('user_tokens')
            ->where('token', hash('sha256', $token))
            ->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(Request $request)
    {
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['status' => false], 401);
        }

        $session = DB::table('user_tokens')
            ->where('token', hash('sha256', $token))
            ->first();

        if (! $session) {
            return response()->json(['status' => false, 'message' => 'Invalid token'], 401);
        }

        if ($session->expires_at && now()->gt($session->expires_at)) {
            return response()->json(['status' => false, 'message' => 'Token expired'], 401);
        }

        $user = DB::connection('sqlsrv')
            ->table('User_Master')
            ->where('UserID', $session->user_id)
            ->first();

        return response()->json([
            'status' => true,
            'user' => $user,
        ]);
    }

    public function getUserMenu(Request $request)
    {
        $userId = $request->auth_user_id;
        $usercode = $request->auth_user_code;

        // Get user code from DB
        $user = DB::connection('sqlsrv')
            ->table('User_Master')
            ->where('UserID', $userId)
            ->first();

        if (! $user) {
            return response()->json(['status' => false, 'message' => 'User not found'], 404);
        }
        $userCode = $user->UserCode;

        $menus = DB::connection('sqlsrv')
            ->table('MenuUser as mu')
            ->join('MenuMaster as m', 'mu.MenuCode', '=', 'm.MenuCode')
            ->where('mu.UserCode', $userCode)
            ->where('m.MenuShow', 'Yes')
            ->select('m.MenuCode', 'm.MenuName', 'm.MenuPriority')
            ->orderBy('m.MenuPriority')
            ->get();
        $submenus = DB::connection('sqlsrv')
            ->table('SubMenuUser as smu')
            ->join('SubMenuMaster as sm', 'smu.SubMenuCode', '=', 'sm.SubMenuCode')
            ->where('smu.UserCode', $userCode)
            ->where('sm.SubMenuShow', 'Yes')
            ->select('sm.SubMenuCode', 'sm.MenuCode', 'sm.SubMenuName', 'sm.SubMenuPeriority')
            ->get();

        $items = DB::connection('sqlsrv')
            ->table('MenuItemUser as miu')
            ->join('MenuItems as mi', 'miu.MenuItemCode', '=', 'mi.MenuItemCode')
            ->where('miu.UserCode', $userCode)
            ->where('mi.MenuActive', 'Yes')
            ->select(
                'mi.MenuItemCode',
                'mi.MenuItemName',
                'mi.MenuItemPage',
                'mi.SubMenuCode',
                'miu.addAccess',
                'miu.editAccess',
                'miu.deleteAccess',
                'miu.viewAccess'
            )
            ->get();

        return response()->json([
            'status' => true,
            'menus' => $menus,
            'submenus' => $submenus,
            'items' => $items,
        ]);
    }
    // public function getUserMenu(Request $request)
    // {
    //     $userCode = $request->user_code;

    //     $menus = DB::connection('sqlsrv')
    //         ->table('MenuUser as mu')
    //         ->join('Menu as m', 'mu.MenuCode', '=', 'm.MenuCode')
    //         ->where('mu.UserCode', $userCode)
    //         ->where('m.MenuShow', 'Yes')
    //         ->select('m.MenuCode', 'm.MenuName', 'm.MenuPriority')
    //         ->orderBy('m.MenuPriority')
    //         ->get();

    //     $submenus = DB::connection('sqlsrv')
    //         ->table('SubMenuUser as smu')
    //         ->join('SubMenu as sm', 'smu.SubMenuCode', '=', 'sm.SubMenuCode')
    //         ->where('smu.UserCode', $userCode)
    //         ->where('sm.SubMenuShow', 'Yes')
    //         ->select('sm.SubMenuCode', 'sm.MenuCode', 'sm.SubMenuName', 'sm.SubMenuPeriority')
    //         ->get();

    //     $items = DB::connection('sqlsrv')
    //         ->table('MenuItemUser as miu')
    //         ->join('MenuItem as mi', 'miu.MenuItemCode', '=', 'mi.MenuItemCode')
    //         ->where('miu.UserCode', $userCode)
    //         ->where('mi.MenuActive', 'Yes')
    //         ->select(
    //             'mi.MenuItemCode',
    //             'mi.MenuItemName',
    //             'mi.MenuItemPage',
    //             'mi.SubMenuCode',
    //             'miu.addAccess',
    //             'miu.editAccess',
    //             'miu.deleteAccess',
    //             'miu.viewAccess'
    //         )
    //         ->get();

    //     return response()->json([
    //         'menus' => $menus,
    //         'submenus' => $submenus,
    //         'items' => $items,
    //     ]);
    // }
}
