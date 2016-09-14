import React from 'react'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import Image from 'progressive-web-sdk/dist/components/image'

class Logo extends React.Component {
    constructor(props) {
        super(props)

        this.logoURL = getAssetUrl('static/img/logo.png')
    }

    render() {
        return (
            <Image src={this.logoURL} />
        )
    }
}

export default Logo
