import React from 'react'

import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'
import styles from './login.scss'

import LoginForm from '../../components/login-form'

import * as loginActions from './actions'

export class Login extends React.Component {

    onSubmitLoginForm(data) {
        alert(`Email: ${data.email} Password: ${data.password}`) // eslint-disable-line no-alert
    }

    render() {
        return (
            <div>
                <Link href="/">Go Home</Link>
                <LoginForm onSubmit={this.onSubmitLoginForm.bind(this)} />
            </div>
        )
    }
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.login,
    }
}

export const mapDispatchToProps = (dispatch, props) => {
    return {
        onMyEvent: () => dispatch(loginActions.myAction())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
