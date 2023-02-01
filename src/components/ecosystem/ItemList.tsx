import { FC, useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { supabase } from "../../lib/supabase-client";
import { Box } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types/rootState.type";

const ItemList = () => {
  const [stocks, setStocks] = useState<any[]>([]); // 現在のページ
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const [pageCount, setPageCount] = useState(); // ページ数
  const [total, setTotal] = useState(1); // stocksの合計
  const limit = 15; // 1ページあたりの商品数

  // storeから検索ワードを取得
  const searchWord = useSelector((state: RootState) => state.search.searchWord);

  // 1ページ分の商品を取得
  // const { data: stocks, error } = useSWR(
  //   ["stocks", currentPage, limit],
  //   fetcher
  // );

  // ページング番号を表示するため、最初にsupabaseのstocksを全て持ってくる
  useEffect(() => {
    const getAllStocks = async () => {
      const { data: allStocks } = await supabase
        .from("stocks")
        .select("id,price,size,image1,items(name)")
        .order("id");

      if (allStocks) {
        const result = allStocks.filter((stock: any) =>
          stock.items?.name.toLowerCase().includes(searchWord.toLowerCase())
        );
        setStocks(result);
        setTotal(result?.length);
      }
    };
    void getAllStocks();
  }, [searchWord]);

  return (
    <>
      <Box sx={{ padding: 5 }}>
        <CssBaseline />
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <>
            {stocks.map((stock: any) => {
              return (
                <Grid item xs={12} sm={4} md={3} lg={2.4} key={stock.id}>
                  <Card sx={{ height: 350 }}>
                    <CardActionArea
                      component={RouterLink}
                      to={`/items/${stock.id}`}
                    >
                      <Box sx={{ height: 240 }}>
                        <CardMedia
                          component="img"
                          src={`${stock.image1}`}
                          // alt={`${imageUrl}`}
                          height="auto"
                          width="100%"
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="body1" color="text.first">
                          {stock.items?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ¥{stock.price?.toLocaleString()}
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
          </>
        </Grid>
      </Box>
      {/* 
      <Box>
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
      </Box> */}
    </>
  );
};

export default ItemList;
