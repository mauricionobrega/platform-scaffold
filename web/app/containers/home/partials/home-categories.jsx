import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../../utils/selector-utils'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import * as selectors from '../selectors'

const CategoryImage = ({alt}) => {
    if (!alt) {
        return (<SkeletonBlock height="60px" width="60px" />)
    }
    return (
        <Image
            src={getAssetUrl(`static/img/categories/${alt.trim().replace(/\s+/g, '-')
            .toLowerCase()}@2x.png`)}
            alt={alt}
            height="60px"
            width="60px"
        />
    )
}

CategoryImage.propTypes = {
    alt: PropTypes.string
}

const HomeCategory = ({category: {path, title}}) => {
    const categoryClasses = classNames('t-home__category-section', {
        'u-text-all-caps': !!title
    })

    return (
        <ListTile
            className={categoryClasses}
            href={path}
            startAction={<CategoryImage alt={title} />}
            endAction={<Icon name="chevron-right" />}
        >
            <div className="u-h2 t-home__category-text u-text-lighter">SHOP</div>

            {title ?
                <div className="t-home__category-text t--text-large">{title}</div>
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

HomeCategory.propTypes = {
    category: PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string
    })
}

const HomeCategories = ({categories}) => {
    return (
        <div className="t-home__category u-padding-start u-padding-end u-padding-bottom-md">
            <div className="u-card">
                {categories.map((category, index) => <HomeCategory category={category} key={index} />)}
            </div>
        </div>
    )
}

HomeCategories.propTypes = {
    categories: PropTypes.array.isRequired
}

const mapStateToProps = createStructuredSelector({
    categories: selectorToJS(selectors.getHomeCategories)
})

export default connect(mapStateToProps)(HomeCategories)
