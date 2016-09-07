import React from 'react'

import Immutable from 'immutable'

import {connect} from 'react-redux'
import Link from 'progressive-web-sdk/dist/components/link'
import styles from './login.scss'

import LoginForm from '../../components/login-form'

import * as loginActions from './actions'

const formData = [{
    type: 'fieldset',
    children: [
        {
            type: 'reduxFormField',
            props: {
                type: 'email',
                name: 'email',
                label: 'E-mail'
            }
        },
        {
            type: 'reduxFormField',
            props: {
                type: 'password',
                name: 'password',
                label: 'Password'
            }
        },
    ]
}]

export class Login extends React.Component {

    componentDidMount() {
        this.props.fetchLoginContents()
    }

    onSubmitLoginForm(data) {
        alert(`Email: ${data.email} Password: ${data.password}`) // eslint-disable-line no-alert
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.immutable, nextProps.immutable)
    }

    render() {
        return (
            <div>
                <Link href="/">Go Home</Link>
                <LoginForm formFieldDescriptor={formData} onSubmit={this.onSubmitLoginForm.bind(this)} />
            </div>
        )
    }
}

export const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS(),
        immutable: state.home
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
