const express = require("express");
const apiRouter = require("./router/api");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*Connect database

//* Router
apiRouter(app);

app.listen(port);
