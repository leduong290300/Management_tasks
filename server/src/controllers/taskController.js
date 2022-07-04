const connect = require("../config/connectDB");
const systemLogs = require("../config/configWinston").systemLogs;
const controllerLogs = require("../config/configWinston").controllerLogs;

const handleGetAllTask = (req, res) => {
  // const { userId } = req;
  // try {
  //   connect.query(
  //     `select * from tasks where account_id = ?`,
  //     [userId],
  //     (err, results) => {
  //       if (err) {
  //         return controllerLogs.error(err.message);
  //       } else {
  //         return res.status(200).json({
  //           success: true,
  //           results,
  //         });
  //       }
  //     },
  //   );
  // } catch (error) {
  //   return systemLogs.error(error);
  // }
};

const handleCreateNewTask = (req, res) => {
  // const { title, content, status } = req.body;
  // const { userId } = req;
  // try {
  //   connect.query(
  //     `insert into tasks (title, content, status, account_id) values (?,?,?,?)`,
  //     [title, content, status, userId],
  //     (err, result) => {
  //       if (err) {
  //         controllerLogs.error(err.message);
  //       } else {
  //         return res.status(200).json({
  //           success: true,
  //           message: "Thêm công việc thành công",
  //         });
  //       }
  //     },
  //   );
  // } catch (error) {
  //   return systemLogs.error(error);
  // }
};

const handleUpdateTask = (req, res) => {};

const handleDeleteTask = (req, res) => {};

module.exports = {
  handleGetAllTask,
  handleCreateNewTask,
  handleUpdateTask,
  handleDeleteTask,
};
