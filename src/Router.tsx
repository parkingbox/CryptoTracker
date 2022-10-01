import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"
import Chart from "./routes/Chart"
import Price from "./routes/Price"

interface IRouterProps {
  toggleDark : () => void;
  isDark:boolean;
}

function Router({toggleDark, isDark}: IRouterProps) {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Coins toggleDark={toggleDark}/>}></Route>
        <Route path="/:coinId" element = {<Coin isDark={isDark}/>}>
          <Route path="chart" element = {<Chart />}/>
          <Route path="price" element = {<Price />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;