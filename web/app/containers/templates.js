// The wrapping is implemented here to avoid a circular dependency
// involving the containers and the app actions.

import template from '../template'
import RawCart from './cart/container'
import RawHome from './home/container'
import RawLogin from './login/container'
import RawPDP from './pdp/container'
import RawPLP from './plp/container'

export const Cart = template(RawCart)
export const Home = template(RawHome)
export const Login = template(RawLogin)
export const PDP = template(RawPDP)
export const PLP = template(RawPLP)
