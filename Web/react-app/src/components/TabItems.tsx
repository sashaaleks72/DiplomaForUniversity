import { NavLink } from "react-router-dom";
import ITabItem from "../models/ITabItem";

interface TabItemsProps {
    tabItems: ITabItem[];
}

const TabItems = ({ tabItems }: TabItemsProps): JSX.Element => {
    return (
        <ul className="nav nav-tabs">
            {tabItems.map((tabItem) => (
                <li className="nav-item" key={tabItem.title}>
                    <NavLink className="nav-link" to={tabItem.href}>
                        {tabItem.title}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default TabItems;
