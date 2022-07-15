"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("./../middleware/authMiddleware.js");

var _supplierController = require("./../controllers/supplierController.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.route('/').post(_authMiddleware.protect, _supplierController.createSupplierProduct).get(_authMiddleware.protect, _authMiddleware.admin, _supplierController.getProducts);
router.route('/all').get(_supplierController.getMyProductsForPublic);
router.route('/myproducts').get(_authMiddleware.protect, _supplierController.getMyProducts);
router.route('/product/:id').get(_authMiddleware.protect, _supplierController.getFarmerProductById);
router.route('/product/:id/edit').put(_authMiddleware.protect, _supplierController.updateSupplierProductProfile);
router.route('/product/:id/reviews').post(_authMiddleware.protect, _authMiddleware.admin, _supplierController.createFarmerProductReview).put(_authMiddleware.protect, _authMiddleware.admin, _supplierController.updateProductReviewed);
var _default = router;
exports.default = _default;