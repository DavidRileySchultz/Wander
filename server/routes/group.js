const express = require('express')
const groupController = require('../controllers/group');
const validator = require('../utils/validators')

const router = express.Router()
router.post('/create', validator.validateCreateGroupRequest, groupController.create)
router.post('/invite', groupController.invite)
router.post('/accept', groupController.accept)
router.post('/leave', groupController.leave)
router.post('/remove', groupController.remove)
router.post('/contribute', groupController.contribute)

module.exports = router