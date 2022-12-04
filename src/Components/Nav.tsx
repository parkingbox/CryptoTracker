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
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    padding: 0 20px;
  }
`;

export const Nav = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Header>
      <Link to={"/"}>{`Coin Traker`}</Link>
      <ModeChangeBtn onClick={toggleDarkAtom}>
        {isDark ? "Light" : "Dark"}
      </ModeChangeBtn>
    </Header>
  );
};
