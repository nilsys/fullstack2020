const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (req, resp) => {
    const users = await User.find({})
    return resp.json(users)
})

usersRouter.post("/", async (req, resp) => {
    const body = req.body
    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash
    })

    const savedUser = await user.save()
    resp.json(savedUser)
})

module.exports = usersRouter