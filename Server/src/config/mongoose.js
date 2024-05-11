const mongoose = require("mongoose");

const databaseURI = process.env.MONGODB_CONNECT_URI;

function connectToMongoose() {
  mongoose
    .connect(databaseURI)
    .then(() => {
      console.log("Connected to db successfully");
    })
    .catch((error) => {
      console.log("Could not connect to DB", databaseURI, error);
    });
}

module.exports = {
  connectToMongoose,
};


