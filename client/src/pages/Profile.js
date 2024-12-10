import React, { useEffect, useState } from "react";

import { errorNotify, infoNotify, successNotify } from "../hooks/SystemToasts";

import { bePut } from "../api/api";

import { formatPhone } from "../utils/formatPhone";

const Profile = ({
  user,
  onChangeUser,
  onChangeLoading,
}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const onChangeUserData = (e) => {
    setUserData({ ...userData, [e?.target?.name]: e?.target?.value });
  };

  const editProfile = async () => {
    if (
      userData?.username === user?.username &&
      userData?.phone === user?.phone &&
      userData?.birth === user?.birth &&
      !userData?.new_password
    ) {
      infoNotify("Nenhuma alteração foi realizada");
      return;
    }

    if (userData?.new_password && !userData?.password) {
      errorNotify("É obrigatório inserir a senha atual para realizar a alteração.");
      return;
    }

    if (!userData?.username) {
      errorNotify("Não é possível deixar o username vazio.");
      return;
    }

    if (!userData?.phone) {
      errorNotify("Não é possível deixar o número de telefone vazio.");
      return;
    }

    if (userData?.phone && userData?.phone?.length < 14) {
      errorNotify("Número de telefone incorreto.");
      return;
    }

    if (userData?.new_password && userData?.new_password?.length < 8) {
      errorNotify("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const year = userData?.birth?.split("-")?.[0];

    if (year > currentYear) {
      errorNotify("Data de nascimento inválida.");
      return;
    }

    onChangeLoading(true);

    const { data } = await bePut("/security/user_update", userData);

    if (data?.email) {
      onChangeUser(data);
      successNotify("Os dados foram atualizados com sucesso!");
    }

    if (data?.error || data?.Error) {
      errorNotify(data?.error || data?.Message);
    }

    onChangeLoading(false);
  };

  return (
    <div id={"profile"}>
      <div className={"profile-information"}>
        <h1>Perfil</h1>
        <p>Visualizar e editar perfil</p>
      </div>

      <form className={"form"}>
        <span>
          <label>Nome de usuário</label>
          <input
            maxLength={20}
            type={"username"}
            name={"username"}
            value={userData?.username || ""}
            onChange={onChangeUserData}
          />
        </span>
        <span>
          <label className={"disabled"}>E-mail</label>
          <input
            type={"email"}
            name={"email"}
            disabled={true}
            value={userData?.email || ""}
            onChange={onChangeUserData}
          />
        </span>
        <span>
          <label>Data de Nascimento</label>
          <input
            type={"date"}
            name={"birth"}
            value={userData?.birth || ""}
            onChange={onChangeUserData}
          />
        </span>
        <span>
          <label>Telefone</label>
          <input
            type={"tel"}
            name={"phone"}
            maxLength={15}
            value={formatPhone(userData?.phone) || ""}
            onChange={onChangeUserData}
          />
        </span>
        <span>
          <label className={!userData?.new_password ? "disabled" : ""}>Senha atual</label>
          <input
            type={"password"}
            name={"password"}
            autocomplete={"on"}
            disabled={!userData?.new_password}
            value={userData?.password || ""}
            onChange={onChangeUserData}
          />
        </span>
        <span>
          <label>Criar nova senha</label>
          <input
            type={"password"}
            autocomplete={"on"}
            name={"new_password"}
            onChange={onChangeUserData}
            value={userData?.new_password || ""}
          />
        </span>
      </form>

      <div className={"button-area"}>
        <button onClick={() => editProfile()}>Salvar</button>
      </div>
    </div>
  );
};

export default Profile;
