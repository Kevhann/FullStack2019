const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/blog_test_helper')
const api = supertest(app)
const Blog = require('./../models/blog')

beforeEach(async () => {
  await Blog.remove({})
  const initial = helper.testBlogs.map(b => new Blog(b))
  const promiseArray = initial.map(b => b.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four notes', async () => {
  const response = await helper.blogsInDb()
  expect(response.length).toBe(4)
})

test('the first note is testblog', async () => {
  const response = await helper.blogsInDb()
  expect(response[0].title).toBe('testblog')
})

test('blogs have field named id', async () => {
  const response = await helper.blogsInDb()
  expect(response[0].id).toBeDefined()
})

test('adding a blog increases blog count', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'testBlog 4',
      author: 'author 1234',
      url: 'www.Blogger.com'
    })
    .expect(201)
  const response = await helper.blogsInDb()
  expect(response.length).toBe(helper.testBlogs.length + 1)
})

test('blog without likes has 0 likes', async () => {
  await Blog.remove({})
  await api
    .post('/api/blogs')
    .send(helper.nolikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await helper.blogsInDb()
  expect(response[0].likes).toBe(0)
})

test('blog without title recieves 400', async () => {
  await api.post('/api/blogs', helper.notitle).expect(400)
})
test('blog without url recieves 400', async () => {
  await api.post('/api/blogs', helper.nourl).expect(400)
})

describe('deletion of a blog', async () => {
  test('delete an existing blog by id', async () => {
    const blogs = await helper.blogsInDb()
    const deletion = blogs[0]
    await api.delete(`/api/blogs/${deletion.id}`).expect(204)
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs.length).toBe(blogs.length - 1)
  })
  test('delete a nonexisting id', async () => {
    await api.delete('/api/blogs/thisIdDoesNotExist').expect(400)
  })
})

test('change a blog by id', async () => {
  const blogs = await helper.blogsInDb()
  const blogToChange = blogs[0]
  const changed = {
    likes: 1,
    title: 'a',
    author: 'b',
    url: 'c'
  }
  await api
    .put(`/api/blogs/${blogToChange.id}`)
    .send(changed)
    .expect(200)

  const newBlogs = await helper.blogsInDb()
  const compare = newBlogs[0]
  expect(compare.title).toEqual('a')
  expect(compare.author).toEqual('b')
  expect(compare.url).toEqual('c')
  expect(compare.likes).toBe(1)
})

afterAll(() => {
  mongoose.connection.close()
})
