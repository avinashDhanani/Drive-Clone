const { header } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    var token = "";
    console.log("You are in auth")
    if (req.body.Authorization) {
      token = req.body.Authorization.toString().replace("Bearer ", "");
    } else {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    const decoded = jwt.verify(token, "thisismynewcourse");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
