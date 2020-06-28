const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "Steve jobs",
        url: "https://google.com",
        likes: 1
    },
    {
        title: "Browser can execute only Javascript",
        author: "Mark Zucc",
        url: "https://facebook.com",
        likes: 10
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test("Correct amount of blogs returned", async () => {
    const resp = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
  
    expect(resp.body).toHaveLength(initialBlogs.length)
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

afterAll(() => {
    mongoose.connection.close()
})