const router = require("express").Router();
const { validationRules, validate } = require("../middlewares/validator");
const { addMessage, fetchMessages } = require("../databases/messageDB");

router.post("/", validationRules("fetchMessages"), validate, (req, res) => {
  const { userId } = req.body;
  let status = 201;
  const response = fetchMessages(userId);
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

module.exports = router;
