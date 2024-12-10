import React, { useState } from "react";

import { BsFillSendFill } from "react-icons/bs";

import { sendEmail } from "../utils/sendEmail";

import { promiseNotify } from "../hooks/SystemToasts";

const Footer = ({
  user,
}) => {
  const [feedback, setFeedback] = useState("");

  const messages = {
    pending: "Preparando envio...",
    success: "Feedback enviado com sucesso!",
    error: "Não foi possível enviar o feedback. É permitido apenas um envio por dia.",
  };

  const sendFeedback = async () => {
    const templateParams = {
      to_name: "LotoAI",
      subject: "Feedback",
      from_name: user?.username || "User não encontrado",
      message: `${feedback} - Email: ${user?.email} - UserId: ${user?.id}`,
    };

    const response = await sendEmail(templateParams, "template_8ew9xkf");

    if (response) {
      setFeedback("");

      const date = new Date();
      const dateString = date.toDateString("pt-BR");

      localStorage.setItem("lotoai_feedback", dateString);
    }
  };

  const onChangeFeedback = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div id={"footer"}>
      <div className={"section"}>
        <h1>Enviar feedback</h1>
        <h3>A sua opinião é importante! Nos envie sugestões para proporcionar novas experiências.</h3>

        <div className={"form"}>
          <span>
            <textarea
              maxLength={500}
              value={feedback}
              onChange={onChangeFeedback}
            />
            <button
              disabled={!feedback}
              title={"Enviar feedback"}
              onClick={() => promiseNotify(sendFeedback, messages)}
            >
              <BsFillSendFill />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
