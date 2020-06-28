const Blog = require('../models/blog')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const idFromDb = async () => {
    const ids = await Blog.find({})
    return ids[0].id
}

module.exports = {
    initialBlogs,
    blogsInDb,
    idFromDb
}