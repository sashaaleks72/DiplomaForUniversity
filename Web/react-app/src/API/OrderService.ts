import axios from "axios";
import IOrder from "../models/IOrder";
import { ordersUrl } from "./ApiUrls";
import user from "../store/user";

const apiUrl: string = "http://localhost:3001";

class OrderService {
    static async doCheckout(order: IOrder): Promise<void> {
        await axios({
            url: `${ordersUrl}/AddOrder`,
            method: "post",
            data: order,
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        })
    }

    static async getOrders(userId?: string, orderStatus?: string): Promise<IOrder[]> {
        const receivedOrders = await axios({
            url: `${ordersUrl}/GetOrders?${userId ? `userId=${userId}` : ""}${orderStatus ? `&orderStatus=${orderStatus}` : ""}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then(response => response.data);

        return receivedOrders;
    }

    static async getDeliveredOrderedProductsByUserId(userId: string) {
        const receivedOrders: IOrder[] = await axios({
            url: `${ordersUrl}/orders?userId=${userId}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then(response => response.data);

        const deliveredProducts = receivedOrders.map(order => order.cartItems.map(product => product));

        console.log(deliveredProducts);
    }

    static async getOrderById(orderId: string): Promise<IOrder> {
        const receivedOrder = await axios({
            url: `${ordersUrl}/orders/${orderId}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then(response => response.data);

        return receivedOrder;
    }

    static async changeOrderById(orderId: string, order: IOrder): Promise<void> {
        await axios({
            url: `${apiUrl}/orders/${orderId}`,
            method: "put",
            data: order,
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        });
    }
}

export default OrderService;