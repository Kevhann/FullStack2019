import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notifications }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!notifications) return null
  return <div style={style}>{notifications}</div>
}
const mapStateToProps = props => ({
  notifications: props.notifications
})
export default connect(mapStateToProps)(Notification)
