const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const messageController = require("./controllers/messageController");

app.use("/api/messages", messageController);

const port = process.env.PORT || 3008;

app.listen(port, () => {
  console.log("running on port ", port);
});
