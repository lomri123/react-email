const router = require("express").Router();
const { validationRules, validate } = require("../middlewares/validator");
const { addMessage, fetchMessages } = require("../databases/messageDB");

router.post("/", validationRules("fetchMessages"), validate, (req, res) => {
  const { userId } = req.body;
  let status = 201;
  const result = fetchMessages(userId);
  if (result.error !== "") status = 404;
  res.status(status).send(result);
});

router.post(
  "/addMessage",
  validationRules("addMessage"),
  validate,
  (req, res) => {
    let status = 201;
    const result = addMessage(req.body);
    if (result.error !== "") status = 404;
    res.status(status).send(result);
  }
);

module.exports = router;
