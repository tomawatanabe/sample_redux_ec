import type { FC } from "react";
import Header from "./components/ecosystem/Header";
import Providers from "./Providers";
import IndexRoutes from "./routes/root";

const App: FC = () => (
  <Providers>
    <Header />
    <IndexRoutes />
  </Providers>
);

export default App;
