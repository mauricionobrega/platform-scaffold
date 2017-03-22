import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import * as actions from '../actions'
import {connect} from 'react-redux'

import NewsletterForm from './newsletter-form'


const FooterNewsletterSubscription = ({newsletter, onSubmit}) => {
    return (
        <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
            <div>
                <h2 className="u-h2 u-margin-bottom-md">
                    Subscribe to Merlin&#39;s Newsletter
                </h2>

                <NewsletterForm disabled={!newsletter} onSubmit={onSubmit} />
            </div>
        </div>
    )
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
