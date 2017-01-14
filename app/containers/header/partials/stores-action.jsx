import React from 'react'

import Button from 'progressive-web-sdk/dist/components/button'
import IconLabel from 'progressive-web-sdk/dist/components/icon-label'
import {HeaderBarActions} from 'progressive-web-sdk/dist/components/header-bar'

const StoresAction = ({innerButtonClassName}) => (
    <HeaderBarActions>
        <Button innerClassName={innerButtonClassName}>
            <IconLabel label="Stores" iconName="map" iconSize="medium" />
        </Button>
    </HeaderBarActions>
)

export default StoresAction
