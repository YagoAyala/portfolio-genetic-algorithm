import { toast } from "react-toastify";
import "../styles/systemToasts.css";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const errorNotify = (msg) => {
  toast.error(msg, toastConfig);
};

const warnNotify = (msg) => {
  toast.warn(msg, toastConfig);
};

const successNotify = (msg, removeClose) => {
  const config = { ...toastConfig };

  if (removeClose) {
    config.draggable = false;
    config.closeOnClick = false;
    config.closeButton = false;
  }

  toast.success(msg, config);
};

const infoNotify = (msg) => {
  toast.info(msg, toastConfig);
};

const promiseNotify = (promise, msg) => {
  toast.promise(promise, msg, {
    ...toastConfig,
    draggable: false,
    closeOnClick: false,
    closeButton: false,
  });
};

export {
  errorNotify,
  warnNotify,
  successNotify,
  infoNotify,
  promiseNotify,
};
