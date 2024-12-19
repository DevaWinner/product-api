
const Order = require("../models/Order");
const createError = require("http-errors");

// CREATE
async function createOrder(req, res, next) {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
}

// READ ALL
async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

// READ ONE
async function getOrderById(req, res, next) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) throw createError(404, "Order not found");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

// UPDATE
async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };
    const order = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!order) throw createError(404, "Order not found");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}

// DELETE
async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Order.findByIdAndDelete(id);
    if (!result) throw createError(404, "Order not found");
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};