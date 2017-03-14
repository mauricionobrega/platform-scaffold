import React, {PropTypes} from 'react'
import classNames from 'classnames'

import LazyLoader from 'progressive-web-sdk/dist/components/lazy-loader'

const componentClass = 'c-lazy-load-image'

/**
 * Lazy load image: content will render immediately
 * if its in view or will show when scrolled to it
 */

class LazyLoadImage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visible: false
        }

        this.handleScroll = this.handleScroll.bind(this)
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
            image,
            placeholder
        } = this.props

        const classes = classNames(componentClass, className, {
            // 'c--modifier': bool ? true : false
        })

        return (
            <div
                className={classes}
                ref={(el) => { this.el = el }}
            >
                {this.state.visible ?
                    image
                :
                    placeholder
                }
            </div>
        )
    }
}

LazyLoadImage.defaultProps = {
    threshold: 0
}


LazyLoadImage.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    image: PropTypes.node,

    placeholder: PropTypes.node,
    /**
     * Number of pixels out the viewport before loading the content
     */
    threshold: PropTypes.number
}

export default LazyLoadImage
