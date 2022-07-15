"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const farmerProductReviewSchema = _mongoose.default.Schema({
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
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const supplierSchema = _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  storage: {
    type: String,
    required: true
  },
  reviews: [farmerProductReviewSchema],
  longitude: {
    type: Number,
    required: false
  },
  latitude: {
    type: Number,
    required: false
  },
  cropSelection: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    requried: true
  },
  isReviwed: {
    type: Boolean,
    required: true,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Supplier = _mongoose.default.model('Supplier', supplierSchema);

var _default = Supplier;
exports.default = _default;