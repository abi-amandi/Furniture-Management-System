const userModel = require('../../models/employee/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const managerModel = require('../../models/employee/managerModel');
const appointmentModel = require('../../models/employee/appointmentModel');

const updateUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedFields = req.body;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        for (let key in updatedFields) {
            if (updatedFields.hasOwnProperty(key)) {
                user[key] = updatedFields[key];
            }
        }

        await user.save();
        res.status(200).send({ success: true, message: 'User updated successfully', data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error updating user', error: error.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).send({ success: false, message: 'Invalid user ID' });
        }

        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.status(200).send({ success: true, message: 'User deleted successfully', data: deletedUser });
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).send({ success: false, message: 'Error deleting user', error: error.message });
    }
};

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).send({ message: 'User Already Exists', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        req.body.salary = 0;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Registered Successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Register Controller ${error.message}` });
    }
};

const loginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user)
        {
            return res.status(200).send({message:'user not found',success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message: 'Invalid Email or password', success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: '1d'})
        res.status(200).send({message: 'login Success', success:true, token})

    } catch (error) {
        console.log(error)
        res.status(500).send({message:`Error in login CTRL ${error.message}`,})
    }
};

const authController = async (req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user)
        {
            return res.status(200).send({
                message: 'user not found',
                success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'auth error', success:false, error})
    }
};

const applyManagerController = async(req,res) => {
    try {
        const newManager = await managerModel({...req.body, status:'pending'})
        await newManager.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type: 'apply-manager-request',
            message: `${newManager.firstName} ${newManager.lastName} Has Applied For A Manager Account`,
            data:{
                managerId: newManager._id,
                name: newManager.firstName + " " + newManager.lastName,
                onClickPath: '/admin/managers'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success:true,
            message: 'Manager Account Applied Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error while Applying For Manager'
        })
    }
};

const getAllNotificationController = async(req, res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId});
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
         success:true,
         message: 'all notification marked as read',
         data:updatedUser,
        })
 
     } catch (error) {
         console.log(error)
         res.status(500).send({
             message: 'Error in notification',
             success: false,
             error,
         })
     }
};

const deleteAllNotificationController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined;
        res.status(200).send({
            success:true,
            message: "Notification Deleted Successfully",
            data: updatedUser,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'unable to delete all notification',
            error
        })
    }
};

const getAllManagersController = async (req,res) =>{
    try {
        const managers = await managerModel.find({status:'approved'})
        res.status(200).send({
            success:true,
            message:"Managers Lists Fetched Successfully",
            data: managers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error While Fetching Manager'
        })
    }
};

const bookAppointmentController = async(req,res) => {
    try {
        const { managerId, userId, managerInfo, appDate, userInfo, type, reason, username } = req.body;
        const newAppointment = new appointmentModel({
            managerId,
            userId,
            managerInfo,
            appDate, // Save the selected date from the frontend
            userInfo,
            type,
            reason,
            username
        });
        await newAppointment.save();
        const user = await userModel.findOne({_id: managerInfo.userId}); // Assuming you want to notify the manager about the new appointment
        user.notification.push({
            type:'New-appointment-request',
            message: `A New Leave Appointment Request from ${userInfo.username}`,
            onClickPath: '/user/appointments',
        });
        await user.save();
        res.status(200).send({
            success:true,
            message:"Leave Appointment Book Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            error,
            message:'Error while Booking Leave Appointment'
        });
    }
};

const userAppointmentsController = async(req, res) => {
    try {
        const appointments = await appointmentModel.find({userId:req.body.userId});
        res.status(200).send({
            success: true,
            message: 'Users Appointments Fetch Successfully',
            data: appointments,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in User Appointment'
        })
    }
};

module.exports = {
    loginController, 
    registerController, 
    authController, 
    applyManagerController, 
    getAllNotificationController,
    deleteAllNotificationController, 
    getAllManagersController, 
    bookAppointmentController, 
    userAppointmentsController,  
    updateUserController,
    deleteUserController
};
