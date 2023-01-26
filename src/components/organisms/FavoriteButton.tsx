import { FavoriteBorder } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase-client";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavoriteButton = (): JSX.Element => {
  const navigate = useNavigate();
  const [fav, setFav] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const params = useParams();

  const getFavorite = async () => {
    const { data, error } = await supabase
      .from("favorite_items")
      .select()
      .eq("user_id", cookies.userID)
      .eq("stock_id", params.id);

    if (!data) {
    } else if (data.length) {
      setFav(true);
    }
  };

  const addFavorite = async () => {
    const { data, error } = await supabase.from("favorite_items").insert([
      {
        user_id: Number(cookies.userID),
        stock_id: Number(params.id),
      },
    ]);
    setFav(true);
  };

  const removeFavorite = async () => {
    const { data, error } = await supabase
      .from("favorite_items")
      .delete()
      .eq("user_id", cookies.userID)
      .eq("stock_id", params.id);

    setFav(false);
  };

  useEffect(() => {
    void getFavorite();
  }, []);

  if (cookies.userID === undefined) {
    return (
      <>
        <Button
          variant="outlined"
          aria-label="Add to favorites"
          startIcon={<FavoriteBorder />}
          onClick={() => navigate("/signin")}
        >
          お気に入り ※サインインが必要です
        </Button>
      </>
    );
  }

  return (
    <>
      {fav ? (
        <Button
          variant="outlined"
          onClick={removeFavorite}
          aria-label="remove from favorite"
          startIcon={<FavoriteIcon />}
        >
          お気に入りから削除
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={addFavorite}
          aria-label="Add to favorites"
          startIcon={<FavoriteBorder />}
        >
          お気に入りに追加
        </Button>
      )}
    </>
  );
};

export default FavoriteButton;
