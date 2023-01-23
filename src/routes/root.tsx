import { useEffect } from "react";
import type { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/enviroment/Home";
import ItemDetail from "../components/enviroment/ItemDetail";
import SignIn from "../components/enviroment/SignIn";

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
      <Route path="items">
        <Route path=":id" element={<ItemDetail />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoutes;
