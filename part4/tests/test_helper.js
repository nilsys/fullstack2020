const Blog = require('../models/blog')
const User = require("../models/user")

const initialBlogs = [
    {
        title: "HTML is easy",
        author: "Steve jobs",
        url: "https://google.com",
        likes: 1,
        user: "5efa508c81ce507bc705857a"
    },
    {
        title: "Browser can execute only Javascript",
        author: "Mark Zucc",
        url: "https://facebook.com",
        likes: 10,
        user: "5efa508c81ce507bc705857a"
    },
]

const initialUsers = [
    {
        username: "root",
        name: "root",
        password: "totally_not_root"
    },
    {
        username: "admin",
        name: "admin",
        password: "totally_not_admin"
    }
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const idFromDb = async () => {
    const ids = await Blog.find({})
    return ids[0].id
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    idFromDb,
    usersInDb
}