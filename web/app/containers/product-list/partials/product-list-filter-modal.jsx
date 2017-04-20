import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {PRODUCT_LIST_FILTER_MODAL} from '../constants'
import {closeModal} from '../../../store/modals/actions'
import {isModalOpen} from '../../../store/selectors'

import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'

const ProductListFilterModal = ({closeModal, isOpen}) => {
    return (
        <Sheet
            className="t-product-list__filter-modal"
            open={isOpen}
            onDismiss={closeModal}
            maskOpacity={0.7}
            effect="slide-right"
            shrinkToContent={false}
            coverage="85%"
        >
            <HeaderBar>
                <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
                    <h1 className="u-h3 u-text-uppercase">
                        <span className="u-text-extra-lighter">Filter Results By</span>
                    </h1>
                </HeaderBarTitle>

                <HeaderBarActions>
                    <IconLabelButton iconName="close" label="" onClick={closeModal}>Close</IconLabelButton>
                </HeaderBarActions>
            </HeaderBar>

            <Accordion initialOpenItems={[0]}>
                <AccordionItem header="Price">
                    list of prices...
                </AccordionItem>
            </Accordion>
        </Sheet>
    )
}

ProductListFilterModal.propTypes = {
    /**
     * A function used to set the navigation-sheet's state to closed
     */
    closeModal: PropTypes.func,

    /**
     * Whether the modal is open or not
     */
    isOpen: PropTypes.bool,
}

const mapStateToProps = createPropsSelector({
    isOpen: isModalOpen(PRODUCT_LIST_FILTER_MODAL)
})

const mapDispatchToProps = {
    closeModal: () => closeModal(PRODUCT_LIST_FILTER_MODAL)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListFilterModal)
