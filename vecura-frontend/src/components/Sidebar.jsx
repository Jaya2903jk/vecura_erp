import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/Updated Logo-19.png"; // Adjust path if needed
import {
    Settings,
    Users,
    User,
    Calendar,
    Package,
    Box,
    BarChart3,
    Grid3x3,
    FileText,
    Zap,
    Truck,
    TrendingUp,
    ClipboardList,
    DollarSign,
    Phone,
    Coffee,
    Award,
    MapPin,
    Briefcase,
    Activity,
    Pill,
    MessageSquare,
    Lock,
    Eye,
    Search,
    Plus,
    Edit,
    Trash2,
    ArrowRight,
    Circle
} from "lucide-react";

// Advanced icon mapping - Priority 1: Submenu codes for specific icons
const getIcon = (name, subMenuCode = "") => {
    const subMenuCodeMap = {
        // Admin
        "SubmenuE80": Settings,      // Employee
        "SubmenuI102": Award,         // Incentive
        "SubmenuB81": Activity,       // Biometric
        "SubmenuB82": Activity,       // Biometric
        "Submenu19": Users,           // User Management
        "Submenu82": MessageSquare,   // SMS/Email

        // Master
        "SMenu1": Briefcase,          // Machine
        "Submenu5": Coffee,           // Master Data
        "Submenu13": MapPin,          // Geographic Masters
        "Submenu14": Calendar,        // Day Target
        "Submenu15": Pill,            // Treatment Master
        "SubmenuCC01": Phone,         // Call Center Master
        "SubmenuNR6": TrendingUp,     // Target
        "sMenu01": Briefcase,         // Ticket

        // Customer
        "Submenu1": User,             // Registration
        "Submenu8": FileText,         // Treatment
        "Submenu9": DollarSign,       // Bill Details
        "SubmenuNR3": Zap,            // Discount
        "PSubmenu40": Eye,            // Consultation Form

        // Appointments
        "Submenu4": Calendar,         // Scheduling
        "SMenuItRC01": Phone,         // Call Center

        // Purchase
        "PMSubMenu31": Package,       // Purchase Master
        "SSubmenu31": Truck,          // Purchase Order
        "WSubmenu31": Box,            // Work Order
        "SSubMenu31": BarChart3,      // GRN

        // Inventory
        "SM1": Box,                   // Stock
        "SM2": ClipboardList,         // Indent
        "SM3": Truck,                 // Stock Inward
        "SM4": ArrowRight,            // Stock Outward
        "SM10": Award,                // Asset Stock
        "SubmenuST01": Zap,           // Stock Transfer
        "SubmenuW01": TrendingUp,     // Warehouse B2C
        "PSubmenu65": Coffee,         // Inventory Master
        "SSubmenu38": Truck,          // Stock Inward Warehouse
        "SSubmenu41": BarChart3,      // Stock In-Out Admin
        "VSubmenu29": ArrowRight,     // Stock Outward Warehouse

        // Reports
        "Submenu61": BarChart3,       // Sales Reports
        "Submenu60": FileText,        // Customer Reports
        "Submenu102": Award,          // Incentive Reports
        "Submenu83": Phone,           // Call Center Report
        "SubmenuA01": BarChart3,      // Admin Report
        "SubmenuNR1": TrendingUp,     // New/Regular Clients
        "SubmenuLO2": Phone,          // Lead Management
        "SubmenuNR4": Pill,           // GST Report HSN
        "SubmenuNR5": Pill,           // GST Report SAC
        "SubmenuT62": TrendingUp,     // Sales

        // Dashboard
        "SubmenuD01": DollarSign,     // Heads Sales
        "SubmenuD02": TrendingUp,     // Inflow Sales
        "SubmenuD03": FileText,       // Visits
        "SubmenuD04": Briefcase,      // V Support
        "SubmenuD05": MessageSquare,  // Feedback
        "SubmenuD06": BarChart3,      // Branch Report
        "SubmenuD07": Box,            // Stock Inward
        "SubmenuCC02": Phone,         // Call Center Dashboard
        "SubMDSR01": Calendar,        // DTR
        "SubmenuIOU1": DollarSign,    // IOU
        "DSubmenu01": Lock,           // Petty Cash
        "DSubmenu02": Users,          // Manpower Requisition
        "DSubmenu56": Settings,       // Operations
        "BASub001": Eye,              // Before After Photo
        "BAWSub001": TrendingUp,      // Weight Loss
        "SubMenuD1000": Calendar,     // Schedule Pending
        "SubmenuD061": Award,         // Milestones
        "DSubmenuAu01": Lock,         // Audit
        "SubmenuAu01": Eye,           // Call Center Audit
    };

    if (subMenuCode && subMenuCodeMap[subMenuCode]) {
        return subMenuCodeMap[subMenuCode];
    }

    // Priority 2: Keyword matching for item-level icons
    const key = name.toLowerCase();
    const itemKeywords = [
        { keywords: ["transaction", "payment", "cash", "deposit", "refund"], icon: DollarSign },
        { keywords: ["report", "analysis"], icon: BarChart3 },
        { keywords: ["user", "employee", "staff", "member"], icon: Users },
        { keywords: ["customer", "client"], icon: User },
        { keywords: ["appointment", "schedule", "booking"], icon: Calendar },
        { keywords: ["treatment", "therapy"], icon: Pill },
        { keywords: ["inventory", "stock", "warehouse"], icon: Box },
        { keywords: ["purchase", "order", "vendor"], icon: Package },
        { keywords: ["sales", "invoice", "bill"], icon: TrendingUp },
        { keywords: ["audit", "approval", "authorization"], icon: Lock },
        { keywords: ["document", "file", "upload"], icon: FileText },
        { keywords: ["communication", "sms", "email", "notification"], icon: MessageSquare },
        { keywords: ["call", "phone"], icon: Phone },
        { keywords: ["target", "goal", "achievement"], icon: Award },
        { keywords: ["location", "branch", "area"], icon: MapPin },
        { keywords: ["transport", "delivery"], icon: Truck },
        { keywords: ["feedback", "comment"], icon: MessageSquare },
        { keywords: ["configuration", "setting", "master"], icon: Settings },
        { keywords: ["search", "view", "display"], icon: Eye },
        { keywords: ["add", "create", "new"], icon: Plus },
        { keywords: ["edit", "update", "change"], icon: Edit },
        { keywords: ["cancel", "delete", "remove"], icon: Trash2 },
    ];

    for (let item of itemKeywords) {
        for (let keyword of item.keywords) {
            if (key.includes(keyword)) {
                return item.icon;
            }
        }
    }

    return Circle; // Default fallback icon
};

