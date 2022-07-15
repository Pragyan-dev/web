"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderSeedSchema = _mongoose.default.Schema({
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [{
    name: {
      type: String,
      requried: true
    },
    qty: {
      type: Number,
      requried: true
    },
    image: {
      type: String,
      requried: true
    },
    price: {
      type: Number,
      requried: true
    },
    seed: {
      type: _mongoose.default.Schema.Types.ObjectId,
      required: true,
      ref: 'farmer_product_seeds'
    }
  }],
  shippingAddress: {
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: {
      type: String
    },
    status: {
      type: String
    },
    update_time: {
      type: String
    },
    email_address: {
      type: String
    }
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});

const orderSeed = _mongoose.default.model('orderSeed', orderSeedSchema);

var _default = orderSeed;
exports.default = _default;