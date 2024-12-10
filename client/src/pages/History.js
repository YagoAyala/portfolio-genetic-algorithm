import React, { useEffect, useMemo, useRef, useState } from "react";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { beGet } from "../api/api";

import { verifyStorage } from "../utils/verifyStorage";

const History = ({
  onChangeLoading,
}) => {
  const [data, setData] = useState("");
  const [endIndex, setEndIndex] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const requestExecuted = useRef(false);

  useEffect(() => {
    getHistory();

    // eslint-disable-next-line
  }, []);

  const getHistory = async () => {
    onChangeLoading(true);

    let bettingHistory = verifyStorage("fullBettingHistory");

    if (!bettingHistory) {
      if (!requestExecuted.current) {
        requestExecuted.current = true;

        const { data } = await beGet("/contests/betting_history?all=true");

        const date = new Date();
        const dateString = date.toLocaleDateString("pt-BR");

        if (!data?.length) {
          onChangeLoading(false);
          return;
        }

        const save = {
          dateString,
          value: data,
        };

        bettingHistory = data;

        localStorage.setItem("fullBettingHistory", JSON.stringify(save));
      }
    }

    onChangeLoading(false);
    setData(bettingHistory);
  };

  const onChangePage = (next) => {
    const page = next ?
      currentPage + 1
      : currentPage === 0 ? 0
        : currentPage - 1;

    let start = 10 * page;
    let end = start + 10;

    if (end > data?.length) {
      start = data.length - 10;
      end = data.length;

      setEndIndex(end);
      setStartIndex(start);
      return;
    }

    setEndIndex(end);
    setStartIndex(start);
    setCurrentPage(page);
  };

  const displayList = useMemo(() => {
    if (!data?.length) {
      return;
    }

    return (
      (data?.slice(startIndex, endIndex) || [])?.map((value, index) => (
        <div key={index}>
          <div className={"bet-information"}>
            <p className={"date"}>
              <b>Sorteado em:</b> {value?.data}
            </p>
            <p className={"date"}>
              <b>Concurso:</b> {value?.concurso}
            </p>
            <p className={"date"}>
              <b>Acumulou:</b> {value?.acumulou ? "Sim" : "Não"}
            </p>
          </div>
          <div className={"bet"}>
            {
              (value?.dezenas || []).map((number) => (
                <p className={"number"} key={Math.random()}>{number}</p>
              ))
            }
          </div>
        </div>
      ))
    );
  }, [data, startIndex, endIndex]);

  return (
    <div id={"history"}>
      <div className={"history-information"}>
        <h1>Histórico</h1>
        <p>Visualize o histórico da lotofácil</p>
      </div>

      <div className={"scroll"}>
        {displayList}
      </div>

      <div className={"actions"}>
        <button className={"icon"} onClick={() => onChangePage()}><GrFormPrevious /></button>
        <p>Pág. {currentPage + 1}</p>
        <button className={"icon"} onClick={() => onChangePage(true)}><GrFormNext /></button>
      </div>
    </div>
  );
};

export default History;
