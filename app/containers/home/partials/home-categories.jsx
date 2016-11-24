import React, {PropTypes} from 'react'
import classNames from 'classnames'

import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

const getImage = (text) => (
    <Image
        src={getAssetUrl(`static/img/categories/${text.trim().toLowerCase()}@2x.png`)}
        alt={text}
        height="60px"
        width="60px"
    />
)

const icon = <Icon name="chevron-right" style={{height: '3vh', width: '3vh'}} />
const shop = <div className="u-h2 t-home__category-text u-text-lighter">SHOP</div>

const renderCategory = (current, key) => {
    const {href, text} = current
    const categoryClasses = classNames('t-home__category-section', {
        'u-text-all-caps': !!text
    })

    return text ? (
        <ListTile
            className={categoryClasses}
            href={href}
            startAction={getImage(text)}
            endAction={icon}
            includeEndActionInPrimary={true}
            key={key}
        >
            {shop}

            <div className="t-home__category-text t--text-large">{text}</div>
        </ListTile>
    ) : (
        <ListTile
            className={categoryClasses}
            startAction={<SkeletonBlock height="60px" width="60px" />}
            key={key}
        >
            {shop}

            <SkeletonText
                className="t-home__category-text t--text-large"
                style={{lineHeight: '25px'}}
                width="100px"
            />
        </ListTile>
    )
}

const HomeCategories = ({categories}) => {
    return (
        <div className="t-home__category u-padding-start u-padding-end u-padding-bottom-md">
            <div className="u-card">
                {categories.map(renderCategory)}
            </div>
        </div>
    )
}

HomeCategories.propTypes = {
    categories: PropTypes.array.isRequired,
}

export default HomeCategories
