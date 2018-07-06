const db = require("../models");
const Op = require('sequelize').Op;
// const {
//   SignUpController
// } = require("../controllers");

module.exports = (app) => {
  // POST route for signing up /signup
  app.post("/signup", async(req, res) => {
    try {
      let newUser = await db.users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        user_permissions_delete: req.body.user_permissions_delete
      });
      res.status(200).send()
    } catch (error) {
      next({status: 401, message: 'signup failed'});
    }
  });


  // POST route for logging in
  app.post("/users/login", async(req, res, next) => {
    try {
      let users = await db.Account.findOne({
        where: {
          [Op.or]: [
            {email: req.body.username},
            {username: req.body.username}
          ]
        }
      });

      let valid = await users.validPassword(req.body.password);

      if (!valid) {
        next({status: 401, message: 'Username/Password Wrong'});
      }

      res.status(200).send(res.jwt({
        id: users.id,
        username: users.username
      }));
    } catch (error) {
      next({status: 401, message: 'Username/Password Wrong'});
    }
  });

  app.get("/seed", async(req, res) => {
    let users = await db.Account.create({
      username: 'test',
      password: 'password',
      email: 'test@test.com'
    });

    res.status(200).send(users);
  });
};
