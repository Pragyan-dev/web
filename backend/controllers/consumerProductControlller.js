"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateConsumer = exports.getConsumerProducts = exports.getConsumerProductById = exports.deleteConsumerProduct = exports.createConsumer = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _consumerProductModel = _interopRequireDefault(require("./../models/consumerProductModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @desc    Fetch all products
// @rout    GET /consumer
// @access  public
const getConsumerProducts = (0, _expressAsyncHandler.default)(async (req, res) => {
  const consumerProducts = await _consumerProductModel.default.find({});
  res.json(consumerProducts);
}); // @desc    Fetch Consumer Product by id
// @rout    GET /consumer/:id
// @access  public

exports.getConsumerProducts = getConsumerProducts;
const getConsumerProductById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const consumerProduct = await _consumerProductModel.default.findById(req.params.id);

  if (consumerProduct) {
    res.json(consumerProduct);
  } else {
    res.status(404);
    throw new Error('Consumer Product not Found');
  }
}); // @desc    Delete consumer product
// @rout    DELETE /consumer/:id
// @access  private/admin

exports.getConsumerProductById = getConsumerProductById;
const deleteConsumerProduct = (0, _expressAsyncHandler.default)(async (req, res) => {
  const consumerProduct = await _consumerProductModel.default.findById(req.params.id);

  if (consumerProduct) {
    consumerProduct.remove();
    res.json({
      message: 'Consumer product removed'
    });
  } else {
    res.status(404);
    throw new Error('Consumer Product not Found');
  }
}); // @desc    Create Consumer
// @rout    POST /consumer/
// @access  private/ Admin

exports.deleteConsumerProduct = deleteConsumerProduct;
const createConsumer = (0, _expressAsyncHandler.default)(async (req, res) => {
  const consumerProduct = new _consumerProductModel.default({
    prod_name: "Sample name",
    user: req.user._id,
    seller_name: "Sample seller",
    image: '/images/consumer/mogra_rice.jpg',
    price: 0,
    prod_size: "0kg",
    quantity: 0,
    avalaible_location: "Sample location"
  });
  const createdconsumerProduct = await consumerProduct.save();
  res.status(201).json(createdconsumerProduct);
}); // @desc    Update Consumer
// @rout    PUT /consumer/:id
// @access  private/ Admin

exports.createConsumer = createConsumer;
const updateConsumer = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    prod_name,
    price,
    image,
    seller_name,
    prod_size,
    quantity,
    avalaible_location
  } = req.body;
  const updateConsumerproduct = await _consumerProductModel.default.findById(req.params.id);

  if (updateConsumerproduct) {
    updateConsumerproduct.prod_name = prod_name;
    updateConsumerproduct.price = price;
    updateConsumerproduct.image = image;
    updateConsumerproduct.seller_name = seller_name;
    updateConsumerproduct.quantity = quantity;
    updateConsumerproduct.prod_size = prod_size;
    updateConsumerproduct.avalaible_location = avalaible_location;
    const updatedConsumer = await updateConsumerproduct.save();
    res.status(201).json(updatedConsumer);
  } else {
    res.status(401);
    throw new Error('Product not found');
  }
});
exports.updateConsumer = updateConsumer;