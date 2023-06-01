import axios from "axios";
import IOrder from "../models/IOrder";

const apiUrl: string = "http://localhost:3001";

class OrderService {
    static async doCheckout(order: IOrder): Promise<void> {
        await axios({
            url: `${apiUrl}/orders/`,
            method: "post",
            data: order
        })
    }

    static async getOrders(userId?: string, orderStatus?: string): Promise<IOrder[]> {
        const receivedOrders = await axios({
            url: `${apiUrl}/orders?${userId ? `userId=${userId}` : ""}${orderStatus ? `&orderStatus=${orderStatus}` : ""}`,
            method: "get",
        }).then(response => response.data);

        return receivedOrders;
    }

    static async getDeliveredOrderedProductsByUserId(userId: string) {
        const receivedOrders: IOrder[] = await axios({
            url: `${apiUrl}/orders?userId=${userId}`,
            method: "get",
        }).then(response => response.data);

        const deliveredProducts = receivedOrders.map(order => order.cartItems.map(product => product));

        console.log(deliveredProducts);
    }

    static async getOrderById(orderId: string): Promise<IOrder> {
        const receivedOrder = await axios({
            url: `${apiUrl}/orders/${orderId}`,
            method: "get",
        }).then(response => response.data);

        return receivedOrder;
    }

    static async changeOrderById(orderId: string, order: IOrder): Promise<void> {
        await axios({
            url: `${apiUrl}/orders/${orderId}`,
            method: "put",
            data: order
        });
    }
}

export default OrderService;