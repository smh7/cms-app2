const db = require("../models");
const Op = require('sequelize').Op;

module.exports = (app) => {
  // POST route for logging in
  app.post("/user/login", async(req, res, next) => {
    try {
      let account = await db.Account.findOne({
        where: {
          [Op.or]: [
            {email: req.body.username},
            {username: req.body.username}
          ]
        }
      });

      let valid = await account.validPassword(req.body.password);

      if (!valid) {
        next({status: 401, message: 'Username/Password Wrong'});
      }

      res.status(200).send(res.jwt({
        id: account.id,
        username: account.username
      }));
    } catch (error) {
      next({status: 401, message: 'Username/Password Wrong'});
    }
  });

  app.get("/seed", async(req, res) => {
    let account = await db.Account.create({
      username: 'test',
      password: 'password',
      email: 'test@test.com'
    });

    res.status(200).send(account);
  });
};
