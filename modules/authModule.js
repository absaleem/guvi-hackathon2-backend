const jwt = require("jsonwebtoken");

// Authentication
exports.authenticateUser = (req, res, next) => {
  // Check whether access token exists in headers
  if (!req.headers.accesstoken)
    return res.status(400).send({ msg: "Token not found" });

  // Verify Token
  try {
    //console.log(req.headers.accesstoken);
    const user = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY);
    req.body.currentuser = user;
    next();
  } catch (err) {
   // console.error(err);
    return res.status(400).send({ msg: "Unauthorised user access" });
  }
};

// Authorisation
exports.authorizeUser = (req, res, next) => {
    //console.log(req.body.currentuser.role);
  if (req.body.currentuser.role === "admin")  next();
  else
    return res
      .status(404)
      .send({ msg: "Forbidden : No permission to access API" });
};