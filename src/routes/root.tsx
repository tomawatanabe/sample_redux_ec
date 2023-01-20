import { useEffect } from "react";
import type { FC } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/enviroment/Home";
import Item from "../components/enviroment/Item";

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
      <Route path="items">
        <Route path=":id" element={<Item />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default IndexRoutes;
