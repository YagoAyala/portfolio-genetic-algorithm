import { AiOutlineClose } from "react-icons/ai";

import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
`;

export const ItemActions = ({ notification, remove }) => {
  return (
    <Wrapper>
      <Button className={"icon"} onClick={() => remove(notification.id)} title={"Remover"}>
        <AiOutlineClose fontSize={20} color={"#9e9e9e"} />
      </Button>
    </Wrapper>
  );
};
