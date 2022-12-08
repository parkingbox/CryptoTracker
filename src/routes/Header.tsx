import List from "list.js";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { ModeChangeBtn } from "../Components/ChangeBtn";
import styled from "styled-components";

const Wrapper = styled.header`
  height: 15vh;
  font-family: "Gowun Dodum", sans-serif;
  font-size: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 1200px) {
    padding: 0 20px;
  }
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin-top: 10px;
`;

const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  margin-top: 10px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export const Header = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Wrapper>
      <Link to={"/"}>{`Coin Tracker!`}</Link>
      <CheckBoxWrapper>
        <CheckBox onClick={toggleDarkAtom} id="checkbox" type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </Wrapper>
  );
};
