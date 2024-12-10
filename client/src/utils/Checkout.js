import { bePost } from "../api/api";

import { errorNotify } from "../hooks/SystemToasts";

const checkout = async (form) => {
  try {
    let e = { ...form };
    e = JSON.stringify(e);
    e = btoa(e);

    const { data } = await bePost("/payment/checkout", { e, d: true });

    const url = data?.link;
    const error = data?.error;

    if (error) {
      errorNotify(error);

      if (error === "Este e-mail já está vinculado a uma conta.") {
        return { url };
      }
    }

    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.log(error);
  }
};

export { checkout };
