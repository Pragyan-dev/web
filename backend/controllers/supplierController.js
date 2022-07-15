"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSupplierProductProfile = exports.updateProductReviewed = exports.getProducts = exports.getMyProductsForPublic = exports.getMyProducts = exports.getFarmerProductById = exports.createSupplierProduct = exports.createFarmerProductReview = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _genarateToken = _interopRequireDefault(require("./../utils/genarateToken.js"));

var _supplierModel = _interopRequireDefault(require("./../models/supplierModel.js"));

var _nodeGeocoder = _interopRequireDefault(require("node-geocoder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @desc    Create supplier product
// @rout    POST /api/supplier/
// @access  private
const createSupplierProduct = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    name,
    email,
    address,
    cropSelection,
    storage,
    image,
    phonenumber,
    description
  } = req.body;

  if (name & address === '') {
    res.status(400);
    throw new Error('No Products Items');
  } else {
    let options = {
      provider: 'openstreetmap'
    };
    let geoCoder = (0, _nodeGeocoder.default)(options);
    const getCordinates = geoCoder.geocode(address).then(response => {
      return response[0];
    }).catch(err => {
      console.log(err);
    });

    const getLatLong = async () => {
      const latAndLong = await getCordinates;
      const supplier = await _supplierModel.default.create({
        user: req.user._id,
        name,
        email,
        address,
        cropSelection,
        storage,
        image,
        phonenumber,
        description
      });
      const createdSupplierProduct = await supplier.save();
      res.status(201).json(createdSupplierProduct);
    };

    getLatLong();
  }
}); // @desc    Get logged in user products
// @route   GET /api/supplier/myproducts
// @access  Private

exports.createSupplierProduct = createSupplierProduct;
const getMyProducts = (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _supplierModel.default.find({
    user: req.user._id
  });
  res.json(products);
}); // @desc    Get all Products
// @route   GET /api/supplier
// @access  Public

exports.getMyProducts = getMyProducts;
const getMyProductsForPublic = (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _supplierModel.default.find({}).populate('user', 'id name');
  res.json(products);
}); // @desc    Get all Products
// @route   GET /api/supplier
// @access  Private/Admin

exports.getMyProductsForPublic = getMyProductsForPublic;
const getProducts = (0, _expressAsyncHandler.default)(async (req, res) => {
  const products = await _supplierModel.default.find({}).populate('user', 'id name');
  res.json(products);
}); // @desc    Fetch product by id
// @rout    GET /supplier/:id
// @access  public

exports.getProducts = getProducts;
const getFarmerProductById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _supplierModel.default.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found');
  }
}); // @desc    Update Product Review
// @rout    POST /supplier/product/:id/review
// @access  private/ Admin

exports.getFarmerProductById = getFarmerProductById;
const createFarmerProductReview = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    rating,
    comment
  } = req.body;
  const product = await _supplierModel.default.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };
    product.reviews.push(review);
    product.isReviwed = true;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({
      message: 'Review added'
    });
  } else {
    res.status(401);
    throw new Error('Product not found');
  }
}); // @desc    update product reviewed
// @rout    PUT /supplier/product/:id/review
// @access  Private/Admin

exports.createFarmerProductReview = createFarmerProductReview;
const updateProductReviewed = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _supplierModel.default.findById(req.params.id);

  if (product) {
    product.isAdmin = req.body.isAdmin;
    const updatedProduct = await product.save();
    res.json({
      _id: updatedProduct._id,
      isAdmin: updatedProduct.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('Product not found!!');
  }
}); // @desc    update supplier product profile
// @rout    PUT /api/supplier/product/:id/edit
// @access  Private

exports.updateProductReviewed = updateProductReviewed;
const updateSupplierProductProfile = (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _supplierModel.default.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.email = req.body.email || product.email;
    product.address = req.body.address || product.address;
    product.storage = req.body.storage || product.storage;
    product.image = req.body.image || product.image;
    product.phonenumber = req.body.phonenumber || product.phonenumber;
    product.description = req.body.description || product.description;
    product.cropSelection = req.body.cropSelection || product.cropSelection;
    let options = {
      provider: 'openstreetmap'
    };
    let geoCoder = (0, _nodeGeocoder.default)(options);
    const getCordinates = geoCoder.geocode(product.address).then(response => {
      return response[0];
    }).catch(err => {
      console.log(err);
    });

    const getLatLong = async () => {
      const latAndLong = await getCordinates;
      product.longitude = req.body.longitude || latAndLong.longitude;
      product.latitude = req.body.latitude || latAndLong.latitude;
    };

    getLatLong();
    const updatedproduct = await product.save();
    res.json({
      _id: updatedproduct._id,
      name: updatedproduct.name,
      email: updatedproduct.email,
      address: updatedproduct.address,
      storage: updatedproduct.storage,
      image: updatedproduct.image,
      phonenumber: updatedproduct.phonenumber,
      description: updatedproduct.description,
      cropSelection: updatedproduct.cropSelection,
      token: (0, _genarateToken.default)(updatedproduct._id)
    });
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
});
exports.updateSupplierProductProfile = updateSupplierProductProfile;