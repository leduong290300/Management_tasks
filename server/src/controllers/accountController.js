const connect = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const systemLogs = require("../config/configWinston").systemLogs;
const controllerLogs = require("../config/configWinston").controllerLogs;

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      connect.query(
        `select password from accounts where email =?`,
        [email],
        (err, results) => {
          controllerLogs.error(err);
          if (bcrypt.compareSync(password, results[0].password)) {
            return res.status(200).json({
              success: true,
              message: "Đăng nhập thành công",
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
                    `insert into accounts (firstName, lastName, email, password) values (?,?,?,?)`,
                    [firstName, lastName, email, hashPassword],
                    function (err, insert) {
                      if (err) {
                        controllerLogs.error(err.message);
                      } else {
                        return res.status(200).json({
                          success: true,
                          message: "Đăng ký tài khoản thành công",
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

const handleForgotPassword = (req, res) => {};

module.exports = { handleLogin, handleRegister, handleForgotPassword };
