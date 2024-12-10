import React, { useRef } from "react";

import Draggable from "react-draggable";

const ModalStatistics = ({
  setShowModal,
  historyPossibleHits,
}) => {
  const draggableRef = useRef();

  const onStart = (event, data) => {};
  const onStop = (event, data) => {};

  return (
    <Draggable
      onStop={onStop}
      onStart={onStart}
      nodeRef={draggableRef}
    >
      <div id="modal-statistics" ref={draggableRef}>
        <div>
          <h3>Estatísticas</h3>
          <p className={"close-icon"} onClick={() => setShowModal(false)}>⛌</p>
        </div>
        <span className={"total"}>
          <p><b>Total:</b> {historyPossibleHits.total}</p>
          <p className={"spent"}>R$ {historyPossibleHits.total * 3}</p>
        </span>
        <span>
          <p><b>11:</b> {historyPossibleHits[11]}</p>
          <p className={"profit"}>R$ {historyPossibleHits[11] * 6}</p>
        </span>
        <span>
          <p><b>12:</b> {historyPossibleHits[12]}</p>
          <p className={"profit"}>R$ {historyPossibleHits[12] * 12}</p>
        </span>
        <span>
          <p><b>13:</b> {historyPossibleHits[13]}</p>
          <p className={"profit"}>R$ {historyPossibleHits[13] * 30}</p>
        </span>
        <span>
          <p><b>14:</b> {historyPossibleHits[14]}</p>
          <p className={"profit"}>R$ {historyPossibleHits[14] * 1500}</p>
        </span>
        <span>
          <p><b>15:</b> {historyPossibleHits[15]}</p>
          <p className={"profit"}>R$ {historyPossibleHits[15] * 1500000}</p>
        </span>
      </div>
    </Draggable>
  );
};

export default ModalStatistics;
