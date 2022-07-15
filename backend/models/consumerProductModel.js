"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const consumerProductReviewSchema = _mongoose.default.Schema({
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

const consumerProductSchema = _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  prod_name: {
    type: String,
    required: true
  },
  seller_name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  prod_size: {
    type: String,
    required: true
  },
  reviews: [consumerProductReviewSchema],
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  avalaible_location: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const consumer_products = _mongoose.default.model('consumer_products', consumerProductSchema);

var _default = consumer_products;
exports.default = _default;