const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")

const initialBlogs = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    important: true,
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

afterAll(() => {
  mongoose.connection.close()
})