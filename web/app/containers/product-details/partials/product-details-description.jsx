import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const ProductDetailsDescription = ({description}) => (
    <Accordion className="t-product-details__description">
        <AccordionItem header="Product Description" closeIconName="close" openIconName="plus">
            <p>{description}</p>
        </AccordionItem>
    </Accordion>
)

ProductDetailsDescription.propTypes = {
    description: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    description: selectors.getProductDescription
})

export default connect(mapStateToProps)(ProductDetailsDescription)
