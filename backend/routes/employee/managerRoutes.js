const express = require('express')
const authMiddleware = require("../../middleware/authMiddleware");
const { getManagerInfoController, updateProfileController, getManagerByIdController, managerAppointmentsController, updateStatusController } = require('../../controllers/employeeControllers/managerCtrl')
const router = express.Router()

//POST SINGLE MANAGER INFO
router.post('/getManagerInfo', authMiddleware, getManagerInfoController)

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController)

//POST GET SINGLE DOC INFO
router.post('/getManagerById', authMiddleware, getManagerByIdController)

//GET Appointments
router.get('/manager-appointments', authMiddleware, managerAppointmentsController)

//POST Update Status
router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router