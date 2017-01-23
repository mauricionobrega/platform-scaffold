import React, {PropTypes} from 'react'
import classNames from 'classnames'

const componentClass = 'c-speech-to-text'

import Button from 'progressive-web-sdk/dist/components/button'
import {Icon} from 'progressive-web-sdk/dist/components/icon'

/**
 * This component handles speech to text input
 */

class SpeechToText extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            canRecord: false,
            isRecording: false
        }

        this.startRecording = this.startRecording.bind(this)
    }

    componentDidMount() {
        const {
            onChange,
            onComplete,
            onError
        } = this.props

        if ('webkitSpeechRecognition' in window) {
            this.setState({
                canRecord: true
            })

            const recognition = this.recognition = new window.webkitSpeechRecognition()
            recognition.continuous = true
            recognition.interimResults = true

            recognition.onstart = () => {
                this.setState({
                    isRecording: true,
                    transcript: ''
                })
            }

            recognition.onerror = (event) => {
                this.props.onError(event)

                if (event.error === 'no-speech') {
                    // XXX: TODO: change state here
                }

                if (event.error === 'audio-capture') {
                    // XXX: TODO: change state here
                }

                // If the user has blocked the microphone permission
                if (event.error === 'not-allowed') {
                    this.setState({
                        canRecord: false
                    })
                }
            }

            recognition.onresult = (event) => {
                let interimTranscript = ''
                let finalTranscript = this.state.transcript

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript
                    } else {
                        interimTranscript += event.results[i][0].transcript
                    }
                }

                this.setState({
                    transcript: finalTranscript
                })

                // Show what we have available so far
                onChange(finalTranscript || interimTranscript)
            }
        }
    }

    startRecording() {
        if (!this.state.isRecording) {
            this.recognition.start()
            this.setState({
                isRecording: true
            })
        } else {
            this.recognition.stop()
            this.setState({
                isRecording: false
            })

            this.props.onComplete(this.state.transcript)
        }
    }

    render() {
        const {
            className
        } = this.props

        const {
            canRecord,
            isRecording
        } = this.state

        const classes = classNames(componentClass, className)

        return canRecord && (
            <Button
                className={classes}
                type="button"
                onClick={this.startRecording}
            >
                <Icon name={isRecording ? 'recorder-active' : 'recorder'} />
            </Button>
        )
    }
}


SpeechToText.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

SpeechToText.defaultProps = {
    onChange: () => {},
    onComplete: () => {},
    onError: () => {}
}

export default SpeechToText
