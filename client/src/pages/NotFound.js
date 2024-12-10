import React from "react";

import { NavLink } from "react-router-dom";

import logo from "../img/logo.svg";

const NotFound = () => {
  return (
    <div id={"not-found"}>
      <img src={logo} alt={"logo"} />
      <p>Página não encontrada.</p>
      <NavLink className={"link"} to={"/"}>Voltar para LotoAi</NavLink>
    </div>
  );
};

export default NotFound;
