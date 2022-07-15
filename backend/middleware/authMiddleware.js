"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.admin = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _userModel = _interopRequireDefault(require("./../models/userModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const protect = (0, _expressAsyncHandler.default)(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);

      req.user = await _userModel.default.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
exports.protect = protect;

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

exports.admin = admin;