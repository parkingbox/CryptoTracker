import { Route, Routes, BrowserRouter } from "react-router-dom";
import Chart from "../Components/Chart";
import CoinInfo from "../Pages/CoinInfo";
import { Home } from "../Pages/Home";
import { Header } from "./Header";

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/:coinId/*" element={<CoinInfo />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
