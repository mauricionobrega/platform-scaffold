import React, {PropTypes} from 'react'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {selectorToJS} from '../../../utils/selector-utils'

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
        const {newsletter, onSubmit} = this.props
        return (
            <div className="t-footer__newsletter u-padding-md u-padding-top-lg u-padding-bottom-lg">
                <div>
                    <h2 className="u-h2 u-margin-bottom-md">
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

export default FooterNewsletterSubscription
