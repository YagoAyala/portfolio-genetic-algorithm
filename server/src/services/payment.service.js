const axios = require("axios");
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const mercadopago = require("mercadopago");

const { uuid } = require("uuidv4");

const datastore = require("../datastore");
const config = require("../config/config.json");
const sendEmail = require("../utils/sendEmail");

const { createUser, getUserByEmail } = require("./security.service");

const url = config.BASE_URL;
const api = config.API_URL;
const namespace = config.NAMESPACE;

mercadopago.configure({
  client_id: config.CLIENT_ID_MP,
  access_token: config.ACCESS_TOKEN_MP,
  client_secret: config.CLIENT_SECRET_MP,
  // sandbox: true,
  // access_token: "TEST-8275470080166634-102719-7d724b0db9e8b7d7976ca461e6754fa5-254912047",
});

const checkout = async (data) => {
  const uid = uuid();

  if (data?.uuid !== config.UUID_DECODER) {
    return { error: "Acesso negado." };
  }

  const verify = await getUserByEmail(data?.email, true);

  if (!verify?.success) {
    return verify;
  }

  const preference = {
    items: [{
      title: "LotoAI",
      unit_price: 19.90,
      quantity: 1,
      currency_id: "BRL",
    }],
    back_urls: {
      "failure": `${url}?uid=${uid}`,
      "pending": `${url}/app?uid=${uid}`,
      "success": `${url}/app?uid=${uid}`,
    },
    auto_return: "approved",
    notification_url: `${api}/payment/checkout_webhook?uid=${uid}`,
    // notification_url: `https://webhook.site/c79e9c79-926b-41f8-a409-247746f3787d?uid=${uid}`, //adicionar url certa para status do pagamento
  };

  const { body } = await mercadopago.preferences.create(preference);

  const link = body?.init_point;
  // const link = body?.sandbox_init_point;

  data.uid = uid;
  data.init_point = link;

  delete data.d;
  delete data.e;

  await createUser(data);

  return {
    link: link,
  };
};

const checkoutWebhook = async (uid, body) => {
  let getPaymentLink = "";

  if (!body?.data?.id) {
    return { error: "Payment ID not found" }; 
  }

  getPaymentLink = `https://api.mercadopago.com/v1/payments/${body.data.id}`;

  const { data } = await axios.get(getPaymentLink, {
    headers: {
      "Authorization": `Bearer ${config.ACCESS_TOKEN_MP}`,
    },
  });

  if (!data?.date_approved || data?.status !== "approved") {
    return { error: "Payment not approved" }; 
  }

  const getPreSave = await datastore.getEntitiesWithFilter(
    namespace,
    "PreSave",
    "uid",
    uid,
  );

  if (!getPreSave?.[0]?.uid) {
    return { error: "UID not found" };
  }

  const encrypt = await bcrypt.hash(getPreSave[0].password, 10);

  const entity = {
    active: "X",
    paid: "X",
    password: encrypt,
    payday: new Date(),
    email: getPreSave[0].email,
    birth: getPreSave[0].birth,
    paymentInfo: getPaymentLink,
    username: getPreSave[0].username,
  };

  const getUser = await datastore.getEntitiesWithFilter(
    namespace,
    "User",
    "email",
    entity.email,
  );

  if (getUser?.[0]?.active) {
    return { error: "User already exists" };
  }

  await admin.auth().createUser({
    emailVerified: true,
    email: getPreSave[0].email,
    password: getPreSave[0].password,
    displayName: getPreSave[0].username,
  });

  await datastore.createEntity(namespace, "User", entity);
  // await datastore.deleteEntity(namespace, "PreSave", getPreSave?.[0]?.id);

  const html = `
    <h3>Olá ${entity.username},</h3>
    <p>Obrigado por se conectar com a gente ;)</p>
    <p>Utilize seu e-mail ${entity.email} para fazer login no <a href="${config.BASE_URL}/app">LotoAI</a>.</p>
    <br/><h3><strong>Equipe LotoAI</strong></h3>
  `;

  await sendEmail(entity.email, "Bem vindo ao LotoAI", html);

  return {
    success: true,
  };
};

module.exports = {
  checkout,
  checkoutWebhook,
};
