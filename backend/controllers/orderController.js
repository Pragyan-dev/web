"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderToPaid = exports.updateOrderToDelivered = exports.getOrders = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _orderSeedModel = _interopRequireDefault(require("./../models/orderSeedModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @desc    create new order
// @rout    POST /api/orders
// @access  private
const addOrderItems = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
  } else {
    const order = new _orderSeedModel.default({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
}); // @desc    Get order by ID
// @rout    GET /api/orders/:id
// @access  private

exports.addOrderItems = addOrderItems;
const getOrderById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderSeedModel.default.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
}); // @desc    Update order to paid
// @rout    PUT /api/orders/:id/pay
// @access  private

exports.getOrderById = getOrderById;
const updateOrderToPaid = (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderSeedModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true, order.paidAt = Date.now(), order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
}); // @desc    Update order to delivered
// @rout    PUT /api/orders/:id/deliver
// @access  private/Admin

exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderToDelivered = (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _orderSeedModel.default.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not Found');
  }
}); // @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

exports.updateOrderToDelivered = updateOrderToDelivered;
const getMyOrders = (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderSeedModel.default.find({
    user: req.user._id
  });
  res.json(orders);
}); // @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin

exports.getMyOrders = getMyOrders;
const getOrders = (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _orderSeedModel.default.find({}).populate('user', 'id name');
  res.json(orders);
});
exports.getOrders = getOrders;