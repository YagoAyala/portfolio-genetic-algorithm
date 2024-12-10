import React, { useState } from "react";

import { MdAutoGraph, MdOutlineDeleteOutline } from "react-icons/md";

import ModalStatistics from "./ModalStatistics";

const Statistics = ({
  hits,
  reset,
  contest,
  historyPossibleHits,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal &&
        <ModalStatistics
          setShowModal={setShowModal}
          historyPossibleHits={historyPossibleHits}
        />
      }

      <span className={"statistics"}>
        <p>
          Acertos com base no último concurso ({contest}): <b>{hits?.[0]?.length}</b>
        </p>
        
        <div className={"buttons"}>
          <button
            className={"icon"}
            title={"Estatísticas"}
            onClick={() => setShowModal(showModal ? false : true)}
          >
            <MdAutoGraph fontSize={25} />
          </button>

          <button
            className={"icon"}
            title={"Apagar dados"}
            onClick={() => reset(true)}
          >
            <MdOutlineDeleteOutline fontSize={25} />
          </button>
        </div>
      </span>
    </>
  );
};

export default Statistics;
