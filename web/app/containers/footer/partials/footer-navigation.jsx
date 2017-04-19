import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {connect} from 'react-redux'

import Divider from 'progressive-web-sdk/dist/components/divider'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Link from 'progressive-web-sdk/dist/components/link'

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation.map(({text, href}, index) => {
                return (
                    <Link className="t-footer__navigation-link" href={href} key={index}>
                        {text || <SkeletonText width="135px" style={{lineHeight: '20px'}} />}
                    </Link>
                )
            })}

            <Divider />


            <div className="t-footer__copyright u-padding-bottom">
                <p>Copyright Merlin&#39;s Potions 2016. All rights reserved.</p>
            </div>
        </div>

    )
}

FooterNavigation.propTypes = {
    navigation: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    navigation: selectors.getNavigation
})

export default connect(mapStateToProps)(FooterNavigation)
