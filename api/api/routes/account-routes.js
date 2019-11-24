const { celebrate } = require('celebrate')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/account-controller')
const model = require('../models/validation-model')

router.post('/:id', celebrate(model.accountCreateModel), controller.create)
router.get('/:id', celebrate(model.accountReadModel), controller.read)
router.patch('/:id', celebrate(model.accountUpdateModel), controller.update)

module.exports = router
