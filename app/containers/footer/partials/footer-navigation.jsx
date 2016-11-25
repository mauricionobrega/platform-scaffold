import React, {PropTypes} from 'react'

import Divider from 'progressive-web-sdk/dist/components/divider'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const FooterNavigation = ({navigation}) => {
    return (
        <div className="t-footer__navigation u-padding-lg u-text-align-center">
            {navigation.map((item, key) => {
                const title = item.get('title')
                return (
                    <ListTile href={item.get('href')} key={key}>
                        {title ?
                            title
                        :
                            <SkeletonText width="135px" style={{lineHeight: '20px'}} />
                        }
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
    navigation: PropTypes.object
}

export default FooterNavigation
