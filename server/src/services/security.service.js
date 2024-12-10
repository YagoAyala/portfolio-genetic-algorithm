const bcrypt = require("bcrypt");
const admin = require("firebase-admin");

const datastore = require("../datastore");
const config = require("../config/config.json");
const sendEmail = require("../utils/sendEmail");

const namespace = config.NAMESPACE;

const getUserByEmail = async (email, advanced) => {
  try {
    if (!advanced) {
      const { uid } = await admin.auth().getUserByEmail(email);
      return uid;
    }

    const user = await datastore.getEntitiesWithFilter(namespace, "User", "email", email);

    if (user?.[0]?.email) {
      return { error: "Este e-mail já está vinculado a uma conta existente." };
    }

    const preSave = await datastore.getEntitiesWithFilter(namespace, "PreSave", "email", email);

    if (preSave?.[0]?.email) {
      return {
        link: preSave?.[0]?.init_point,
        error: "Este e-mail já está vinculado a uma conta.",
      };
    }

    return { success: true };
  } catch (error) {
    return { error: "Nenhum usuário com esse e-mail foi encontrado!" };
  }
};

const verifyAccessToken = async (data) => {
  const code = data?.code;
  const email = data?.email;

  if (data?.uuid !== config.UUID_DECODER) {
    return { error: "Acesso negado." };
  }

  try {
    const verifyAccess = await datastore.getEntitiesWithFilter(
      namespace,
      "AccessToken",
      "email",
      email,
    );

    if (verifyAccess?.length) {
      const notExpired = verifyAccess.find((item) => item.expiresIn > new Date());

      if (parseInt(notExpired?.code) === parseInt(code)) {
        const entity = {
          ...notExpired,
          used: "X",
          usedIn: new Date(),
        };

        delete entity?.id;

        await datastore.updateEntity(namespace, "AccessToken", notExpired.id, entity);

        return { success: true };
      }

      return { error: "Código inválido!" };
    }
  } catch (error) {
    return { error: "Não foi possível validar o código!" };
  }
};

const createAccessToken = async (data) => {
  const email = data?.email;

  if (data?.uuid !== config.UUID_DECODER) {
    return { error: "Acesso negado." };
  }

  try {
    const uid = await getUserByEmail(email);

    if (uid?.error) {
      return { error: uid.error };
    }

    const verifyAccess = await datastore.getEntitiesWithFilter(
      namespace,
      "AccessToken",
      "email",
      email,
    );

    if (verifyAccess?.length) {
      const notExpired = verifyAccess.find((item) => item.expiresIn > new Date());

      if (!notExpired?.used) {
        return {
          activeRequest: true,
          error: "Já existe uma solicitação para esse e-mail.",
        };
      }
    }

    const date = new Date();

    let expiresIn = date.setHours(date.getHours() + 12);
    expiresIn = new Date(expiresIn);

    const code_1 = Math.floor(Math.random() * 9) + 1;
    const code_2 = Math.floor(Math.random() * 9) + 1;
    const code_3 = Math.floor(Math.random() * 9) + 1;
    const code_4 = Math.floor(Math.random() * 9) + 1;

    const entity = {
      email,
      expiresIn,
      type: "CHANGE_PASSWORD",
      code: `${code_1}${code_2}${code_3}${code_4}`,
    };

    await datastore.createEntity(namespace, "AccessToken", entity);

    const html = `
      <p>Olá,</p>
      <br/><p>Você solicitou a redefinição de senha para sua conta ${email} no LotoAI.</p>
      <p>Use este código <strong>${entity.code}</strong> para continuar com a redefinição.</p>
      <br/><p>O código irá expirar em 12 horas.</p>
      <br/><p>Se você não solicitou nenhuma troca de senha, pode ignorar este e-mail.</p>
      <br/><p><strong>Equipe LotoAI</strong></p>
    `;

    const send = await sendEmail(email, "Redefinir senha no LotoAI", html);

    if (send.error) {
      return { error: send.error };  
    }

    return { success: true };
  } catch (error) {
    return { error: "Não foi possível realizar a ação." };
  }
};

