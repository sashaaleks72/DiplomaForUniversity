import ICartItem from "./ICartItem";

interface IOrder {
    id?: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    city: string;
    department: string;
    deliveryAddress: string;
    cartItems: ICartItem[];
    orderStatus: string;
    orderDate: string;
    totalSum: number;
}

export default IOrder;