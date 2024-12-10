import React from "react";

import { bePut } from "../api/api";

import { logout } from "../hooks/Helper";

import { errorNotify, successNotify } from "../hooks/SystemToasts";

const Settings = ({
  user,
  onChangeUser,
  onChangeLoading,
}) => {
  const onChangeConfig = async (config) => {
    if (config === "DELETE") {
      const approved = window.confirm("Ao confirmar, sua conta será removida e você não terá mais acesso a ela. Após essa ação, você deverá criar uma nova conta e pagar uma nova licença para utilizar o sistema.");

      if (approved) {
        onChangeLoading(true);

        user.active = "";

        const { data } = await bePut("/security/user_update", user);

        if (data?.email) {
          logout(true);
        }

        if (data?.error) {
          errorNotify(data.error);
        }

        onChangeLoading(false);
      }
    }

    if (config === "NOTIFICATION") {
      onChangeLoading(true);

      user.notify = !user?.notify ? "X" : "";

      const { data } = await bePut("/security/user_update", user);

      if (data?.email) {
        onChangeUser(data);
        successNotify("Os dados foram atualizados com sucesso!");
      }

      if (data?.error) {
        errorNotify(data.error);
      }

      onChangeLoading(false);
    }
  };

  return (
    <div id={"settings"}>
      <div className={"settings-information"}>
        <h1>Configurações</h1>
        <p>Notificações e conta</p>
      </div>

      <div className={"form"}>
        <span>
          <div className={"switch-container"}>
            <label className={"switch"}>
              <input
                type={"checkbox"}
                checked={user?.notify}
                onChange={() => onChangeConfig("NOTIFICATION")}
              />
              <span className={"slider round"}></span>
            </label>
          </div>
          <label>Receber notificações/avisos por e-mail</label>
        </span>
        <span>
          <button onClick={() => onChangeConfig("DELETE")}>Deletar conta</button>
        </span>
      </div>
    </div>
  );
};

export default Settings;
