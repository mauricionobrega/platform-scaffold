/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {connect} from 'react-redux'

import NewsletterForm from './newsletter-form'

class FooterNewsletterSubscription extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitNewsletter = this.onSubmitNewsletter.bind(this)
    }

    onSubmitNewsletter(data) {
        const {method, action} = this.props.newsletter
        this.props.onSubmit(action, method, data)
    }

    render() {
        const {newsletter} = this.props
        return (
            <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg">
                <div>
                    <h2 className="u-h4 u-margin-bottom-md u-text-uppercase">
                        Subscribe to Merlin&#39;s Newsletter
                    </h2>

                    <NewsletterForm disabled={!newsletter} onSubmit={this.onSubmitNewsletter} />
                </div>
            </div>
        )
    }
}

FooterNewsletterSubscription.propTypes = {
    newsletter: PropTypes.object,
    onSubmit: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    newsletter: selectors.getNewsletter
})

const mapDispatchToProps = {
    onSubmit: actions.signUpToNewsletter
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterNewsletterSubscription)
