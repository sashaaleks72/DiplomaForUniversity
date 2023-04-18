import { useState } from "react";
import ITeapot from "../models/ITeapot";
import IUser from "../models/IUser";
import u_heart from "../images/heart-regular.svg";
import p_heart from "../images/heart-solid.svg";
import Modal from "./UI/ModalWrapper";

const Comments = (): JSX.Element => {
    const [users] = useState<IUser[]>([
        {
            firstName: "Oleksandr",
            surName: "Tretiakov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Vladimir",
            surName: "Pupkin",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
        {
            firstName: "Maksim",
            surName: "Illarionov",
            comment:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, optio consequuntur. Nam aperiam earum magnam corporis ut quibusdam voluptatem, fuga minima ad facere repellat deserunt facilis maiores alias, nisi atque.",
        },
    ]);

    const [isPressed, setIsPressed] = useState<boolean>(false);

    const [teapot] = useState<ITeapot>({
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

    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <div className="ms-2 mt-2 position-relative d-flex justify-content-between">
            <div>
                <div className="border border-grey w-50 rounded-1 d-flex align-items-center justify-content-between p-3">
                    <div>Write a comment about the good</div>
                    <div
                        className="btn btn-success"
                        onClick={() => setIsModal(true)}
                    >
                        Write a comment
                    </div>
                </div>
                <div className="mt-2">
                    {users.map((user, index) => (
                        <div key={index} className="mb-3 w-75">
                            <div className="fw-bold">
                                {user.firstName} {user.surName}
                            </div>
                            <div>{user.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-50 align-self-start position-sticky top-0 pt-2">
                <div className="border border-grey rounded-1">
                    <div className="d-flex">
                        <img
                            className="p-2"
                            src={teapot.imgName}
                            height={150}
                        />
                        <div className="p-2">
                            <div>{teapot.name}</div>
                            <div className="d-flex align-items-center">
                                <div className="btn btn-info text-white mt-2">
                                    Add to cart
                                </div>
                                <div
                                    className="btn border border-white"
                                    onClick={() =>
                                        setIsPressed((prev) => !prev)
                                    }
                                >
                                    {isPressed ? (
                                        <img src={p_heart} height={20} />
                                    ) : (
                                        <img src={u_heart} height={20} />
                                    )}
                                </div>
                            </div>
                            <div className="fs-5">{teapot.price} UAH</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={isModal} setIsVisible={setIsModal}>
                <div>
                    <h2 className="fs-4 fw-light">
                        Write comment about the product:{" "}
                    </h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: "100px" }}
                        ></textarea>
                        <button type="submit" className="btn btn-success mt-2">
                            Save the comment
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Comments;
