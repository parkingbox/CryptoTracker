import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinInfo from "../Components/CoinInfo";
import { Home } from "../Components/Home";
import { Nav } from "../Components/Nav";

interface IRouterProps {}
function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:coinId/*" element={<CoinInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
