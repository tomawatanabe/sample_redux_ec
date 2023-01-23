import { FC, useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { supabase } from "../../lib/supabase-client";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";

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
      <Box sx={{ padding: 5 }}>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          {stocks.map((stock: any) => {
            const localedPrice = stock.price?.toLocaleString();

            return (
              <Grid item xs={12} sm={4} md={3} lg={2.4}>
                <Card sx={{ height: 350 }}>
                  <CardActionArea
                    component={RouterLink}
                    to={`/items/${stock.id}`}
                  >
                    {/* onClickで詳細に移動するdispatchを実装する */}
                    <Box sx={{ height: 240 }}>
                      <CardMedia
                        component="img"
                        src={`${stock.image1}`}
                        alt={`${stock.image1}`}
                        height="auto"
                        width="100%"
                      />
                    </Box>
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
      </Box>

      <div>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          mt={6}
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
