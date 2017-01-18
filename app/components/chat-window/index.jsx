import React, {PropTypes} from 'react'
import classNames from 'classnames'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Image from 'progressive-web-sdk/dist/components/image'

import ProductTile from '../../containers/plp/partials/product-tile'

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
                    {messages && messages.map((message, index) => {
                        const productImage = message.product && <Image
                            src={message.product.carouselItems[0].img}
                            className="c-chat-window__product-image"
                        />

                        return (
                            <div>
                                <div key={index} className={message.from === 'user' ? 'messageWrapperUser' : 'messageWrapperClippy'}>
                                    <div className={message.from === 'user' ? 'fromUser' : 'clippyMessage'}>
                                        {message.text}
                                    </div>
                                </div>

                               {message.product &&
                                    <ListTile
                                        href={message.url}
                                        className="u-bg-color-neutral-10"
                                    >
                                        <ProductTile
                                            {...message.product}
                                            image={productImage}
                                        />
                                    </ListTile>
                                }
                            </div>
                        )
                    })}

                    <div className="sendClippyMessage">
                        <div className="u-flexbox">
                            <input
                                type="text"
                                className="u-flex"
                                value={inputValue}
                                placeholder="Ask Clippy a question..."
                                onChange={(e) => this.setState({inputValue: e.target.value})}
                            />
                            <Button
                                className="u-flex-none"
                                onClick={() => sendMessageToClippy(inputValue)}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
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
