import cart from "../store/cart";
import ModalWrapper from "./UI/ModalWrapper/ModalWrapper";
import { observer } from "mobx-react-lite";
import cartSvg from "../images/shopping-cart.svg";
import { useNavigate } from "react-router-dom";

interface ShoppingCartProps {
    isShoppingCartOpen: boolean;
    setIsShoppingCartOpen: (state: boolean) => void;
}

const ShoppingCart = observer(({ isShoppingCartOpen, setIsShoppingCartOpen }: ShoppingCartProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <ModalWrapper isVisible={isShoppingCartOpen} setIsVisible={setIsShoppingCartOpen}>
            <div>
                <div className="d-flex align-items-center justify-content-between border-bottom mb-2 pb-1">
                    <div className="fs-4">ShoppingCart</div>
                    <div className="btn btn-close" onClick={() => setIsShoppingCartOpen(false)}></div>
                </div>

                {!cart.cartItems.length && (
                    <div className="text-center">
                        <div>There are no products in the cart!</div>
                        <div>
                            <img src={cartSvg} height={200} />
                        </div>
                    </div>
                )}
                <div
                    style={{
                        overflowY: "auto",
                        overflowX: "hidden",
                        maxHeight: "350px",
                    }}>
                    {cart.cartItems.map((cartItem) => (
                        <div key={cartItem.teapotId} className="d-flex align-items-center mb-2">
                            <div style={{ minWidth: 100 }}>
                                <img src={cartItem.imgName} height={100} />
                            </div>
                            <div style={{ minWidth: 420 }}>{cartItem.name}</div>
                            <div
                                className="ms-1 btn border"
                                onClick={() => cart.changeProductQuantity(cartItem.teapotId, -1)}>
                                -
                            </div>
                            <div className="ms-1 text-center" style={{ minWidth: 20 }}>
                                {cartItem.quantity}
                            </div>
                            <div
                                className="ms-1 btn border"
                                onClick={() => cart.changeProductQuantity(cartItem.teapotId, 1)}>
                                +
                            </div>
                            <div className="text-center pe-1 ps-1" style={{ minWidth: 70 }}>
                                {cartItem.price * cartItem.quantity} ₴
                            </div>
                            <div className="btn border" onClick={() => cart.removeFromCart(cartItem.teapotId)}>
                                x
                            </div>
                        </div>
                    ))}
                </div>

                {!!cart.cartItems.length && (
                    <div className="d-flex justify-content-end align-items-center mt-2">
                        <div className="me-2 fs-5">{cart.totalPrice} UAH</div>
                        <div
                            className="btn btn-success"
                            onClick={() => {
                                navigate("/checkout");
                                setIsShoppingCartOpen(false);
                            }}>
                            Proceed to checkout
                        </div>
                    </div>
                )}
            </div>
        </ModalWrapper>
    );
});

export default ShoppingCart;
