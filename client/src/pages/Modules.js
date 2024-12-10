import React from "react";

import { SiMicrogenetics } from "react-icons/si";
import { IoMdAnalytics } from "react-icons/io";
import { BiSolidDashboard, BiHistory } from "react-icons/bi";

const Modules = ({
  onChangeModule,
}) => {
  return (
    <div id={"modules"}>
      <div className={"box-list"}>
        <div className={"item"} onClick={() => onChangeModule("GENERATE")}>
          <SiMicrogenetics className={"item-icon"} />
          <h1>Gerador de jogos</h1>
        </div>
        <div className={"item"} onClick={() => onChangeModule("ANALYTICS")}>
          <IoMdAnalytics className={"item-icon"} />
          <h1>Analisar jogos</h1>
        </div>
        <div className={"item"} onClick={() => onChangeModule("STATISTICS")}>
          <BiSolidDashboard className={"item-icon"} />
          <h1>Estatísticas</h1>
        </div>
        <div className={"item"} onClick={() => onChangeModule("HISTORY")}>
          <BiHistory className={"item-icon"} />
          <h1>Histórico Lotofácil</h1>
        </div>
      </div>
    </div>
  );
};

export default Modules;
