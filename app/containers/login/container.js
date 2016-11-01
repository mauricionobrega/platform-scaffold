import React, {PropTypes} from 'react'

import Immutable from 'immutable'
import {connect} from 'react-redux'

import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import LoginForm from './partials/form'

import * as actions from './actions'

const Login = ({
    title,
    heading,
    description,
    href,
    form,
    submitForm
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <h3>{heading}</h3>
            <p>{description}</p>
            <LoginForm {...form} submitForm={submitForm}></LoginForm>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.login.toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (values, resolve, reject) => dispatch(actions.submitForm(values, resolve, reject))
    }
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
    heading: PropTypes.string,
    description: PropTypes.string,
    href: PropTypes.string,
    form: PropTypes.object
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
