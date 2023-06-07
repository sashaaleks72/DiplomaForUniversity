import TeapotItem from "./TeapotItem";
import wishes from "../store/wishes";
import { observer } from "mobx-react-lite";
import wishlist from "../images/wishlist.svg";
import Grid from "@mui/material/Grid";

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

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
                {wishes.wishItems.map((wishItem) => (
                    <Grid item xs={12} md={6} lg={4}>
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
                                manualUrl: "",
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
});

export default WishList;
