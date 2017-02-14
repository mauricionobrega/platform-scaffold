import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'

import Link from 'progressive-web-sdk/dist/components/link'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import Image from 'progressive-web-sdk/dist/components/image'

const PLPHeader = ({title, contentsLoaded}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            <div className="t-plp__breadcrumb">
                <Link href="/" className="u-text-small">Home</Link>
            </div>

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

PLPHeader.propTypes = {
    contentsLoaded: PropTypes.bool,
    title: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    contentsLoaded: selectors.getPlpContentsLoaded,
    title: selectors.getPlpTitle
})

export default connect(mapStateToProps)(PLPHeader)
