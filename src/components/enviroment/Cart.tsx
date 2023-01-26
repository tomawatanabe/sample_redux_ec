import { useCookies } from "react-cookie";
import GuestCart from "../ecosystem/GuestCart";
import MembersCart from "../ecosystem/MembersCart";

const Cart = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  console.log(cookies.userID);
  return <>{cookies.userID ? <MembersCart /> : <GuestCart />}</>;
};

export default Cart;
