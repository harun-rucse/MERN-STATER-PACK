const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/user');
const Settings = require('../models/settings');
const config = require('../config');

dotenv.config({ path: `${__dirname}/../config.env` });
mongoose
  .connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connect successfull!'))
  .catch(() => console.log('DB connect failed!'));

// READ JSON FILE
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const settings = JSON.parse(
  fs.readFileSync(`${__dirname}/data/settings.json`, 'utf-8')
);

const importData = async () => {
  try {
    await User.create(users);
    await Settings.create(settings);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Settings.deleteMany();

    console.log('Data Deleted!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '--delete') {
  deleteData();
} else if (process.argv[2] === '--import') {
  importData();
}
