import { useState } from "react";
import { NavLink } from "react-router-dom";

interface NavLinkParametr {
    isActive: boolean;
}

const Header = (): JSX.Element => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const navLinkClasses = ({ isActive }: NavLinkParametr) =>
        isActive ? "nav-link px-2 text-white" : "nav-link px-2 text-secondary";

    return (
        <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink to={"/catalog"} className={navLinkClasses}>
                                Catalog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/about"} className={navLinkClasses}>
                                About
                            </NavLink>
                        </li>
                    </ul>

                    {isLogin ? (
                        <div className="dropdown text-end">
                            <a
                                className="d-block link-dark text-decoration-none dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://github.com/mdo.png"
                                    alt="mdo"
                                    width="32"
                                    height="32"
                                    className="rounded-circle"
                                />
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li>
                                    <a className="dropdown-item">
                                        New project...
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item">Profile</a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <a className="dropdown-item">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="text-end">
                            <button
                                type="button"
                                className="btn btn-outline-light me-2"
                            >
                                Login
                            </button>
                            <button type="button" className="btn btn-warning">
                                Sign-up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
