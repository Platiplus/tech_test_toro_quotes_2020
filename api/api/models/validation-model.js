const { Joi } = require('celebrate')

const schemas = {
  userCreateModel: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  },
  userReadModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  userUpdateModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    body: Joi.object().min(1).keys({
      action: Joi.string(),
      stock: Joi.object()
    })
  },
  accountCreateModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  accountReadModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  accountUpdateModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    body: Joi.object().min(1).keys({
      action: Joi.string(),
      value: Joi.number()
    })
  }
}

module.exports = schemas
