import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { bithumbCoinInfo } from "../api";

const Loading = styled.span`
  font-size: 32px;
  text-align: center;
  display: block;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  min-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) => props.theme.color.bg.lv2};
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 86px);
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const Title = styled.h2`
  font-size: 20px;
`;

const NowPrice = styled.div`
  font-size: 1.4rem;
  span + span {
    margin-right: 7px;
  }
  span:nth-of-type(1) {
    display: block;
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  span:nth-of-type(2) {
    color: #9c9c9c;
    font-size: 1.4rem;
  }
  span:nth-of-type(3) {
  }
  &.low {
    color: ${(props) => props.theme.color.accent.low};
  }
  &.high {
    color: ${(props) => props.theme.color.accent.high};
  }
`;

export const PriceView = styled.div``;

export const PriceCategory = styled.div`
  display: flex;
  gap: 3rem;
`;

export const PriceValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  span:last-child {
    font-size: 1.4rem;
    &.low {
      color: ${(props) => props.theme.color.accent.low};
    }
    &.high {
      color: ${(props) => props.theme.color.accent.high};
    }
  }
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  margin: 0 8px 3px 0;
  vertical-align: middle;
`;

interface ICoins {
  data: {
    [key: string]: {
      opening_price: number;
      closing_price: number;
      min_price: number;
      max_price: number;
      units_traded: number;
      acc_trade_value: number;
      prev_closing_price: number;
      units_traded_24H: number;
      acc_trade_value_24H: number;
      fluctate_24H: number;
      fluctate_rate_24H: number;
      date: string;
    };
  };
}

export const Price = () => {
  const { coinId } = useParams();

  // ?????? ??????
  const { isLoading, data } = useQuery<ICoins>(
    ["CoinPrice", coinId],
    () => bithumbCoinInfo(`${coinId}`),
    { refetchInterval: 1000 }
  );
  let refValue =
    (Number(data?.data.closing_price) - Number(data?.data.prev_closing_price)) /
    Number(data?.data.prev_closing_price);

  let fluctateRefValue = Number(data?.data.fluctate_24H);
  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Wrapper>
          <NowPrice className={refValue > 0 ? "high" : "low"}>
            <Title>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coinId?.toLowerCase()}`}
              />
              {coinId}/KWR
            </Title>
            <span>
              {Number(data?.data.closing_price).toLocaleString("KR-ko")}
            </span>
            <span>????????????</span>
            <span>
              {(
                ((Number(data?.data.closing_price) -
                  Number(data?.data.prev_closing_price)) /
                  Number(data?.data.prev_closing_price)) *
                100
              ).toFixed(2)}
              %
            </span>
            <span>
              {refValue > 0 ? "??? " : "??? "}
              {Math.abs(
                Number(data?.data.prev_closing_price) -
                  Number(data?.data.closing_price)
              ).toLocaleString("KR-ko")}
            </span>
          </NowPrice>
          <PriceView>
            <PriceCategory>
              <PriceValue>
                <span>?????????(24h)</span>
                <span className={fluctateRefValue > 0 ? "high" : "low"}>
                  {Number(data?.data.fluctate_rate_24H).toLocaleString("KR-ko")}
                  %
                </span>
              </PriceValue>
              <PriceValue>
                <span>?????????(24h)</span>
                <span className={fluctateRefValue > 0 ? "high" : "low"}>
                  {Number(data?.data.fluctate_24H).toLocaleString("KR-ko")}
                </span>
              </PriceValue>
              <PriceValue>
                <span>??????(24h)</span>
                <span className="low">
                  {Number(data?.data.min_price).toLocaleString("KR-ko")}
                </span>
              </PriceValue>
              <PriceValue>
                <span>??????(24h)</span>
                <span className="high">
                  {Number(data?.data.max_price).toLocaleString("KR-ko")}
                </span>
              </PriceValue>
              <PriceValue>
                <span>?????????(24h)</span>
                <span>
                  {Number(data?.data.units_traded_24H).toLocaleString("KR-ko")}
                </span>
              </PriceValue>
            </PriceCategory>
          </PriceView>
        </Wrapper>
      )}
    </>
  );
};
