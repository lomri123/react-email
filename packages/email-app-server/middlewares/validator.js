const { body, check, validationResult } = require("express-validator");

const validationRules = (action) => {
  switch (action) {
    case "addMessage": {
      return [
        body("subject", "Invalid subject").exists().isString().not().isEmpty(),
        body("sender", "Invalid sender").exists().isString().not().isEmpty(),
        body("receiver", "Invalid receiver")
          .exists()
          .isString()
          .not()
          .isEmpty(),
        body("text", "Invalid message body").exists().isString(),
      ];
    }
    case "fetchMessages": {
      return [
        body("userId", "Invalid user id").exists().isString().not().isEmpty(),
      ];
    }
    case "removeMessage": {
      return [
        body("id", "Invalid message id").exists().isString().not().isEmpty(),
        body("sender", "Invalid sender").exists().isString().not().isEmpty(),
      ];
    }
    default:
      return [];
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validationRules,
  validate,
};
