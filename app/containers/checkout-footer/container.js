import React, {PropTypes} from 'react'
import Immutable from 'immutable'
import {connect} from 'react-redux'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
// import * as actions from './actions'

class CheckoutFooter extends React.Component {
//    constructor(props) {
//        super(props)
//    }

    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.footer, nextProps.footer)
    }

    render() {
        const {footer} = this.props

        return (
            <footer className="t-checkout-footer">
                <div className="t-checkout-footer__inner u-padding-lg u-text-align-center">
                    <div className="u-flex">
                        <div className="t-checkout-footer__logo_wrapper">
                            <DangerousHTML html={logo}>
                                {(htmlObj) => <div className="t-checkout-footer__logo" dangerouslySetInnerHTML={htmlObj} />}
                            </DangerousHTML>
                        </div>
                    </div>
                    <div className="t-checkout-footer__copyright u-padding-top u-padding-bottom">
                        <p>© 2016 Mobify Research & Development Inc.</p>
                    </div>
                </div>
            </footer>
        )
    }
}

CheckoutFooter.propTypes = {
    /**
     * Slice into the global app state
     */
    footer: PropTypes.object,
}


const mapStateToProps = (state) => {
    return {
        footer: state.footer,
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutFooter)
