import List from "list.js";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { ModeChangeBtn } from "./ChangeBtn";
import styled from "styled-components";

const Header = styled.header`
  height: 15vh;
  font-family: "Raleway Sans";
  font-size: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    padding: 0 20px;
  }
`;

const SecondHeader =styled.div``;

export const Nav = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Header>
      <Link to={"/"}>
        {`Coin Tracker!`}
      </Link>
        <ModeChangeBtn onClick={toggleDarkAtom}>
          {isDark ? "Light" : "Dark"}
        </ModeChangeBtn>
    </Header>
  );
};
