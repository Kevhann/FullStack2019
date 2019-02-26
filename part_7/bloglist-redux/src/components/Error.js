import React from 'react'
import { connect } from 'react-redux'

const Error = ({ error }) => {
  if (!error) {
    return null
  }
  return <div className="error">{error}</div>
}

const mapStateToProps = state => {
  console.log('props passed to error', state)
  return { error: state.error }
}

export default connect(mapStateToProps)(Error)
