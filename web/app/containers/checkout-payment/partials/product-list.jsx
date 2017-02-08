import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import throttle from 'lodash.throttle'

// Selectors
import * as selectors from '../selectors'
import * as cartSelectors from '../../../store/cart/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// SDK Components
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import List from 'progressive-web-sdk/dist/components/list'

// Local Component
import ProductItem from '../../../components/product-item'

class ProductList extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this))
    }

    handleScroll() {
        const {isFixedPlaceOrderShown} = this.props
        const footerHeight = 200
        const scrollPosition = window.pageYOffset
        const windowSize = window.innerHeight
        const bodyHeight = document.body.offsetHeight
        const distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
        const newIsFixedPlaceOrderShown = distanceFromBottom > footerHeight

        if (newIsFixedPlaceOrderShown !== isFixedPlaceOrderShown) {  // Saves triggering the action
            this.props.toggleFixedPlaceOrder(newIsFixedPlaceOrderShown)
        }
    }

    render() {
        const {
            // cart,
            cartItems,
            isFixedPlaceOrderShown,
            summaryCount,
            subtotalExclTax,
            subtotalInclTax
        } = this.props

        const cart = {
        }

        return (
            <div className="t-checkout-payment__product-list">
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                    <h2 className="u-h4">Order Summary</h2>
                </div>

                <List className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                    {cartItems.map((item, idx) => {
                        const productImage = (
                            <Image
                                src={item.product_image.src}
                                alt={item.product_image.alt}
                                width="104px"
                                height="104px"
                            />
                        )

                        return (
                            <ProductItem
                                className="u-padding-top-lg u-padding-bottom-lg u-padding-start u-padding-end"
                                title={<h2 className="u-h3">{item.product_name}</h2>}
                                key={idx}
                                image={productImage}
                            >
                                <div className="u-flexbox u-align-bottom">
                                    <div className="u-flex-none u-color-neutral-50">
                                        {item.options.map(({label, value}, idx) => (
                                            <p
                                                className={idx > 0 ? 'u-margin-top-sm' : ''}
                                                key={`${item.item_id}-option-${idx}`}
                                            >
                                                {label}: {value}
                                            </p>
                                        ))}

                                        <p className={item.options > 0 ? 'u-margin-top-sm' : ''}>
                                            Qty: {item.qty}
                                        </p>
                                    </div>

                                    <div className="u-text-align-end u-flex">
                                        {item.onSale ?
                                            <div>
                                                <div className="u-h5 u-color-accent u-text-semi-bold">
                                                    {item.product_sale_price}
                                                </div>

                                                <div className="u-text-quiet">
                                                    <em>Was {item.product_old_price}</em>
                                                </div>
                                            </div>
                                        :
                                            <div className="u-h5 u-text-semi-bold">
                                                {item.product_price}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </ProductItem>
                        )
                    })}
                </List>

                <div className="u-bg-color-neutral-00">
                    <Ledger>
                        <LedgerRow
                            label={`Subtotal (${summaryCount} items)`}
                            value={subtotalExclTax}
                        />

                        {cart.shipping_rate &&
                            <LedgerRow
                                label={`Shipping (${cart.shipping_rate_label})`}
                                value={cart.shipping_rate}
                            />
                        }

                        {cart.promo_rate &&
                            <LedgerRow
                                className="u-border-light-bottom"
                                label={`Shipping (${cart.promo_rate_label})`}
                                value={cart.promo_rate}
                            />
                        }
                    </Ledger>

                    {!cart.promo_rate &&
                        <Accordion>
                            <AccordionItem header="Promo code">
                                <FieldRow>
                                    <Field label="Enter discount code">
                                        <input type="text" placeholder="Enter discount code" />
                                        <Button className="c--tertiary">Apply</Button>
                                    </Field>
                                </FieldRow>
                            </AccordionItem>
                        </Accordion>
                    }

                    <Ledger>
                        <LedgerRow
                            label="Total"
                            isTotal={true}
                            value={subtotalInclTax}
                        />
                    </Ledger>

                    {/* This is the statically positioned "Place Your Order" container */}
                    <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                        <Button className="c--primary u-flex-none u-width-full u-text-all-caps">
                            <Icon name="lock" />
                            Place Your Order
                        </Button>
                    </div>

                    {/* This is the FIXED positioned "Place Your Order" container */}
                    <div
                        className={`t-checkout-payment__fixed-place-order ${isFixedPlaceOrderShown && 't--show'}`}
                        tabIndex="-1"
                        aria-hidden="true"
                    >
                        <div className="u-padding-md u-bg-color-neutral-00 u-text-align-center">
                            <Button className="c--primary u-flex-none u-width-full u-text-all-caps">
                                <Icon name="lock" />
                                Place Your Order
                            </Button>

                            <p className="u-margin-top-md">
                                Total: <strong>{subtotalInclTax}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                        <Image
                            src={getAssetUrl('static/img/checkout/verisign-mcafee-secure.png')}
                            alt="Verisign and McAfee Secure"
                            height="38px"
                            width="150px"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ProductList.propTypes = {
    cart: PropTypes.object,

    /**
     * Cart item data
     */
    cartItems: PropTypes.array,

    /**
     * Whether the fixed 'Place Order' container displays
     */
    isFixedPlaceOrderShown: PropTypes.bool,

    /**
     * Subtotal excluding tax
     */
    subtotalExclTax: PropTypes.string,

    /**
     * Subtotal including tax
     */
    subtotalInclTax: PropTypes.string,

    /**
     * Total item count in cart
     */
    summaryCount: PropTypes.number,

    /**
     * Handle scroll to toggle fixed 'Place Order' container
     */
    toggleFixedPlaceOrder: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectorToJS(cartSelectors.getCartItems),
    subtotalExclTax: cartSelectors.getSubtotalExcludingTax,
    subtotalInclTax: cartSelectors.getSubtotalIncludingTax,
    summaryCount: cartSelectors.getCartSummaryCount,
    isFixedPlaceOrderShown: selectors.getIsFixedPlaceOrderShown
})

const mapDispatchToProps = {
    toggleFixedPlaceOrder: checkoutPaymentActions.toggleFixedPlaceOrder
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList)
