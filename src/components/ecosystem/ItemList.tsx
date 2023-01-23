import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
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
        .select("id,price,size,items(name)")
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
      <div>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={`https://zavwqhknlvhnxnjncevv.supabase.co/storage/v1/object/public/profiles/sneaker_ec/images/shoes/02_AIR%20FOAMPOSITE%20ONE%20NRG/AIR%20FOAMPOSITE%20ONE%20NRG1.jpg`}
              alt="item"
            />
          </ListItemAvatar>
          <div>
            <ListItemText>sample</ListItemText>
            <ListItemText>¥10,000</ListItemText>
            <ListItemText>size:27</ListItemText>
          </div>
        </ListItem>
      </div>
      <List>
        {stocks.map((stock: any) => {
          const localedPrice = stock.price?.toLocaleString();

          return (
            <div key={stock.id}>
              <ListItem>
                <ListItemAvatar>
                  {/* <Avatar src={`/${stock.image1}`} alt="item" /> */}
                </ListItemAvatar>
                <div>
                  <ListItemText>{stock.items?.name}</ListItemText>
                  <ListItemText>¥{localedPrice}</ListItemText>
                  <ListItemText>size:{stock.size}cm</ListItemText>
                </div>
              </ListItem>
            </div>
          );
        })}
      </List>
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
