import React, {PropTypes} from 'react'

import Immutable from 'immutable'
import {connect} from 'react-redux'

import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import Form from './partials/form'

import * as actions from './actions'

const Panel = ({panelTitle, heading, description, form}, submit) => {
    return (
        <TabsPanel title={panelTitle}>
            <h3>{heading}</h3>
            <p>{description}</p>
            {form.fields &&
                <Form {...form} submitForm={submit}></Form>
            }
        </TabsPanel>
    )
}

const Login = ({
    title,
    isLogin,
    login,
    register,
    submitLogin,
    submitRegister
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <Tabs activeIndex={isLogin ? 0 : 1}>
                {Panel(login, submitLogin)}
                {Panel(register, submitRegister)}
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
        submitLogin: (values) => dispatch(actions.submitLogin(values)),
        submitRegister: (values) => dispatch(actions.submitRegister(values)),
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
