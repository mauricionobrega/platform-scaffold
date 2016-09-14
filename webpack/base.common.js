/* eslint-disable import/no-commonjs */
/* eslint-env node */

const autoprefixer = require('autoprefixer')

module.exports = {
    postcss: () => {
        return [
            autoprefixer({
                browsers: [
                    'iOS >= 6.0',
                    'Android >= 2.3',
                    'last 4 ChromeAndroid versions'
                ]
            })
        ]
    }
}
