import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import Banner from 'progressive-web-sdk/dist/components/banner'

// getText removed
import {getWarning, getTitle, getCookieList, getPara} from './selectors'
// import * as privacyPageActions from './actions'

const containerClass = 't-privacy-page'
const titleClass = `${containerClass}__title`

const PrivacyPage = ({cookieList, warning, para, title}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
        { warning ?
            <Banner icon="info" title="info">
                {warning}
            </Banner>
        :
            <SkeletonBlock height="84px" />
        }
        { para ?
            <p>{para}</p>
        :
            <SkeletonBlock height="84px" />
        }
        { cookieList ?
            <div>
                <h2>Cookies We Collect</h2>
                <ul>
                    {[...cookieList].map((cookie, index) =>
                        <li key={index}>{cookie}</li>
                    )}
                </ul>
            </div>
        :
            <SkeletonText lines={10} type="li" width="1000px" />
        }
        {/*{text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}*/}
    </div>
)

PrivacyPage.propTypes = {
    cookieList: PropTypes.array,
    para: PropTypes.string,
    // text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    warning: PropTypes.string
}

// If we had other components in the container besides PrivacyPage, we'd define their propTypes here too
const mapStateToProps = createPropsSelector({
    cookieList: getCookieList,
    para: getPara,
    // text: getText,
    title: getTitle,
    warning: getWarning,
})

const mapDispatchToProps = {
    // setTitle: privacyPageActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPage)
