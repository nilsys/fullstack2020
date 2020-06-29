const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")


usersRouter.get("/", async (req, resp) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1
    })
    return resp.json(users)
})

usersRouter.post("/", async (req, resp) => {
    const body = req.body
    if (!(body.password && body.username)){
        return resp.status(401).json({
            error: "Invalid username or password"
        })
    }
    if (body.password.length < 3) {
        return resp.status(400).json({
            error: "Password must be atleast 3 characters long."
        })
    }
    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash
    })

    const savedUser = await user.save()
    return resp.json(savedUser)
})

module.exports = usersRouter