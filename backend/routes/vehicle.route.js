const express = require('express')
const { addVehicle, getVehicles, getOneVehicle, deleteVehicle } = require('../controllers/vehicle.controller')
const upload = require('../middleware/upload')

const router = express.Router()

router.post('/', upload.fields([
    { name: 'insurance', maxCount: 1 },
    { name: 'license', maxCount: 1 }
]), addVehicle)

router.get('/', getVehicles)
router.get('/:id', getOneVehicle)
router.delete('/:id', deleteVehicle)

module.exports = router