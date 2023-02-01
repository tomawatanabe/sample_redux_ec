import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useSelector } from "react-redux";
import { RootState } from "../redux/types/rootState.type";
import { useDispatch } from "react-redux";
import { add, remove } from "../redux/cartSlice";

const GuestCartButton = (): JSX.Element => {
  const params = useParams();
  const dispatch = useDispatch();
  const selector: Array<number> | [] = useSelector(
    (state: RootState) => state.cart.guestCart
  );

  const addCart = () => {
    dispatch(add(Number(params.id)));
  };

  const removeCart = () => {
    dispatch(remove(Number(params.id)));
  };

  return (
    <>
      {selector.includes(Number(params.id)) ? (
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

export default GuestCartButton;
