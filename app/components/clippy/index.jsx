import React, {PropTypes} from 'react'
import classNames from 'classnames'
import clippy from './clippy'
const componentClass = 'c-clippy'
import ChatWindow from '../chat-window'

import Button from 'progressive-web-sdk/dist/components/button'

import PDPItemAddedModal from '../../containers/pdp/partials/pdp-item-added-modal'

/**
 * Your annoying assistant
 */

class Clippy extends React.Component {
    constructor() {
        super()
        this.state = {
            sheetOpen: false,
            bubbleOpen: false
        }

        this.clippyLoaded = false
    }
    componentDidUpdate() {
        if (this.props.isVisible && !this.clippyLoaded) {
            this.pollFor$()
        }
    }

    pollFor$() {
        if (window.$) {
            clippy.load('Merlin', `.${componentClass}__agent`, (agent) => {
                this.clippyLoaded = true

                // Do anything with the loaded agent
                agent.show()
                let bubbleClose = () => {}
                let bubbleOpen = () => {}

                const timeout = () => {
                    setTimeout(() => {
                        agent.animate()
                        timeout()
                    }, 2000)
                }

                bubbleClose = () => {
                    setTimeout(() => {
                        this.setState({bubbleOpen: false})
                        bubbleOpen()
                    }, 10000)
                }

                bubbleOpen = () => {
                    setTimeout(() => {
                        this.setState({bubbleOpen: true})
                        bubbleClose()
                    }, 10000)
                }

                timeout()
                bubbleOpen()
            })
        } else {
            setTimeout(this.pollFor$, 100)
        }
    }

    render() {
        const {
            className,
            messages,
            sendMessageToClippy,
            product,
            itemAddedModalOpen,
            closeItemAddedModal,
            isVisible
        } = this.props

        const openSheet = () => {
            this.setState({sheetOpen: true})
        }

        const closeSheet = () => {
            this.setState({sheetOpen: false})
        }

        const classes = classNames(componentClass, className)

        return isVisible && (
            <div className={classes}>
                <Button onClick={() => openSheet()} className="u-flexbox">
                    <div className={this.state.bubbleOpen ? `${componentClass}__card u-padding-md` : `${componentClass}__card u-padding-md vishid`}>
                        <div className={`${componentClass}__message`}>
                            Hey, I'm Merlin! Click me for assistance.
                        </div>
                    </div>
                    <div className={`${componentClass}__agent`} />
                </Button>

                <ChatWindow messages={messages} closeSheet={closeSheet} sheetOpen={this.state.sheetOpen} sendMessageToClippy={sendMessageToClippy} />

                {product &&
                    <PDPItemAddedModal
                        open={itemAddedModalOpen}
                        onDismiss={closeItemAddedModal}
                        product={product}
                        quantity={1}
                    />
                }
            </div>
        )
    }
}


Clippy.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    closeItemAddedModal: PropTypes.func,

    isVisible: PropTypes.bool,

    itemAddedModalOpen: PropTypes.bool,

    messages: PropTypes.array,

    product: PropTypes.object,

    sendMessageToClippy: PropTypes.func
}

export default Clippy
