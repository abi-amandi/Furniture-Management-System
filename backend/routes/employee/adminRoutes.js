const express = require('express')
const authMiddleware = require("../../middleware/authMiddleware");
const { getAllUsersController, getAllManagersController, changeAccountStatusController } = require('../../controllers/employeeControllers/adminCtrl');

const router = express.Router()

//GET METHOD || EMPLOYEES
router.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET METHOD || MANAGERS
router.get('/getAllManagers', authMiddleware, getAllManagersController)

//POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)

module.exports = router