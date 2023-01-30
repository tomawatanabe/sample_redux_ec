import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { supabase } from "../../lib/supabase-client";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types/rootState.type";
import { clear } from "../redux/cartSlice";
import { useForm } from "react-hook-form";
import { List } from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errorFlag, setErrorFlag] = React.useState(false);
  const dispatch = useDispatch();
  const selector: Array<number> | [] = useSelector(
    (state: RootState) => state.cart.guestCart
  );

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    shouldUnregister: false,
  });

  // ReduxカートをSupabaseカートに移動（差分のみ）
  const handleCombine = async (
    guestCart: Array<number> | [] = [],
    userID: number
  ) => {
    if (guestCart.length !== 0) {
      // supabaseカートの中身を取得
      const { data: membersCartObj } = await supabase
        .from("shopping_cart")
        .select("stock_id")
        .eq("user_id", userID);

      // 配列に変換
      const membersCartArr: Array<number> = [];
      membersCartObj?.forEach((v) => membersCartArr.push(v.stock_id as number));

      console.log("membersCart", membersCartArr);

      // SupabaseカートとReduxカートの差分を作成
      const newCart = guestCart.filter((v) => membersCartArr?.indexOf(v) == -1);

      // 差分のみSupabaseに送る
      for (let i = 0; i < newCart.length; i++) {
        const { data, error } = await supabase.from("shopping_cart").insert([
          {
            user_id: userID,
            stock_id: newCart[i],
          },
        ]);
      }
      // Reduxカートの中身を空にする
      dispatch(clear());
    }
  };

  const onSubmit = async () => {
    const values = getValues();
    try {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("email", `${values.email}`)
        .eq("password", `${values.password}`);

      //入力されたユーザ情報が存在しない場合
      if (!data || data?.length === 0) {
        setErrorFlag(true);

        //入力されたユーザ情報が存在する場合
      } else {
        // cookieを持たせる
        setCookie("userID", data[0].id);

        // ReduxカートをSupabaseカートに移動
        handleCombine(selector, data[0].id);

        // トップページに移動
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LogInError = (): JSX.Element | null => {
    return (
      <>
        {errorFlag && (
          <Typography
            component="p"
            color="red"
            textAlign="center"
            sx={{ mt: 1, mb: 2 }}
          >
            該当の会員情報が存在しません
          </Typography>
        )}
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <List
        sx={{
          marginTop: 8,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          会員情報を入力してください
        </Typography>
      </List>
      <Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="メールアドレス*必須"
              id="mail"
              placeholder="sample@example.co.jp"
              {...register("email", {
                required: "必須項目です。",
                pattern: {
                  value:
                    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "メールアドレスを正しく入力してください",
                },
              })}
            />
            {errors.email?.message && (
              <Typography width="inherit" sx={{ color: "red" }}>
                {errors.email.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="パスワード*必須"
              type="password"
              id="password"
              {...register("password", {
                required: "必須項目です。",
              })}
            />
            {errors.password?.message && (
              <Typography width="inherit" sx={{ color: "red" }}>
                {errors.password.message as string}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            サインイン
          </Button>
          <LogInError />
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"新規会員登録はこちら"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
