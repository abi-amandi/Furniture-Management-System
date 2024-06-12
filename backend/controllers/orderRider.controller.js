const model = require('../models/OrdersRider')
const mongoose = require('mongoose')

const addOrder = async (req, res) => {
    const userId = req.session.userId
    
    const { order, user } = req.body

    // console.log(order)
    // console.log(userId)
    // console.log(user)

    if (!userId) {
        console.log('error please log in')
    }

    try {
        await model.create({ rider: userId, order: order, user: user })
        return res.status(200)
    } catch (errors) {
        console.log(`error: ${errors}`)
        return res.status(400).json({error: 'An error occured'})
    }
} 

const getAssignedOrders = async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Please log in' });
    }

    try {
        const orders = await model.find({ rider: userId }).populate('order').populate('rider').populate('user');
        res.status(200).json( orders );
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await model.find().populate('order').populate('rider').populate('user');
        res.status(200).json(orders)
    } catch (errors) {
        console.error(errors)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

const getClickedOrder = async (req, res) => {
    const { id } = req.params

    // console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid order ID' })
    }

    try {
        const orders = await model.findOne({ _id: id }).populate('rider').populate('order').populate('user')
        res.status(200).json(orders)
    } catch (errors) {
        console.error(errors)
        res.status(500).json({ errors: 'Internal Server Error' })
    }
}

module.exports = { addOrder, getAssignedOrders, getAllOrders, getClickedOrder }