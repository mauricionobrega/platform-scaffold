/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React, {PropTypes} from 'react'

import DangerousHTML from 'progressive-web-sdk/dist/components/dangerous-html'
import Button from 'progressive-web-sdk/dist/components/button'

import offlineCloud from '../../static/svg/offline-cloud.svg'

/**
 * UI to be shown instead of the page contents while offline and no
 * contents are available.
 */
const Offline = ({
    reload
}) => {
    return (
        <div className="t-offline">
            <DangerousHTML html={offlineCloud}>
                {(htmlObj) => <div className="u-margin-bottom-md" dangerouslySetInnerHTML={htmlObj} />}
            </DangerousHTML>
            <p>Fiddlesticks! We couldn't load the</p>
            <p>next page on this connection.</p>
            <p>Please try again.</p>
            <Button className="c--tertiary u-width-full u-text-uppercase u-margin-top-lg" onClick={reload}>Retry</Button>
        </div>
    )
}


Offline.propTypes = {
    /**
     * Method that attempts to fetch the page again
     */
    reload: PropTypes.func.isRequired
}

export default Offline
