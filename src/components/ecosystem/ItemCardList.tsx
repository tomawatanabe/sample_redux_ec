import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography,
} from "@mui/material";
import { supabase } from "../../lib/supabase-client";
import { Box } from "@mui/system";

// type itemList = {
//   id: number | null;
//   price: number | null;
//   size: number | null;
//   items:
//     | {
//         name: string | null;
//       }
//     | Array<{
//         name: string | null;
//       }>
//     | null;
// };

const ItemList: FC = () => {
  const [stocks, setStocks] = useState<any[]>([]); // 現在のページ
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const [pageCount, setPageCount] = useState(); // ページ数
  const [total, setTotal] = useState(1); // stocksの合計
  const limit = 15; // 1ページあたりの商品数

  // 1ページ分の商品を取得
  // const { data: stocks, error } = useSWR(
  //   ["stocks", currentPage, limit],
  //   fetcher
  // );

  // ページング番号を表示するため、最初にsupabaseのstocksを全て持ってくる
  useEffect(() => {
    const getStocksLength = async () => {
      const { data } = await supabase
        .from("stocks")
        .select("id,price,size,image1,items(name)")
        .order("id");

      console.log("nagasa", data?.length);
      console.log("data", data);

      if (data) {
        setStocks(data);
        setTotal(data?.length);
      }
    };
    void getStocksLength();
  }, []);

  // if (error) return <div>failed to load</div>;
  // if (!stocks) return <div>loading...</div>;

  return (
    <>
      <Grid
        container
        spacing={6}
        mt={0}
        ml={0}
        justifyContent="center"
        alignItems="center"
      >
        {stocks.map((stock: any) => {
          const localedPrice = stock.price?.toLocaleString();

          return (
            <Grid item xs={12} sm={4} md={3}>
              <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                  {/* onClickで詳細に移動するdispatchを実装する */}
                  <CardMedia
                    component="img"
                    src={`${stock.image1}`}
                    alt={`${stock.image1}`}
                    height="150"
                  />
                  <CardContent>
                    <Typography variant="body1" color="text.first">
                      {stock.items?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ¥{localedPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      size:{stock.size}cm
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Pagination
              count={total}
              color="primary"
              onChange={(e, page) => {
                setCurrentPage(page);
              }}
              page={currentPage}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ItemList;
