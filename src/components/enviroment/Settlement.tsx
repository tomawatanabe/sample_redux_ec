import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { supabase } from "../../lib/supabase-client";
import { Link as RouterLink } from "react-router-dom";
import PurchaseCompleteButton from "../organisms/PurchaseCompleteButton";

const Settlement = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [profile, setProfile] = useState<any>({});
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getUserProfile = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", cookies.userID)
      .limit(1)
      .single();
    setProfile(data);
  };

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

  useEffect(() => {
    void getUserProfile();
    void getCart();
  }, []);

  return (
    <>
      <CssBaseline />
      <Typography variant="h5" sx={{ mt: 2, mb: 2 }} textAlign="center">
        購入内容
      </Typography>
      <Grid container spacing={6} justifyContent="center" sx={{ mb: 5 }}>
        <Grid item>
          <Card
            sx={{
              width: 500,
              border: "solid",
              borderColor: "grey.500",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <List>
                <Typography variant="h6">注文商品</Typography>
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
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              width: 300,
              mb: 5,
              border: "solid",
              borderColor: "grey.500",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Typography variant="h6">受取場所</Typography>
              <Typography>
                氏名: {profile?.last_name} {profile?.first_name}
              </Typography>
              <Typography>郵便番号: {profile?.zip_code}</Typography>
              <Typography>都道府県: {profile?.prefecture}</Typography>
              <Typography>市区町村: {profile?.city}</Typography>
              <Typography>番地: {profile?.address}</Typography>
              <Typography>建物名: {profile?.building}</Typography>
              <Typography>メール: {profile?.email}</Typography>
              <Typography>電話番号: {profile?.phone}</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: 300,
              border: "solid",
              borderColor: "grey.500",
              borderRadius: "16px",
            }}
          >
            <CardContent>
              <Typography variant="h6">注文内容</Typography>
              <Typography>
                商品の小計:¥{total?.toLocaleString()}（税込）
              </Typography>
              <Typography>配送料・手数料:¥550（税込）</Typography>
              <Typography>
                合計:¥{(Number(total) + 550)?.toLocaleString()}（税込）
              </Typography>
              <Box textAlign="center" sx={{ mt: 1 }}>
                <PurchaseCompleteButton
                  userID={cookies.userID}
                  total={total}
                  stockIDArr={cart.map((elm) => elm.stocks.id)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box textAlign="center">
        <Button component={RouterLink} to="/cart" variant="outlined">
          <ProductionQuantityLimitsOutlinedIcon />
          注文を変更する
        </Button>
      </Box>
    </>
  );
};

export default Settlement;
