import { CssBaseline, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";

const EmptyCart = () => {
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
            <SentimentNeutralIcon fontSize="large" />
            <Typography>カートに商品がありません...</Typography>
            <Typography>商品を追加してみましょう！</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EmptyCart;
