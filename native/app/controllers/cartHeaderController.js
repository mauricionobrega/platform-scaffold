
import HeaderBarPlugin from 'astro/plugins/headerBarPlugin'
import CartConfig from '../config/cartConfig'

const CartHeaderController = function(headerBar) {
    this.viewPlugin = headerBar;
    // https://github.com/mobify/london-drugs/blob/develop/native/app/app-controllers/cartHeaderController.js
}
