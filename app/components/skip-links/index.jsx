import React, {PropTypes} from 'react'

const SkipLinks = () => {
    return (
        <div className="c-skip-links">
            <a href="#app-main" className="c-skip-links__anchor">
                Skip to content
            </a>

            <a href="#app-navigation" className="c-skip-links__anchor">
                Skip to main navigation
            </a>

            <a href="#app-footer" className="c-skip-links__anchor">
                Skip to footer
            </a>
        </div>
    )
}

export default SkipLinks
