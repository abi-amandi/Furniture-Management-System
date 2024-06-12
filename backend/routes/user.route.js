const express = require('express')
const { registerUser, loginUser, LogoutUser } = require('../controllers/user.controller')
const { getUserProfile, updateUserProfile, deleteUserProfile , getAllUsers, getUserById, updateUserById,deleteUserById } = require('../controllers/user.controller');
const router = express.Router()




router.post('/signup', registerUser)
router.post('/login', loginUser)
router.post('/logout', LogoutUser)



router.get('/profile', getUserProfile)
router.put('/profile', updateUserProfile)
router.delete('/profile', deleteUserProfile)


router.get('/users', getAllUsers);        
router.get('/users/:id', getUserById);      
router.put('/users/:id', updateUserById);  
router.delete('/users/:id', deleteUserById);

module.exports = router