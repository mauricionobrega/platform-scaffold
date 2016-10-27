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
            src={getAssetUrl(`static/img/categories/${text.trim().toLowerCase()}.png`)}
            alt={text}
            height="60px"
            width="63px"
        />
    )
}

const icon = <Icon name="chevron-right" style={{height: '3vh', width: '3vh'}} className="u-color-brand" />

const HomeCategory = ({href, text}) => {
    return text ?
        <ListTile
            className="t-home__card-section u-text-all-caps"
            href={href}
            startAction={getImage(text)}
            endAction={icon}
            includeEndActionInPrimary={true}
        >
            <div className="t-home__card-text u-text-light">SHOP</div>
            <div className="t-home__card-text t-home__card-text-large">{text}</div>
        </ListTile>
    :
        <ListTile
            className="t-home__card-section"
            startAction={<SkeletonBlock height="60px" width="63px" />}
        >
            <SkeletonText className="t-home__card-text" lines={2} />
        </ListTile>
}

HomeCategory.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
}

export default HomeCategory
