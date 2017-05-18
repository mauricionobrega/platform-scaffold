import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import LogMeInForm from './partials/log-me-in-form'

import {getLoginTitle} from './selectors'
// import * as logMeInActions from './actions'

const containerClass = 't-log-me-in'
const titleClass = `${containerClass}__title`

const LogMeIn = ({title}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>HI - {title}</h1>
        <LogMeInForm />
    </div>
)

LogMeIn.propTypes = {
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    title: getLoginTitle
})

const mapDispatchToProps = {
    // setTitle: logMeInActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogMeIn)
