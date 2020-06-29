const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
    return response.json(blogs)
})

  
blogsRouter.post("/", async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET_HASH)
    if (!(request.token || !decodedToken)){
        return response.status(401).json({
            error: "Invalid or missing token"
        })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    console.log(blog)
    if (!(blog.likes)) {
        blog.likes = 0
    }

    if ((!blog.title) || !(blog.url)){
        return await response.status(400).json({
            error: "No title or url"
        })
    }

    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
})

blogsRouter.delete("/:id", async (req, resp) => {
    const blogId = req.params.id
    const decodedToken = jwt.verify(req.token, process.env.SECRET_HASH)
    if (!(req.token || !decodedToken)){
        return resp.status(401).json({
            error: "Invalid or missing token"
        })
    }
    const blog = await Blog.findById(blogId)
    if (!blog){
        resp.status(404).json({
            error: "Blog doesn't exist"
        })
    }

    if (!(blog.user.toString() === decodedToken.id)){
        resp.status(400).json({
            error: "User does not own this blog"
        })
    }

    await Blog.findByIdAndDelete(blogId)
    return resp.status(204).end()
})

blogsRouter.put("/:id", async (req, resp) => {
    const id = req.params.id
    const body = req.body

    const blog = {
        likes: body.likes
    }
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
    if (result){
        resp.json(result)
    } else {
        resp.status(400).end()
    }

})

module.exports = blogsRouter