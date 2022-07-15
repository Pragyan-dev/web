Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  
  var _mongoose = _interopRequireDefault(require("mongoose"));
  
  var _dotenv = _interopRequireDefault(require("dotenv"));
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _dotenv.default.config({
    path: './abc.env'
  });
  
  const connectDB = async () => {
    try {
      const conn = await _mongoose.default.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
      console.error(`Error: ${error.message}`.red.underline.bold);
      process.exit(1);
    }
  };
  
  var _default = connectDB;
  exports.default = _default;