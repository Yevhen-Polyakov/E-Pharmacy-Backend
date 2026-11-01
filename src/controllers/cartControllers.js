import createHttpError from "http-errors";
import { Cart } from "../models/cart.js";
import { Products } from "../models/products.js";

export const getCartItems = async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    return res.status(200).json(cart?.items ?? []);
};

export const addProduct = async (req, res) => {
    const { productId, products = "1" } = req.body;
    const userId = req.user._id;

    const quantityToAdd = Number(products);

    if (!Number.isInteger(quantityToAdd) || quantityToAdd < 1) {
        throw createHttpError(400, "Invalid product quantity");
    }

    const product = await Products.findById(productId);

    if (!product) {
        throw createHttpError(404, "Product not found");
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }

    const existingItem = cart.items.find(
        item => item.productId.toString() === product._id.toString()
    );

    if (existingItem) {
        existingItem.products = String(
            Number(existingItem.products) + quantityToAdd
        );
    } else {
        cart.items.push({
            productId: product._id,
            photo: product.photo,
            name: product.name,
            price: String(product.price),
            products: String(quantityToAdd),
        });
    }

    await cart.save();

    return res.status(200).json(cart.items);
};

export const updateCart = async (req, res) => {
    const { orderProductId, products } = req.body;
    const userId = req.user._id;

    const quantity = Number(products);

    if (!Number.isInteger(quantity) || quantity < 1) {
        throw createHttpError(400, "Invalid product quantity");
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw createHttpError(404, "Cart not found");
    }

    const item = cart.items.id(orderProductId);

    if (!item) {
        throw createHttpError(404, "Cart item not found");
    }

    item.products = String(quantity);

    await cart.save();

    return res.status(200).json(cart.items);
};

export const deleteProduct = async (req, res) => {
    const { orderProductId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw createHttpError(404, "Cart not found");
    }

    const item = cart.items.id(orderProductId);

    if (!item) {
        throw createHttpError(404, "Cart item not found");
    }

    item.deleteOne();

    await cart.save();

    return res.status(200).json(cart.items);
};
