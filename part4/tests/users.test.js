const mongoose = require("mongoose")
const helper = require("./test_helper")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe("User related tests", () => {
    beforeEach( async () => {
        await User.deleteMany({})
    
        await api.post("/api/users").send(helper.initialUsers[0])
        await api.post("/api/users").send(helper.initialUsers[1])

    })

    test("Non-unique user is not created", async () => {
        const newUser1 = {
            username: "admin",
            name: "admin",
            password: "admin"
        }
        await api
            .post("/api/users")
            .send(newUser1)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)
    })

    test("User created succesfully", async () => {
        const newUser2 = {
            username: "Woohooo",
            name: "Pallo",
            password: "goodstuff"
        }
        await api
            .post("/api/users")
            .send(newUser2)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length + 1)    
    })

    test("User with bad username is not created", async () => {
        const newUser3 = {
            username: "Bo",
            name: "Oskari",
            password: "goodstuff"
        }
        await api
            .post("/api/users")
            .send(newUser3)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)    
    })

    test("User with bad password is not created", async () => {
        const newUser4 = {
            username: "1234568",
            name: "1234568",
            password: "a"
        }
        const resp = await api
            .post("/api/users")
            .send(newUser4)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)   
        expect(resp.body).toEqual({error: "Password must be atleast 3 characters long."})
    })

    test("User with bad data is not created", async () => {
        const newUser5 = {}
        const resp = await api
            .post("/api/users")
            .send(newUser5)
            .expect(401)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)   
        expect(resp.body).toEqual({error: "Invalid username or password"})
    })

    afterAll( async () => {
        await mongoose.connection.close()
    })
})

