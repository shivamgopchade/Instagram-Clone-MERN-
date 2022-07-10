const jwt = require("jsonwebtoken");

//authentication verifier
function is_authenticated(req, res, next) {
  //console.log("in middleware");
  const token = req.cookies.jwt;
  //console.log(token);
  if (token) {
    jwt.verify(token, "instagramclonebyshivam123@@$$", (err, decodedToken) => {
      if (err) res.status(400).json({ error: "login again" });
      else {
        //console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(400).json({ error: "login again" });
  }
}
module.exports = is_authenticated;
