const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const model = require('../models/DeliveryVehicle')
const upload = require('../middleware/upload')

const addVehicle = async (req, res) => {
    const { vehicleNumber } = req.body

    if (!req.files['insurance'] || !req.files['license']) {
        return res.status(400).json('Insurance and license files are required.');
    }

    const insuranceTitle = req.files['insurance'][0].filename
    const licenseTitle = req.files['license'][0].filename

    console.log(insuranceTitle)
    console.log(licenseTitle)

    try {
        await model.create({ vehicleNumber: vehicleNumber, license: licenseTitle, insuarance: insuranceTitle })
        res.status(200).json('success')
    } catch (errors) {
        res.status(400).json(`error: ${errors}`)
    }
}

const deleteVehicle = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid vehicle ID' });
    }

    try {
        await model.findOneAndDelete({_id: id})
        res.status(400).json("success")
    } catch (errors) {
        res.status(400).json(`error: ${errors}`)
    }
}

const getVehicles = async (req, res) => {
    try {
        const vehicle = await model.find()
        res.json(vehicle)
    } catch (errors) {
        res.status(400).json(`error: ${errors}`)
    }
}

const getOneVehicle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        const vehicleRider = await model.findById(id)
        if (!vehicleRider) {
            return res.status(404).json({error: 'Rider not found'})
        }
        res.json(vehicleRider)
    } catch (errors) {
        res.status(400).json(`èrror: ${errors}`)
    }
}

module.exports = {
    addVehicle,
    getVehicles,
    getOneVehicle,
    deleteVehicle
}

