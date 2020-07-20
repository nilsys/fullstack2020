import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button, Collapse } from 'react-bootstrap'

// From part5
const Togglable = (props) => {
    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="primary" id="showButton" onClick={toggleVisibility} block>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="secondary" id="cancelButton" onClick={toggleVisibility} block>Cancel</Button>
            </div>
        </div>
    )
}

export default Togglable