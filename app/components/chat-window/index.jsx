import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-chat-window'

/**
 * INSERT_DESCRIPTION_HERE
 */

class ChatWindow extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
    }

    render() {
        const {
            text,
            className
        } = this.props

        const classes = classNames(componentClass, className, {
            // 'c--modifier': bool ? true : false
        })

        return (
            <div className={classes}>
              THIS IS THE CHAT WINDOW{text}
            </div>
        )
    }
}


ChatWindow.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    text: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default ChatWindow
