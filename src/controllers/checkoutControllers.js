import createHttpError from "http-errors";
import { Cart } from '../models/cart.js';
import { Order } from '../models/orders.js';

export const checkout = async (req, res)=> {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    const { name, address, phone, email, payment}  = req.body;
    console.log('Payment received:', payment);
    console.log('Request body:', req.body);
    const userId = req.user._id;

    if(
        !name?.trim() ||
        !phone?.trim() ||
        !address?.trim() ||
        !email?.trim()
    ) {
        throw createHttpError(400, 'Name, phone, address and email are required');
    }

    if (!['Cash On Delivery', 'bank'].includes(payment)) {
        throw createHttpError(400, 'Invalid payment method');
    }

    const cart = await Cart.findOne({userId});

    if(!cart || cart.items.length === 0){
        throw createHttpError(400, 'Your cart is empty');
    }

    const orders = cart.items.map(item => {
        const quantity = Number(item.products);
        const price = Number(item.price);

        if(!Number.isInteger(quantity) ||
            quantity < 1 || !Number.isFinite(price) ||
        price < 0) {
            throw createHttpError(400, 'Invalid cart item data');
        }

        return {
            userId,
            productId: item.productId,
            photo: item.photo,
            name: name.trim(),
            phone: phone.trim(),
            payment,
            address: address.trim(),
            email: email.trim().toLowerCase(),
            products: String(quantity),
            price: (price * quantity).toFixed(2),
        };
    });

    const createOrders = await Order.insertMany(orders);

        cart.items = [];
        await cart.save();
        
        return res.status(201).json ({
            message: 'Order created successfully',
            orders: createOrders
        });
};

