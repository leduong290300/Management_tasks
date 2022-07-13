const connect = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const systemLogs = require("../config/configWinston").systemLogs;
const controllerLogs = require("../config/configWinston").controllerLogs;
const jwt = require("jsonwebtoken");

const handleVerify = (req, res) => {
  try {
    connect.query(
      `select * from accounts where id =?`,
      [req.userId],
      (err, result) => {
        if (err) {
          controllerLogs.error(err);
        } else {
          if (!result) {
            return res.status(400).json({
              success: false,
              message: "Tài khoản không tồn tại",
            });
          } else {
            return res.status(200).json({
              success: true,
              account: result[0],
            });
          }
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      connect.query(
        `select * from accounts where email =?`,
        [email],
        (err, results) => {
          controllerLogs.error(err);
          if (bcrypt.compareSync(password, results[0].password)) {
            const accessToken = jwt.sign(
              { userId: results[0].id },
              process.env.ACCESS_TOKEN_SECRET,
            );
            return res.status(200).json({
              success: true,
              message: "Đăng nhập thành công",
              accessToken,
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Email hoặc mật khẩu không chính xác",
            });
          }
        },
      );
    }
  } catch (error) {
    return systemLogs.error(error);
  }
};

const handleRegister = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //* Lấy thời gian hiện tại
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Kiểm tra lại trường email",
      });
    }
    connect.query(
      `select count(*) as cnt from accounts where email = ?`,
      [email],
      (err, results) => {
        if (err) {
          return controllerLogs.error(err.message);
        } else {
          if (results[0].cnt > 0) {
            return res.status(400).json({
              success: false,
              message: "Email đăng ký tài khoản đã tồn tại",
            });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hashPassword) => {
                if (err) {
                  controllerLogs.error(err.message);
                } else {
                  connect.query(
                    `insert into accounts (firstName, lastName, email, password,createdAt) values (?,?,?,?,?)`,
                    [firstName, lastName, email, hashPassword, dateTime],
                    (err, result) => {
                      if (err) {
                        controllerLogs.error(err.message);
                      } else {
                        const accessToken = jwt.sign(
                          { userId: result.insertId },
                          process.env.ACCESS_TOKEN_SECRET,
                        );
                        return res.status(200).json({
                          success: true,
                          message: "Đăng ký tài khoản thành công",
                          accessToken,
                        });
                      }
                    },
                  );
                }
              });
            });
          }
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

const handleForgotPassword = (req, res) => {
  const { email, password } = req.body;
  //* Lấy thời gian hiện tại
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;

  try {
    connect.query(
      `select * from accounts where email =?`,
      [email],
      (err, result) => {
        if (err) {
          return controllerLogs.error(err.message);
        } else {
          if (result.length <= 0) {
            return res.status(400).json({
              success: false,
              message: "Tài khoản không tồn tại",
            });
          } else {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(password, salt, (err, hashPassword) => {
                if (err) {
                  return controllerLogs.error(err.message);
                } else {
                  connect.query(
                    `update accounts set password =?,updatedAt=? where email=?`,
                    [hashPassword, dateTime, email],
                    (err) => {
                      if (err) {
                        return controllerLogs.error(err.message);
                      } else {
                        return res.status(200).json({
                          success: true,
                          message: "Cập nhật mật khẩu thành công",
                        });
                      }
                    },
                  );
                }
              });
            });
          }
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

module.exports = {
  handleVerify,
  handleLogin,
  handleRegister,
  handleForgotPassword,
};
