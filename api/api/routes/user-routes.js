const { celebrate } = require('celebrate')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/user-controller')
const model = require('../models/validation-model')
const auth = require('../middlewares/authentication-middleware')

router.post('/', celebrate(model.userCreateModel), controller.create)
router.get('/:id', auth, celebrate(model.userReadModel), controller.read)
router.patch('/:id', auth, celebrate(model.userUpdateModel), controller.update)

module.exports = router
