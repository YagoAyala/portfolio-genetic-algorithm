import React from "react";

import { IoIosArrowBack } from "react-icons/io";

const Back = ({
  onChangeModule,
}) => {
  return (
    <div id="back">
      <p onClick={() => onChangeModule("")}>
        <IoIosArrowBack fontSize={"20px"} /> Voltar
      </p>
    </div>
  );
};

export default Back;
