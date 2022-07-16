var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _db = _interopRequireDefault(require("./config/db.js"));

var _colors = _interopRequireDefault(require("colors"));

var _errorMiddlware = require("./middleware/errorMiddlware.js");

var _productRoutes = _interopRequireDefault(require("./routes/productRoutes.js"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));

var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));

var _uploadRoutes = _interopRequireDefault(require("./routes/uploadRoutes.js"));

var _supplierRoutes = _interopRequireDefault(require("./routes/supplierRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



_dotenv.default.config('./../abc.env');

(0, _db.default)();
const app = (0, _express.default)();


if (process.env.NODE_ENV === 'development') {
  app.use((0, _morgan.default)('dev'));
}




app.use(_express.default.json());
app.use('/api', _productRoutes.default);
app.use('/api/users', _userRoutes.default);
app.use('/api/orders', _orderRoutes.default);
app.use('/api/upload', _uploadRoutes.default);
app.use('/api/supplier', _supplierRoutes.default); // PAYPAL 

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const _dirname = _path.default.resolve();

app.use('/uploads', _express.default.static(_path.default.join(_dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(_express.default.static(_path.default.join(_dirname, '/frontend/build')));
  app.get('*', (req, res) => res.sendFile(_path.default.resolve(_dirname,  '../frontend/build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send("API is running");
  });
}

app.use(_errorMiddlware.notFound);
app.use(_errorMiddlware.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
