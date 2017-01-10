import BaseConfig from './baseConfig'

const url = 'https://merlinspotions.com'            // must get url

const closeTitle = {
    id: 'closeTitle_id',
    title: 'close'
}

const closeIcon = {
    id: 'closeCart_id',
    imageUrl: 'file:///close.png'            // need to change this to correct url
}

const cartTitle = {                         // this title must be under the icon
    id: 'cartTitle_id',
    title: 'cart'
}

const cartIcon = {
    id: 'cartIcon_id',
    imageUrl: 'file:///cart.png'
}

const colors = {
    textColor: BaseConfig.colors.whiteColor,
    backgroundColor: BaseConfig.colors.primaryColor
}

export default {url, closeTitle, closeIcon, cartTitle, cartIcon, colors}
