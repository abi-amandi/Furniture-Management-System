const express = require("express");
const {
    loginController,
    registerController,
    authController,
    applyManagerController,
    getAllNotificationController,
    deleteAllNotificationController,
    bookAppointmentController,
    userAppointmentsController,
    updateUserController,
    deleteUserController
} = require('../../controllers/employeeControllers/userCtrl');

const { getAllManagersController } = require("../../controllers/employeeControllers/adminCtrl");
const authMiddleware = require("../../middleware/authMiddleware");

// Router object
const router = express.Router();

// Routes

// LOGIN - POST
router.post('/login', loginController);

// REGISTER - POST
router.post('/register', registerController);

// AUTH - POST
router.post('/getUserData', authMiddleware, authController);

// APPLY MANAGER - POST
router.post('/apply-manager', authMiddleware, applyManagerController);

// GET ALL NOTIFICATIONS - POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// DELETE ALL NOTIFICATIONS - POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// GET ALL MANAGERS - GET
router.get('/getAllManagers', authMiddleware, getAllManagersController);

// BOOK LEAVE APPOINTMENT - POST
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// GET USER APPOINTMENTS - GET
router.get('/user-appointments', authMiddleware, userAppointmentsController);

// UPDATE USER DETAILS - PUT
router.put('/update-user/:userId', authMiddleware, updateUserController);

// DELETE USER - DELETE
router.delete('/delete-user/:userId', authMiddleware, deleteUserController);

module.exports = router;
