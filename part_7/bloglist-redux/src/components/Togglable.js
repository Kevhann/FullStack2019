import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.showLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" onClick={toggleVisibility}>
          {props.cancelLabel}
        </Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired
}

export default Togglable