import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinInfo from "../pages/CoinInfo";

interface IRouterProps {}
function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
