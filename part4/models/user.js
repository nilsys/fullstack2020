const mongoose = require("mongoose")
const config = require("../utils/config")

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
  }
})

let mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model("User", userSchema)