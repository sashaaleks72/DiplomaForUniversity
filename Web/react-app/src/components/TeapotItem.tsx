import { Link } from "react-router-dom";
import ITeapot from "../models/ITeapot";

interface TeapotItemProps {
    teapot: ITeapot;
}

const TeapotItem = ({ teapot }: TeapotItemProps): JSX.Element => {
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <div className="text-center">
                        <Link to={`/${teapot.id}/description`}>
                            <img
                                src={teapot.imgName}
                                className="card-img-top"
                                alt={teapot.name}
                                style={{
                                    width: "auto",
                                    height: "auto",
                                }}
                            />
                        </Link>
                    </div>
                    <h5 className="card-title">{teapot.name}</h5>
                    <p className="card-text">{teapot.price} UAH</p>
                    <p className="btn btn-primary">Add to cart</p>
                </div>
            </div>
        </div>
    );
};

export default TeapotItem;
