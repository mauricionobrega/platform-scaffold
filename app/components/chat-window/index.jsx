import React, {PropTypes} from 'react'
import classNames from 'classnames'

import {browserHistory} from 'react-router'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Link from 'progressive-web-sdk/dist/components/link'

import ProductTile from '../../containers/plp/partials/product-tile'
import SpeechToText from '../speech-to-text'

const componentClass = 'c-chat-window'

const capitalize = (s) => {
    return s.replace(/^\S/, (m) => m.toUpperCase())
}


/**
 * INSERT_DESCRIPTION_HERE
 */

class ChatWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            isRecording: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length) {
            // scroll to the bottom
            const sheetInner = this.container.querySelector('.c-sheet__inner')
            sheetInner.scrollTop = this.container.querySelector('.c-sheet__content').clientHeight
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

        const onSubmit = (e) => {
            e.preventDefault()
            sendMessage(inputValue)
        }

        return (
            <div ref={(el) => { this.container = el }}>
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

                            const classes = message.from === 'user' ? 'messageWrapperUser' : 'messageWrapperClippy'

                            const onClick = () => {
                                browserHistory.push(message.url)
                                closeSheet()
                            }

                            return (
                                <div key={index}>
                                    <Link onClick={onClick} className={classes}>
                                        <div className={message.from === 'user' ? 'fromUser' : 'clippyMessage'}>
                                            {message.text}
                                        </div>
                                    </Link>

                                   {message.hasProduct &&
                                        <ListTile onClick={onClick}>
                                            <ProductTile product={productProps} />
                                        </ListTile>
                                    }
                                </div>
                            )
                        })}

                        <div className="sendClippyMessage">
                            <form
                                className="u-flexbox u-bg-color-neutral-10"
                                onSubmit={onSubmit}
                            >
                                <input
                                    type="text"
                                    className="u-flex"
                                    value={inputValue}
                                    placeholder="Ask Clippy a question..."
                                    onChange={(e) => this.setState({inputValue: e.target.value})}
                                />
                                <SpeechToText
                                    onChange={(result) => this.setState({inputValue: result})}
                                    onComplete={(result) => sendMessage(result)}
                                />
                                <Button
                                    className="u-flex-none clippyButton"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </form>
                        </div>
                    </div>
                </Sheet>
            </div>
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
