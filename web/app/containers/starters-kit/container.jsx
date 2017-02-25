import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {selectorToJS} from '../../utils/selector-utils'

import * as startersKitActions from './actions'
import {getDescription, getHasProducts, getDisplayingAll, getStartersKitProducts, getTitle} from './selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

import ProductTile from '../product-list/partials/product-tile'


const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const ResultList = ({displayingAll, products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => {
            // Show reduced product list if applicable
            if (!displayingAll && idx > 1) {
                return null
            }

            return (
                <ProductTile key={idx} {...product} />
            )
        })}
    </List>
)

ResultList.propTypes = {
    displayingAll: PropTypes.bool,
    products: PropTypes.array
}

const StartersKit = ({description, displayingAll, hasProducts, products, showAll, showSome, title}) => (
    <div className={containerClass}>
        {title ?
            <h1 className={titleClass}>{title}</h1>
                :
            <SkeletonText lines={1} type="h1" width="100px" />
        }

        {description ?
            <Accordion>
                <AccordionItem header="Description">
                    {description}
                </AccordionItem>
            </Accordion>
                :
            <SkeletonBlock height="100px" />
        }

        <span>
            <Button className="c--tertiary" disabled={displayingAll} onClick={showAll}>Show All</Button>
            <Button className="c--tertiary" disabled={!displayingAll} onClick={showSome}>Show Some</Button>
        </span>

        <br />
        <div>
            {hasProducts ?
                <ResultList displayingAll={displayingAll} products={products} />
                    :
                <SkeletonBlock height="50px" />
            }
        </div>
    </div>
)

StartersKit.propTypes = {
    description: PropTypes.string,
    displayingAll: PropTypes.bool,
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
    showAll: PropTypes.func,
    showSome: PropTypes.func,
    text: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
}

// Only wrap compound data (arrays and objects) in selectorToJS
const mapStateToProps = createStructuredSelector({
    description: getDescription,
    displayingAll: getDisplayingAll,
    hasProducts: getHasProducts,
    products: selectorToJS(getStartersKitProducts),
    title: getTitle
})

const mapDispatchToProps = {
    showAll: startersKitActions.showAll,
    showSome: startersKitActions.showSome
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartersKit)
