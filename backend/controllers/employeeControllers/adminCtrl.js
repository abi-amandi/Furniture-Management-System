const managerModel = require('../../models/employee/managerModel')
const userModel = require('../../models/employee/userModels')

const getAllUsersController = async(req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'users data list',
            data:users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while fetching users',
            error
        })
    }
}

const getAllManagersController = async(req,res) => {
    try {
        const managers = await managerModel.find({})
        res.status(200).send({
            success: true,
            message: 'Managers Data list',
            data:managers
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting manager data',
            error
        })
    }
};

//manager account status
const changeAccountStatusController = async(req,res) => {
    try {
        const {managerId, status} = req.body
        const manager = await managerModel.findByIdAndUpdate(managerId,{status})
        const user = await userModel.findOne({_id:manager.userId})
        const notification = user.notification
        notification.push({
            type:'manager-account-request-updated',
            message: `Your Manager Account Request Has ${status}`,
            onClickPath:'/notification'
        });
        user.isManager = status === 'approved' ? true : false;
        await user.save()
        res.status(201).send({
            success:true,
            message:'Account Status Updated',
            data:manager,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Account Status',
            error
        })
    }
}

module.exports = { getAllManagersController, getAllUsersController, changeAccountStatusController}