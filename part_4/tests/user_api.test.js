const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/user_test_helper')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.remove({})
  const initial = helper.testUsers.map(u => new User(u))
  const promiseArray = initial.map(u => u.save())
  await Promise.all(promiseArray)
})
describe('adding and getting users', async () => {
  test('mockDB has two users', async () => {
    const users = await helper.usersInDb()
    expect(users.length).toBe(2)
  })
  test('adding a valid user increases user count', async () => {
    const initial = await helper.usersInDb()
    await api.post('/api/users').send(helper.newUser)
    const after = await helper.usersInDb()
    expect(after.length).toBe(initial.length + 1)
  })
})

describe('adding invalid users', async () => {
  test('password under 3 long recieve 400', async () => {
    await api
      .post('/api/users')
      .send(helper.shortpsw)
      .expect(400)
  })
  test('username under 3 long recieve 400', async () => {
    await api
      .post('/api/users')
      .send(helper.shortUsername)
      .expect(400)
  })
  test('username must be unique', async () => {
    await api
      .post('/api/users')
      .send(helper.sameUsername)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
