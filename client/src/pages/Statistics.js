import React, { useEffect, useRef, useState } from "react";

import { beGet } from "../api/api";

import { errorNotify } from "../hooks/SystemToasts";

import { verifyStorage } from "../utils/verifyStorage";

const webworker = new Worker(
  new URL("../hooks/WebWorker.js", import.meta.url),
  { name: "statistics" },
);

const Statistics = ({
  onChangeLoading,
}) => {
  const [data, setData] = useState({
    avgSum: undefined,
    oddPercentage: undefined,
    evenPercentage: undefined,
    popularNumbers: undefined,
    primePercentage: undefined,
    noPopularNumbers: undefined,
    getLastThreeContest: undefined,
  });

  const requestExecuted = useRef(false);

  useEffect(() => {
    connection();

    // eslint-disable-next-line
  }, []);

  const getLastThreeContest = async () => {
    let value = verifyStorage("getLastThreeContest");

    if (value) {
      return value;
    }

    const { data } = await beGet("/contests/get_last_three_contest");

    const date = new Date();
    const dateString = date.toLocaleDateString("pt-BR");

    const save = {
      dateString,
      value: data?.list || [],
    };

    localStorage.setItem("getLastThreeContest", JSON.stringify(save));

    return data;
  };

  const connection = async () => {
    onChangeLoading(true);

    let bettingHistory = verifyStorage("bettingHistory");

    if (!bettingHistory) {
      if (!requestExecuted.current) {
        requestExecuted.current = true;

        const { data } = await beGet("/contests/betting_history");

        const date = new Date();
        const dateString = date.toLocaleDateString("pt-BR");

        if (!data?.length) {
          return;
        }

        const save = {
          dateString,
          value: data,
        };

        bettingHistory = data;

        localStorage.setItem("bettingHistory", JSON.stringify(save));
      }
    }

    startWebWorker(bettingHistory);
  };

  const startWebWorker = (bettingHistory) => {
    webworker.postMessage({
      bettingHistory,
      statistics: true,
    });

    webworker.onmessage = async (res) => {
      onChangeLoading(false);

      if (res.data?.error) {
        return;
      }

      if (res.data?.result) {
        const _getLastThreeContest = await getLastThreeContest();

        setData({
          ...res.data.result,
          getLastThreeContest: _getLastThreeContest?.list?.length ? _getLastThreeContest.list : _getLastThreeContest,
        });
      }
    };

    webworker.onerror = () => {
      onChangeLoading(false);
      errorNotify("Não foi possível obter os dados para análise.");
    };
  };

  return (
    <div id={"statistics"}>
      <div className={"statistics-information"}>
        <h1>Estatísticas</h1>
        <p>Crie suas próprias análises</p>
      </div>

      <div className={"cards"}>
        <div className={"line"}>
          <p className={"info"}>Dados com base em todo o histórico da lotofácil*</p>
        </div>
        <div className={"line"}>
          <div className={"card percentage"}>
            <span>
              <b>Média da soma dos números:</b>
              <p>{Math.round(data.avgSum || 0)}</p>
            </span>
          </div>
          <div className={"card percentage"}>
            <span>
              <b>% média de números primos:</b>
              <p>{Math.round(data.primePercentage || 0)}%</p>
            </span>
            <span className={"chart"}>
              <span className={"value"} style={{ width: `${Math.round(data.primePercentage || 0)}%` }}></span>
            </span>
          </div>
        </div>
        <div className={"line"}>
          <div className={"card percentage"}>
            <span>
              <b>% média de números ímpares:</b>
              <p>{Math.round(data.oddPercentage || 0)}%</p>
            </span>
            <span className={"chart"}>
              <span className={"value"} style={{ width: `${Math.round(data.oddPercentage || 0)}%` }}></span>
            </span>
          </div>
          <div className={"card percentage"}>
            <span>
              <b>% média de números pares:</b>
              <p>{Math.round(data.evenPercentage || 0)}%</p>
            </span>
            <span className={"chart"}>
              <span className={"value"} style={{ width: `${Math.round(data.evenPercentage || 0)}%` }}></span>
            </span>
          </div>
        </div>
        <div className={"line"}>
          <div className={"card"}>
            <b>Dezenas mais sorteadas:</b>
            <div className={"list-numbers"}>
              {
                (data.popularNumbers || [])?.map((item) => (
                  <span key={Math.random() * item?.number}>
                    <p className={"number"}>{item?.number || 0}</p>
                    <p className={"occurrences"}>x{item?.occurrences || 0}</p>
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className={"line"}>
          <div className={"card"}>
            <b>Dezenas menos sorteadas:</b>
            <div className={"list-numbers"}>
              {
                (data.noPopularNumbers || [])?.map((item) => (
                  <span key={Math.random() * item?.number}>
                    <p className={"number"}>{item?.number || 0}</p>
                    <p className={"occurrences"}>x{item?.occurrences || 0}</p>
                  </span>
                ))
              }
            </div>
          </div>
        </div>
        <div className={"line"}>
          <div className={"card"}>
            <b>Últimos 3 jogos sorteados:</b>
            <div className={"list-history-numbers"}>
              {
                (data.getLastThreeContest || [])?.map((item, index) => (
                  <div key={Math.random() * index}>
                    <div className={"line"}>
                      <p>
                        <b>Sorteado em:</b> {item?.date}
                      </p>
                      <p>
                        <b>Concurso:</b> {item?.contest}
                      </p>
                    </div>
                    <span>
                      {
                        (item?.bet || [])?.map((number, seq) => (
                          <p key={seq * number} className={"number"}>{number}</p>
                        ))
                      }
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
