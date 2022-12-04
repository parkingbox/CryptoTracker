import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { bithumbCandlestick } from "../api";
import { isDarkAtom } from "../atoms";
import { Price } from "./Price";
import { useState } from "react";

export const Wrapper = styled.div`
  padding: 1rem 2rem 0;
  background-color: ${(props) => props.theme.color.bg.lv2};
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Chart = () => {
  const { coinId } = useParams();
  const { data } = useQuery<any>(["candlestick", coinId], () =>
    bithumbCandlestick(`${coinId}`)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <Price />
      <Wrapper>
        <>
          <ApexChart
            width="760px"
            type="area"
            series={[
              {
                name: "거래량",
                data:
                  data?.data.slice(-50).map((candle: any) => {
                    return [candle[0], candle[5]];
                  }) ?? [],
              },
            ]}
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { autoScaleYaxis: true },
                background: "transparent",
              },
              dataLabels: { enabled: false },
              stroke: { curve: "smooth" },
              xaxis: { type: "datetime" },
              yaxis: {
                opposite: true,
                labels: {
                  formatter: function (val, index) {
                    return val.toFixed(2);
                  },
                },
              },
            }}
          ></ApexChart>
        </>
      </Wrapper>
    </>
  );
};

export default Chart;
