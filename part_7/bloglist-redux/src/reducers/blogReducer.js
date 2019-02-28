import blogService from '../services/blogs'
import { setError } from './errorReducer'
import { setSuccess } from './successReducer'

export const createBlog = blog => {
  return async dispatch => {
    try {
      const content = await blogService.create(blog)
      dispatch({ type: 'CREATEBLOG', content })
      setSuccess(
        `added blog ${content.title} by ${content.author}`,
        5,
        dispatch
      )
    } catch (error) {
      setError(error.response.data.error, 5, dispatch)
    }
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('blogreducer init', blogs)
    dispatch({ type: 'INITIALIZEBLOGS', blogs })
  }
}
export const removeBlog = blog => {
  if (window.confirm(`remove ${blog.title}?`)) {
    return async dispatch => {
      try {
        await blogService.remove(blog)
        dispatch({ type: 'REMOVEBLOG', blog })
      } catch (error) {
        console.log('error while deleting', error)
      }
    }
  }
}
export const likeBlog = blog => {
  return async dispatch => {
    await blogService.like(blog)
    blog.likes = blog.likes + 1
    setSuccess(`liked blog ${blog.title} by ${blog.author}`, 5, dispatch)
    dispatch({ type: 'BLOGLIKE', blog })
    console.log()
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATEBLOG':
      return state.concat(action.content)
    case 'INITIALIZEBLOGS':
      return action.blogs
    case 'REMOVEBLOG':
      return state.filter(b => b !== action.blog)
    case 'SETTOKEN':
      console.log('setToken blogreducerin sisällä')
      blogService.setToken(action.token)
      return state
    case 'BLOGLIKE':
      //console.log('state reducerissa', state)
      //console.log('liketty blogi', action.blog)
      const uudet = state.map(b => (b.id !== action.blog.id ? b : action.blog))
      //console.log('uudet', uudet)
      // uusissa like määrä on päivitetty, mutta se ei renderaa for some fucking reason
      return uudet
    default:
      return state
  }
}

export default blogReducer
