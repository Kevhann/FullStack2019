const _ = require('lodash')
const Blog = require('../models/blog')

const testBlogs = [
  {
    title: 'testblog',
    author: 'tester',
    url: 'www.test.fi',
    likes: 123
  },
  {
    title: 'bestBlog',
    author: 'amaze',
    url: 'www.yeet.fi',
    likes: 500
  },
  {
    title: 'bestestblog',
    author: 'amaze',
    url: 'www.yeet4me.fi',
    likes: 499
  },
  {
    title: 'sadblog',
    author: 'saddest',
    url: 'www.feels.fi',
    likes: 4
  }
]
const testBlog = {
  title: 't',
  author: 'est',
  url: 'www.test.fi',
  likes: 7357
}
const nolikes = {
  title: 'nolikes',
  author: 'nolikes',
  url: 'www.nolikes.fi'
}
const notitle = {
  author: 'nolikes',
  url: 'www.nolikes.fi',
  likes: 32
}
const nourl = {
  title: 'nolikes',
  author: 'nolikes',
  likes: 23
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const dummy = blogs => {
  blogs
  return 1
}

const totalLikes = blogs =>
  blogs.map(b => b.likes).reduce((sum, current) => sum + current, 0)

const favourite = blogs => {
  const highest = Math.max(...blogs.map(b => b.likes))
  return _.find(blogs, p => p.likes === highest)
}

const mostBlogs = blogs => {
  const most = _.find(_.groupBy(blogs.map(b => b.author)))
  const res = {
    author: most[0],
    blogs: most.length
  }
  return res
}

const mostLikes = blogs => {
  const grouped = _.groupBy(blogs, b => b.author)
  console.log(grouped)
  const sort = []
  for (let key in grouped) {
    if (grouped.hasOwnProperty(key)) {
      console.log(key, grouped[key])
      console.log(totalLikes(grouped[key]))
      sort.push({
        author: grouped[key][0].author,
        likes: totalLikes(grouped[key])
      })
    }
  }

  return _.last(_.sortBy(sort, s => s.likes))
}

module.exports = {
  dummy,
  totalLikes,
  favourite,
  mostBlogs,
  mostLikes,
  testBlogs,
  nolikes,
  notitle,
  nourl,
  testBlog,
  blogsInDb
}
