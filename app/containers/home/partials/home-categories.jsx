import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const getImage = (alt) => {
    return alt ? (
        <Image
            src={getAssetUrl(`static/img/categories/${alt.trim().replace(/\s+/g, '-')
            .toLowerCase()}@2x.png`)}
            alt={alt}
            height="60px"
            width="60px"
        />
    ) : (
        <SkeletonBlock height="60px" width="60px" />
    )
}

const renderCategory = (category, key) => {
    const {href, text} = category
    const categoryClasses = classNames('t-home__category-section', {
        'u-text-all-caps': !!text
    })

    return (
        <ListTile
            className={categoryClasses}
            href={href}
            startAction={getImage(text)}
            endAction={<Icon name="chevron-right" />}
            includeEndActionInPrimary={true}
            key={key}
        >
            <div className="u-h2 t-home__category-text u-text-lighter">SHOP</div>

            {text ?
                <div className="t-home__category-text t--text-large">{text}</div>
            :
                <SkeletonText
                    className="t-home__category-text t--text-large"
                    style={{height: '25px', lineHeight: '25px'}}
                    width="100px"
                />
            }
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
