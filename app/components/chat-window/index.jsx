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
            className,
            sheetOpen,
            closeSheet
        } = this.props

        const {
            inputValue
        } = this.state

        const classes = classNames(componentClass, className)

        const sendMessage = (inputValue) => {
            sendMessageToClippy(inputValue)
            this.state.inputValue = ''
        }

        return (
            <Sheet
                className={classes}
                open={sheetOpen}
                effect="slide-bottom"
                coverage="95%"
            >
                <div className="chatContainer">
                    <Button
                        className="closeSheet"
                        type="button"
                        onClick={() => closeSheet()}
                    >
                        X
                    </Button>

                    {messages && messages.map((message, index) => {
                        // Need to reorder props to work with ProductTile
                        const productProps = message.hasProduct && {
                            ...message.product,
                            link: {
                                text: message.product.title
                            },
                            image: message.product.carouselItems ? {
                                src: message.product.carouselItems[0].img
                            } : {}
                        }

                        return (
                            <div>
                                <div key={index} className={message.from === 'user' ? 'messageWrapperUser' : 'messageWrapperClippy'}>
                                    <div className={message.from === 'user' ? 'fromUser' : 'clippyMessage'}>
                                        {message.text}
                                    </div>
                                </div>

                               {message.hasProduct &&
                                    <ListTile
                                        href={message.url}
                                    >
                                        <ProductTile product={productProps} />
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
                                className="u-flex-none clippyButton"
                                type="button"
                                onClick={() => sendMessage(inputValue)}
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
