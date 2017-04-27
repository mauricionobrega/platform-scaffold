import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import {getDescription, getHasProducts, getStartersKitProducts, getTitle} from './selectors'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import ProductTile from '../product-list/partials/product-tile'
import List from 'progressive-web-sdk/dist/components/list'

const containerClass = 't-starters-kit'
const titleClass = `${containerClass}__title`

const ResultList = ({products}) => (
    <List className="c--borderless">
        {products.map((product, idx) => (<ProductTile key={idx} {...product} />))}
    </List>
)

ResultList.propTypes = {
    products: PropTypes.array
}

const StartersKit = ({description, hasProducts, products, title}) => (
    <div className={containerClass}>
        { title ?
            <h1 className={titleClass}>{title}</h1>
        :
            <SkeletonText lines={1} type="h1" width="100px" />
        }
        { description ?
            <Accordion>
                <AccordionItem header="Description">
                    {description}
                </AccordionItem>
            </Accordion>
        :
            <SkeletonBlock height="100px" />
        }
        <br />
        <div>
            { hasProducts ?
                <ResultList products={products} />
            :
                <SkeletonBlock height="50px" />
            }
        </div>
    </div>
)

StartersKit.propTypes = {
    description: PropTypes.string,
    hasProducts: PropTypes.bool,
    products: PropTypes.array,
    title: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    description: getDescription,
    hasProducts: getHasProducts,
    products: getStartersKitProducts,
    title: getTitle
})

const mapDispatchToProps = {
    // setTitle: startersKitActions.setTitle
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartersKit)
