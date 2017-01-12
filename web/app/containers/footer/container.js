import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import * as actions from './actions'

import FooterNewsletterSubscription from './partials/footer-newsletter-subscription'
import FooterSocialIcons from './partials/footer-social-icons'
import FooterNavigation from './partials/footer-navigation'

const social = [
    ['http://www.facebook.com/#TODO', 'static/svg/facebook.svg', 'Facebook'],
    ['http://www.twitter.com/#TODO', 'static/svg/twitter.svg', 'Twitter'],
    ['http://plus.google.com/#TODO', 'static/svg/googleplus.svg', 'Google+'],
    ['http://www.youtube.com/#TODO', 'static/svg/youtube.svg', 'Youtube'],
]

class Footer extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitNewsletter = this.onSubmitNewsletter.bind(this)
    }

    onSubmitNewsletter(data) {
        const method = this.props.footer.getIn(['newsletter', 'method'], '')
        const action = this.props.footer.getIn(['newsletter', 'action'], '')
        this.props.submitNewsletter(method, action, data)
    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.footer, nextProps.footer)
    }

    render() {
        if (this.props.isRunningInAstro) {
            return null
        }

        const {footer} = this.props
        const navigation = footer.get('navigation')
        const newsletter = footer.get('newsletter')

        return (
            <footer className="t-footer">
                <FooterNewsletterSubscription newsletter={newsletter} onSubmit={this.onSubmitNewsletter} />
                <FooterSocialIcons social={social} />
                <FooterNavigation navigation={navigation} />
            </footer>
        )
    }
}

Footer.propTypes = {
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object,
    /**
     * Defines whether we're being hosted in an Astro app
     */
    isRunningInAstro: PropTypes.bool,
    /**
     * Submit the newsletter subscription form to the backend
     */
    submitNewsletter: PropTypes.func
}


const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

const mapDispatchToProps = {
    submitNewsletter: actions.signUpToNewsletter
}

export {Footer as RawFooter}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)
