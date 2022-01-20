const Joi = require('joi');

const validator = Joi.object({
  surah_id: Joi.number().integer().min(1).max(114)
    .required(),
});

module.exports = (object) => validator.validateAsync(object, {
  errors: {
    wrap: {
      label: '',
    },
  },
  context: {
    object,
  },
});
