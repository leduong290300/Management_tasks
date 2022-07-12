const express = require("express");
const apiRouter = require("./router/api");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* Router
apiRouter(app);

app.listen(port);
