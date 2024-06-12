const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const model = require('../models/Rider')
const upload = require('../middleware/uploadRider')

const addRider = async (req, res) => {
    const { rider, age, address, mobile, email, nic } = req.body
    
    if (!req.files['insurance'] || !req.files['license']) {
        return res.status(400).json('Insurance and license filess are required.')
    }
    
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(rider)) {
        return res.status(400).json('Name should contain only letters and have at least 2 parts (e.g., John Trex).')
    }

    if (!/^\d+$/.test(age)) {
        return res.status(400).json('Age should contain only numbers.')
    }

    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json('Mobile number should contain only 10 numbers.')
    }

    const insuranceTitle = req.files['insurance'][0].filename
    const licenseTitle = req.files['license'][0].filename

    try {
        const Vehicle = await model.create({ name: rider, age: age, address: address, mobile: mobile, email: email, nic: nic, insuarance: insuranceTitle, license: licenseTitle })
        res.status(400).json('success')
    } catch (errors) {
        res.status(200).json(`error: ${errors}`)
    }
}

const getRiders = async (req, res) => {
    try {
        const riders = await model.find()
        res.json(riders)
    } catch (errors) {
        res.status(400).json(`error: ${errors}`)
    }
}

const getOneRider = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid order ID' })
    }

    try {
        const rider = await model.findOne({ _id: id })
        if (!rider) {
          return res.status(404).json({ error: 'Rider not found' })
        }
        res.status(200).json(rider)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
}

const DeleteRider = async (req, res) => {
    const { id } = req.params

    try {
        const rider = await model.findOneAndDelete({_id: id})
        if (!rider) {
            return res.status(404).json({ error: 'Rider not found' })
        }
        res.status(200).json({ message: 'Rider deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

const EditRider = async (req, res) => {
    const { id } = req.params
    const updates = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid Rider ID' });
    }

    try {
        const order = await model.findByIdAndUpdate({ _id: id }, updates, { new: true }); // Return updated doc
        if (!order) {
          return res.status(404).json({ error: 'Rider not found' });
        }
        res.json(order);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Corrected 'res.statement' to 'res.status'
      }
}

module.exports = {
    addRider,
    getRiders,
    getOneRider,
    DeleteRider,
    EditRider
}