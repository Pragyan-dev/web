"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const machineReviewSchema = _mongoose.default.Schema({
  name: {
    type: String,
    requried: true
  },
  rating: {
    type: Number,
    requried: true
  },
  comment: {
    type: String,
    requried: true
  }
}, {
  timestamps: true
});

const productLendMachineSchema = _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  target_plant: {
    type: String,
    required: true
  },
  reviews: [machineReviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  machine_power: {
    type: String,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
});

const farmer_lend_machines = _mongoose.default.model('farmer_lend_machines', productLendMachineSchema);

var _default = farmer_lend_machines;
exports.default = _default;