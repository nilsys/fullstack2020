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

  module.exports = blogsRouter