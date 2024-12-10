// const { db } = require("../../db");

// const collection = db.collection("lotofacil-games").doc("games");

const saveFileService = async (text) => {
  if (!text) {
    throw new Error("text not found!");
  }

  const [keyName] = Object.keys(text);

//  await collection.update({
//     [keyName]: JSON.stringify(text[keyName]),
//   });

  return true;
};

const getFilesService = async () => {
  // const config = await collection.get().then((res) => res.data());
  // return config;
  return {};
};

module.exports = {
  saveFileService,
  getFilesService,
};
