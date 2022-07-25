const Users = require("../models").Users;
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  //Create User
  createUser: async (req, res) => {
    try {
      body = req.body;
      const salt = genSaltSync(10);
      var usr = {
        body,
      };
      usr.body.password = hashSync(body.password, salt);
      const user = await Users.create(body);
      return res.status(201).json({
        user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //Get all User
  getAllUsers: async (req, res) => {
    try {
      const pageAsNumber = Number.parseInt(req.body.page);
      const sizeAsNumber = Number.parseInt(req.body.size);
      let page = 0;
      if (!Number.isNaN(pageAsNumber)) {
        page = pageAsNumber;
      }
      let size = 0;
      if (!Number.isNaN(sizeAsNumber)) {
        size = sizeAsNumber;
      }
      if (Object.keys(req.body).length === 0) {
        const users = await Users.findAll();
        return res.status(200).send({ users });
      } else {
        const users = await Users.findAndCountAll({
          limit: Number(size),
          offset: page * size,
        });
        return res.status(200).send({
          content: users.rows,
          totalPages: Math.ceil(users.count / size),
        });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  //Get user by id
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findOne({
        where: { id: id },
      });
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(404).send("User with the specified ID does not exists");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  //Update User
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const salt = genSaltSync(10);
      var usr = {
        body: req.body,
      };

      usr.body.password = hashSync(req.body.password, salt);
      const updated = await Users.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedUser = await Users.findOne({ where: { id: id } });
        return res.status(200).json({ user: updatedUser });
      }
      throw new Error("User not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  //Delete User
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Users.destroy({
        where: { id: id },
      });
      if (deleted) {
        return res.json("User deleted");
      }
      throw new Error("User not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  //Get BY Email
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: email },
      });
      if (user) {
        return res.status(200).json({ user });
      }
      return res
        .status(404)
        .send("User with the specified email does not exists");
    } catch (error) {
      console.log(error);
    }
  },

  //login
  login: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({
        where: { email: email },
      });
      if (!user) {
        return res.json({
          success: false,
          data: "Invalid email",
        });
      }

      const result = compareSync(req.body.password, user.password);
      if (result) {
        user.password = undefined;
        const jsontoken = sign({ result: user }, "qwe1234", {
          expiresIn: "1h",
        });
        return res.json({
          success: true,
          message: "login successfuly",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: false,
          data: "Invalid Password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
