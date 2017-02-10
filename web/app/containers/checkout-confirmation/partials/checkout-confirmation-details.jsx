import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {GRID_SETTINGS} from '../constants'
import * as selectors from '../selectors'

import {Grid, GridSpan} from 'progressive-web-sdk/dist/components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import CheckoutConfirmationForm from './checkout-confirmation-form'

/* eslint-disable react/prop-types */
const Checklist = ({children}) => (
    <div className="u-flexbox u-align-center u-padding-top u-padding-bottom">
        <Icon name="check" className="u-flex-none u-margin-end-md u-color-brand" />
        <div className="u-flex">{children}</div>
    </div>
)
/* eslint-enable react/prop-types */

const CheckoutConfirmationDetails = (props) => {
    const {
        isLoggedIn
    } = props

    return isLoggedIn && (
        <Grid className="u-center-piece">
            <GridSpan {...GRID_SETTINGS}>
                <div className="t-checkout-confirmation__heading u-padding-md u-padding-top-lg">
                    <h2 className="u-h4 u-text-all-caps">Save Your Details</h2>
                </div>
            </GridSpan>

            <GridSpan {...GRID_SETTINGS}>
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

                    <CheckoutConfirmationForm />
                </div>
            </GridSpan>
        </Grid>
    )
}

CheckoutConfirmationDetails.propTypes = {
    isLoggedIn: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    isLoggedIn: selectors.getIsLoggedIn
})

export default connect(mapStateToProps)(CheckoutConfirmationDetails)
