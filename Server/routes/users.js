const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  login,
} = require("../controller/user.controller");
const { checkToken } = require("../auth/token_validation");

//Create User
router.post("/", checkToken, createUser);

//Get All Users
router.get("/", checkToken, getAllUsers);

//Get User By Id
router.get("/:id", checkToken, getUserById);

//Update User
router.put("/:id", checkToken, updateUser);

//Delete User
router.delete("/:id", checkToken, deleteUser);

//login route
router.post("/login", login);

//get user by email
router.post("/user/email", checkToken, getUserByEmail);

module.exports = router;
