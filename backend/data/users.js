"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const users = [{
  name: 'Admin User',
  email: 'admin@example.com',
  password: _bcryptjs.default.hashSync('123456', 10),
  cropSelection: '',
  isAdmin: true
}, {
  name: 'Sanjula User',
  email: 'Sanjula@example.com',
  cropSelection: 'paddy',
  password: _bcryptjs.default.hashSync('123456', 10)
}, {
  name: 'Test User',
  email: 'Test@example.com',
  cropSelection: 'fruits',
  password: _bcryptjs.default.hashSync('123456', 10)
}];
var _default = users;
exports.default = _default;