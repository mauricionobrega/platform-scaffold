import React, {PropTypes} from 'react'
import classNames from 'classnames'

import {browserHistory} from 'react-router'

import Field from 'progressive-web-sdk/dist/components/field'
import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Link from 'progressive-web-sdk/dist/components/link'

import ProductTile from '../../containers/plp/partials/product-tile'
import SpeechToText from '../speech-to-text'

const componentClass = 'c-chat-window'


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

        this.renderMessages = this.renderMessages.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.messages.length !== this.props.messages.length) {
            // Scroll to the bottom
            const sheetInner = this.container.querySelector('.c-sheet__inner')
            sheetInner.scrollTop = this.container.querySelector('.c-sheet__content').clientHeight
        }
    }

    renderMessages() {
        const {
            messages,
            closeSheet
        } = this.props

        return messages && messages.map((message, index) => {
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
        })
    }

    render() {
        const {
            sendMessageToClippy,
            className,
            sheetOpen,
            closeSheet
        } = this.props

        const {
            inputValue
        } = this.state

        const classes = classNames(componentClass, className)

        const sendMessage = () => {
            sendMessageToClippy(this.state.inputValue)
            this.setState({
                inputValue: ''
            })
        }

        const onSubmit = (e) => {
            e.preventDefault()
            sendMessage()
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

                        {this.renderMessages()}

                        <div className="sendClippyMessage">
                            <form
                                className="u-flexbox u-bg-color-neutral-10"
                                onSubmit={onSubmit}
                            >
                                <Field>
                                    <input
                                        type="text"
                                        className="u-flex"
                                        value={inputValue}
                                        placeholder="Ask Clippy a question..."
                                        onChange={(e) => this.setState({inputValue: e.target.value})}
                                    />
                                </Field>

                                <SpeechToText
                                    onChange={(result) => this.setState({inputValue: result})}
                                    onComplete={() => sendMessage()}
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

    /**
     * Dispatches an action which closes the chat window sheet
     */
    closeSheet: PropTypes.func,

    /**
     * The messages to display
     */
    messages: PropTypes.array,

    /**
     * Dispatches an action that sends a message to Clippy
     */
    sendMessageToClippy: PropTypes.func,

    /**
     * Indicates if the chat window sheet is open
     */
    sheetOpen: PropTypes.bool
}

export default ChatWindow
