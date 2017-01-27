import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const PDPDescription = ({description}) => (
    <Accordion className="t-pdp__description">
        <AccordionItem header="Product Description" closeIconName="close" openIconName="plus" iconSize="medium">
            <p>{description}</p>
        </AccordionItem>
    </Accordion>
)

PDPDescription.propTypes = {
    description: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    description: selectors.getProductDescription
})

export default connect(mapStateToProps)(PDPDescription)
