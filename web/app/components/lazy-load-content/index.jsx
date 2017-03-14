import React, {PropTypes} from 'react'
import classNames from 'classnames'
import throttle from 'lodash.throttle'

const SCROLL_CHECK_INTERVAL = 200

const componentClass = 'c-lazy-load-content'

/**
 * Lazy load image: content will render immediately
 * if its in view or will show when scrolled to it
 */

class LazyLoadContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.handleScroll = throttle(this.handleScroll.bind(this), SCROLL_CHECK_INTERVAL)
        this.checkVisible = this.checkVisible.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.checkVisible()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    checkVisible() {
        const topPosition = this.el.getBoundingClientRect().top

        if (topPosition <= window.innerHeight + window.scrollY - this.props.threshold) {
            this.setState({
                visible: true
            })

            window.removeEventListener('scroll', this.handleScroll)
        }
    }

    handleScroll() {
        const {
            visible
        } = this.state

        if (visible) {
            return
        }

        this.checkVisible()
    }

    render() {
        const {
            className,
            content,
            placeholder
        } = this.props

        const classes = classNames(componentClass, className)

        return (
            <div
                className={classes}
                ref={(el) => { this.el = el }}
            >
                {this.state.visible ?
                    content
                :
                    placeholder
                }
            </div>
        )
    }
}

LazyLoadContent.defaultProps = {
    threshold: 0
}


LazyLoadContent.propTypes = {
    /**
     * Content that will be revealed when scrolled to
     */
    content: PropTypes.node.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * Placeholder content when actual content is not revealed
     */
    placeholder: PropTypes.node,

    /**
     * Number of pixels out the viewport before loading the content
     */
    threshold: PropTypes.number
}

export default LazyLoadContent
