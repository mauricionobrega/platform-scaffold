import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import {getTitle, getText} from './selectors'
// import * as startersKitActions from './actions'

const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const StartersKit = ({title, text}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

StartersKit.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

// Only wrap compound data (arrays and objects) in selectorToJS
const mapStateToProps = createStructuredSelector({
    text: selectorToJS(getText),
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: startersKitActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartersKit)
