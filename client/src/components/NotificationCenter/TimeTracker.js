import { useEffect, useReducer, useRef } from "react";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import styled from "styled-components";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const Wrapper = styled.div`
  color: #9e9e9e;
  font-size: 14px;
`;

export const TimeTracker = ({ createdAt }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      forceUpdate();
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Wrapper>
      {dayjs(createdAt).locale("pt-br").fromNow()}
    </Wrapper>
  );
};
