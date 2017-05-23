import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import AmpImage from 'mobify-amp-sdk/dist/components/amp-image'
import AmpLightbox from '../../components/amp-lightbox'

const containerClass = 't-home'

const PDP = ({links, title}) => {
    return (
        <div className={containerClass}>
            <div dangerouslySetInnerHTML={{__html: '<button on="tap:my-lightbox">Open lightbox</button>'}} />
            <AmpLightbox id="my-lightbox">
                <AmpImage src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" height="500" />
            </AmpLightbox>
            <AmpImage src="/static/mobify.png" width="252" height="64" layout="fixed" />

            <h1>{title}</h1>
            {links.map((linkText, i) => <p key={i}>{ linkText }</p>)}
        </div>
    )
}

PDP.propTypes = {
    /**
     * An array of links
     */
    links: PropTypes.array,
    /**
     * A title
     */
    title: PropTypes.string
}

const mapStateToProps = (state) => ({
    links: state.links,
    title: `PDP! - ${state.title}` || '',
    className: containerClass
})


export default connect(
    mapStateToProps
)(PDP)
