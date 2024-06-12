const Cart = require('../models/Cart');
const Product = require('../models/Product')

// Fetch cart items for a user
const getCartItems = async (req, res) => {
    userId = req.session.userId

    try {
        const cart = await Cart.find({ user: userId }).populate('orderItems.product').populate('user');
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// Update quantity for a cart item
const updateCartItemQuantity = async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;
    const { quantity, total } = req.body;

    // if (quantity == null || total == null) {
    //     res.status(500).json({ error: "Error passing data!!" });
    //     return; 
    // }
    

    try {
        const cartItem = await Cart.findOneAndUpdate(
            { user: userId, 'orderItems.product': id },
            { 'orderItems.$.quantity': quantity, 'orderItems.$.total': total },
            { new: true }
        ).populate('orderItems.product');
        res.json({ cartItem });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//temporary created 
// const add = async (req, res) => {
//     userId = req.session.userId

//     const { product } = req.body

//     if (!userId) {
//         return res.status(401).json({ error: 'Unauthorized. Please login to place an order.' })
//     } else {
//         try {
//             const cart = await Cart.create({ user: userId, product: product })
//             res.status(201).json(cart)
//           } catch (errors) {
//             console.log(errors)
//             res.status(500).json({ error: 'Internal Server Error' })
//           }
//     }
// }

const add = async (req, res) => {
    try {
        const { productId, quantity } = req.body
        // Check if the product exists and is available
        const product = await Product.findById(productId)
        if (!product || product.quantity < quantity) {
            return res.status(404).json({ message: 'Product not found or not available' })
        }
        // Check if the user already has the product in the cart
        let cart = await Cart.findOne({ user: req.session.userId })
        if (cart) {
            const existingItem = cart.orderItems.find(item => item.product == productId);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.total = existingItem.quantity * product.productPrice;
            } else {
                cart.orderItems.push({
                    product: productId,
                    quantity,
                    total: product.productPrice * quantity,
                });
            }
        } else {
            cart = new Cart({
                user: req.session.userId,
                orderItems: [{
                    product: productId,
                    quantity,
                    total: product.productPrice * quantity,
                }],
                total: product.productPrice * quantity,
            });
        }
        await cart.save();
        res.status(201).json({ message: 'Product added to cart', cartItem: cart })
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Failed to add to cart' })
    }
}


const deleteCartItems = async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;

    try {
        const updateResult = await Cart.updateOne(
            { user: userId },
            { $pull: { orderItems: { product: id } } }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
};



module.exports = {
    getCartItems,
    updateCartItemQuantity,
    add,
    deleteCartItems
}
