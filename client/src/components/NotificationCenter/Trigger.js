import { Bell } from "react-feather";

import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  color: #fff;
  margin: 10px 10px 0 10px;

  :hover {
    opacity: 0.9;
    cursor: pointer;
  }

  :active {
    opacity: 0.8;
  }

  span {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #05ac66;
    border-radius: 4px;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Trigger = ({ count, onClick }) => {
  return (
    <Wrapper id={"notification"} onClick={onClick}>
      <Bell />
      <span>{count}</span>
    </Wrapper>
  );
};
