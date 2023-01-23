import type { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export default Providers;
