const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const user = await User.findOne({})
    const body = request.body
    body.user = user.id
    const blog = new Blog(body)
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    user.blogs = response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(update.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
