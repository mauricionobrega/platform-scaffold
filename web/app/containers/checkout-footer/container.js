import React from 'react'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'

const CheckoutFooter = function(props) {
    return (
        <footer className="t-checkout-footer">
            <div className="t-checkout-footer__inner u-padding-lg u-text-align-center">
                <div className="u-flex">
                    <div className="t-checkout-footer__logo-wrapper">
                        <DangerousHTML html={logo}>
                            {(htmlObj) => <div className="t-checkout-footer__logo" dangerouslySetInnerHTML={htmlObj} />}
                        </DangerousHTML>
                    </div>
                </div>
                <div className="t-checkout-footer__copyright u-padding-top">
                    <p>© 2016 Mobify Research & Development Inc.</p>
                </div>
            </div>
        </footer>
    )
}

export default CheckoutFooter
