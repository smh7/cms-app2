const path = require("path");
const jwt = require('jwt-express');

module.exports = (app) => {
  // Each of the below routes just handles the HTML page that the user gets sent to.
  // index route loads index.html the public site
  app.get("/", jwt.active(), async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // signup page unprotected route to signup.html
  app.get("/signup", jwt.active(), async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // login page unprotected route to login.html
  app.get("/user/login", jwt.active(), async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // authenticated user can see site with access to CRUD methods
  app.get("/cms", jwt.active(), async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads addcard.html where authenticated user can add new cards
  app.get("/cms/add", jwt.active(), async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/addcard.html"));
  });
};
