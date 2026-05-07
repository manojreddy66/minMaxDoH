const Joi = require("joi");

/**
 * @description Returns schema to validate get groups request query params
 * @returns {Object} Joi schema
 */
function getValidationSchema() {
  return Joi.object({
    scenarioId: Joi.string().trim().uuid().required().messages({
      "any.required":
        "ValidationError: scenarioId is required and must be a uuid.",
      "string.base":
        "ValidationError: scenarioId is required and must be a uuid.",
      "string.empty":
        "ValidationError: scenarioId is required and must be a uuid.",
      "string.guid":
        "ValidationError: scenarioId is required and must be a uuid.",
    }),
    userEmail: Joi.string()
      .trim()
      .required()
      .email({ tlds: { allow: ["com"] } })
      .messages({
        "any.required":
          "ValidationError: userEmail is required and must be a string.",
        "string.base":
          "ValidationError: userEmail is required and must be a string.",
        "string.email.tlds": "ValidationError: Invalid userEmail.",
        "any.only":
          "ValidationError: userEmail is required and must be a string.",
        "string.empty":
          "ValidationError: userEmail is required and must be a string.",
        "string.email": "ValidationError: Invalid userEmail.",
      }),
  });
}

module.exports = {
  getValidationSchema,
};
