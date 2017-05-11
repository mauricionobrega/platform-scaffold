/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'
import {connect} from 'react-redux'

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
