import Chart from "../Components/Chart";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Coins from "../Components/Coins";
import { Header } from "../Routes/Header";

const Container = styled.div`
  font-family: "Gowun Dodum", sans-serif;
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-template-rows: 1fr 5fr;
  gap: 2rem;
  @media screen and (max-width: 1200px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr;
    justify-items: center;
  }
`;

const CoinsWrapper = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;
const Wrapper = styled.div``;

const CoinInfo = () => {
  return (
    <Container>
      <CoinsWrapper>
        <Coins />
      </CoinsWrapper>
      <Routes>
        <Route path="chart" element={<Chart />} />
      </Routes>
    </Container>
  );
};

export default CoinInfo;
