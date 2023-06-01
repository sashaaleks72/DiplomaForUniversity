import { useEffect } from "react";
import OrderService from "../API/OrderService";

const Support = (): JSX.Element => {
    useEffect(() => {
        OrderService.getDeliveredOrderedProductsByUserId("bc2218c0-c93b-4e50-95fc-93fddaf020c5");
    }, []);

    return <div></div>;
};

export default Support;
