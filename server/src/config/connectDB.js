const systemLogs = require("../config/configWinston").systemLogs;
const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "management_tasks",
  password: "Leduong@2903",
  port: 3306,
});

try {
  connect.connect(function (err) {
    if (err) {
      systemLogs.error(`Error connecting: ${err.message}`);
      return;
    }
  });
} catch (error) {
  systemLogs.error(`Error system : ${error}`);
  connect.end();
}
module.exports = connect;
