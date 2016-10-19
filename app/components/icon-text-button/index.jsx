import React from 'react'
import classNames from 'classnames'
import Button from 'progressive-web-sdk/dist/components/button'


const IconTextButton = (props) => {
    const {iconURL, text, onClick, className} = props
    const classes = classNames('c-icon-text-button', className)
    return (
        <Button onClick={onClick} className={classes}>
            <img role="presentation" src={iconURL} className="c-icon-text-button__icon" />
            <span className="c-icon-text-button__text">{text}</span>
        </Button>
    )
}

IconTextButton.propTypes = {
    className: React.PropTypes.string,
    iconURL: React.PropTypes.string,
    text: React.PropTypes.string,
    onClick: React.PropTypes.func,
}


export default IconTextButton
