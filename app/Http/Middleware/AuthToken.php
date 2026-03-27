<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthToken {
    public function handle( Request $request, Closure $next ) {
        $token = $request->bearerToken();

        if ( !$token ) {
            return response()->json( [ 'message' => 'Unauthenticated' ], 401 );
        }

        $session = DB::table( 'user_tokens' )
        ->where( 'token', hash( 'sha256', $token ) )
        ->where( 'expires_at', '>', now() )
        ->first();
        if (
            !$session ||
            ( $session->expires_at && now()->gt( $session->expires_at ) )
        ) {
            return response()->json( [ 'message' => 'Session expired' ], 401 );
        }

        if ( !$session ) {
            return response()->json( [ 'message' => 'Invalid token' ], 401 );
        }

        if ( $session->expires_at && now()->greaterThan( $session->expires_at ) ) {
            return response()->json( [ 'message' => 'Token expired' ], 401 );
        }
        // $user = DB::connection( 'sqlsrv' )
        // ->table( 'User_Master' )
        // ->where( 'UserID', $session->user_id )
        // ->first();

        // if ( !$user ) {
        //     return response()->json( [ 'message' => 'User not found' ], 404 );
        // }
        $request->merge( [
            'auth_user_id' => $session->user_id,
            // 'auth_user_code' => $user->UserCode,
            // 'auth_user_name' => $user->FullName ?? $user->UserName,
        ] );

        return $next( $request );
    }
}
