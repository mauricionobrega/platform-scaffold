import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Immutable from 'immutable'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import Link from 'progressive-web-sdk/dist/components/link'
import logo from '../../static/svg/logo.svg'
import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'

class CheckoutHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !Immutable.is(this.props.header, nextProps.header)
    }

    render() {
        const {header} = this.props

        const innerButtonClassName = classnames('t-header__inner-button', 'u-padding-0', {
            't--hide-label': false
        })

        const linkClassName = classnames('t-header__link', {
            't--fade-sparkles': false
        })

        return (
            <header className="t-header">
                <HeaderBar className="t-header__bar">
                    <div className="t-header__placeholder" />

                    <div className="u-flex">
                        <HeaderBarTitle>
                            <Link href="/" className={linkClassName}>
                                <DangerousHTML html={logo}>
                                    {(htmlObj) => <div className="t-header__logo" dangerouslySetInnerHTML={htmlObj} />}
                                </DangerousHTML>
                                <h1 className="u-visually-hidden">Merlin's Potions</h1>
                            </Link>
                        </HeaderBarTitle>
                    </div>

                    <HeaderBarActions>
                        <Button innerClassName={innerButtonClassName}>
                            <IconLabel label="Stores" iconName="map" iconSize="medium" />
                        </Button>
                    </HeaderBarActions>
                </HeaderBar>
            </header>
        )
    }
}

CheckoutHeader.propTypes = {
    header: PropTypes.object,
    isCollapsed: PropTypes.bool,
    toggleHeader: PropTypes.func,
    onMenuClick: PropTypes.func,
    onMiniCartClick: PropTypes.func,
}

const mapStateToProps = ({header}) => {
    return {
        header
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutHeader)
