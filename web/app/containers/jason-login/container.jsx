import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {getTitle, getText} from './selectors'
// import * as jasonLoginActions from './actions'

import LoginForm from './partials/login-form'

const containerClass = 't-jason-login'
const titleClass = `${containerClass}__title`

const JasonLogin = ({title, text}) => (
    <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        <LoginForm />
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

JasonLogin.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: jasonLoginActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JasonLogin)
