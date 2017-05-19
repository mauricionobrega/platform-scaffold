import React, {PropTypes} from 'react'
import classNames from 'classnames'

import AmpLightbox from '../amp-lightbox'

/**
 * A Generic Page
 */
const Page = ({className, links, title}) => {
    const classes = classNames('c-page', {
        // 'c--modifier': bool ? true : false
    }, className)

    return (
        <div className={classes}>

            <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
            <AmpLightbox id="my-lightbox">
                <amp-img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
            </AmpLightbox>

            <h1>{title}</h1>
            {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
        </div>
    )
}


Page.defaultProps = {
    links: []
}


Page.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    /**
     * An array of links
     */
    links: PropTypes.array,
    /**
     * A title
     */
    title: PropTypes.string
}

export default Page
