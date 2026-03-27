import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminLayout() {
    return (
        <div id="app" className="on">

            <Sidebar />

            <div className="main">
                <Header />
                {/* <div className="topbar">
             <h4>Admin Dashboard</h4>
             </div> */}

                <div className="content">
                    {/* <Dashboard /> */}
                    <Outlet />
                </div>

            </div>
        </div>
    );
}
