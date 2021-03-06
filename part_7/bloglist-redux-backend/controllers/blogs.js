const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const token = request.token
  const body = request.body

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog(body)
    blog.user = user.id
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    const backendRes = await Blog.findById(result.id).populate('user', {
      username: 1,
      name: 1
    })
    response.json(backendRes.toJSON())
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.post('/blogs/:id/comments', async (request, response, next) => {
  console.log('request:', request)
  console.log('response:', response)
  console.log('next:', next)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  console.log('deletion ', request.token)
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log(blog)
    if (!blog.user || decodedToken.id === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    return response.status(401).json({ error: 'not authenticated' })
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
