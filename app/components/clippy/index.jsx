import React, {PropTypes} from 'react'
import classNames from 'classnames'
import clippy from './clippy'
const componentClass = 'c-clippy'

/**
 * Your annoying assistant
 */

class Clippy extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: ''
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

        const {
            inputValue
        } = this.state

        const classes = classNames(componentClass, className)

        return (
            <div className={classes}>
                <div className="u-flexbox u-align-center">
                    <div className={`${componentClass}__card u-padding-md`}>
                        <div className={`${componentClass}__message`}>
                            Clippy's most recent message will go here
                        </div>
                    </div>
                    <div className={`${componentClass}__agent`} />
                </div>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => this.setState({ inputValue: e.target.value })}
                />
                <button onClick={() => sendMessageToClippy(inputValue)}>
                    send
                </button>

                {messages && messages.map((message, index) =>
                    <div key={index}>{message.text}</div>
                )}
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
