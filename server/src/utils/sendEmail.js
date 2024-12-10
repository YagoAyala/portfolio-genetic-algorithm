const sgMail = require("@sendgrid/mail");

const config = require("../config/config.json");

sgMail.setApiKey(config.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const msg = {
      to,
      html,
      subject,
      text: html,
      from: "lotoai.suporte@gmail.com",
    };

    const send = await sgMail.send(msg);
    return send;
  } catch (error) {
    return { error: "Não foi possível enviar o e-mail" };
  }
};

module.exports = sendEmail;
