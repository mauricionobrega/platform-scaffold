import React, {PropTypes} from 'react'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

export const PanelHeading = ({heading}) => {
    if (heading) {
        return (
            <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                {heading}
            </h3>
        )
    } else {
        return (<SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />)
    }
}

PanelHeading.propTypes = {
    heading: PropTypes.string
}

export const PanelDescription = ({description}) => {
    if (description) {
        return (<p>{description}</p>)
    } else {
        return (<SkeletonText lines={2} size="14px" width="100%" />)
    }
}

PanelDescription.propTypes = {
    description: PropTypes.string
}

export const PanelRequiredText = ({requiredText}) => {
    if (requiredText) {
        return (<span>{requiredText}</span>)
    } else {
        return (<SkeletonText lines={1} size="14px" width="33%" />)
    }
}

PanelRequiredText.propTypes = {
    requiredText: PropTypes.string
}
