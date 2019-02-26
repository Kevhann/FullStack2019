const listHelper = require('../utils/blog_test_helper')
const blogs = [
  {
    title: 'test',
    author: 'test',
    url: 'www.test.com',
    likes: 321
  },
  {
    title: 't',
    author: 't',
    url: 'www.t.com',
    likes: 123
  },
  {
    title: 'more',
    author: 'blogs',
    url: 'www.com',
    likes: 57
  },
  {
    title: 'second test',
    author: 'test',
    url: 'www.testing.com',
    likes: 54
  }
]

describe('dummy test', () => {
  test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1)
  })
})

describe('total likes', () => {
  test('empty list return 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('blogs returns correct sum', () => {
    expect(listHelper.totalLikes(blogs)).toBe(555)
  })
})

describe('highest voted blog', () => {
  test('empty list return undefined', () => {
    expect(listHelper.favourite([])).toBe(undefined)
  })
  test('highest voted of three', () => {
    expect(listHelper.favourite(blogs).title).toBe('test')
  })
})

describe('most blogs by author', () => {
  test('most blogs in blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: 'test',
      blogs: 2
    })
  })
})

describe('most liked auhtors', () => {
  test('most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: 'test',
      likes: 375
    })
  })
})
