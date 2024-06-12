const express = require('express')
const { addRider, getRiders, getOneRider, DeleteRider, EditRider } = require('../controllers/rider.controller')
const upload = require('../middleware/uploadRider')

const router = express.Router()

router.post('/', upload.fields([
    { name: 'insurance', maxCount: 1 },
    { name: 'license', maxCount: 1 }
]), addRider)

router.get('/', getRiders)
router.get('/:id', getOneRider)
router.put('/:id', EditRider)
router.delete('/:id', DeleteRider)

module.exports = router