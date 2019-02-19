import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      filter{' '}
      <input
        name="filter"
        onChange={e => store.dispatch(setFilter(e.target.value))}
      />
    </div>
  )
}

export default Filter
