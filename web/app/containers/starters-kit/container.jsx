import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import {getDescription, getTitle, getText} from './selectors'
// import * as startersKitActions from './actions'

import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'


const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((productName, idx) => <ListTile key={idx}><div>{productName}</div></ListTile>)}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const StartersKit = ({description, hasProducts, products, title, text}) => (
    <div className={containerClass}>
        {title ?
            <h1 className={titleClass}>{title}</h1>
                :
            <SkeletonText lines={1} type="h1" width="100px" />
        }

        {description ?
            <p>{description}</p>
                :
            <SkeletonBlock height="100px" />
        }

        <br />
        <div>
            {hasProducts ?
                <ResultList products={products} />
                    :
                <SkeletonBlock height="50px" />
            }
        </div>
        {text.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
    </div>
)

StartersKit.propTypes = {
    description: PropTypes.string,
    hasProducts: PropTypes.bool,
    products: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

// Only wrap compound data (arrays and objects) in selectorToJS
const mapStateToProps = createStructuredSelector({
    // description: getDescription,
    text: selectorToJS(getText),
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: startersKitActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartersKit)
