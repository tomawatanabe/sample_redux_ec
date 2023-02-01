import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const SettlementClose = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 8 * 1000);
  }, []);

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={3}>
          <Box textAlign="center">
            <Typography>購入手続きが完了しました！</Typography>
            <Typography>またのご利用お待ちしております。</Typography>
            <br />
            <Typography>自動でトップページへ戻ります</Typography>
            <Typography>
              戻らない場合は下部のボタンをクリックしてください
            </Typography>
            <br />
            <Button variant="outlined" component={RouterLink} to="/">
              トップページに戻る
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SettlementClose;
