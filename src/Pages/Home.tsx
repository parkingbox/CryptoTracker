import { useQuery } from "@tanstack/react-query";
import { listenerCount } from "process";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { bithumbCoins } from "../api";
import { Header } from "../Routes/Header";

const Contatiner = styled.div`
  font-family: 'Gowun Dodum', sans-serif;
  padding: 0px 20px;
  max-width: 1080px;
  margin: 0 auto;
  @media only screen and (max-width: 430px) {
    max-width: 350px;
    padding: 0px 10px;
  }
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  justify-content: center;
  @media only screen and (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.color.grey};
  color: ${(props) => props.theme.color.text.lv2};
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.2s ease-in;
  width: 200px;
  font-size: 25px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.color.text.lv2};
    }
    background-color: ${(props) => props.theme.color.bg.lv2};
  }
  @media only screen and (max-width: 430px) {
    a {
      padding: 10px;
    }
  }
`;

const Loader = styled.span`
  font-size: 32px;
  text-align: center;
  display: block;
  margin-top: 50px;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled(Img)`
  font-size: 48px;
  width: 400px;
  height: 223.5897435897436px;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 0px;
  @media only screen and (max-width: 430px) {
    width: 300px;
    height: 167.69230769230768px;
  }
`;

interface ICoins {
  data: {
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
}

export const Home = () => {
  const { isLoading, data } = useQuery<ICoins>(["allCoins"], bithumbCoins);

  const CoinsListData = () => {
    let coinlist = [];
    for (let coin in data?.data) {
      coinlist.push(
        <CoinsList className="list">
          <Coin key={coin}>
            <Link to={`/${coin}/chart`} state={{ name: coin }}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.toLowerCase()}`}
              />
              {coin}
            </Link>
          </Coin>
        </CoinsList>
      );
    }
    coinlist.splice(40);
    return coinlist;
  };
  return (
    <Contatiner>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Helmet>
          <title>TO MARS!</title>
        </Helmet>
      )}
      <CoinsList>{CoinsListData()}</CoinsList>
    </Contatiner>
  );
};
