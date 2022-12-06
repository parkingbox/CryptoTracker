import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { bithumbCoins } from "../api";

const Contatiner = styled.div`
  padding: 0px 20px;
  max-width: 1080px;
  margin: 0 auto;
  @media only screen and (max-width: 430px) {
    max-width: 350px;
    padding: 0px 10px;
  }
`;

const Header = styled.header`
  height: 23vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
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
  background-color: ${(props) => props.theme.color.grey.lv1};
  color: ${(props) => props.theme.color.text.lv1};
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.2s ease-in;
  width: 100px;
  a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    a {
      color: white;
    }
    background-color: ${(props) => props.theme.color.bg.lv3};
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

export const Home = () => {
  const { isLoading, data } = useQuery<ICoins>(["allCoins"], bithumbCoins);

  const CoinsListData = () => {
    let components = [];
    for (let coin in data?.data) {
      components.push(
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
    components.pop();
    return components;
  };
  return (
    <Contatiner id="hacker-list">
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Helmet>
          <title>CoinTracker</title>
        </Helmet>
      )}
      <CoinsList>{CoinsListData()}</CoinsList>
    </Contatiner>
  );
};