const connect = require("../config/connectDB");
const systemLogs = require("../config/configWinston").systemLogs;
const controllerLogs = require("../config/configWinston").controllerLogs;

const handleGetAllTask = (req, res) => {
  const { userId } = req;
  try {
    connect.query(
      `select * from tasks where account_id = ?`,
      [userId],
      (err, results) => {
        if (err) {
          return controllerLogs.error(err.message);
        } else {
          return res.status(200).json({
            success: true,
            results,
          });
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

const handleCreateNewTask = (req, res) => {
  const { title, content, status } = req.body;
  const { userId } = req;
  try {
    connect.query(
      `insert into tasks (title, content, status, account_id) values (?,?,?,?)`,
      [title, content, status, userId],
      (err, result) => {
        if (err) {
          controllerLogs.error(err.message);
        } else {
          return res.status(200).json({
            success: true,
            message: "Thêm công việc thành công",
          });
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

const handleUpdateTask = (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { title, content, status } = req.body;

  try {
    connect.query(
      `select * from tasks where id =? and account_id=?`,
      [id, userId],
      (err, result) => {
        if (err) {
          return controllerLogs.error(err.message);
        } else {
          if (result[0].length <= 0) {
            return res.status(401).json({
              success: false,
              message: "Công việc không tồn tại",
            });
          } else {
            connect.query(
              `update tasks set title=?,content=?,status=?`,
              [
                title ? title : result[0].title,
                content ? content : result[0].content,
                status ? status : result[0].status,
              ],
              (err) => {
                if (err) {
                  return controllerLogs.error(err.message);
                } else {
                  return res.status(200).json({
                    success: true,
                    message: "Cập nhật công việc thành công",
                  });
                }
              },
            );
          }
        }
      },
    );
  } catch (error) {}
};

const handleDeleteTask = (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    connect.query(
      `select count(*) as cnt from tasks where id =? and account_id=?`,
      [id, userId],
      (err, result) => {
        if (err) {
          return controllerLogs.error(err.message);
        } else {
          if (result[0].cnt <= 0) {
            return res.status(401).json({
              success: false,
              message: "Công việc không tồn tại",
            });
          } else {
            connect.query(
              `delete from tasks where id =? and account_id =?`,
              [id, userId],
              (err) => {
                if (err) {
                  return controllerLogs.error(err.message);
                } else {
                  return res.status(200).json({
                    success: true,
                    message: "Xóa công việc thành công",
                  });
                }
              },
            );
          }
        }
      },
    );
  } catch (error) {
    return systemLogs.error(error);
  }
};

module.exports = {
  handleGetAllTask,
  handleCreateNewTask,
  handleUpdateTask,
  handleDeleteTask,
};
