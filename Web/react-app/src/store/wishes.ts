import { makeAutoObservable } from "mobx";
import IWishItem from "../models/IWishItem";
import ITeapot from "../models/ITeapot";

class Wishes {
    wishItems: IWishItem[] = [];

    constructor() {
        makeAutoObservable(this);

        const recievedItems = localStorage.getItem("wishesList");
        this.wishItems = JSON.parse(recievedItems ?? "[]");
    }

    addToWishList({ id, imgName, name, price }: ITeapot): void {
        const wishItem: IWishItem = {
            teapotId: id!,
            name,
            imgName,
            price
        }

        if (this.wishItems.findIndex(wishItem => wishItem.teapotId === id) === -1)
            this.wishItems.push(wishItem);

        localStorage.setItem("wishesList", JSON.stringify(this.wishItems));
    }

    removeFromWishList(teapotId: string): void {
        const filterPredicate = (wishItem: IWishItem) =>
            wishItem.teapotId !== teapotId;

        this.wishItems = this.wishItems.filter(filterPredicate);

        localStorage.setItem("wishesList", JSON.stringify(this.wishItems));
    }

    checkIsWished(teapotId: string): boolean {
        const wishedItem: IWishItem | undefined = this.wishItems.find((wishItem) => wishItem.teapotId === teapotId);
        const isWished: boolean = wishedItem ? true : false;

        return isWished;
    }

    get guantityOfGoodsInWishList(): number {
        return this.wishItems.length;
    }
}

export default new Wishes();