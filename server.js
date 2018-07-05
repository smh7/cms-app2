const express = require("express");
const bodyParser = require("body-parser");
const keys = require("./keys");
const jwt = require('jwt-express');
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/config/config.json`)[env];

const PORT = process.env.PORT || 3000;
const db = require("./models");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));
// JWT Token Configuration
app.use(jwt.init("WTFQC9PY8QAFVHUR6XZHG225ZGG5GFTJGILN", {
    cookies: false
}));
// app.use(jwit.init(config.tokenSecret, {
//    cookies:false
//}))
// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
//Error Handler
app.use((err, req, res, next) => {
    console.log(`${req.method} ${req.url} - ${err.message}`);

    if (err.name == 'JWTExpressError') err.status = 401;

    res.status(err.status || 400).send({message: `${err.message}`});
});
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(() => {
  app.listen(PORT, () => console.log("App listening on PORT " + PORT));
});
