var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _colors = _interopRequireDefault(require("colors"));

var _users = _interopRequireDefault(require("./data/users.js"));

var _seeds = _interopRequireDefault(require("./data/seeds.js"));

var _lendMachines = _interopRequireDefault(require("./data/lendMachines.js"));

var _consumer = _interopRequireDefault(require("./data/consumer.js"));

var _userModel = _interopRequireDefault(require("./models/userModel.js"));

var _productSeedModel = _interopRequireDefault(require("./models/productSeedModel.js"));

var _orderSeedModel = _interopRequireDefault(require("./models/orderSeedModel.js"));

var _productLendMachineModel = _interopRequireDefault(require("./models/productLendMachineModel.js"));

var _consumerProductModel = _interopRequireDefault(require("./models/consumerProductModel.js"));

var _db = _interopRequireDefault(require("./config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import data
// import models
// connect db
_dotenv.default.config();

(0, _db.default)();

const importData = async () => {
  try {
    // delete data if already exists
    await _orderSeedModel.default.deleteMany();
    await _productSeedModel.default.deleteMany();
    await _userModel.default.deleteMany();
    await _productLendMachineModel.default.deleteMany();
    await _consumerProductModel.default.deleteMany(); // add users to the database

    const createdUser = await _userModel.default.insertMany(_users.default);
    const adminUser = createdUser[0]._id; // add seeds to the database

    const sampleSeeds = _seeds.default.map(seed => {
      return { ...seed,
        user: adminUser
      };
    });

    await _productSeedModel.default.insertMany(sampleSeeds); // add lend machines to the database

    const sampleMachines = _lendMachines.default.map(machine => {
      return { ...machine,
        user: adminUser
      };
    });

    await _productLendMachineModel.default.insertMany(sampleMachines);

    const sampleConsumer = _consumer.default.map(consumer => {
      return { ...consumer,
        user: adminUser
      };
    });

    await _consumerProductModel.default.insertMany(sampleConsumer);
    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // delete data if already exists
    await _orderSeedModel.default.deleteMany();
    await _productSeedModel.default.deleteMany();
    await _userModel.default.deleteMany();
    await _productLendMachineModel.default.deleteMany();
    await _consumerProductModel.default.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}