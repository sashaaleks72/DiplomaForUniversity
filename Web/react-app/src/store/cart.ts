import { makeAutoObservable } from "mobx";
import ICartItem from "../models/ICartItem";
import ITeapot from "../models/ITeapot";

class Cart {
    cartItems: ICartItem[] = [];

    constructor() {
        makeAutoObservable(this);

        const recievedItems = localStorage.getItem("shoppingCart");
        this.cartItems = JSON.parse(recievedItems ?? "[]");
    }

    addToCart({ id, imgName, name, price }: ITeapot) {
        const cartItem: ICartItem = {
            teapotId: id!,
            imgName,
            name,
            quantity: 1,
            price,
        };

        if (this.cartItems.find((cartItem) => cartItem.teapotId === id))
            this.cartItems = this.cartItems.map((cartItem) =>
                cartItem.teapotId === id
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    }
                    : cartItem
            );
        else this.cartItems.push(cartItem);

        localStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
    }

    removeFromCart(teapotId: string) {
        const filterPredicate = (cartItem: ICartItem) =>
            cartItem.teapotId !== teapotId;

        this.cartItems = this.cartItems.filter(filterPredicate);

        localStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
    }

    changeProductQuantity(teapotId: string, valueOnChange: number) {
        this.cartItems = this.cartItems.map((cartItem) =>
            cartItem.teapotId === teapotId
                ? {
                    ...cartItem,
                    quantity: valueOnChange < 0 && cartItem.quantity > 1 ? cartItem.quantity + valueOnChange : valueOnChange > 0 ? cartItem.quantity + valueOnChange : 1,
                }
                : cartItem
        );

        localStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
    }

    cleanCart(): void {
        this.cartItems = [];
        localStorage.setItem("shoppingCart", JSON.stringify(this.cartItems));
    }

    get totalPrice(): number {
        const receivedValue = this.cartItems.reduce((accumulator, currCartItem) => accumulator + currCartItem.price * currCartItem.quantity, 0)
        return receivedValue;
    }

    get guantityOfGoodsInCart(): number {
        return this.cartItems.length;
    }
}

export default new Cart();
