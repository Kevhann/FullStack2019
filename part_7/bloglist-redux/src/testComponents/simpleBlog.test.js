import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import 'jest-dom/extend-expect'

const blog = {
  title: 'title',
  author: 'author',
  likes: 123
}

test('renders blog likes', () => {
  const component = render(<SimpleBlog blog={blog} />)
  const likes = component.container.querySelector('.blogLikes')
  expect(likes).toHaveTextContent('123')
})
test('renders blog title and author', () => {
  const component = render(<SimpleBlog blog={blog} />)
  const content = component.container.querySelector('.blogBody')
  expect(content).toHaveTextContent('title author')
})
test('clicking like button twice triggers function twice', async () => {
  const mockHandler = jest.fn()
  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
