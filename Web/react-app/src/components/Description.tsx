import u_heart from "../images/heart-regular.svg";
import p_heart from "../images/heart-solid.svg";
import { useOutletContext } from "react-router-dom";
import cart from "../store/cart";
import { useWishesUpdate } from "../hooks/useWishesUpdate";
import ITeapot from "../models/ITeapot";

const Description = (): JSX.Element => {
    const [teapot] = useOutletContext<[ITeapot, () => void]>();
    const [isHeartPressed, setIsHeartPressed] = useWishesUpdate(teapot);

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="mt-3">{teapot?.stockAvailable ? "In stock" : "Out of stock"} </div>
                    <div className="text-center">
                        <img src={teapot?.imgName} alt={teapot?.name} />
                    </div>
                </div>
                <div className="col-6">
                    <h3 className="display-6 mt-3">Characteristics</h3>
                    <div>
                        <div>
                            <b>Color:</b> {teapot?.color}
                        </div>
                        <div>
                            <b>Body material:</b> {teapot?.bodyMaterial}
                        </div>
                        <div>
                            <b>Producer:</b> {teapot?.company}{" "}
                        </div>
                        <div>
                            <b>Power:</b> {teapot?.power} W{" "}
                        </div>
                        <div>
                            <b>Capacity:</b> {teapot?.volume} L
                        </div>
                        <div>
                            <b>Weight:</b> {teapot?.weight} kg{" "}
                        </div>
                        <div>
                            <b>Warranty:</b> {teapot?.warrantyInMonths} months
                        </div>
                        <div>
                            <b>Functions:</b> {teapot?.functions}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="btn btn-info text-white mt-2" onClick={() => cart.addToCart(teapot!)}>
                            Add to cart
                        </div>
                        <div className="ms-2">
                            <div className="fs-4">{teapot?.price} UAH</div>
                        </div>
                        <div className="btn border border-white" onClick={() => setIsHeartPressed((prev) => !prev)}>
                            {isHeartPressed ? <img src={p_heart} height={20} /> : <img src={u_heart} height={20} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;
