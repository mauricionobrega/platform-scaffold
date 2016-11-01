import React, {PropTypes} from 'react'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation ? navigation.map((item, key) =>
                <ListTile href={item.get('href')} key={key}>
                    {item.get('title')}
                </ListTile>
            ) :
                <SkeletonText lines={8} width="100%" style={{lineHeight: '2em'}} />
            }

            <Divider />

            <div className="t-footer__copyright u-padding-top u-padding-bottom">
                <p>Copyright Merlin's Potions 2016</p>
                <p className="u-margin-top">All rights reserved.</p>
            </div>
        </div>
    )
}

FooterNavigation.propTypes = {
    navigation: PropTypes.object
}

export default FooterNavigation
