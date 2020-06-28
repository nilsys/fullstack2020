require("dotenv").config()

let MONGODB_URI = process.env.MONGODB_URI
let MONGODB_TEST_URI = process.env.MONGODB_TEST_URI
let PORT = process.env.PORT

module.exports = { MONGODB_URI, PORT, MONGODB_TEST_URI}