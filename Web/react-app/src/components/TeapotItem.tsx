import { Link, useNavigate } from "react-router-dom";
import ITeapot from "../models/ITeapot";
import cart from "../store/cart";
import u_heart from "../images/heart-regular.svg";
import p_heart from "../images/heart-solid.svg";
import { useWishesUpdate } from "../hooks/useWishesUpdate";
import { Card, CardMedia, CardContent, IconButton, CardActions, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface TeapotItemProps {
    teapot: ITeapot;
}

const TeapotItem = ({ teapot }: TeapotItemProps): JSX.Element => {
    const [isHeartPressed, setIsHeartPressed] = useWishesUpdate(teapot);
    const navigate = useNavigate();

    return (
        <Card
            className="container"
            sx={{
                maxWidth: "450px",
                border: "1px solid rgba(0,0,0, 0.2)",
                boxShadow: "2px 2px 2px 1px rgba(0,0,0, 0.1)",
            }}
            elevation={0}>
            <CardMedia
                sx={{ cursor: "pointer", textAlign: "center", mt: 2, minHeight: "300px" }}
                onClick={() => navigate(`/${teapot.id}/description`)}>
                <img src={teapot.imgName} alt={teapot.name} height={300} />
            </CardMedia>
            <CardContent sx={{ paddingBottom: 0 }}>
                <Typography variant="h6">{teapot.name}</Typography>
                <Typography variant="subtitle1">{teapot.price} UAH</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ float: "right", paddingTop: 0 }}>
                <IconButton onClick={() => setIsHeartPressed((prev) => !prev)}>
                    {isHeartPressed ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton onClick={() => cart.addToCart(teapot)}>
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default TeapotItem;
