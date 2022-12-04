import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { ModeChangeBtn } from "./ChangeBtn";
import styled from "styled-components";

const Header = styled.header`
  height: 10vh;
  font-size: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    padding: 0 20px;
  }
`;
const Logo = styled.h1`
  font-style: oblique;
  font-weight: 500;
  font-size: 4rem;
  word-break: keep-all;
  @media screen and (max-width: 480px) {
    font-size: 3em;
  }
  @media screen and (max-width: 390px) {
    font-size: 2.8em;
    flex-shrink: 1;
  }
`;

export const Nav = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Header>
      <Logo>
        <Link to={"/"}>{`Coin Traker`}</Link>
      </Logo>
      <ModeChangeBtn onClick={toggleDarkAtom}>
        {isDark ? "Light" : "Dark"}
      </ModeChangeBtn>
    </Header>
  );
};
