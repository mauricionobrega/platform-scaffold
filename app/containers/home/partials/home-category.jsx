import React, {PropTypes} from 'react'

import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

const getImage = (text) => {
    return (
        <Image
            src={getAssetUrl(`static/img/categories/${text.trim().toLowerCase()}@2x.png`)}
            alt={text}
            height="60px"
            width="60px"
        />
    )
}

const icon = <Icon name="chevron-right" style={{height: '3vh', width: '3vh'}} />

const HomeCategory = ({href, text}) => {
    return text ?
        <ListTile
            className="t-home__category-section u-text-all-caps"
            href={href}
            startAction={getImage(text)}
            endAction={icon}
            includeEndActionInPrimary={true}
        >
            <div className="t-home__category-text u-text-light">SHOP</div>
            <div className="t-home__category-text t-home__category-text-large">{text}</div>
        </ListTile>
    :
        <ListTile
            className="t-home__category-section"
            startAction={<SkeletonBlock height="60px" width="60px" />}
        >
            <SkeletonText className="t-home__category-text" lines={2} />
        </ListTile>
}

HomeCategory.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
}

export default HomeCategory
