import { Outlet } from "react-router-dom";
import NavPills from "../../components/UI/NavPills/NavPills";
import { useState } from "react";
import INavItem from "../../models/INavItem";

const ControlPanelPage = (): JSX.Element => {
    const [navItems] = useState<INavItem[]>([
        { title: "Teapots", path: "/admin/catalog" },
        { title: "Orders", path: "/admin/orders" },
        { title: "Chat", path: "/admin/chat" },
    ]);

    return (
        <div className="d-flex container">
            <div className="w-25">
                <NavPills navItems={navItems} isColumn={true} />
            </div>

            <div className="w-100">
                <Outlet />
            </div>
        </div>
    );
};

export default ControlPanelPage;
