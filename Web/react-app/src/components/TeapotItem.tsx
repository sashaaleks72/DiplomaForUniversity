import { Link } from "react-router-dom";
import ITeapot from "../models/ITeapot";
import cart from "../store/cart";
import u_heart from "../images/heart-regular.svg";
import p_heart from "../images/heart-solid.svg";
import { useWishesUpdate } from "../hooks/useWishesUpdate";

interface TeapotItemProps {
    teapot: ITeapot;
}

const TeapotItem = ({ teapot }: TeapotItemProps): JSX.Element => {
    const [isHeartPressed, setIsHeartPressed] = useWishesUpdate(teapot);

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <div className="text-center">
                        <Link to={`/${teapot.id}/description`}>
                            <img src={teapot.imgName} alt={teapot.name} height={300} />
                        </Link>
                    </div>
                    <h5 className="card-title">{teapot.name}</h5>
                    <p className="card-text">{teapot.price} UAH</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn btn-primary" onClick={() => cart.addToCart(teapot)}>
                            Add to cart
                        </div>
                        <div style={{ cursor: "pointer" }} onClick={() => setIsHeartPressed((prev) => !prev)}>
                            <img src={isHeartPressed ? p_heart : u_heart} height={25}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeapotItem;
