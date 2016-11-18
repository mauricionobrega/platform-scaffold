import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stripEvent} from '../../utils/utils'

import LoginForm from './partials/form'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import * as actions from './actions'

const Login = ({
    title,
    heading,
    description,
    form,
    requiredText,
    infoModalOpen,
    submitForm,
    openInfoModal,
    closeInfoModal
}) => {
    return (
        <div className="t-login">
            {title ?
                <h1 className="u-text-uppercase u-text-normal u-padding-md u-bg-color-neutral-20">{title}</h1>
            :
                <div className="u-padding-md">
                    <SkeletonBlock height="28px" width="50%" />
                </div>
            }

            <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                {heading ?
                    <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">{heading}</h3>
                :
                    <SkeletonBlock height="18px" width="50%" className="u-margin-bottom" />
                }

                {description ?
                    <p>{description}</p>
                :
                    <SkeletonBlock height="14px" width="100%" />
                }
                <div className="u-margin-top">{requiredText}</div>
            </div>

            {form.href ?
                <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                    <LoginForm {...form} submitForm={submitForm} openModal={openInfoModal} closeModal={closeInfoModal} modalOpen={infoModalOpen} />
                </div>
            :
                <SkeletonBlock height="200vw" width="100%" />
            }
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        ...state.login.toJS()
    }
}

const mapDispatchToProps = {
    submitForm: actions.submitForm,
    openInfoModal: stripEvent(actions.openInfoModal),
    closeInfoModal: stripEvent(actions.closeInfoModal)
}

Login.propTypes = {
    closeInfoModal: PropTypes.func,
    description: PropTypes.string,
    form: PropTypes.object,
    heading: PropTypes.string,
    href: PropTypes.string,
    infoModalOpen: PropTypes.bool,
    openInfoModal: PropTypes.func,
    requiredText: PropTypes.string,
    submitForm: PropTypes.func,
    title: PropTypes.string
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
