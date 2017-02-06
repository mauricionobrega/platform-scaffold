import React from 'react'
import {GRID_SETTINGS} from '../constants'

import Button from 'progressive-web-sdk/dist/components/button'
import {Grid, GridSpan} from '../../../components/grid'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

/* eslint-disable react/prop-types */
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
/* eslint-enable react/prop-types */

const CheckoutConfirmationQuestions = () => (
    <Grid className="t-checkout-confirmation__questions u-center-piece">
        <GridSpan {...GRID_SETTINGS}>
            <div className="t-checkout-confirmation__heading u-padding-md u-padding-bottom-lg">
                <h2 className="u-h4 u-text-all-caps">Any Questions</h2>
            </div>
        </GridSpan>

        <GridSpan {...GRID_SETTINGS}>
            <div className="u-bg-color-neutral-10 u-border-light-top u-border-light-bottom">
                <List>
                    <QuestionLink href="/sales/order/history/">Orders and Returns</QuestionLink>
                    <QuestionLink href="/contact/">Contact Us</QuestionLink>
                </List>
            </div>
        </GridSpan>

        <GridSpan {...GRID_SETTINGS}>
            <div className="u-padding-lg">
                <Button href="/" className="c--tertiary u-width-full u-text-all-caps">
                    Continue Shopping
                </Button>
            </div>
        </GridSpan>
    </Grid>
)

export default CheckoutConfirmationQuestions
