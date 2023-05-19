require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(function (req, res, next) {
  setTimeout(next, 1000);
});

app.use(favicon(path.join(__dirname, "client", "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "client", "dist")));

//api
app.use(require("./config/checktoken"));
app.use("/api/users", require("./routes/api/users"));

const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/items", ensureLoggedIn, require("./routes/api/items"));
app.use("/api/orders", ensureLoggedIn, require("./routes/api/orders"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`connected on ${PORT}`);
});
