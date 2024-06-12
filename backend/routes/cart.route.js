const express = require('express')
const router = express.Router()
const { getCartItems, updateCartItemQuantity, add, deleteCartItems } = require('../controllers/cart.controller')

router.get('/', getCartItems)
router.put('/:id', updateCartItemQuantity)
router.post('/', add)
router.delete('/:id', deleteCartItems)

module.exports = router
