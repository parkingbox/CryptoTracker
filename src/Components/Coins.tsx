import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";
import { bithumbCoins } from "../api";

export const Container = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  max-width: 1200px;
  margin: 0 auto 10vh;
  @media screen and (max-width: 1250px) {
    margin: 0 20px 10vh;
  }
`;

export const CoinItems = styled.ul`
  overflow-y: auto;
  background-color: ${(props) => props.theme.color.bg.lv2};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  height: 650px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e2e2;
  }
`;

export const LabelLi = styled.li`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  color: ${(props) => props.theme.color.text.lv1};
  font-size: 1.4rem;
  background-color: ${(props) => props.theme.color.bg.lv2};
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid ${(props) => props.theme.color.grey};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  span {
    min-width: 65px;
  }
  @media screen and (max-width: 768px) {
    span:nth-child(6) {
      display: none;
    }
  }
  @media screen and (max-width: 375px) {
    span:not(:first-child) {
      text-align: right;
    }
    span:nth-child(3) {
      display: none;
    }
  }
`;

export const Img = styled.img`
  width: 12px;
  height: 12px;
  margin: 0 3px -1px -5px;
`;

export const Coin = styled.li`
  border-bottom: 1px solid ${(props) => props.theme.color.grey};
  a {
    display: flex;
    align-items: center;
    padding: 2rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: ${(props) => props.theme.color.text.lv1};
    justify-content: space-between;
    transition: all 0.1s ease-in;
    @media screen and (max-width: 768px) {
      span:nth-child(6) {
        display: none;
      }
    }
    @media screen and (max-width: 375px) {
      span:nth-child(3) {
        display: none;
      }
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.color.bg.lv3};
  }
`;

export const CoinTitle = styled.span`
  min-width: 70px;
`;

export const RealPrice = styled.span`
  min-width: 80px;
  text-align: right;
`;

export const Fluctate = styled(RealPrice)`
  min-width: 150px;
  span + span {
    margin-left: 10px;
  }
  &.high {
    color: ${(props) => props.theme.color.accent.high};
  }
  &.low {
    color: ${(props) => props.theme.color.accent.low};
  }
`;

export const High = styled(RealPrice)`
  color: ${(props) => props.theme.color.accent.high};
`;

export const Low = styled(RealPrice)`
  color: ${(props) => props.theme.color.accent.low};
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

const Coins = () => {
  const { data } = useQuery<ICoins>(["allCoins"], bithumbCoins, {
    refetchInterval: 1000,
  });

  const CoinsListData = () => {
    let coinlist = [];
    for (let coin in data?.data) {
      const refValue =
        (Number(data?.data[coin].closing_price) -
          Number(data?.data[coin].prev_closing_price)) /
        Number(data?.data[coin].prev_closing_price);
      coinlist.push(
        <Coin key={coin}>
          <Link to={`/${coin}/chart`} state={{ name: coin }}>
            <CoinTitle>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.toLowerCase()}`}
              />
              {coin}
            </CoinTitle>
            <RealPrice>
              {Number(data?.data[coin].closing_price).toLocaleString("KR-ko")}
            </RealPrice>
            <Fluctate className={refValue > 0 ? "high" : "low"}>
              <span>
                {refValue > 0 ? "+" : "-"}
                {Math.abs(
                  Number(data?.data[coin].prev_closing_price) -
                    Number(data?.data[coin].closing_price)
                ).toLocaleString("KR-ko")}
              </span>
              <span>
                {(
                  ((Number(data?.data[coin].closing_price) -
                    Number(data?.data[coin].prev_closing_price)) /
                    Number(data?.data[coin].prev_closing_price)) *
                  100
                ).toFixed(2)}
                %{refValue > 0 ? "???" : "???"}
              </span>
            </Fluctate>
            <High>
              {Number(data?.data[coin].max_price).toLocaleString("KR-ko")}
            </High>
            <Low>
              {Number(data?.data[coin].min_price).toLocaleString("KR-ko")}
            </Low>
          </Link>
        </Coin>
      );
    }
    coinlist.splice(40);
    return coinlist;
  };

  return (
    <Container>
      <LabelLi>
        <span>?????????</span>
        <span>????????? ??????</span>
        <span>????????? (????????????)</span>
        <span>??????(24h)</span>
        <span>??????(24h)</span>
      </LabelLi>
      <CoinItems>{CoinsListData()}</CoinItems>
    </Container>
  );
};

export default Coins;
