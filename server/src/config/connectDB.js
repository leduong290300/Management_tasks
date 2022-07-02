const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "management_tasks",
  password: "Leduong@2903",
});

try {
  connect.connect(function (err) {
    if (err) {
      console.error("Error connecting: " + err.stack);
      return;
    }

    console.log("Connect success");
  });
} catch (error) {
  connect.end();
}
module.exports = connect;
