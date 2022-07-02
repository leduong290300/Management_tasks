const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

const apiRouter = (app) => {
  /**
   * Router: /api/v1/login
   * Description: Đăng nhập tài khoản
   * Method: POST
   * */
  router.post("/login", accountController.handleLogin);

  /**
   * Router: /api/v1/register
   * Description: Đăng ký tài khoản
   * Method: POST
   * */
  router.post("/register", accountController.handleRegister);

  /**
   * Router: /api/v1/forgot_password
   * Description: Thay đổi mật khẩu
   * Method: PUT
   * */
  router.post("/forgot_password", accountController.handleForgotPassword);

  return app.use("/api/v1", router);
};

module.exports = apiRouter;
