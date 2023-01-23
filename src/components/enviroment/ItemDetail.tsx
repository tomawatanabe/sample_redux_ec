import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase-client";

const ItemDetail = () => {
  const params = useParams();
  const [detail, setDetail] = useState<any[]>([]);

  const getStocksDetail = async () => {
    const { data: res, error } = await supabase
      .from("stocks")
      .select(
        `id,price,amount,condition,size,image1,items(name,year,color,description)`
      )
      .eq("id", `${params.id}`);

    if (error) {
      console.log(error);
    }

    if (!res) return;

    console.log(res);
    const data = await res;
    setDetail(data);
  };

  useEffect(() => {
    getStocksDetail();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "auto",
          height: 400,
          display: "flex",
          flexDirection: "row",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: 400,
            padding: 5,
          }}
        >
          <Typography variant="body1" color="text.first">
            {detail[0]?.items.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            年代:{detail[0]?.items.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            色:{detail[0]?.items.color}
          </Typography>
          <img src={`${detail[0]?.image1}`} alt="商品イメージ" />
          <Typography variant="body1">商品説明</Typography>
          <Typography variant="body2">
            {detail[0]?.items.description}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "30%",
            height: 400,
            padding: 5,
          }}
        >
          <List>
            <ListItem>
              <ListItemText>
                ¥{detail[0]?.price.toLocaleString()}（税込）
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>サイズ{detail[0]?.size}cm</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>在庫数{detail[0]?.amount}</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>コンディション{detail[0]?.condition}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default ItemDetail;
