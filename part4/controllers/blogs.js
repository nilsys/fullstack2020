const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})
  
blogsRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body)
        if (!(blog.likes)) {
            blog.likes = 0
        }

    if ((!blog.title) || !(blog.url)){
        return await response.status(400).json({
            error: "No title or url"
        })
    }

    const result = await blog.save()

    return response.status(201).json(result)
})

blogsRouter.delete("/:id", async (req, resp) => {
    await Blog.findByIdAndDelete(req.params.id)
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