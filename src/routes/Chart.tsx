import { useQuery } from "@tanstack/react-query";
import {Outlet, useParams} from "react-router-dom"
import { fetchCoinHistory } from "./api";

interface ChartProps {
  coinId ?: string;
}

function Chart({ coinId } : ChartProps) {
  const {isLoading, data} = useQuery(["ohlcv",coinId], ()=> fetchCoinHistory(coinId!))
  return (
    <>
      <h1>Chart</h1>
      <Outlet />
    </>
  )
}

export default Chart;

