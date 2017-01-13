import React, {PropTypes} from 'react'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation.map(({title, href}, key) => {
                return (
                    <ListTile href={href} key={key}>
                        {title || <SkeletonText width="135px" style={{lineHeight: '20px'}} />}
                    </ListTile>
                )
            })}

            <Divider />

            <div className="t-footer__copyright u-padding-top u-padding-bottom">
                <p>Copyright Merlin&#39;s Potions 2016</p>
                <p className="u-margin-top">All rights reserved.</p>
            </div>
        </div>
    )
}

FooterNavigation.propTypes = {
    navigation: PropTypes.array
}

export default FooterNavigation
