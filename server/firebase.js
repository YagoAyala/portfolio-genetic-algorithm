const admin = require("firebase-admin");

require("dotenv").config();

const firebaseCredentials = require("./src/config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
});
