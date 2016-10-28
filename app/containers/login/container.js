import React, {PropTypes} from 'react'

import Immutable from 'immutable'
import {connect} from 'react-redux'

import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import LoginForm from './partials/form'

import * as actions from './actions'

const LoginPanel = ({panelTitle, heading, description, form}, success, failure) => {
    return (
        <TabsPanel title={panelTitle}>
            <h3>{heading}</h3>
            <p>{description}</p>
            <LoginForm {...form} success={success} failure={failure}></LoginForm>
        </TabsPanel>
    )
}

const Login = ({
    title,
    isLogin,
    login,
    register,
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <Tabs activeIndex={isLogin ? 0 : 1}>
                {LoginPanel(login, loginSuccess, loginFailure)}
                {LoginPanel(register, registerSuccess, registerFailure)}
            </Tabs>
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
        loginSuccess: (response) => dispatch(actions.loginSuccess(response)),
        loginFailure: (response) => dispatch(actions.loginFailure(response)),
        registerSuccess: (response) => dispatch(actions.registerSuccess(response)),
        registerFailure: (response) => dispatch(actions.registerFailure(response))
    }
}

Login.propTypes = {
    title: PropTypes.string.isRequired,
    isLogin: PropTypes.bool.isRequired,
    login: PropTypes.object,
    register: PropTypes.object
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
