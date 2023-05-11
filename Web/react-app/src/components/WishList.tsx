import TeapotItem from "./TeapotItem";
import wishes from "../store/wishes";
import { observer } from "mobx-react-lite";
import wishlist from "../images/wishlist.svg";

const WishList = observer((): JSX.Element => {
    return (
        <div className="container">
            <div className="fs-2 fw-light text-center border-bottom mb-2">Wishes list</div>

            {!wishes.guantityOfGoodsInWishList && (
                <div className="d-flex align-items-center flex-column">
                    <img src={wishlist} height={200} />
                    <div className="fs-4">Wish list is empty!</div>
                </div>
            )}

            <div className="row row-cols-xs-1 row-cols-md-2 row-cols-xl-3 g-4">
                {wishes.wishItems.map((wishItem) => (
                    <TeapotItem
                        key={wishItem.teapotId}
                        teapot={{
                            id: wishItem.teapotId,
                            name: wishItem.name,
                            price: wishItem.price,
                            imgName: wishItem.imgName,
                            quantity: 0,
                            color: "",
                            bodyMaterial: "",
                            power: 0,
                            volume: 0,
                            warrantyInMonths: 0,
                            functions: "",
                            weight: 0,
                            company: "",
                            stockAvailable: false,
                            manufacturerCountry: "",
                        }}
                    />
                ))}
            </div>
        </div>
    );
});

export default WishList;
