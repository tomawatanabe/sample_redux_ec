import { useCookies } from "react-cookie";
import GuestCart from "../ecosystem/GuestCart";
import MembersCart from "../ecosystem/MembersCart";

const ContactForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return <>{cookies.userID ? <MembersCart /> : <GuestCart />}</>;
};

export default ContactForm;
