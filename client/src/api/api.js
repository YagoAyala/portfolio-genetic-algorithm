import axios from "axios";

import { logout } from "../hooks/Helper";
import { errorNotify } from "../hooks/SystemToasts";

const api = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://lotoai.com.br",
});

const beGet = async (url, config) => {
  try {
    setHeaderAuthorization();

    const result = await api.get(url, config);

    middleware(result);

    return result;
  } catch (error) {
    return error;
  }
};

const bePost = async (url, config) => {
  try {
    setHeaderAuthorization();

    const result = await api.post(url, config);

    middleware(result);

    return result;
  } catch (error) {
    return error;
  }
};

const bePut = async (url, config) => {
  try {
    setHeaderAuthorization();

    const result = await api.put(url, config);

    middleware(result);

    return result;
  } catch (error) {
    return error;
  }
};

const beDelete = async (url, config) => {
  try {
    setHeaderAuthorization();

    const result = await api.delete(url, config);

    middleware(result);

    return result;
  } catch (error) {
    return error;
  }
};

const middleware = (result) => {
  if (result?.data?.not_authorized && result?.data?.reload) {
    logout(true);
    errorNotify("Sessão expirada! Faça login para continuar.");
  }
};

const setHeaderAuthorization = () => {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("lotoai_google_token");
  
    if (token) {
      config.headers["authorization"] = token;
    }
  
    return config;
  });
};

export {
  beGet,
  bePost,
  bePut,
  beDelete,
};
