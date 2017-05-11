import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ampSDK from '../../amp-sdk'

/**
 * An AMP lightbox
 */
const AmpLightbox = ({className, children, id}) => {
    const classes = classNames('c-amp-lightbox', {
        //
    }, className)
    return (
        <amp-lightbox id={id} layout="nodisplay" class={classes}>
            {children}
        </amp-lightbox>
    )
}

AmpLightbox.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
}

export default ampSDK.ampComponent(
    AmpLightbox,
    '<script async custom-element="amp-lightbox" src="https://cdn.ampproject.org/v0/amp-lightbox-0.1.js"></script>'
)
