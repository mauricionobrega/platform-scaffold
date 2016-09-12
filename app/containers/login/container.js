import React from 'react'

import Immutable from 'immutable'

import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'
import styles from './login.scss'

import LoginForm from '../../components/login-form'
import {attemptLogin} from '../../components/login-form/auth'

import * as loginActions from './actions'

export class Login extends React.Component {
    componentDidMount() {
        this.props.fetchLoginContents()
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.immutable, nextProps.immutable)
    }

    render() {
        return (
            <div>
                <Link href="/">Go Home</Link>
                <LoginForm
                    formFields={this.props.loginForm.fields}
                    onSubmit={attemptLogin} />
            </div>
        )
    }
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS(),
        immutable: state.login
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchLoginContents: () => dispatch(loginActions.fetchLoginContents())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
