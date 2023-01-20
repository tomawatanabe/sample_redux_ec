import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase-client";

const Item = () => {
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
      <Typography variant="body1" color="text.first">
        {detail[0]?.items.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        年代:{detail[0]?.items.year}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        色:{detail[0]?.items.color}
      </Typography>
      <img src="" alt="商品イメージ" />
      <Typography variant="body1" color="text.first">
        商品説明
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {detail[0]?.items.description}
      </Typography>
    </>
  );
};

export default Item;
