import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import shoppingCart from '../images/cart-shopping-solid.svg';
import white_heart from '../images/heart-regular_white_color.svg';
import ShoppingCart from './ShoppingCart';
import wishes from '../store/wishes';
import cart from '../store/cart';
import { observer } from 'mobx-react-lite';
import Login from './Login';
import Register from './Register';

interface NavLinkParametr {
    isActive: boolean;
}

const Header = observer((): JSX.Element => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [isCartClicked, setIsCartClicked] = useState<boolean>(false);
    const [isLoginClicked, setIsLoginClicked] = useState<boolean>(false);
    const [isRegisterClicked, setIsRegisterClicked] = useState<boolean>(false);

    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    const navigate = useNavigate();

    const navLinkClasses = ({ isActive }: NavLinkParametr) =>
        isActive ? 'nav-link px-2 text-white' : 'nav-link px-2 text-secondary';

    return (
        <div>
            <header className="p-3 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 align-items-center justify-content-center mb-md-0">
                            {isAdmin && (
                                <li className="fs-5">
                                    <NavLink
                                        to={'/admin/catalog'}
                                        className="nav-link px-2 text-white"
                                    >
                                        Control Panel
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink
                                    to={'/catalog'}
                                    className={navLinkClasses}
                                >
                                    Catalog
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/about'}
                                    className={navLinkClasses}
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>

                        <div className="position-relative me-3">
                            <img
                                onClick={() => navigate('/profile/wish-list')}
                                style={{ cursor: 'pointer' }}
                                className=""
                                src={white_heart}
                                height={22}
                            />
                            <span
                                style={{ fontSize: '11px' }}
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            >
                                {wishes.guantityOfGoodsInWishList}
                            </span>
                        </div>

                        <div className="position-relative me-3">
                            <img
                                onClick={() => setIsCartClicked(true)}
                                style={{ cursor: 'pointer' }}
                                className=""
                                src={shoppingCart}
                                height={20}
                            />
                            <span
                                style={{ fontSize: '11px' }}
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            >
                                {cart.guantityOfGoodsInCart}
                            </span>
                        </div>

                        {isLogin ? (
                            <div className="dropdown">
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
                                        <Link
                                            to="/profile/personal-info"
                                            className="dropdown-item"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile/orders"
                                            className="dropdown-item"
                                        >
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item">
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <button
                                    type="button"
                                    className="btn btn-outline-light me-2"
                                    onClick={() => setIsLoginClicked(true)}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() => setIsRegisterClicked(true)}
                                >
                                    Sign-up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {isCartClicked && (
                <ShoppingCart
                    isShoppingCartOpen={isCartClicked}
                    setIsShoppingCartOpen={setIsCartClicked}
                />
            )}
            {isLoginClicked && (
                <Login
                    isOpened={isLoginClicked}
                    setIsOpened={setIsLoginClicked}
                />
            )}
            {isRegisterClicked && (
                <Register
                    isModalOpened={isRegisterClicked}
                    setIsModalOpened={setIsRegisterClicked}
                />
            )}
        </div>
    );
});

export default Header;
