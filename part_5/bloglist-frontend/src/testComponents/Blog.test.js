import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from '../components/Blog'
import 'jest-dom/extend-expect'

const blog = {
  title: 'Sweet test blog',
  author: 'Devout Tester',
  url: 'www.testblog.com'
}

test('condensed blog expands when clicked', () => {
  const component = render(<Blog blog={blog} />)
  const condensed = component.container.querySelector('.condensedBlog')
  expect(condensed).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(condensed).not.toHaveTextContent('likes')
  expect(condensed).not.toHaveTextContent(`${blog.url}`)
  expect(condensed).not.toHaveTextContent('Added by unknown')
  fireEvent.click(condensed)
  const expanded = component.container.querySelector('.expandedBlog')
  expect(expanded).toHaveTextContent(`${blog.title}`)
  expect(expanded).toHaveTextContent(`${blog.author}`)
  expect(expanded).toHaveTextContent(`${blog.url}`)
  expect(expanded).toHaveTextContent('likes')
  expect(expanded).toHaveTextContent('Added by unknown')
})
