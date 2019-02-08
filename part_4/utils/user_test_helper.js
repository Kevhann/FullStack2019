const User = require('../models/user')

const testUsers = [
  {
    name: 'name',
    username: 'username',
    passwordHash: 'password'
  },
  {
    name: 'tiera',
    username: 'tibman',
    passwordHash: 'remus'
  }
]
const sameUsername = {
  name: 'name',
  username: 'username',
  password: 'password'
}
const newUser = {
  name: 'erkki',
  username: 'escs',
  password: 'ezpz'
}
const shortpsw = {
  name: 'hello',
  username: 'yeetes',
  password: 'ez'
}
const shortUsername = {
  name: 'esimerkki',
  username: 'lm',
  password: 'lmao'
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
module.exports = {
  testUsers,
  sameUsername,
  newUser,
  shortUsername,
  shortpsw,
  usersInDb
}
