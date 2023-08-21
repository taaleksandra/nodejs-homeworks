// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// parse application/json
app.use(express.json());
// cors
app.use(cors());

const routerApi = require("./routes/api/contacts");
app.use("/api/contacts", routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
