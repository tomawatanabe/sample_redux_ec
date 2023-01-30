import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  List,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { supabase } from "../../lib/supabase-client";
import { AccountCircle } from "@mui/icons-material";
import { Box } from "@mui/system";

const UserProfile = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    shouldUnregister: false,
  });

  useEffect(() => {
    const getUserProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", cookie.userID)
        .limit(1)
        .single();

      if (data) {
        //デフォルト値としてセット
        setValue("lastName", data?.last_name as string);
        setValue("firstName", data?.first_name as string);
        setValue("kanaLastName", data?.kana_last_name as string);
        setValue("kanaFirstName", data?.kana_first_name as string);
        setValue("phone", data?.phone as number);
        setValue("email", data?.email as string);
        setValue("zipCode", data?.zip_code as number);
        setValue("prefecture", data?.prefecture as string);
        setValue("city", data?.city as string);
        setValue("address", data?.address as string);
        setValue("building", data?.building as string);
        setValue("password", data?.password as string);

        //setterを呼び出して再レンダリングをかける
        setLoading(false);
      }
    };
    getUserProfile();
  }, [loading]);

  //郵便番号APIから住所を取得する関数
  const citySuggest = async () => {
    const values = getValues();
    const res = await fetch(
      `https://api.zipaddress.net/?zipcode=${values.zipCode}`,
      {
        mode: "cors",
      }
    );

    const result = await res.json();

    //郵便番号が存在しない場合アラートを返す
    if (result.code === 404 || result.code === 400) {
      alert("存在しない郵便番号です");
      return;
    }
    setValue("prefecture", result.data.pref);
    setValue("city", result.data.address);
  };

  const mailExistanceCheck = async (email: string) => {
    const { error, count } = await supabase
      .from("users")
      .select("*", { count: "exact" })
      .eq("email", email);

    if (count) {
      console.log(email, count);
      return true;
    } else {
      console.log(email, count);
      return false;
    }
  };

  const onSubmit = async () => {
    const values = getValues();

    const { data: patchData, error: patchError } = await supabase
      .from("users")
      .update({
        last_name: values.lastName,
        first_name: values.firstName,
        kana_last_name: values.kanaLastName,
        kana_first_name: values.kanaFirstName,
        phone: values.phone,
        email: values.email,
        zip_code: values.zipCode,
        prefecture: values.prefecture,
        city: values.city,
        address: values.address,
        building: values.building,
        password: values.password,
      })
      .eq("id", cookie.userID);

    if (patchError) {
      console.log("patchError", patchError);
    }

    alert("会員情報が更新されました");
  };

  if (loading)
    return (
      <Box>
        <CssBaseline />
        loading...
      </Box>
    );

  return (
    <>
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
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            会員情報
          </Typography>
        </List>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Grid container>
            <Grid item sx={{ mr: 1 }}>
              <TextField
                label="姓（必須）"
                id="firstName"
                placeholder="太郎"
                {...register("lastName", {
                  required: "必須項目です。",
                })}
              />
            </Grid>
            <Grid item>
              <TextField
                label="名（必須）"
                id="lastName"
                placeholder="太郎"
                {...register("firstName", {
                  required: "必須項目です。",
                })}
              />
            </Grid>
          </Grid>

          {(errors.firstName?.message && (
            <Typography sx={{ color: "red" }}>
              {errors.firstName?.message as string}
            </Typography>
          )) ||
            (errors.lastName?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.lastName?.message as string}
              </Typography>
            ))}

          <Grid container>
            <Grid item sx={{ mr: 1 }}>
              <TextField
                margin="normal"
                label="姓（カナ）*必須"
                id="kanaLastName"
                {...register("kanaLastName", {
                  required: "必須項目です。",
                })}
                placeholder="シンジュク"
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                label="名（カナ）*必須"
                id="kanaFirstName"
                placeholder="タロウ"
                {...register("kanaFirstName", {
                  required: "必須項目です。",
                })}
              />
            </Grid>
          </Grid>
          {(errors.kanaLastName?.message && (
            <Typography sx={{ color: "red" }}>
              {errors.kanaLastName?.message as string}
            </Typography>
          )) ||
            (errors.kanaFirstName?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.kanaFirstName?.message as string}
              </Typography>
            ))}
          <Box>
            <Box>
              <TextField
                margin="normal"
                fullWidth
                label="電話番号(ハイフンなし)*必須"
                id="phone"
                placeholder="0312345678"
                {...register("phone", {
                  required: "必須項目です。",
                  pattern: {
                    value: /^0\d{9,10}$/,
                    message: "電話番号を正しく入力してください",
                  },
                })}
              />
              {errors.phone?.message && (
                <Typography sx={{ color: "red" }}>
                  {errors.phone?.message as string}
                </Typography>
              )}
            </Box>
          </Box>
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
                validate: {
                  message: async (value) =>
                    (await mailExistanceCheck(value))
                      ? "このメールアドレスは既に登録済みです。"
                      : "hoge",
                },
              })}
            />
            {errors.email?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.email.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <Grid container>
              <Grid item sx={{ mr: 1 }}>
                <TextField
                  margin="normal"
                  label="郵便番号*必須"
                  type="text"
                  placeholder="1600022"
                  {...register("zipCode", {
                    required: "必須項目です。",
                    pattern: {
                      value: /^\d{3}?\d{4}$/,
                      message: "郵便番号を正しく入力してください。",
                    },
                  })}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ mt: 2.5 }}
                  onClick={citySuggest}
                >
                  住所を自動入力
                </Button>
              </Grid>
            </Grid>
            {errors.zipCode?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.zipCode.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              label="都道府県*必須"
              type="text"
              placeholder="東京都"
              id="prefecture"
              {...register("prefecture", { required: "必須項目です。" })}
            />
            {errors.prefecture?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.prefecture.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label=" 市区町村*必須"
              type="text"
              placeholder="新宿区新宿"
              id="city"
              {...register("city", { required: "必須項目です。" })}
            />
            {errors.city?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.city.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="番地*必須"
              type="text"
              placeholder="4-3-25"
              id="address"
              {...register("address", { required: "必須項目です。" })}
            />
            {errors.address?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.address.message as string}
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              margin="normal"
              fullWidth
              label="建物名*任意"
              type="text"
              placeholder="TOKYU REIT新宿ビル8F"
              id="building"
              {...register("building")}
            />
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
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
                maxLength: {
                  value: 24,
                  message: "パスワードは24文字以下で入力してください",
                },
                pattern: {
                  value: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-z0-9]{8,}$/,
                  message:
                    "パスワードは大文字、小文字、数字を少なくとも１つ入力してください",
                },
              })}
            />
            {errors.password?.message && (
              <Typography sx={{ color: "red" }}>
                {errors.password.message as string}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: 2 }} textAlign="center">
            <Button type="submit" variant="contained">
              変更を保存する
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
