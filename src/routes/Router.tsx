import { Route, Routes, HashRouter } from "react-router-dom";
import Chart from "../Components/Chart";
import CoinInfo from "../Pages/CoinInfo";
import { Home } from "../Pages/Home";
import { Header } from "./Header";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:coinId/*" element={<CoinInfo />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
