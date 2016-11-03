import React, {PropTypes} from 'react'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const PDPDescription = ({description}) => (
    <Accordion>
        <AccordionItem header="Product Description" closeIconName="x">
            <p>{description}</p>
        </AccordionItem>
    </Accordion>
)

PDPDescription.propTypes = {
    description: PropTypes.string
}

export default PDPDescription
