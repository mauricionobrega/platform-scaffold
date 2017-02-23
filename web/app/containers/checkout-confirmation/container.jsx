import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import Immutable from 'immutable'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

import Astro from '../../vendor/astro-client'
import * as checkoutConfirmationActions from './actions'
import CheckoutConfirmationForm from './partials/checkout-confirmation-form'
import CheckountConfirmationModal from './partials/checkout-confirmation-modal'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutConfirmation, newProps.checkoutConfirmation)
    }

    render() {
        Astro.trigger('checkout:disable-alert')
        const {
            contentsLoaded,
            emailAddress,
            isLoggedIn,
            isModalShown,
            orderNumber,
        } = this.props.checkoutConfirmation.toJS()

        const gridSettings = {
            tablet: {span: 6, pre: 1, post: 1},
            desktop: {span: 6, pre: 3, post: 3}
        }

        const Checklist = ({children}) => (
            <div className="u-flexbox u-align-center u-padding-top u-padding-bottom">
                <Icon name="check" className="u-flex-none u-margin-end-md u-color-brand" />
                <div className="u-flex">{children}</div>
            </div>
        )

        const QuestionLink = ({children, href}) => (
            <ListTile
                href={href}
                endAction={<Icon name="chevron-right" className="u-flex-none" />}
            >
                <div className="u-flexbox">
                    <div className="u-flex">{children}</div>
                </div>
            </ListTile>
        )

        return contentsLoaded && (
            <div className="t-checkout-confirmation u-bg-color-neutral-10">
                <div className="u-bg-color-neutral-00 u-border-light-bottom">
                    <Grid className="u-center-piece">
                        <GridSpan
                            className="t-checkout-confirmation__splash-image"
                            tablet={{span: 6, pre: 1, post: 1}}
                            desktop={{span: 2, post: 3}}
                        >
                            <div className="u-text-align-center u-padding-lg u-text-line-height-0">
                                <Image src={getAssetUrl('static/img/checkout/confirmed.png')} alt="Sparkling checkmark, signifying completion" height="57px" width="99px" />
                            </div>
                        </GridSpan>

                        <GridSpan
                            className="t-checkout-confirmation__splash-message"
                            tablet={{span: 6, pre: 1, post: 1}}
                            desktop={{span: 4, pre: 3}}
                        >
                            <div className="t-checkout-confirmation__thanks u-padding-bottom-lg">
                                <h1 className="u-margin-bottom-md u-text-lighter u-text-all-caps">
                                    <strong>Thanks,</strong> order confirmed
                                </h1>

                                <div className="u-text-content">
                                    <p>We’ve sent you an email confirmation along with your order receipt.</p>
                                    <p>Your order # is: <strong>{orderNumber}</strong>.</p>
                                    <p>Email: <strong>{emailAddress}</strong></p>
                                </div>
                            </div>
                        </GridSpan>
                    </Grid>
                </div>

                {isLoggedIn &&
                    <Grid className="u-center-piece">
                        <GridSpan {...gridSettings}>
                            <div className="t-checkout-confirmation__heading u-padding-md u-padding-top-lg">
                                <h2 className="u-h4 u-text-all-caps">Save Your Details</h2>
                            </div>
                        </GridSpan>

                        <GridSpan {...gridSettings}>
                            <div className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom u-padding-md u-padding-top-lg u-padding-bottom-lg">
                                <div className="u-margin-bottom-lg">
                                    <Checklist>
                                        <strong>Check out faster</strong> with saved addresses
                                    </Checklist>

                                    <Checklist>
                                        <strong>Track progress</strong> of your orders
                                    </Checklist>

                                    <Checklist>
                                        Access your <strong>order history</strong>
                                    </Checklist>
                                </div>

                                <CheckoutConfirmationForm handleSubmit={this.props.showModal} />
                            </div>
                        </GridSpan>
                    </Grid>
                }

                <Grid className="u-center-piece">
                    <GridSpan {...gridSettings}>
                        <div className="t-checkout-confirmation__heading u-padding-md u-padding-bottom-lg">
                            <h2 className="u-h4 u-text-all-caps">Any Questions</h2>
                        </div>
                    </GridSpan>

                    <GridSpan {...gridSettings}>
                        <div className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                            <List>
                                <QuestionLink href="#">Orders and Returns</QuestionLink>
                                <QuestionLink href="#">Contact Us</QuestionLink>
                            </List>
                        </div>
                    </GridSpan>

                    <GridSpan {...gridSettings}>
                        <div className="u-padding-lg">
                            <Button href="/" className="c--tertiary u-width-full u-text-all-caps">
                                Continue Shopping
                            </Button>
                        </div>
                    </GridSpan>
                </Grid>

                <CheckountConfirmationModal isOpen={isModalShown} closeModal={this.props.hideModal} />
            </div>
        )
    }
}

CheckoutConfirmation.propTypes = {
    checkoutConfirmation: PropTypes.instanceOf(Immutable.Map),
    emailAddress: PropTypes.string,
    fetchContents: PropTypes.func,
    hideModal: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    isModalShown: PropTypes.bool,
    orderNumber: PropTypes.string,
    showModal: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        checkoutConfirmation: state.checkoutConfirmation,
        // isLoggedIn: state.isLoggedIn,
        // isModalShown: state.isModalShown,
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutConfirmationActions.fetchContents,
    hideModal: checkoutConfirmationActions.hideModal,
    showModal: checkoutConfirmationActions.showModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutConfirmation)
