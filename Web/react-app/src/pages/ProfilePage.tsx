import { Outlet } from "react-router-dom";
import NavBar from "../components/UI/NavPills/NavPills";

const ProfilePage = (): JSX.Element => {
    return (
        <div className="d-flex container">
            <div className="w-25">
                <NavBar
                    navItems={[
                        { title: "Profile info", path: "/profile/personal-info" },
                        { title: "Wishes list", path: "/profile/wish-list" },
                        { title: "Orders", path: "/profile/orders" },
                        { title: "Chat with an operator", path: "/profile/chat" },
                    ]}
                    isColumn={true}
                />
            </div>
            <div className="w-100">
                <Outlet />
            </div>
        </div>
    );
};

export default ProfilePage;
