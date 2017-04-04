import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

import {getTitle, getText, getIntro, getCookieList} from './selectors'
// import * as privacyPageActions from './actions'

const containerClass = 't-privacy-page'
const titleClass = `${containerClass}__title`

const PrivacyPage = ({title, intro, text, cookieList}) => (
    <div className={containerClass}>
        { title
            ? <h1 className={titleClass}>{title}</h1>
            : <SkeletonText lines={1} type="h1" width="100px" />
        }
        { intro
            ? <p>{intro}</p>
            : <SkeletonText lines={4} type="p" width="400px" />
        }
        { cookieList
            ? <div>
                <h2>All of the cookies</h2>
                <ul>
                    {[...cookieList].map((cookie, index) =>
                        <li key={index}>{cookie}</li>
                    )}
                </ul>
            </div>
            : <SkeletonText lines={10} type="li" width="1000px" />
        }
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

PrivacyPage.propTypes = {
    cookieList: PropTypes.array,
    intro: PropTypes.string,
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    cookieList: getCookieList,
    intro: getIntro,
    text: getText,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: privacyPageActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivacyPage)
