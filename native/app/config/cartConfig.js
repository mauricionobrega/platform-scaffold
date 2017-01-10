import BaseConfig from './baseConfig'

const url = 'https://www.merlinspotions.com/checkout/cart/'         // must get url

const closeIcon = {
    id: 'closeCart_id',
    imageUrl: 'file:///close.png'            // need to change this to correct url
}

const cartIcon = {
    id: 'cartIcon_id',
    imageUrl: 'file:///cart.png'
}

const colors = {
    textColor: BaseConfig.colors.whiteColor,
    backgroundColor: BaseConfig.colors.primaryColor
}

export default {url, closeIcon, cartIcon, colors}
