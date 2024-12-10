import { bePost } from "../api/api";

import { modifyJson } from "./modifyJson";

import { successNotify, errorNotify, infoNotify } from "../hooks/SystemToasts";

const saveJsonFile = (list) => {
  if (!list?.length) {
    infoNotify("Nenhuma alteração encontrada.");
    return;
  }

  const text = modifyJson(list);

  bePost("/files/save_file", text).then(() => {
    successNotify("As apostas foram salvas com sucesso!");
  }).catch(() => {
    errorNotify("Não foi possível salvar o arquivo.");
  });
};

export { saveJsonFile };
