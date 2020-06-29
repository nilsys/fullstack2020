const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
mongoose.set('useFindAndModify', false);
const config = require("../utils/config")

const userSchema = mongoose.Schema({
  username: {
      type: String,
      minlength: 3,
      unique: true
  },
  password: String,
  name: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.password
  }
})
userSchema.plugin(uniqueValidator)

let mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.model("User", userSchema)