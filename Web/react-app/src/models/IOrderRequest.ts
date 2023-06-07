import ICartItem from "./ICartItem";

export default interface IOrderRequest {
  firstName: string,
  lastName: string,
  patronymic: string,
  city: string,
  email: string,
  department: string,
  deliveryAddress: string,
  totalSum: number,
  cartItems: ICartItem[],
  userId: string;
}