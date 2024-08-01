const mongoose = require("mongoose");
const databaseUrl = require("@config").databaseUrl;

// Connect to MongoDB
exports.connectDB = () => {
  mongoose
    .connect(databaseUrl)
    .then(() => {
      console.log(`\nMongoDB is connected to the server.`)
    })
    .catch((error) => {
      console.log('Error to connect MongoDB.', error)
    })
}
