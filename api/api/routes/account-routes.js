const express = require('express')
const router = express.Router()
const controller = require('../controllers/account-controller')

router.post('/', controller.create)
router.get('/:id', controller.read)
router.patch('/:id', controller.update)

module.exports = router