const connect = require("../config/connectDB");
const argon2 = require("argon2");

const handleLogin = (req, res) => {};

const handleRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    connect.query(
      `select count(*) as cnt from accounts where email = ?`,
      [email],
      async function (err, data) {
        if (err) {
          return err;
        } else {
          if (data[0].cnt > 0) {
            return res.status(400).json({
              success: false,
              message: "Email đăng ký tài khoản đã được sử dụng",
            });
          } else {
            const hashPassword = await argon2.hash(password);
            connect.query(
              `insert into accounts (firstName, lastName, email, password) values (?,?,?,?)`,
              [firstName, lastName, email, hashPassword],
              function (err, insert) {
                if (err) {
                  console.log(err.sqlMessage);
                } else {
                  return res.status(200).json({
                    success: true,
                    message: "Đăng ký tài khoản thành công",
                  });
                }
              },
            );
          }
        }
      },
    );
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Đã có lỗi xảy ra" });
  }
};

const handleForgotPassword = (req, res) => {};

module.exports = { handleLogin, handleRegister, handleForgotPassword };
