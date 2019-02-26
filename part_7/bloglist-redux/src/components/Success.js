import React from 'react'
import { connect } from 'react-redux'

const Success = ({ success }) => {
  if (!success) {
    return null
  }
  return <div className="success">{success}</div>
}

const mapStateToProps = props => ({
  success: props.success
})

export default connect(mapStateToProps)(Success)
