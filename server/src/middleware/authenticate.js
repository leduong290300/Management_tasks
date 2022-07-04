const jwt = require("jsonwebtoken");
const authenticateLogs = require("../config/configWinston").authenticateLogs;

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Token không hợp lệ" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    authenticateLogs.error(error);
    return res
      .status(403)
      .json({ success: false, message: "Token không tồn tại" });
  }
};
module.exports = verifyToken;