import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import Coin from "./Coin"
import Coins from "./Coins"
import Chart from "./Chart"
import Price from "./Price"

interface IRouterProps {
  
}

function Router({}: IRouterProps) {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Coins />}></Route>
        <Route path="/:coinId" element = {<Coin />}>
          <Route path="chart" element = {<Chart />}/>
          <Route path="price" element = {<Price />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;