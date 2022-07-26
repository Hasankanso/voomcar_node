const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: false,
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Access denied! unauthorized user",
      });
    }
  },
};
