import type { FC, PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <Router>{children}</Router>
);

export default Providers;
