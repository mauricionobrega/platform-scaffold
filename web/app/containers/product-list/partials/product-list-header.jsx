/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getCategoryTitle, getCategoryParentTitle, getCategoryParentHref, getCategoryCustomContent} from '../../../store/categories/selectors'
import {getProductListContentsLoaded} from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Image from 'progressive-web-sdk/dist/components/image'

const ProductListHeader = ({title, contentsLoaded, parentName, parentHref, customContent}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            <div className="t-product-list__breadcrumb">
                <Link href={parentHref} className="u-text-size-small">{parentName}</Link>
            </div>
            <div className="u-margin-top-md">
                {contentsLoaded ?
                    <h1 className="u-text-uppercase">{title}</h1>
                :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }
            </div>
        </div>

        <h2>{customContent}</h2>

        {title &&
            <Image
                className="u-flex-none u-padding-end u-padding-bottom-sm"
                alt="Heading logo"
                height="60px"
                width="60px"
                src={getAssetUrl(`static/img/categories/${title.trim().replace(/\s+/g, '-')
                .toLowerCase()}@2x.png`)}
            />
        }
    </div>
)

ProductListHeader.propTypes = {
    contentsLoaded: PropTypes.bool,
    parentHref: PropTypes.string,
    parentName: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    contentsLoaded: getProductListContentsLoaded,
    parentHref: getCategoryParentHref,
    parentName: getCategoryParentTitle,
    title: getCategoryTitle,
    customContent: getCategoryCustomContent
})

export default connect(mapStateToProps)(ProductListHeader)
