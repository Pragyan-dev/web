"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const seedReviewSchema = _mongoose.default.Schema({
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

const productSeedSchema = _mongoose.default.Schema({
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
  category: {
    type: String,
    required: true
  },
  reviews: [seedReviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const farmer_product_seeds = _mongoose.default.model('farmer_product_seeds', productSeedSchema);

var _default = farmer_product_seeds;
exports.default = _default;