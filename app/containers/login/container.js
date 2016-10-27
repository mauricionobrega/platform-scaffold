import React, {PropTypes} from 'react'

import Immutable from 'immutable'
import {connect} from 'react-redux'

import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import LoginForm from './partials/form'

import * as loginActions from './actions'

const LoginPanel = ({panelTitle, heading, description, form}) => {
    return (
        <TabsPanel title={panelTitle}>
            <h3>{heading}</h3>
            <p>{description}</p>
            <LoginForm {...form}></LoginForm>
        </TabsPanel>
    )
}

LoginPanel.propTypes = {
    panelTitle: PropTypes.string.isRequired,
    heading: PropTypes.string,
    description: PropTypes.string,
    form: PropTypes.object.isRequired
}

const Login = ({title, isLogin, login, register}) => {
    return (
        <div>
            <h1>{title}</h1>
            <Tabs activeIndex={isLogin ? 0 : 1}>
                {LoginPanel(login)}
                {LoginPanel(register)}
            </Tabs>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS()
    }
}

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         success: (response) => dispatch(loginActions.loginSuccess(response)),
//         failure: (response) => dispatch(loginActions.loginFailure(response))
//     }
// }

Login.propTypes = {
    title: PropTypes.string.isRequired,
    isLogin: PropTypes.bool.isRequired,
    login: PropTypes.object,
    register: PropTypes.object
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Login)
