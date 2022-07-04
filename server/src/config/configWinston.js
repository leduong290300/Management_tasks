const winston = require("winston");
const { format } = require("winston");

const timezoned = () => {
  return new Date().toLocaleString("vn", {
    timeZone: "asia/ho_chi_minh",
  });
};

const systemLogs = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "logs/system/system_error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.prettyPrint(),
      ),
      maxsize: 5242880,
    }),
    new winston.transports.File({
      filename: "logs/system/system_info.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.prettyPrint(),
      ),
      maxsize: 5242880,
    }),
  ],
});

const controllerLogs = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "logs/controller/controller_error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.prettyPrint(),
      ),
      maxsize: 5242880,
    }),
    new winston.transports.File({
      filename: "logs/controller/controller_info.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.prettyPrint(),
      ),
      maxsize: 5242880,
    }),
  ],
});

const authenticateLogs = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "logs/authenticate/authenticate_error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.prettyPrint(),
      ),
      maxsize: 5242880,
    }),
  ],
});

// if (process.env.NODE_ENV !== "production") {
//   systemLogs.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     }),
//   );
// }

module.exports = {
  systemLogs: systemLogs,
  controllerLogs: controllerLogs,
  authenticateLogs: authenticateLogs,
};
