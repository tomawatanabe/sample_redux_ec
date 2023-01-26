import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Link,
  List,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { supabase } from "../../lib/supabase-client";
import { AccountCircle } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const UserProfile = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    const getUserProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", cookie.userID)
        .limit(1)
        .single();
      setProfile(data);
    };
    getUserProfile();
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            会員情報
          </Typography>
        </Box>
        <List>
          <Box>
            <label htmlFor="lastName">
              <span className="label-fit label-danger">必須</span>氏名（姓）
            </label>
            {profile?.last_name}
          </Box>
          <Box>
            <label htmlFor="lastName">
              <span className="label-fit label-danger">必須</span>氏名（名）
            </label>
            {profile?.first_name}
          </Box>
          <Box>
            <label htmlFor="kanaLastName">
              <span className="label-fit label-danger">必須</span>氏名（カナ姓）
            </label>
            {profile?.kana_last_name}
          </Box>
          <Box>
            <label htmlFor="kanaLastName">
              <span className="label-fit label-danger">必須</span>氏名（カナ名）
            </label>
            {profile?.kana_first_name}
          </Box>
          <Box>
            <Box>
              <label htmlFor="phoneNumber">
                <span className="label-fit label-danger">必須</span>電話番号
              </label>
              {profile?.phone}
            </Box>
          </Box>
          <Box>
            <label htmlFor="mail">
              <span className="label-fit label-danger">必須</span>メールアドレス
            </label>
            {profile?.email}
          </Box>
          <Box>
            <label htmlFor="postCode">
              <span className="label-fit label-danger">必須</span>郵便番号
            </label>
            {profile?.zip_code}
          </Box>
          <Box>
            <label htmlFor="prefecture">
              <span className="label-fit label-danger">必須</span>都道府県
            </label>
            {profile?.prefecture}
          </Box>
          <Box>
            <label htmlFor="city">
              <span className="label-fit label-danger">必須</span>市区町村
            </label>
            {profile?.city}
          </Box>

          <Box>
            <label htmlFor="address">
              <span className="label-fit label-danger">必須</span>番地
            </label>
            {profile?.address}
          </Box>
          <Box>
            <label htmlFor="building">
              <span className="label-fit label-warning">任意</span>建物名
            </label>
            {profile?.building}
          </Box>
          <Box>
            <label htmlFor="password">
              <span className="label-fit label-danger">必須</span>パスワード
            </label>
            {profile?.password}
          </Box>
          <RouterLink to="/userprofile/edit">会員情報を編集する</RouterLink>
        </List>
      </Container>
    </>
  );
};

export default UserProfile;
