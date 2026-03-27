
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import Clients from "./pages/Clients";
import Tickets from "./pages/Tickets";
import TicketView from "./pages/TicketView";
import Department from "./pages/Department";
import DepartmentView from "./pages/DepartmentView";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="/ticket/:id" element={<TicketView />} />
                <Route path="department" element={<Department />} />
                <Route path="/departmentview/:id" element={<DepartmentView />} />

            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />

        </Routes>
    );
}
