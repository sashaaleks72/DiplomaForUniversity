import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import IOrder from "../models/IOrder";
import OrderService from "../API/OrderService";
import checklist from "../images/checklist.svg";
import user from "../store/user";

const OrderList = (): JSX.Element => {
    const [orders, setOrders] = useState<IOrder[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let isUseEffectActive = true;

        const init = async () => {
            setIsLoading(true);
            const profile = await user.getProfile();
            const receivedOrders = await OrderService.getOrders(profile.userId);
            setIsLoading(false);

            if (!isUseEffectActive) return;
            setOrders(receivedOrders);
        };

        init();

        return () => {
            isUseEffectActive = false;
        };
    }, []);

    return (
        <div className="container">
            <div className="fs-2 fw-light text-center mb-2">My orders</div>
            {isLoading ? (
                <div className="d-flex justify-content-center ms-auto">
                    <div style={{ width: "3em", height: "3em" }} className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : !orders?.length ? (
                <div className="d-flex flex-column align-items-center">
                    <img src={checklist} height={200} />
                    <div className="fs-4">You haven't checked out any order yet!</div>
                </div>
            ) : (
                <Accordion>
                    {orders?.map((item, index) => {
                        return (
                            <Accordion.Item key={item.id} eventKey={`${index}`}>
                                <Accordion.Header className="d-flex justify-content-end">
                                    <div className="">№{item.id}</div>
                                    <div className="ms-2">{item.orderDate}</div>
                                    <div className="ms-2">{item.orderStatus}</div>
                                    <div className="ms-2">
                                        <b>{item.totalSum} ₴</b>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row g-5">
                                        <div className="col-md-7 col-lg-8 order-md-last">
                                            <div
                                                style={{
                                                    maxHeight: "calc(100vh - 500px)",
                                                    overflowX: "hidden",
                                                    overflowY: "auto",
                                                }}>
                                                {item.cartItems.map((product) => (
                                                    <div key={product.name}>
                                                        <img src={product.imgName} height="100" />
                                                        <div>
                                                            <b>Title: </b>
                                                            {product.name}
                                                        </div>
                                                        <div>
                                                            <b>Quantity: </b>
                                                            {product.quantity}
                                                        </div>
                                                        <div>
                                                            <b>Price: </b>
                                                            {product.price} ₴
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-lg-4">
                                            <div className="text-secondary">Information about the order</div>
                                            <div>
                                                {item.lastName} {item.firstName} {item.patronymic}
                                            </div>
                                            <div>м. {item.city}</div>
                                            <div>{item.email}</div>
                                            <div>{item.department === "" ? item.deliveryAddress : item.department}</div>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            )}
        </div>
    );
};

export default OrderList;
