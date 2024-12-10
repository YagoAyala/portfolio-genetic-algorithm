import { successNotify } from "../hooks/SystemToasts";

const copyText = (bet, msg) => {
  const textArea = document.createElement("textarea");
  textArea.value = bet;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");

    if (msg) {
      successNotify(msg);
    }
  } catch (error) {}

  document.body.removeChild(textArea);
};

export { copyText };
