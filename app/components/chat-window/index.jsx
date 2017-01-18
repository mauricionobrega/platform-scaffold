import React, {PropTypes} from 'react'
import classNames from 'classnames'

import {browserHistory} from 'react-router'

import Button from 'progressive-web-sdk/dist/components/button'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Image from 'progressive-web-sdk/dist/components/image'
import Link from 'progressive-web-sdk/dist/components/link'

import ProductTile from '../../containers/plp/partials/product-tile'

const componentClass = 'c-chat-window'

/**
 * WebSpeechRecognition
 *
 * L33t copy and paste from 
 * - https://github.com/GoogleChrome/webplatform-samples/blob/master/webspeechdemo/webspeechdemo.html
 * - https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
 */

let recognition = null;

const first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


/**
 * INSERT_DESCRIPTION_HERE
 */
let final_transcript = ''

class ChatWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            isRecording: false
        }
    }

    componentDidMount() {
        if ('webkitSpeechRecognition' in window) {
            //start_button.style.display = 'inline-block';
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onstart = function() {
                // XXX: TODO: change state here
                // recognizing = true;
                // showInfo('info_speak_now');
                // start_img.src = 'mic-animate.gif';
                console.log("Recongnition.onstart")
                final_transcript = ''
            };
            recognition.onerror = function(event) {
                if (event.error == 'no-speech') {
                    // XXX: TODO: change state here
                }
                if (event.error == 'audio-capture') {
                    // XXX: TODO: change state here
                }
                if (event.error == 'not-allowed') {
                    // XXX: TODO: change state here
                    ignore_onend = true;
                }
            };
            recognition.onend = () => {
                console.log("Recongnition.onend")
                // XXX: TODO: change state here
                if (!final_transcript) {
                    // might have more results
                    return;
                }
                this.setState({inputValue: final_transcript});
            };
            recognition.onresult = (event) => {
                console.log("Recongnition.onresult")
                var interim_transcript = '';
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                  console.log(event.results[i][0].transcript)
                  if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                  } else {
                    interim_transcript += event.results[i][0].transcript;
                  }
                }
                final_transcript = capitalize(final_transcript);
                this.setState({inputValue: final_transcript});
            };
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

        const startRecording = () => {
            if (recognition) {
                if (!this.state.isRecording) {
                    console.log('Start recording....')
                    this.setState({
                        isRecording: true,
                        inputValue: ''
                    })
                    recognition.start();
                } else {
                    console.log('Stop recording....')
                    this.setState({'isRecording': false})
                    recognition.stop();
                    if (inputValue && inputValue.trim()) {
                        sendMessage(inputValue)
                    }
                }
            }
        }

        return (
            <div>
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
                                    onClick={() => startRecording()}
                                >
                                    {this.state.isRecording ? '🔴' : '🎙'}
                                </Button>
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
