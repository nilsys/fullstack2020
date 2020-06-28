const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test("Correct amount of blogs returned", async () => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
  
    expect(resp.body).toHaveLength(helper.initialBlogs.length)
})

test("Verify blog unique identifier property", async () => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

    resp.body.forEach(i => {
        expect(i.id).toBeDefined()
    })
})

test("Succesfully make a POST request", async () => {
    const newBlog = {
        title: "A really cool blog",
        author: "Tester mcTester",
        url: "https://test.com",
        likes: 44
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const end = await helper.blogsInDb()
    expect(end).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})