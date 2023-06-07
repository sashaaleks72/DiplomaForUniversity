import Grid from "@mui/material/Grid";
import ITeapot from "../models/ITeapot";
import TeapotItem from "./TeapotItem";
import Skeleton from "@mui/material/Skeleton";
import cart from "../store/cart";
import { Card, CardMedia, CardContent, IconButton, CardActions, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface TeapotListProps {
    teapots: ITeapot[] | undefined;
    isLoading: boolean;
}

const TeapotList = ({ teapots, isLoading }: TeapotListProps): JSX.Element => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2 }}>
            {isLoading
                ? Array.from(new Array(6)).map((_, index) => (
                      <Grid item xs={12} md={6} lg={4}>
                          <Skeleton key={index} variant="rounded">
                              <Card
                                  className="container"
                                  sx={{
                                      minWidth: "450px",
                                      border: "1px solid rgba(0,0,0, 0.2)",
                                      boxShadow: "2px 2px 2px 1px rgba(0,0,0, 0.1)",
                                  }}
                                  elevation={0}>
                                  <CardMedia
                                      sx={{
                                          cursor: "pointer",
                                          textAlign: "center",
                                          mt: 2,
                                          minHeight: "330px",
                                      }}></CardMedia>
                                  <CardContent>
                                      <Skeleton variant="text" />
                                      <Skeleton variant="text" />
                                  </CardContent>
                                  <CardActions disableSpacing sx={{ float: "right" }}>
                                      <Skeleton variant="rounded" />
                                      <Skeleton variant="rounded" />
                                  </CardActions>
                              </Card>
                          </Skeleton>
                      </Grid>
                  ))
                : teapots &&
                  teapots!.map((teapot) => (
                      <Grid item xs={12} md={6} lg={4}>
                          <TeapotItem key={teapot.id} teapot={teapot} />
                      </Grid>
                  ))}
        </Grid>
    );
};

export default TeapotList;
