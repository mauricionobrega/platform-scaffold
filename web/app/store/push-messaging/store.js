/**
 * Thin wrapper around store.js module that wraps local storage access
 *
 * @url https://github.com/marcuswestin/store.js/
 */
import engine from 'store/src/store-engine'
import localStorage from 'store/storages/localStorage'
import expirePlugin from 'store/plugins/expire'

/**
 * Create StoreJS instance with the provided optional namespace
 *
 * @param {string} [namespace] - prefix key name with provided string value
 */
const StoreJS = function(namespace) {
    this.namespace = namespace ? `${namespace}-` : ''
    this.store = engine.createStore([localStorage], [expirePlugin])

    console.log('[Messaging] StoreJS created', this.namespace ? `with namespace: ${namespace}` : '')
    return this
}

/**
 * Sets a key in local storage
 *
 * @param {string} key
 * @param {*} value
 * @param {number} [expiry] - expiration of key *in seconds* after current time
 * @returns {*} value
 */
StoreJS.prototype.set = function(key, value, expiry) {
    key = `${this.namespace}${key}`
    let expires

    if (expiry) {
        expires = new Date().getTime() + (expiry * 1000)
    }

    console.log('[Messaging] StoreJS set', key, value, expires)
    return this.store.set(key, value, expires)
}

/**
 * Gets a get from local storage
 *
 * @param {string} key
 * @returns {*} the value of whatever is stored under `key`
 */
StoreJS.prototype.get = function(key) {
    key = `${this.namespace}${key}`
    const value = this.store.get(key)

    console.log('[Messaging] StoreJS get', key, value)
    return value
}

export default StoreJS
