import { useState } from "react";
import ITeapot from "../models/ITeapot";
import u_heart from "../images/heart-regular.svg";
import p_heart from "../images/heart-solid.svg";

const Description = (): JSX.Element => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const [teapot, setTeapot] = useState<ITeapot>({
        id: "id1",
        name: "The smartest teapot in the world - ITeapot M100",
        quantity: 12,
        color: "black",
        bodyMaterial: "plastic",
        power: 1200,
        price: 2499,
        imgName:
            "https://content.rozetka.com.ua/goods/images/big_tile/163131692.jpg",
        volume: 1.8,
        functions: "heating by choosen temperature",
        weight: 1,
        warrantyInMonths: 12,
        stockAvailable: true,
        company: "Tefal",
        manufacturerCountry: "China",
    });

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="mt-3">
                        {teapot.stockAvailable ? "In stock" : "Out of stock"}{" "}
                    </div>
                    <div className="text-center">
                        <img src={teapot.imgName} alt={teapot.name} />
                    </div>
                </div>
                <div className="col-6">
                    <h3 className="display-6 mt-3">Characteristics</h3>
                    <div>
                        <div>
                            <b>Color:</b> {teapot.color}
                        </div>
                        <div>
                            <b>Body material:</b> {teapot.bodyMaterial}
                        </div>
                        <div>
                            <b>Producer:</b> {teapot.company}{" "}
                        </div>
                        <div>
                            <b>Power:</b> {teapot.power} W{" "}
                        </div>
                        <div>
                            <b>Capacity:</b> {teapot.volume} L
                        </div>
                        <div>
                            <b>Weight:</b> {teapot.weight} kg{" "}
                        </div>
                        <div>
                            <b>Warranty:</b> {teapot.warrantyInMonths} months
                        </div>
                        <div>
                            <b>Functions:</b> {teapot.functions}
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="btn btn-info text-white mt-2">
                            Add to cart
                        </div>
                        <div className="ms-2">
                            <div className="fs-4">{teapot.price} UAH</div>
                        </div>
                        <div
                            className="btn border border-white"
                            onClick={() => setIsPressed((prev) => !prev)}
                        >
                            {isPressed ? (
                                <img src={p_heart} height={20} />
                            ) : (
                                <img src={u_heart} height={20} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;
