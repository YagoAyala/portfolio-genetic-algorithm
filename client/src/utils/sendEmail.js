import emailjs from "emailjs-com";

const sendEmail = (templateParams, templateId) => {
  emailjs.init("ryeQohEs3s4TpafB2");

  return new Promise((resolve, reject) => {
    const date = new Date();
    const dateString = date.toDateString("pt-BR");

    const storage = localStorage.getItem("lotoai_feedback");

    if (dateString === storage) {
      reject({ success: false });
      return;
    }

    emailjs.send(
      "service_fc4agrq",
      templateId,
      templateParams,
    ).then(() => {
      resolve({ success: true });
      return;
    }, () => {
      reject({ success: false });
      return;
    });
  });
};

export { sendEmail };
