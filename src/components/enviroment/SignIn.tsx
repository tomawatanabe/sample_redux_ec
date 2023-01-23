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
import { signIn } from "../redux/userSlice";
import { supabase } from "../../lib/supabase-client";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [errorFlag, setErrorFlag] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await supabase
        .from("users")
        .select()
        .eq("email", `${formData.email}`)
        .eq("password", `${formData.password}`);

      //入力されたユーザ情報が存在しない場合
      if (!data || data?.length === 0) {
        setErrorFlag(true);
      } else {
        // cookieを持たせる処理
        setCookie("userID", data[0].id);
        console.log("data", data);
        // storeにユーザ情報を持たせる処理(検討中)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
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
            <Grid item xs>
              <Link href="#" variant="body2">
                パスワードを忘れた場合
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"新規会員登録はこちら"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
