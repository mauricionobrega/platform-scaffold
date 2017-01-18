import React, {PropTypes} from 'react'
import classNames from 'classnames'
import clippy from './clippy'
const componentClass = 'c-clippy'
import ChatWindow from '../chat-window'

/**
 * Your annoying assistant
 */

class Clippy extends React.Component {
    constructor() {
        super()
        this.state = {
            sheetOpen: false
        }
    }
    componentDidMount() {
        clippy.load('Clippy', `.${componentClass}__agent`, (agent) => {
            // Do anything with the loaded agent
            agent.show()
            const timeout = () => {
                setTimeout(() => {
                    agent.animate()
                    timeout()
                }, 2000)
            }

            timeout()
        })
    }
    render() {
        const {
            className,
            messages,
            sendMessageToClippy
        } = this.props

        const openSheet = () => {
            this.setState({sheetOpen: true})
        }

        const closeSheet = () => {
            this.setState({sheetOpen: false})
        }
        const classes = classNames(componentClass, className)

        return (
            <div className={classes}>
                <div onClick={() => openSheet()} className="u-flexbox">
                    <div className={`${componentClass}__card u-padding-md`}>
                        <div className={`${componentClass}__message`}>
                            Clippy's most recent message will go here
                        </div>
                    </div>
                    <div className={`${componentClass}__agent`} />
                </div>

                <ChatWindow messages={messages} closeSheet={closeSheet} sheetOpen={this.state.sheetOpen} sendMessageToClippy={sendMessageToClippy} />
            </div>
        )
    }
}


Clippy.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    messages: PropTypes.array,

    sendMessageToClippy: PropTypes.func
}

export default Clippy
