/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'
import classNames from 'classnames'
import * as ReduxForm from 'redux-form'
import Field from 'progressive-web-sdk/dist/components/field'

/**
 * A field for selecting a country.
 */

const CountrySelect = ({
    className,
    countries
}) => {
    const classes = classNames('c-country-select', 'pw--has-select', className)

    return (
        <ReduxForm.Field
            className={classes}
            component={Field}
            name="countryId"
            label="Country"
        >
            <select>
                {countries.map(({label, value}) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </select>
        </ReduxForm.Field>
    )
}


CountrySelect.defaultProps = {
    countries: []
}

CountrySelect.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    /**
     * A list of the countries to be included
     */
    countries: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
}

export default CountrySelect
