import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase-client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const MemberCartButton = (): JSX.Element => {
  const [cart, setCart] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const params = useParams();

  const getCart = async () => {
    const { data, error } = await supabase
      .from("shopping_cart")
      .select()
      .eq("user_id", cookies.userID)
      .eq("stock_id", params.id);

    if (!data) {
    } else if (data.length) {
      setCart(true);
    }
  };

  const addCart = async () => {
    const { data, error } = await supabase.from("shopping_cart").insert([
      {
        user_id: Number(cookies.userID),
        stock_id: Number(params.id),
      },
    ]);
    setCart(true);
  };

  const removeCart = async () => {
    const { data, error } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", cookies.userID)
      .eq("stock_id", params.id);

    setCart(false);
  };

  useEffect(() => {
    void getCart();
  }, []);

  return (
    <>
      {cart ? (
        <Button
          variant="outlined"
          onClick={removeCart}
          aria-label="remove from Cart"
          startIcon={<RemoveShoppingCartIcon />}
        >
          カートから削除
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={addCart}
          aria-label="Add to Cart"
          startIcon={<AddShoppingCartIcon />}
        >
          カートに追加
        </Button>
      )}
    </>
  );
};

export default MemberCartButton;
