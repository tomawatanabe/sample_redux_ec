import { useEffect } from "react";
import type { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/enviroment/Home";
import ItemDetail from "../components/enviroment/ItemDetail";
import SignIn from "../components/enviroment/SignIn";
import Favorite from "../components/enviroment/Favorite";
import SignUp from "../components/enviroment/SignUp";
import UserProfile from "../components/enviroment/UserProfile";
import Cart from "../components/enviroment/Cart";
import Settlement from "../components/enviroment/Settlement";
import SettlementClose from "../components/enviroment/SettlementClose";

const IndexRoutes: FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="userprofile" element={<UserProfile />} />
      <Route path="items">
        <Route path=":id" element={<ItemDetail />} />
      </Route>
      <Route path="favorite" element={<Favorite />} />
      <Route path="cart" element={<Cart />} />
      <Route path="cart/settlement" element={<Settlement />} />
      <Route path="cart/settlement/close" element={<SettlementClose />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoutes;
