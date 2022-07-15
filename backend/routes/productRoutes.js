"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _productSeedController = require("./../controllers/productSeedController.js");

var _productLendMachineController = require("./../controllers/productLendMachineController.js");

var _consumerProductControlller = require("./../controllers/consumerProductControlller.js");

var _authMiddleware = require("./../middleware/authMiddleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/seeds').get(_productSeedController.getSeedProducts).post(_authMiddleware.protect, _authMiddleware.admin, _productSeedController.createSeedProduct);
router.route('/seeds/:id/reviews').post(_authMiddleware.protect, _productSeedController.createSeedProductReview);
router.route('/seeds/:id').get(_productSeedController.getSeedProductById).delete(_authMiddleware.protect, _authMiddleware.admin, _productSeedController.deleteSeedProduct).put(_authMiddleware.protect, _authMiddleware.admin, _productSeedController.updateSeedProduct);
router.route('/lendMachines').get(_productLendMachineController.getLendMachnines).post(_authMiddleware.protect, _authMiddleware.admin, _productLendMachineController.createLendMachine);
router.route('/lendMachines/:id').get(_productLendMachineController.getLendMachnineById).delete(_authMiddleware.protect, _authMiddleware.admin, _productLendMachineController.deleteLendMachnine).put(_authMiddleware.protect, _authMiddleware.admin, _productLendMachineController.updateLendMachine);
router.route('/consumer').get(_consumerProductControlller.getConsumerProducts).post(_authMiddleware.protect, _authMiddleware.admin, _consumerProductControlller.createConsumer);
router.route('/consumer/:id').get(_consumerProductControlller.getConsumerProductById).delete(_authMiddleware.protect, _authMiddleware.admin, _consumerProductControlller.deleteConsumerProduct).put(_authMiddleware.protect, _authMiddleware.admin, _consumerProductControlller.updateConsumer);
var _default = router;
exports.default = _default;