const updatedPassowordUser = async (user) => {
  const { email } = user;

  if (user?.uuid !== config.UUID_DECODER) {
    return { error: "Acesso negado." };
  }

  const list = await datastore.getEntitiesWithFilter(namespace, "User", "email", email);

  const verifyAccess = await datastore.getEntitiesWithFilter(
    namespace,
    "AccessToken",
    "email",
    email,
  );

  if (verifyAccess?.length) {
    const notExpired = verifyAccess.find((item) => item.expiresIn > new Date());

    if (notExpired?.code !== user?.code) {
      return { error: "Código de verificação inválido!" };
    }
  }

  if (!list?.length) {
    return { error: "Usuário inválido" };
  }

  if (!user?.changePassword) {
    return { error: "Não foi possível alterar a senha. Tente novamente!" };
  }

  try {
    const newUser = { ...list[0] };

    const uid = await getUserByEmail(email);
    const newEncrypt = await bcrypt.hash(user.password, 10);

    newUser.password = newEncrypt;
    delete newUser?.id;

    await admin.auth().updateUser(uid, { password: user.password });
    await datastore.updateEntity(namespace, "User", list[0].id, newUser);

    return { success: true };
  } catch (error) {
    return { error: "Não foi possível alterar a senha. Tente novamente!" };
  }
};

const createUser = async (user) => {
  return await datastore.createEntity(namespace, "PreSave", user);
};

const updateUser = async (user) => {
  const { email } = user;

  const list = await datastore.getEntitiesWithFilter(namespace, "User", "email", email);

  if (!list?.length) {
    return { error: "Usuário inválido" };
  }

  const newUser = {
    ...list[0],
    active: user.active,
    phone: user.phone,
    birth: user.birth,
    notify: user.notify,
    username: user.username,
  };

  if (user?.new_password && user?.password) {
    const newEncrypt = await bcrypt.hash(user.new_password, 10);

    const isPasswordValid = await new Promise((resolve) => {
      bcrypt.compare(user.password, list[0].password, (err, isMatch) => {
        if (err) {
          resolve(false);
        } else {
          resolve(isMatch);
        }
      });
    });

    if (!isPasswordValid) {
      return { error: "Senha atual inválida!" };
    }

    newUser.password = newEncrypt;

    const uid = await getUserByEmail(email);

    await admin.auth().updateUser(uid, { password: user.new_password });
  }

  delete newUser.id;

  await datastore.updateEntity(namespace, "User", list[0].id, newUser);

  newUser.logged = true;

  delete newUser.paid;
  delete newUser.payday;
  delete newUser.password;
  delete newUser.paymentInfo;

  return newUser;
};

const authentication = async (auth) => {
  const user = {
    logged: false,
    id: undefined,
    name: undefined,
    email: undefined,
    phone: undefined,
    error: undefined,
    username: undefined,
  };

  const { token, auth_type, password } = auth;

  try {
    const { email } = await admin.auth().verifyIdToken(token);

    if (email) {
      const list = await datastore.getEntitiesWithFilter(namespace, "User", "email", email);

      if (!list?.length || !list?.[0]?.paid || !list?.[0]?.active) {
        user.logged = false;
        return;
      }

      if (auth_type === "EMAIL") {
        const isPasswordValid = await new Promise((resolve) => {
          bcrypt.compare(password, list[0].password, (err, isMatch) => {
            if (err) {
              resolve(false);
            } else {
              resolve(isMatch);
            }
          });
        });

        if (!isPasswordValid) {
          user.logged = false;
          return;
        }
      }

      user.email = email;
      user.logged = true;
      user.id = list?.[0]?.id;
      user.name = list?.[0]?.name;
      user.phone = list?.[0]?.phone;
      user.birth = list?.[0]?.birth;
      user.active = list?.[0]?.active;
      user.notify = list?.[0]?.notify;
      user.username = list?.[0]?.username;
    }
  } catch (error) {
    user.error = error;
    user.logged = false;
  } finally {
    return user;
  }
};

module.exports = {
  updateUser,
  createUser,
  getUserByEmail,
  authentication,
  createAccessToken,
  verifyAccessToken,
  updatedPassowordUser,
};
