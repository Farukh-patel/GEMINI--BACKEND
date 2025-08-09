const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.send({ success: false, message: "Please login to system." });
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.jwt_secret);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

      if(!user){
        return res.send({status: false, message:'Invalid user'});
      }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in middleware", error.message);
    return res.send({ success: false, message: "Please login to system." });
  }
};
