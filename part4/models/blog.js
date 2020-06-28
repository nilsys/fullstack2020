const mongoose = require("mongoose")
const config = require("../utils/config")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

let mongoUrl = config.MONGODB_URI
if (process.env.NODE_ENV === "test"){
  mongoUrl = config.MONGODB_TEST_URI
}
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model("Blog", blogSchema)