const mongoose = require("mongoose")
const helper = require("./test_helper")
const User = require("../models/user")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

describe("User related tests", () => {
    beforeEach( async () => {
        await User.deleteMany({})
        console.log("Deleted everything")
    
        let userObject = new User(helper.initialUsers[0])
        await userObject.save()
    
        userObject = new User(helper.initialUsers[1])
        await userObject.save()
    })

    test("Non-unique user is not created", async () => {
        const newUser = {
            username: "admin",
            name: "admin",
            password: "admin"
        }
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)
    })

    test("User created succesfully", async () => {
        const newUser = {
            username: "Woohooo",
            name: "Pallo",
            password: "goodstuff"
        }
        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length + 1)    
    })

    test("User with bad username is not created", async () => {
        const newUser = {
            username: "Bo",
            name: "Oskari",
            password: "goodstuff"
        }
        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)    
    })

    test("User with bad password is not created", async () => {
        const newUser = {
            username: "Borsas",
            name: "Oskari",
            password: "12"
        }
        const resp = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const end = await helper.usersInDb()
        expect(end).toHaveLength(helper.initialUsers.length)   
        expect(resp.body).toEqual({error: "Password must be atleast 3 characters long."})
    })

    test("User with bad data is not created", async () => {
        const newUser = {}
        const resp = await api
            .post("/api/users")
            .send(newUser)
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

