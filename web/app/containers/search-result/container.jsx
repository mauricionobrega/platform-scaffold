import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getTitle, getText} from './selectors'
// import * as searchResultActions from './actions'

const containerClass = 't-search-result'
const titleClass = `${containerClass}__title`

const SearchResult = ({title, text}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

SearchResult.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: searchResultActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult)
