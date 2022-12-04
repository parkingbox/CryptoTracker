import React from "react";
import styled from "styled-components";

export const ModeBtn = styled.button`
  border-radius: 6px;
  background-color: ${(props) => props.theme.color.bg.lv2};
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.1);
  height: 30px;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  transition: all 0.2s ease-in-out;
  outline: 2px solid #619ef9;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.mode.lv2};
    background-color: ${(props) => props.theme.color.mode.lv1};
  }
`;

interface IModeBtn {
  onClick: () => void;
  children: string;
}

export const ModeChangeBtn = ({ onClick, children }: IModeBtn) => {
  return <ModeBtn onClick={onClick}>{children}</ModeBtn>;
};
