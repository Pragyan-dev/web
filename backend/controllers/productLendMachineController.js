"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLendMachine = exports.getLendMachnines = exports.getLendMachnineById = exports.deleteLendMachnine = exports.createLendMachine = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _productLendMachineModel = _interopRequireDefault(require("./../models/productLendMachineModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @desc    Fetch all lending Machines
// @rout    GET /lendMachines
// @access  public
const getLendMachnines = (0, _expressAsyncHandler.default)(async (req, res) => {
  const productLendMachine = await _productLendMachineModel.default.find({});
  res.json(productLendMachine);
}); // @desc    Fetch machine by id
// @rout    GET /lendMachines/:id
// @access  public

exports.getLendMachnines = getLendMachnines;
const getLendMachnineById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const productLendMachine = await _productLendMachineModel.default.findById(req.params.id);

  if (productLendMachine) {
    res.json(productLendMachine);
  } else {
    res.status(404);
    throw new Error('Machine not Found');
  }
}); // @desc    Fetch machine by id
// @rout    GET /lendMachines/:id
// @access  private/admin

exports.getLendMachnineById = getLendMachnineById;
const deleteLendMachnine = (0, _expressAsyncHandler.default)(async (req, res) => {
  const lendMachine = await _productLendMachineModel.default.findById(req.params.id);

  if (lendMachine) {
    lendMachine.remove();
    res.json({
      message: 'Machine Removed'
    });
  } else {
    res.status(404);
    throw new Error('Machine not Found');
  }
}); // @desc    Create Lend Machine
// @rout    POST /lendMachines/
// @access  private/ Admin

exports.deleteLendMachnine = deleteLendMachnine;
const createLendMachine = (0, _expressAsyncHandler.default)(async (req, res) => {
  const lendMachine = new _productLendMachineModel.default({
    name: 'sample machine',
    user: req.user._id,
    image: '/images/farmMachine.jpg',
    description: 'sample description',
    target_plant: 'sample category',
    price: 0,
    quantity: 0,
    machine_power: '0HP'
  });
  const createdLendMachine = await lendMachine.save();
  res.status(201).json(createdLendMachine);
}); // @desc    Update Lend Machine
// @rout    PUT /lendMachines/:id
// @access  private/ Admin

exports.createLendMachine = createLendMachine;
const updateLendMachine = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    target_plant,
    quantity,
    machine_power
  } = req.body;
  const updateLendMachine = await _productLendMachineModel.default.findById(req.params.id);

  if (updateLendMachine) {
    updateLendMachine.name = name;
    updateLendMachine.price = price;
    updateLendMachine.image = image;
    updateLendMachine.description = description;
    updateLendMachine.target_plant = target_plant;
    updateLendMachine.quantity = quantity;
    updateLendMachine.machine_power = machine_power;
    const updatedMachine = await updateLendMachine.save();
    res.status(201).json(updatedMachine);
  } else {
    res.status(401);
    throw new Error('Product not found');
  }
});
exports.updateLendMachine = updateLendMachine;