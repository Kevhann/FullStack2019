import React from 'react'

const Remove = ({ user, blog, handleDeletion }) => {
  console.log('poistava käyttäjä ', user)
  console.log('poistettava ', blog)
  if (!blog.user) {
    return <button onClick={() => handleDeletion(blog)}>remove</button>
  }
  if (user.username !== blog.user.username) {
    console.log('not suthorized to delete')
    return null
  }
  return <button onClick={() => handleDeletion(blog)}>remove</button>
}

export default Remove
