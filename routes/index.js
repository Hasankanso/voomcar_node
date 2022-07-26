const express = require("express");
const router = express.Router();

//define root route
router.get("/", (req, res) => {
  res.send("Welcome to the main route");
});
const userRoute = require("./users");
router.use("/users", userRoute);

module.exports = router;
