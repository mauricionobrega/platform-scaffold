import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'

const componentClass = 'c-chat-window'

/**
 * INSERT_DESCRIPTION_HERE
 */

class ChatWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: ''
        }
    }

    render() {
        const {
            messages,
            sendMessageToClippy,
            className
        } = this.props

        const {
            inputValue
        } = this.state

        const classes = classNames(componentClass, className)

        return (
            <Sheet
                className={classes}
                open={true}
                effect="slide-bottom"
                coverage="95%"
            >
                <div className="chatContainer">

                    {messages && messages.map((message, index) =>
                        <div key={index} className={message.from === 'user' ? 'messageWrapperUser' : 'messageWrapperClippy'}>
                            <div className={message.from === 'user' ? 'fromUser' : 'clippyMessage'}>
                                {message.text}
                            </div>
                        </div>
                    )}

                    <input
                        className="sendClippyMessage"
                        type="text"
                        value={inputValue}
                        placeholder="Ask Clippy a question..."
                        onChange={(e) => this.setState({inputValue: e.target.value})}
                    />
                    <Button onClick={() => sendMessageToClippy(inputValue)}>
                        Send
                    </Button>
                </div>
            </Sheet>
        )
    }
}


ChatWindow.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    messages: PropTypes.array,

    sendMessageToClippy: PropTypes.func
}

export default ChatWindow
