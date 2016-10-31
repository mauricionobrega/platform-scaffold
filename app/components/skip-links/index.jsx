import React, {PropTypes} from 'react'
import classNames from 'classnames'

const SkipLinks = ({className}) => {
    const classes = classNames('c-skip-links', className)

    return (
        <div className={classes}>
            <a href="#app-main" className="c-skip-links__anchor">
                Skip to content
            </a>

            <a href="#header-navigation" className="c-skip-links__anchor">
                Skip to main navigation
            </a>

            <a href="#app-footer" className="c-skip-links__anchor">
                Skip to footer
            </a>
        </div>
    )
}

SkipLinks.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string
}

export default SkipLinks
