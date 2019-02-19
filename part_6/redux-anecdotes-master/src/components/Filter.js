import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ setFilter }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      filter <input name="filter" onChange={e => setFilter(e.target.value)} />
    </div>
  )
}

export default connect(
  null,
  { setFilter }
)(Filter)
