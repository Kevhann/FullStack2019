import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from '../App'
import { prettyDOM } from 'dom-testing-library'
jest.mock('../services/blogs')

describe('<App />', () => {
  it('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    //component.debug()
    expect(component.container).toHaveTextContent('Login')
    expect(component.container).toHaveTextContent('Username')
    expect(component.container).toHaveTextContent('Password')
    expect(component.container).not.toHaveTextContent('huippublogi')
    expect(component.container).not.toHaveTextContent('hauskanpitäjä')
  })
  it('if logged in, show blogs and hide login form', async () => {
    const user = {
      id: '5a437a9e514ab7f168ddf138',
      username: 'ediz',
      name: 'Erkka',
      token: '19284756'
    }
    await localStorage.setItem('loggedUser', JSON.stringify(user))
    const component = render(<App />)
    await component.rerender(<App />)
    //component.debug()
    expect(component.container).not.toHaveTextContent('Login')
    expect(component.container).not.toHaveTextContent('Username')
    expect(component.container).not.toHaveTextContent('Password')
    expect(component.container).toHaveTextContent('huippublogi')
    expect(component.container).toHaveTextContent('hauskanpitäjä')
  })
})
