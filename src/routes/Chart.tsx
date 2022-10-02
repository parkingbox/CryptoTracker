import { useQuery } from "@tanstack/react-query";
import {Outlet, useParams} from "react-router-dom";
import { fetchCoinHistory } from "./api";
import ReactApexChart from "react-apexcharts";
import {useRecoilValue } from "recoil";
import { isDarkAtom } from '../atoms';

interface ChartProps {
  coinId ?: string;
  
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}


function Chart({ coinId } : ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], () =>
    fetchCoinHistory(coinId!),
      {
        refetchInterval: 10000,
      }
  )
  return (
    <>
      <div>
        {isLoading ? (
          "Loading chart..."
        ) : (

        <ReactApexChart
          type="candlestick"
          series={
            [
              {
                // 오픈, 하이, 로우, 클로즈
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      price.open.toFixed(3),
                      price.high.toFixed(3),
                      price.low.toFixed(3),
                      price.close.toFixed(3),
                    ],
                  };
                }),
              },
            ] as unknown as number[]
          }
          options={{
            theme:{
              mode: isDark ? "dark" : "light"
            },
            chart: {
              height:300,
              width:500,
              toolbar: {
                show: false
              },
              background: "transparent"
            },
            grid: {
              show: false
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: {
              show: false
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels:{ show: false },
              type: "datetime",
              /**
               *  new Date를 연산시 오류 발생
               *  Typescript에서는 명시적으로 연산이 가능한 숫자와 같이 처리함
               * -> 단항 연산자(+) 사용
              */
              categories: data ? data?.map(price => new Date(+price.time_close * 1000)) : [],
            },
            fill: 
              {
                type : "gradient",
                gradient : { gradientToColors: ["#0be881"],stops: [0, 100] },
              },
            colors: ["#3c40c6"],
            tooltip: {
                  y: { formatter: (value) => `$ ${value.toFixed(2)}` },
            }
          }}
        />
      )}
    </div>
    </>
  )
}

export default Chart;