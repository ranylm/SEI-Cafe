require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "client", "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "client", "dist")));

//api
app.use(require("./config/checktoken"));
app.use("/api/users", require("./routes/api/users"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`connected on ${PORT}`);
});
