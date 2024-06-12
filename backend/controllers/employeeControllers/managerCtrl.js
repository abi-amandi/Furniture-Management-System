const mongoose = require('mongoose');
const appointmentModel = require('../../models/employee/appointmentModel');
const managerModel = require('../../models/employee/managerModel');
const userModel = require('../../models/employee/userModels');

const getManagerInfoController = async (req, res) => {
    try {
        const manager = await managerModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "manager data fetch success",
            data: manager,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in fetching manager details'
        });
    }
};

const updateProfileController = async (req, res) => {
    try {
        const manager = await managerModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({
            success: true,
            message: 'Manager Profile Updated',
            data: manager,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Manager Profile Update issue',
            error,
        });
    }
};

const getManagerByIdController = async (req, res) => {
    try {
        const manager = await managerModel.findOne({ _id: req.body.managerId });
        res.status(200).send({
            success: true,
            message: 'Single Manager Info Fetched',
            data: manager,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Single manager info'
        });
    }
};

const managerAppointmentsController = async (req, res) => {
    try {
        const manager = await managerModel.findOne({ userId: req.body.userId });
        const leaveappointments = await appointmentModel.find({ managerId: manager._id });
        res.status(200).send({
            success: true,
            message: 'Manager Appointments fetch Successfully',
            data: leaveappointments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Manager Appointments'
        });
    }
};

const updateStatusController = async (req, res) => {
    try {
        const { appointmentsId, status } = req.body;
        const leaveappointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
        const user = await userModel.findOne({ _id: leaveappointments.userId });
        const notification = user.notification;
        notification.push({
            type: 'status-updated',
            message: `your leave appointment has been updated ${status}`,
            onClickPath: '/manager-appointments',
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Update Status'
        });
    }
};

module.exports = { getManagerInfoController, updateProfileController, getManagerByIdController, managerAppointmentsController, updateStatusController };
