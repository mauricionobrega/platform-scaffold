/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ReduxForm from 'redux-form'
import Field from 'progressive-web-sdk/dist/components/field'

/**
 * A field for selecting/entering a region for an address.
 *
 * When passed a list of regions (e.g. US states, Canadian provinces),
 * this renders a `select` element to choose between these choices.
 *
 * If the list of regions is empty or absent, it instead renders an
 * `input` element for free-form entry of the region name. (this is
 * used in, e.g. the UK)
 */

const RegionField = ({
    className,
    regions
}) => {
    const classes = classNames('c-region-field', className)

    if (regions.length === 0) {
        return (
            <ReduxForm.Field
                className={classes}
                component={Field}
                name="region"
                label="Region"
            >
                <input type="text" noValidate />
            </ReduxForm.Field>
        )
    }
    return (
        <ReduxForm.Field
            className={classNames(classes, 'pw--has-select')}
            component={Field}
            name="regionId"
            label="State/Province"
        >
            <select>
                {regions.map(({label, value}) => (
                    <option value={value} key={label}>
                        {label}
                    </option>
                ))}
            </select>
        </ReduxForm.Field>
    )
}

RegionField.defaultProps = {
    regions: []
}

RegionField.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * The regions to be included in the select element.
     */
    regions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}

export default RegionField
