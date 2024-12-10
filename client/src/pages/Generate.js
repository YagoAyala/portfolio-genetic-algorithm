import React, { useEffect, useState, useRef, useLayoutEffect } from "react";

import { BiCopy } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

import { beGet } from "../api/api";

import { logout } from "../hooks/Helper";
import { errorNotify, promiseNotify } from "../hooks/SystemToasts";

import { copyText } from "../utils/copyText";
import { verifyStorage } from "../utils/verifyStorage";

import Modal from "../components/Modal";

const webworker = new Worker(
  new URL("../hooks/WebWorker.js", import.meta.url),
  { name: "generate" },
);

const Generate = ({
  list,
  user,
  setList,
  onChangeLoading,
}) => {
  const [mode, setMode] = useState("NORMAL");
  const [isOpen, setIsOpen] = useState(false);
  const [restart, setRestart] = useState(false);
  const [runDisabled, setRunDisabled] = useState(false);

  const effectExecuted = useRef(false);

  useLayoutEffect(() => {
    if (!effectExecuted.current) {
      getData();
      effectExecuted.current = true;
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (restart) {
      run();
    }

    // eslint-disable-next-line
  }, [restart]);

  const getData = async (force, openModal) => {
    const date = new Date();

    let betList = localStorage.getItem("lotoai_bet_list");

    if (betList) {
      betList = JSON.parse(betList);

      if (betList?.date === date.toLocaleDateString("pt-BR") && !force) {
        setList(betList?.list || []);

        if (openModal) {
          onChangeModal(true);
        }

        return;
      }
    }

    onChangeLoading(true);

    const { data } = await beGet(`/contests/get_bets?userId=${user?.id}`);

    const format = data?.list?.sort((a, b) => new Date(b?.date) - new Date(a?.date));

    if (!format?.length) {
      onChangeLoading(false);
      return;
    }

    const item = {
      list: format,
      date: date.toLocaleDateString("pt-BR"),
    };

    localStorage.setItem("lotoai_bet_list", JSON.stringify(item));

    setList(format);
    onChangeLoading(false);

    if (openModal) {
      onChangeModal(true);
    }
  };

  const saveStorage = (item, value) => {
    localStorage.setItem(item, value);
  };

  const run = () => {
    setRestart(false);

    const messages = {
      pending: "Iniciando Rede Neural...",
      success: "Treinando a Rede Neural...",
      error: "Rede Neural indisponível. Tente novamente.",
    };

    promiseNotify(startPromise, messages);
  };

  const startPromise = () => {
    return new Promise((resolve, reject) => {
      setRunDisabled(true);

      const token = localStorage.getItem("lotoai_google_token");

      const ruleOfFourteen = verifyStorage("ruleOfFourteen");
      const bettingHistory = verifyStorage("bettingHistory");
      const neuralNetwork = verifyStorage("neuralNetwork");

      webworker.postMessage({
        mode,
        token,
        start: true,
        neuralNetwork,
        ruleOfFourteen,
        bettingHistory,
        userId: user?.id,
      });

      webworker.onmessage = (res) => {
        workerOnMessage(res, resolve, reject);
      };

      webworker.onerror = () => {
        setRunDisabled(false);
        reject(true);
        return;
      };
    });
  };

  const workerOnMessage = (res, resolve, reject) => {
    const { data } = res;

    if (data?.error) {
      setRunDisabled(false);
      reject(true);
      return;
    }

    if (data?.reload) {
      webworker.terminate();
      logout(true);
      errorNotify("Sessão expirada! Faça login para continuar.");
      reject(true);
      return;
    }

    if (data?.result?.saveStorage && data?.result?.step) {
      saveStorage(data.result.step, data.result.saveStorage);
    }

    if (data?.result?.success) {
      getData(true, true);
      setRunDisabled(false);
    }

    if (data?.result?.restart) {
      setRestart(true);
    }

    if (data?.result?.terminationNotice) {
      onChangeLoading(true, data.result.terminationNotice);
    }

    resolve(true);
    return;
  };

  const onChangeModal = (value) => {
    document.body.style.overflow = value ? "hidden" : "";
    setIsOpen(value);
  };

  const switchButton = (
    <span className={"switch-button"}>
      <label className={mode === "NORMAL" ? "active-normal" : ""}>Normal</label>
      <div className={"switch-container"}>
        <label className={"switch"}>
          <input
            type={"checkbox"}
            checked={mode === "NORMAL" ? false : true}
            onChange={() => setMode(mode === "NORMAL" ? "ADVANCED" : "NORMAL")}
          />
          <span className={"slider round"}></span>
        </label>
      </div>
      <label className={mode === "ADVANCED" ? "active-advanced" : ""}>Avançado</label>
    </span>
  );

  return (
    <>
      <div id={"generate"}>
        <div className={"generated-information"}>
          <h1>Gerador de jogos</h1>
          <p>Faça jogos usando IA a qualquer momento!</p>
        </div>

        <Modal
          isOpen={isOpen}
          title={"Aposta gerada"}
          onChangeModal={onChangeModal}
        >
          <div className={"bet-generated"}>
            {
              (list?.[0]?.bet || []).map((number) => (
                <p className={"number"} key={Math.random()}>{number}</p>
              ))
            }
          </div>
          <p className={"uuid"}>{list?.[0]?.uuid}</p>
        </Modal>

        {
          list?.length ?
            <div className={"scroll"}>
              {
                list.map((value, index) => (
                  <div key={`${index}_${value?.uuid}`}>
                    <div className={"bet-information"}>
                      <p className={"date-generated"}>
                        <b>Gerado em:</b> {value?.formattedDate}
                      </p>
                      <p className={"copy"} onClick={() => copyText(value?.bet, "Aposta copiada para área de transferência!")}>
                        <BiCopy /> Copiar aposta
                      </p>
                      <p className={`uuid${value?.mode === "ADVANCED" ? " advanced" : ""}`}>
                        {value?.uuid}
                        <MdVerified
                          fontSize={15}
                          color={value?.mode === "ADVANCED" ? "#01ac66" : "#fff"}
                          title={value?.mode === "ADVANCED" ? "Modo Avançado" : "Modo Normal"}
                        />
                      </p>
                    </div>
                    <div className={"bet-generated"}>
                      {
                        (value?.bet || []).map((number) => (
                          <p className={"number"} key={Math.random()}>{number}</p>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            :
            <p className={"without-list"}>Nenhum jogo gerado foi encontrado.</p>
        }

        <div className={"button-area"}>
          <button
            title={"Gerar"}
            onClick={() => run()}
            disabled={runDisabled}
          >
            Gerar
          </button>

          {switchButton}
        </div>

        <p className={"info"}>O tempo para gerar uma aposta pode variar de segundos para minutos*</p>
      </div>
    </>
  );
};

export default Generate;
