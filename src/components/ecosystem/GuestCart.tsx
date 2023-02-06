import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { supabase } from "../../lib/supabase-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Container, CssBaseline, Typography } from "@mui/material";
import { Box } from "@mui/system";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { RemoveShoppingCart } from "@mui/icons-material";
import ShopIcon from "@mui/icons-material/Shop";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types/rootState.type";
import { remove } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "../organisms/EmptyCart";

const GuestCart = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<Number>();
  const [loading, setLoading] = useState(true);

  const selector: Array<number> | [] = useSelector(
    (state: RootState) => state.cart.guestCart
  );

  useEffect(() => {
    const getStocks = async () => {
      const { data } = await supabase
        .from("stocks")
        .select("id,item_id,image1,size,price,items(name)")
        .in("id", selector);

      const initial = data
        ?.map((v: any) => v.price)
        .reduce((prev, curr) => {
          return prev + curr;
        }, 0);

      if (data) {
        setCart(data);
        setTotal(initial);
      }
      console.log("useEffect");
    };

    void getStocks();
  }, [loading]);

  const removeCart = (props: number) => {
    dispatch(remove(props));
    setLoading(!loading);
  };

  if (!total) {
    return <EmptyCart />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Box>
        <CssBaseline />{" "}
        <List>
          <Typography component="h1" variant="h5">
            ゲスト用カート
          </Typography>
          {cart.map((v) => {
            return (
              <ListItem key={v.id}>
                <ListItemAvatar>
                  <Avatar
                    src={v.image1}
                    variant="square"
                    sx={{ height: "auto" }}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={v.items?.name}
                  secondary={`¥${v.price.toLocaleString()}`}
                />
                <Button
                  component={RouterLink}
                  to={`/items/${v.id}`}
                  target="_blank"
                  sx={{ mr: 5 }}
                  variant="outlined"
                  aria-label="jump to ItemDetail"
                  startIcon={<LaunchIcon />}
                >
                  詳細
                </Button>
                <Button
                  variant="outlined"
                  aria-label="remove from favorite"
                  startIcon={<RemoveShoppingCart />}
                  onClick={() => removeCart(v.id)}
                >
                  カートから削除
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box textAlign="center">
        <Typography variant="h6" sx={{ p: 3 }}>
          カート内小計:¥{total?.toLocaleString()}（税込）
        </Typography>
        <Button
          onClick={() => navigate("/signin")}
          variant="outlined"
          aria-label="link to buy"
          startIcon={<ShopIcon />}
        >
          購入手続きに進む
        </Button>
        <Typography sx={{ pt: 3, pb: 1 }}>※ログインが必要です</Typography>
        <Typography>※ログイン後、カートの中身は引き継がれます</Typography>
      </Box>
    </Container>
  );
};

export default GuestCart;
