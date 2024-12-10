import React, { useState, useLayoutEffect, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { bePost, bePut } from "../api/api";

import { emailAuth, googleAuth } from "../hooks/Helper";
import { errorNotify, infoNotify, successNotify } from "../hooks/SystemToasts";

import InputCode from "../components/InputCode";

import logo from "../img/logo.svg";

const Login = ({
  onChangeUser,
  onChangeLoading,
}) => {
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState({});
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [changePassword, setChangePassword] = useState({
    email: "",
    code: "",
    password: "",
    sendCode: false,
    sendEmail: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    const storage = localStorage.getItem("lotoai_remember");

    if (storage) {
      const remember = JSON.parse(storage);
      setEmail(remember?.email);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const uid = params.get("uid");
    const paymentStatus = params.get("status");
    const collectionStatus = params.get("collection_status");

    if (uid && paymentStatus === "approved" && collectionStatus === "approved") {
      setPayment({ status: "APPROVED" });
    }

    if (uid && paymentStatus === "pending" && collectionStatus === "pending") {
      setPayment({ status: "PENDING" });
    }
  }, [location.search]);

  const clearParams = () => {
    const path = location.pathname;
    navigate(path);
  };

  const login = async (type) => {
    let auth = undefined;

    if (type === "GOOGLE") {
      auth = await googleAuth();
    }

    onChangeLoading(true);
    clearParams();

    if (type === "EMAIL") {
      if (!email && !password) {
        onChangeLoading(false);
        return;
      }

      auth = await emailAuth(email, password);

      const data = {
        email,
      };

      localStorage.setItem("lotoai_remember", JSON.stringify(data));
    }

    if (!auth?.token) {
      onChangeLoading(false);
      errorNotify("Erro ao fazer login. Tente novamente.");
      return;
    }

    auth.password = password;

    const { data } = await bePost("/security/login", auth);

    if (data?.logged) {
      onChangeUser(data);
      onChangeLoading(false);

      localStorage.setItem("lotoai_google_token", auth.token);
      return;
    }

    onChangeLoading(false);
    errorNotify("Erro ao fazer login. Tente novamente.");
  };

  const handleLogin = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  const sendNotification = async () => {
    let e = { email: changePassword.email };
    e = JSON.stringify(e);
    e = btoa(e);

    const { data } = await bePost(
      "/security/create_access_token",
      { e, d: true },
    );

    if (data?.error || data?.Error) {
      onChangeLoading(false);

      if (data?.activeRequest) {
        infoNotify(data.error);
        setChangePassword({ ...changePassword, sendEmail: true });
      } else {
        errorNotify(data.error || data?.Message);
      }

      return;
    }

    if (data?.success) {
      setChangePassword({ ...changePassword, sendEmail: true });
      onChangeLoading(false);
    }
  };

  const IsEmail = async () => {
    const rgx = /\S+@\S+\.\S+/;

    if (!changePassword.sendEmail) {
      if (rgx.test(changePassword.email)) {
        onChangeLoading(true);
        sendNotification();
      } else {
        errorNotify("Insira um e-mail válido!");
      }

      return;
    }

    if (changePassword.sendEmail && !changePassword.sendCode) {
      if (changePassword.code?.length !== 4) {
        errorNotify("Código inválido!");
        return;
      }

      onChangeLoading(true);

      let e = { email: changePassword.email, code: changePassword.code };
      e = JSON.stringify(e);
      e = btoa(e);

      const { data } = await bePost(
        "/security/verify_access_token",
        { e, d: true },
      );

      if (data?.error) {
        onChangeLoading(false);
        errorNotify(data.error);
        return;
      }

      if (data?.success) {
        setChangePassword({ ...changePassword, sendCode: true });
      }

      onChangeLoading(false);
      return;
    }

    if (changePassword.sendCode) {
      if (changePassword.password?.length < 8) {
        errorNotify("A senha precisa ter pelo menos 8 caracteres!");
        return;
      }

      onChangeLoading(true);

      let e = {
        changePassword: true,
        code: changePassword.code,
        email: changePassword.email,
        password: changePassword.password,
      };
      e = JSON.stringify(e);
      e = btoa(e);

      const { data } = await bePut(
        "/security/password_update",
        { e, d: true },
      );

      if (data?.error) {
        onChangeLoading(false);
        errorNotify(data.error);
        return;
      }

      if (data?.success) {
        successNotify("Senha alterada com sucesso!");
        handleLogin();
      }

      onChangeLoading(false);
      return;
    }
  };

  const onChangeChangePassword = (e, name) => {
    if (name) {
      setChangePassword({
        ...changePassword,
        [name]: e,
      });
      return;
    }

    setChangePassword({
      ...changePassword,
      [e.target.name]: e?.target?.value,
    });
  };

  const onChangeEmail = (e) => {
    setEmail(e?.target?.value);
  };

  const onChangePassword = (e) => {
    setPassword(e?.target?.value);
  };

  return (
    <div id={"login"}>
      <div className={"logo"}>
        <img src={logo} alt={"logo"} />
      </div>

      <div className={"welcome-message"}>
        {
          isForgotPassword ?
            <h1>Recuperar senha</h1>
            : payment?.status === "APPROVED" ?
              <>
                <h1>Pagamento aprovado!</h1>
                <h2>Entre na sua conta agora mesmo</h2>
              </>
              : payment?.status === "PENDING" ?
                <>
                  <h1>Pagamento pendente!</h1>
                  <h2>Aguarde até o pagamento ser processado.</h2>
                </>
                : <h1>Bem vindo de volta!</h1>
        }
      </div>

      {
        isForgotPassword ?
          <div className={"form"}>
            <span>
              {!changePassword.sendEmail &&
                <p>Digite seu e-mail para receber o código de verificação:</p>
              }

              {changePassword.sendEmail && !changePassword.sendCode &&
                <p>Digite o código de verificação que enviamos para seu e-mail:</p>
              }

              {changePassword.sendCode &&
                <p>Digite uma nova senha para sua conta:</p>
              }
            </span>

            {!changePassword.sendEmail &&
              <span>
                <label>E-mail</label>
                <input
                  type={"email"}
                  name={"email"}
                  id={"email-forgot-password"}
                  value={changePassword.email}
                  onChange={(e) => onChangeChangePassword(e)}
                />
              </span>
            }

            {changePassword.sendEmail && !changePassword.sendCode &&
              <span>
                <label>Código de verificação</label>
                <InputCode onChange={onChangeChangePassword} />
              </span>
            }

            {changePassword.sendCode &&
              <span>
                <label>Nova senha</label>
                <input
                  type={"password"}
                  name={"password"}
                  value={changePassword.password}
                  id={"password-forgot-password"}
                  onChange={(e) => onChangeChangePassword(e)}
                />
              </span>
            }
          </div>
          :
          <div className={"form"}>
            <span>
              <label>E-mail</label>
              <input
                value={email}
                id={"email-login"}
                name={"email-login"}
                onChange={onChangeEmail}
              />
            </span>
            <span className={"no-margin"}>
              <label>Senha</label>
              <input
                value={password}
                type={"password"}
                id={"password-login"}
                name={"password-login"}
                onChange={onChangePassword}
              />
            </span>
            <p className={"forgot-password"} onClick={() => handleLogin()}>Esqueceu sua senha?</p>
          </div>
      }

      {isForgotPassword &&
        <div className={"button-area"}>
          <button onClick={() => IsEmail()}>Enviar</button>
          <p className={"login-back"} onClick={() => handleLogin()}>Voltar para o login</p>
        </div>
      }

      {!isForgotPassword &&
        <>
          <div className={"button-area"}>
            <button onClick={() => login("EMAIL")}>Login</button>
          </div>

          <div className={"division"}>
            <p>OU</p>
          </div>

          <div className={"other-logins"}>
            <button className={"google"} onClick={() => login("GOOGLE")}>
              <span className={"google-icon"} /> Continue com Google
            </button>
          </div>
        </>
      }

    </div>
  );
};

export default Login;
