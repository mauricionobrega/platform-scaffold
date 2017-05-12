/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import classNames from 'classnames'
import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'


const IconLabelButton = (props) => {
    const {iconName, label, onClick, className} = props
    const classes = classNames('c-icon-label-button', className)
    return (
        <Button onClick={onClick} className={classes} innerClassName="u-padding-0">
            <IconLabel label={label} iconName={iconName} />
        </Button>
    )
}

IconLabelButton.propTypes = {
    className: React.PropTypes.string,
    iconName: React.PropTypes.string,
    label: React.PropTypes.string,
    onClick: React.PropTypes.func,
}


export default IconLabelButton
