import React, { useState, useLayoutEffect, useEffect } from "react";

import { bePost } from "../api/api";

import { errorNotify } from "../hooks/SystemToasts";

import Modal from "../components/Modal";

const Analytics = ({
  onChangeLoading,
}) => {
  const [result, setResult] = useState({});
  const [contest, setContest] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [validBet, setValidBet] = useState(false);

  useLayoutEffect(() => {
    const list = [];

    for (let x = 1; x <= 25; x++) {
      list.push({ number: x, selected: false });
    }

    setNumbers([...list]);
  }, []);

  useEffect(() => {
    const bet = numbers.filter(item => item.selected);
    setValidBet(bet.length >= 15 && bet.length <= 20);
  }, [numbers]);

  const chooseBet = (number) => {
    const list = [...numbers];

    const item = list.find(item => item.number === number);
    const value = !item.selected;

    const count = list.filter(bet => bet?.selected);

    if (count.length === 20 && value) {
      return;
    }

    item.selected = value;

    list.sort((a, b) => a.number - b.number);

    setNumbers([...list]);
  };

  const validate = async () => {
    setResult({});
    onChangeLoading(true);

    if (!validBet) {
      onChangeLoading(false);
      errorNotify("A aposta precisa conter entre 15 e 20 números.");
      return;
    }

    if (!contest) {
      onChangeLoading(false);
      errorNotify("É preciso adicionar um concurso.");
      return;
    }

    const response = await bePost("/contests/get_contest", { contest });

    let hits = 0;
    const dozens = [];
    const bet = numbers.filter(item => item.selected);

    if (response?.data?.dezenas) {
      for (const item of response.data.dezenas) {
        dozens.push(parseInt(item));
      }

      for (const item of bet) {
        if (dozens.includes(item.number)) {
          hits++;
        }
      }

      setResult({
        ...response?.data,
        showModal: true,
        hits,
      });

      onChangeLoading(false);
      return;
    }

    onChangeLoading(false);
    errorNotify("Não foi possível pesquisar o concurso. Tente novamente.");
  };

  const onChangeContest = (e) => {
    setContest(parseInt(e?.target?.value));
  };

  const displayNumbers = () => {
    let str = "";

    numbers.forEach((number) => {
      if (number.selected) {
        str += number.number + " - ";
      }
    });

    return <p>{str.slice(0, -2)}</p>;
  };

  const onChangeModal = (value) => {
    document.body.style.overflow = value ? "hidden" : "";
    setResult({ ...result, showModal: value });
  };

  return (
    <div id={"analytics"}>
      <div className={"analytics-information"}>
        <h1>Analisar jogos</h1>
        <p>Faça a validação de qualquer jogo da lotofácil</p>
      </div>

      {result?.showModal &&
        <Modal
          isOpen={result.showModal}
          title={`Concurso ${contest}`}
          onChangeModal={onChangeModal}
        >
          <div className={"result"}>
            <p><b>Acertos:</b> {result?.hits || 0}</p>
            <p><b>Data:</b> {result?.data || "00/00/0000"}</p>
            <p><b>Acumulou:</b> {result?.acumulou ? "Sim" : "Não"}</p>
            <p><b>Local:</b> {result?.local}</p>
            <p><b>Próximo concurso:</b> {result?.dataProximoConcurso} ({result?.proximoConcurso})</p>
          </div>
        </Modal>
      }

      <div className={"form"}>
        <span>
          <label>Selecionar aposta</label>
          <div className={"choose-bet"}>
            {
              numbers.map((item) => {
                let className = "number";

                if (item.selected) {
                  className += " selected";
                }

                return (
                  <p
                    key={item.number}
                    className={className}
                    onClick={() => chooseBet(item.number)}
                  >
                    {item.number}
                  </p>
                );
              })
            }
          </div>
        </span>
        <span>
          <label>Concurso</label>
          <input
            type={"number"}
            className={"contest"}
            onChange={(e) => onChangeContest(e)}
          />
          <br />
          <button onClick={() => validate()}>Verificar</button>
        </span>
      </div>

      <div className={"numbers-selected"}>
        {displayNumbers()}
      </div>
    </div>
  );
};

export default Analytics;
