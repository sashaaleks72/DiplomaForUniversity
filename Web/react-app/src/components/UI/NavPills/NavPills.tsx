import { NavLink, useNavigate } from "react-router-dom";
import INavItem from "../../../models/INavItem";

interface NavPillsProps {
    navItems: INavItem[];
    isColumn?: boolean;
}

const NavPills = ({ navItems, isColumn = false }: NavPillsProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <ul
            className={`nav nav-pills mb-3 ${isColumn && "flex-column align-items-center"} mt-5`}
            id="pills-tab"
            role="tablist">
            {navItems.map((navItem) => (
                <li key={navItem.title} className="nav-item" role="presentation">
                    <NavLink to={navItem.path} className="nav-link">
                        {navItem.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default NavPills;

/*
<NavLink className="nav-link text-success" to={navItem.path}>
{navItem.title}
</NavLink>
*/
