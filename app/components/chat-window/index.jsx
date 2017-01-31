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
            const sheetContent = this.container.querySelector('.c-sheet__content')
            sheetContent.scrollTop = this.container.querySelector('.c-chat-window__container').clientHeight
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

            const onClick = () => {
                browserHistory.push(message.url)
                closeSheet()
            }

            const fromUser = message.from === 'user'

            const messageClasses = classNames('c-chat-window__message', {
                'c--user': fromUser,
                'c--clippy': !fromUser
            })

            return (
                <div key={index}>
                    <div className={`u-flexbox ${!fromUser ? 'u-justify-end' : ''}`}>
                        <div className="c-chat-window__message-container u-flex-none u-margin-end-lg u-margin-start-lg u-margin-bottom">
                            <div className="u-color-neutral-10 u-text-small">
                                {fromUser ? 'You' : 'Merlin'} {message.timestamp}
                            </div>

                            <Link onClick={onClick}>
                                <div className={messageClasses}>
                                    {message.text}
                                </div>
                            </Link>
                        </div>
                    </div>

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
            sendMessageToClippy({
                text: this.state.inputValue,
                timestamp: new Date().toLocaleTimeString()
            })

            this.setState({
                inputValue: ''
            })
        }

        const onSubmit = (e) => {
            e.preventDefault()
            sendMessage()
        }

        const sheetHeader = (
            <div className="u-bg-color-brand u-text-align-end">
                <Button
                    className="u-text-all-caps u-text-small u-color-neutral-10"
                    type="button"
                    onClick={() => closeSheet()}
                >
                    Done
                </Button>
            </div>
        )

        const sheetFooter = (
            <div className="sendClippyMessage">
                <form
                    className="u-flexbox u-bg-color-neutral-10"
                    onSubmit={onSubmit}
                >
                    <Field>
                        <input
                            type="text"
                            className="u-border-0"
                            value={inputValue}
                            placeholder="Ask Merlin a question..."
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
                        icon="chevron-right"
                        title="Send"
                    />
                </form>
            </div>
        )

        return (
            <div className={classes} ref={(el) => { this.container = el }}>
                <Sheet
                    className="pw--bg-color-brand"
                    open={sheetOpen}
                    effect="slide-bottom"
                    coverage="95%"
                    headerContent={sheetHeader}
                    footerContent={sheetFooter}
                >
                    <div className="c-chat-window__container u-bg-color-brand">
                        {this.renderMessages()}
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
