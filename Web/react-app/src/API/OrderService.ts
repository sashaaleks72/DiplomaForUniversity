import axios from "axios";
import IOrder from "../models/IOrder";
import { ordersUrl } from "./ApiUrls";
import user from "../store/user";
import IOrderRequest from "../models/IOrderRequest";
import IOrderUpdate from "../models/IOrderUpdate";

const apiUrl: string = "http://localhost:3001";

class OrderService {
    static async doCheckout(order: IOrderRequest): Promise<void> {
        console.log(order);

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
        const response = await axios({
            url: `${ordersUrl}/GetOrders?${userId ? `userId=${userId}` : ""}${orderStatus ? `&status=${orderStatus}` : ""}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then(response => response);

        console.log(response)
        return response.data;
    }

    static async getDeliveredOrderedProductsByUserId(userId: string) {
        const receivedOrders: IOrder[] = await axios({
            url: `${ordersUrl}/GetOrders?userId=${userId}`,
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
            url: `${ordersUrl}/GetOrderById/${orderId}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then(response => response.data);

        return receivedOrder;
    }

    static async changeOrderById(orderId: string, order: IOrderUpdate): Promise<void> {
        await axios({
            url: `${ordersUrl}/UpdateOrder/${orderId}`,
            method: "put",
            data: order,
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        });
    }
}

export default OrderService;