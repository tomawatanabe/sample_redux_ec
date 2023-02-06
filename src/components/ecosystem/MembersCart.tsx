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
import { Link as RouterLink } from "react-router-dom";
import { RemoveShoppingCart } from "@mui/icons-material";
import ShopIcon from "@mui/icons-material/Shop";
import EmptyCart from "../organisms/EmptyCart";

const MembersCart = (): JSX.Element => {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<Number>();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //supabaseのカートからデータを取得
    const getCart = async () => {
      const { data } = await supabase
        .from("shopping_cart")
        .select("id,user_id,stocks(id,item_id,image1,size,price,items(name))")
        .eq("user_id", cookies.userID);

      // 合計金額を計算
      const initial = data
        ?.map((v: any) => v.stocks?.price)
        .reduce((prev, curr) => {
          return prev + curr;
        }, 0);

      if (data) {
        setCart(data);
        setTotal(initial);
      }
    };

    void getCart();
  }, [loading]);

  if (!total) {
    return <EmptyCart />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Box>
        <CssBaseline />
        <List>
          <Typography component="h1" variant="h5">
            カート
          </Typography>
          {cart.map((v) => {
            return (
              <ListItem key={v.id}>
                <ListItemAvatar>
                  <Avatar
                    src={v.stocks?.image1}
                    variant="square"
                    sx={{ height: "auto" }}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={v.stocks.items?.name}
                  secondary={`¥${v.stocks.price.toLocaleString()}`}
                />
                <Button
                  component={RouterLink}
                  to={`/items/${v.stocks.id}`}
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
                  onClick={async () => {
                    const { data } = await supabase
                      .from("shopping_cart")
                      .delete()
                      .eq("id", v?.id);
                    setLoading(!loading);
                  }}
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
          component={RouterLink}
          to={`/cart/settlement`}
          variant="outlined"
          aria-label="link to buy"
          startIcon={<ShopIcon />}
        >
          購入手続きに進む
        </Button>
      </Box>
    </Container>
  );
};

export default MembersCart;
