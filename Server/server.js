require('dotenv').config();
const app = require("./src/app.js");
const { connectToMongoose } = require("./src/config/mongoose.js");

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToMongoose();
});