export default function Sidebar() {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);
    const [submenus, setSubmenus] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedmenus, setExpandedMenus] = useState({});

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/menu",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data.status) {
                setMenus(response.data.menus || []);
                setSubmenus(response.data.submenus || []);
                setItems(response.data.items || []);
            }
        } catch (err) {
            console.error("Failed to fetch menus:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleMenu = (menuCode) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuCode]: !prev[menuCode]
        }));
    };

    const gotoPage = (page) => {
        navigate("/" + page);
    };

    const doLogout = async () => {

        const token = localStorage.getItem("token");
        // console.log("Token being sent:", token);
        try {

            if (token) {
                await axios.post(
                    "http://127.0.0.1:8000/api/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

        } catch (err) {
            console.log("Logout API failed, forcing logout");
        }
        localStorage.clear();
        sessionStorage.clear();
        window.history.replaceState(null, "", "/login");


        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <aside className="sidebar">

            <div className="logo-area">
                <div
                    style={{
                        width: "36px",
                        height: "36px",
                        background: "var(--accent)",
                        borderRadius: "9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px var(--accent-glow)"
                    }}
                >
                    <img src="https://www.vecurawellness.com/Lassets/img/logo.webp" alt="VeCura Logo" style={{ width: "100%", height: "100%", borderRadius: "6px", objectFit: "contain" }} />
                </div>

                <div className="logo-txt" style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "var(--text-primary)" }}>
                        VeCura
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                        Wellness Admin
                    </div>
                </div>
            </div>

            <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
                {menus.length === 0 ? (
                    <div style={{ padding: "16px", textAlign: "center", color: "var(--text-muted)" }}>
                        No menus available
                    </div>
                ) : (
                    menus.map((menu) => {
                        const menuSubmenus = submenus.filter((sub) => sub.MenuCode === menu.MenuCode);
                        const isExpanded = expandedmenus[menu.MenuCode];

                        return (
                            <div key={menu.MenuCode}>
                                <div
                                    className="nav-item"
                                    onClick={() => toggleMenu(menu.MenuCode)}
                                    style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontWeight: 600,
                                        padding: "10px 12px",
                                        // color: "var(--text-nav)"
                                    }}
                                >
                                    <span>{menu.MenuName}</span>
                                    <ArrowRight
                                        size={16}
                                        style={{
                                            transition: "transform 0.3s ease",
                                            transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)"
                                        }}
                                    />
                                </div>

                                {isExpanded && menuSubmenus.length > 0 && (
                                    <div style={{ paddingLeft: "12px" }}>
                                        {menuSubmenus.map((submenu) => {
                                            const subItems = items.filter(
                                                (item) => item.SubMenuCode === submenu.SubMenuCode
                                            );
                                            return (
                                                <div key={submenu.SubMenuCode}>
                                                    {subItems.length > 0 ? (
                                                        subItems.map((item) => (
                                                            <div
                                                                key={item.MenuItemCode}
                                                                className="nav-item"
                                                                onClick={() =>
                                                                    gotoPage(item.MenuItemName.toLowerCase().replace(/\s+/g, ""))
                                                                }
                                                            >
                                                                {(() => {
                                                                    const IconComponent = getIcon(item.MenuItemName, submenu.SubMenuCode);
                                                                    return <IconComponent className="nav-ico" size={20} />;
                                                                })()}
                                                                <span className="nav-lbl">{item.MenuItemName}</span>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div
                                                            className="nav-item"
                                                            onClick={() =>
                                                                gotoPage(submenu.SubMenuName.toLowerCase().replace(/\s+/g, ""))
                                                            }
                                                        >
                                                            {(() => {
                                                                const IconComponent = getIcon(submenu.SubMenuName, submenu.SubMenuCode);
                                                                return <IconComponent className="nav-ico" size={20} />;
                                                            })()}
                                                            <span className="nav-lbl">{submenu.SubMenuName}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </nav>

            <div style={{ padding: "12px", borderTop: "1px solid var(--border-soft)" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "9px",
                        transition: "0.2s"
                    }}
                    onClick={doLogout}
                >
                    <div className="av av-1" style={{ width: "32px", height: "32px" }}>
                        Dr
                    </div>

                    <div className="nav-lbl" style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: 700 }}>
                            Dr. Priya Sharma
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                            Chief Administrator
                        </div>
                    </div>
                    <svg class="nav-lbl" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>

                </div>
            </div>

        </aside>
    );
}
