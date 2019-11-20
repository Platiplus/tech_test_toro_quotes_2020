const { Joi } = require('celebrate')

const schemas = {
  userCreateModel: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      initialBalance: Joi.number().required()
    })
  },
  userReadOneModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  userUpdateModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    body: Joi.object().min(1).keys({
      username: Joi.string(),
      password: Joi.string(),
      email: Joi.string().email(),
      initialBalance: Joi.number()
    })
  },
  userDeleteModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  accountCreateModel: {
    params: Joi.object().keys({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    body: Joi.object().keys({
      description: Joi.string().required(),
      balance: Joi.number().required()
    })
  },
  accountReadOneModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  accountReadAllModel: {
    params: Joi.object().keys({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  },
  accountUpdateModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    body: Joi.object().min(1).keys({
      description: Joi.string(),
      balance: Joi.number()
    })
  },
  accountDeleteModel: {
    params: Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    })
  }
}

module.exports = schemas
