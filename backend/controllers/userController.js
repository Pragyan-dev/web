"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserProfile = exports.updateUser = exports.registerUser = exports.getUsers = exports.getUserProfile = exports.getUserById = exports.deleteUser = exports.authUser = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _userModel = _interopRequireDefault(require("./../models/userModel.js"));

var _genarateToken = _interopRequireDefault(require("./../utils/genarateToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @desc    Auth user & token
// @rout    POST /api/users/login
// @access  public
const authUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await _userModel.default.findOne({
    email
  });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      cropSelection: user.cropSelection,
      token: (0, _genarateToken.default)(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}); // @desc    Register new user
// @rout    POST /api/users/
// @access  public

exports.authUser = authUser;
const registerUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const {
    name,
    email,
    password,
    cropSelection
  } = req.body;
  const userExists = await _userModel.default.findOne({
    email
  });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await _userModel.default.create({
    name,
    email,
    password,
    cropSelection
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cropSelection: user.cropSelection,
      isAdmin: user.isAdmin,
      token: (0, _genarateToken.default)(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}); // @desc    GET user profile
// @rout    GET /api/users/profile
// @access  Private

exports.registerUser = registerUser;
const getUserProfile = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      cropSelection: user.cropSelection,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
}); // @desc    update user profile
// @rout    PUT /api/users/profile
// @access  Private

exports.getUserProfile = getUserProfile;
const updateUserProfile = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.cropSelection = req.body.cropSelection || user.cropSelection;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cropSelection: updatedUser.cropSelection,
      token: (0, _genarateToken.default)(updatedUser._id)
    });
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
}); // @desc    GET all users
// @rout    GET /api/users/
// @access  Private/ADMIN

exports.updateUserProfile = updateUserProfile;
const getUsers = (0, _expressAsyncHandler.default)(async (req, res) => {
  const users = await _userModel.default.find({});
  res.json(users);
}); // @desc    delete user profile
// @rout    DELETE /api/users/:id
// @access  Private/Admin

exports.getUsers = getUsers;
const deleteUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({
      message: 'User Removed'
    });
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
}); // @desc    GET user by id
// @rout    GET /api/users/:id
// @access  Private/ADMIN

exports.deleteUser = deleteUser;
const getUserById = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
}); // @desc    update user
// @rout    PUT /api/users/
// @access  Private/Admin

exports.getUserById = getUserById;
const updateUser = (0, _expressAsyncHandler.default)(async (req, res) => {
  const user = await _userModel.default.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.cropSelection = req.body.cropSelection || user.cropSelection;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      cropSelection: updatedUser.cropSelection
    });
  } else {
    res.status(401);
    throw new Error('User not found!!');
  }
});
exports.updateUser = updateUser;