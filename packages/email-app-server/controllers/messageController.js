const router = require("express").Router();
const { validationRules, validate } = require("../middlewares/validator");
const {
  addMessage,
  getMessages,
  deleteMessage,
  getUsers,
} = require("../databases/messageDB");

router.post("/", validationRules("getMessages"), validate, (req, res) => {
  const { userId } = req.body;
  let status = 201;
  const response = getMessages(userId);
  const { error, result } = response;
  if (error !== "") status = 404;
  if (
    status !== 404 &&
    result.received.length === 0 &&
    result.sent.length === 0
  )
    status = 204;
  res.status(status).send({ ...response });
});

router.post(
  "/addMessage",
  validationRules("addMessage"),
  validate,
  (req, res) => {
    let status = 201;
    const response = addMessage(req.body);
    if (response.error !== "") status = 404;
    res.status(status).send({ ...response });
  }
);

router.delete(
  "/deleteMessage",
  validationRules("deleteMessage"),
  validate,
  (req, res) => {
    console.log("deleteMessage", req.body);
    const { messageId, deleteType } = req.body;
    let status = 200;
    const response = deleteMessage(messageId, deleteType);
    const { error, result } = response;
    if (error !== "") status = 404;
    res.status(status).send({ ...response });
  }
);

router.post("/getUsers", validationRules("getUsers"), validate, (req, res) => {
  const { userId } = req.body;
  let status = 200;
  let response = [];
  if (userId === undefined) {
    status = 404;
  } else {
    response = getUsers(userId);
  }
  res.status(status).send(response);
});

module.exports = router;
