import { Button } from "@mui/material";
import { supabase } from "../../lib/supabase-client";
import CheckIcon from "@mui/icons-material/Check";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const PurchaseCompleteButton = ({
  userID,
  total,
  stockIDArr,
}: {
  userID: number;
  total: number;
  stockIDArr: number[];
}): JSX.Element => {
  const navigate = useNavigate();

  // 購入手続きをDBにpostする
  const postOrder = async () => {
    const { data, error } = await supabase.from("orders").insert({
      note: null,
      payment_method: "credit",
      user_id: userID,
      ship_status: "未発送",
      total_price: total,
    });
  };

  //追加したorderのIDを取得してorderItemsにPOSTする
  const postOrdeItems = async () => {
    const { data: getData, error: getError } = await supabase
      .from("orders")
      .select()
      .eq("user_id", userID)
      .order("id", { ascending: false })
      .limit(1)
      .single();

    for (const i of stockIDArr) {
      const { data, error } = await supabase.from("order_items").insert({
        order_id: getData?.id,
        stock_id: i,
        user_id: userID,
      });
    }
  };

  // カートの中身を削除する
  const clearCart = async () => {
    const { data, error } = await supabase
      .from("shopping_cart")
      .delete()
      .eq("user_id", userID);
  };

  const handleClick = () => {
    postOrder().then(() => postOrdeItems());
    clearCart();
    navigate("/cart/settlement/close");
  };

  return (
    <>
      <Button onClick={handleClick} variant="contained">
        <CheckIcon />
        注文を確定
      </Button>
    </>
  );
};

export default PurchaseCompleteButton;
