var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var PORT = normalizePort(process.env.PORT || '3000');
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./routes/index");

app.use("/", router);

db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
