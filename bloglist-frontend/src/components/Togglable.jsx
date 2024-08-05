import { useState, forwardRef, useImperativeHandle } from 'react'
import PrimaryRoundedButton from './PrimaryBtn'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <PrimaryRoundedButton text={props.buttonLabel} onClick={toggleVisibility}/>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <PrimaryRoundedButton text={'cancel'} onClick={toggleVisibility}/>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable