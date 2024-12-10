const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const checkLogged = require("./src/middleware/checkLogged");

const routes = require("./src/routes/index");

require("./firebase");

const app = express();
const limit = "50mb";

const server = app.listen();
server.setTimeout(1000000);

const router = express.Router();
router.use(bodyParser.json());

app.use(cors());

app.use(express.urlencoded({ limit, extended: true }));
app.use(express.json({ limit }));

app.use(bodyParser.urlencoded({ limit, extended: true }));
app.use(bodyParser.json({ limit }));

app.use(express.static(path.join(__dirname, "./build")));

app.use(checkLogged);

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server port: ${port}`);
});

module.exports = app;
