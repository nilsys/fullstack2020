const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")

loginRouter.post("/", async (req, resp) => {
    const body = req.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)

    if (!(user && passwordCorrect)) {
        return resp.status(401).json({
            error: "Invalid username or password"
        })
    }

    const checkToken = {
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(checkToken, process.env.SECRET_HASH)

resp.status(200).send({
    token,
    username: user.username,
    name: user.name
    })
})

module.exports = loginRouter