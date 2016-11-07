import React, {PropTypes} from 'react'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const PDPDescription = ({description}) => (
    <Accordion className="c-pdp-description">
        <AccordionItem header="Product Description" closeIconName="close" openIconName="plus" iconSize="medium">
            <p>{description}</p>
        </AccordionItem>
    </Accordion>
)

PDPDescription.propTypes = {
    description: PropTypes.string
}

export default PDPDescription
