import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Image from 'progressive-web-sdk/dist/components/image'

import {isRunningInAstro} from '../../../utils/astro-integration'

const ProductListHeader = ({title, contentsLoaded, parentName, parentHref}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            {!isRunningInAstro &&
                <div className="t-product-list__breadcrumb">
                    <Link href={parentHref} className="u-text-small">{parentName}</Link>
                </div>
            }
            <div className="u-margin-top-md">
                {contentsLoaded ?
                    <h1 className="u-text-lighter u-text-uppercase">{title}</h1>
                        :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }
            </div>
        </div>

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

const mapStateToProps = createStructuredSelector({
    contentsLoaded: selectors.getProductListContentsLoaded,
    parentHref: selectors.getProductListParentHref,
    parentName: selectors.getProductListParentName,
    title: selectors.getProductListTitle
})

export default connect(mapStateToProps)(ProductListHeader)
