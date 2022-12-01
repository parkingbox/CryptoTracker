import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';
import { isDarkAtom } from '../atoms';
import { useSetRecoilState } from "recoil";


const Container = styled.div`
  padding:0px 20px;
  max-width: 480px;
  margin: 0 auto;
`
const Header = styled.header`
  height:10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-content: center;

  @media only screen and (max-width: 430px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`
const Coin = styled.li`
  background-color: whitesmoke;
  width: 300px;
  color: ${(props) =>props.theme.textColor};
  border-radius: 15px;
  margin-left: 20px;
  margin-bottom: 10px;
  a{
    display: flex;
    align-items: center;
    padding: 15px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a{
      color: ${(props)=> props.theme.accentColor};
    }
  }
`
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  position: fixed;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`
const Button = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ;
  background-color: #2F3640;
  cursor: pointer;
  margin-left: 300px;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface ICoinsProps {}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev)
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins )

  return (
  <Container>
    <Helmet>
      <title>코인</title>
    </Helmet>
    <Header>
      <Title>Coingate</Title>
    <Button onClick={toggleDarkAtom}><i className="fa-solid fa-moon"></i></Button>
    </Header>
    {isLoading ? (
      <Loader>Loading...</Loader>
    ) : (
      <CoinsList>
        {data?.slice(0, 30).map((coin)=> (
          <Coin key={coin.id}>
            <Link
              to={`/${coin.id}`}
              state={{name: coin.name}}
            >
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              {coin.name} &rarr;
              </Link>
          </Coin>
        ))}
    </CoinsList>
  )}
  </Container>
  )
}
export default Coins;