const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/authenticate");

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

  /**
   * Router: /api/v1/all
   * Description: Lây tất cả bài viết theo email người dùng
   * Method: GET
   * */
  router.route("/all").get(verifyToken, taskController.handleGetAllTask);

  /**
   * Router: /api/v1/create_task
   * Description: Tạo bài viết mới
   * Method: post
   * */
  router
    .route("/create_task")
    .post(verifyToken, taskController.handleCreateNewTask);

  /**
   * Router: /api/v1/update_task/:id
   * Description: Cập nhật bài viết
   * Method: patch
   * */
  router
    .route("/update_task/:id")
    .patch(verifyToken, taskController.handleUpdateTask);

  /**
   * Router: /api/v1/task/:id
   * Description: Xóa bài viết
   * Method: delete
   * */
  router
    .route("/task/:id")
    .delete(verifyToken, taskController.handleDeleteTask);

  return app.use("/api/v1", router);
};

module.exports = apiRouter;
