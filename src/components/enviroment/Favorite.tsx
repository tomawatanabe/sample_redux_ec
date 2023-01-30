import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { supabase } from "../../lib/supabase-client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  Container,
  CssBaseline,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link as RouterLink } from "react-router-dom";

const Favorite = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      const { data } = await supabase
        .from("favorite_items")
        .select(
          "id,user_id,stocks(id,item_id,image1,size,price,condition,items(name))"
        )
        .eq("user_id", cookies.userID);

      if (data) {
        setFavorites(data);
      }
    };
    void getFavorites();
    console.log("useEffefct");
  }, [loading]);

  return (
    <Container component="main">
      <Box>
        <CssBaseline />{" "}
        <List>
          <Typography component="h1" variant="h5">
            お気に入り
          </Typography>
          {favorites.map((fav) => {
            return (
              <ListItem
                key={fav.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete"></IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={fav.stocks?.image1}
                    variant="square"
                    sx={{ height: "auto" }}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={fav.stocks.items?.name}
                  secondary={`¥${fav.stocks.price.toLocaleString()}`}
                />
                <Button
                  component={RouterLink}
                  to={`/items/${fav.stocks.id}`}
                  target="_blank"
                  sx={{ mr: 5 }}
                  variant="outlined"
                  aria-label="jump to ItemDetail"
                  startIcon={<LaunchIcon />}
                >
                  詳細
                </Button>
                <Button
                  variant="outlined"
                  aria-label="remove from favorite"
                  startIcon={<FavoriteIcon />}
                  onClick={async () => {
                    const { data } = await supabase
                      .from("favorite_items")
                      .delete()
                      .eq("id", fav?.id);
                    setLoading(!loading);
                  }}
                >
                  お気に入りから削除
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
};

export default Favorite;
