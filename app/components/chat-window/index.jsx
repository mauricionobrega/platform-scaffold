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
                <div className="chatContainer">
                    <div className="messageWrapperClippy">
                        <div className="clippyMessage">
                            FROM CLIPPY
                        </div>
                    </div>
                    <div className="messageWrapperUser">
                        <div className="fromUser">
                            FROM USER{text}
                        </div>
                    </div>
                    <input type="text" placeholder="Ask Clippy a question..." className="sendClippyMessage">

                    </input>
                    <button type="button">Send</button>
              </div>
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
