/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

var Site = {
    /*
     activeProfile defines which environment to run tests against.
     By default, builds on master branch run against production, without preview.
     Builds on any other branch should use preview with local build.
     $ACTIVE_PROFILE can be set in your runner.
     Change activeProfile whenever you need to override the default behaviour.
    */
    activeProfile: process.env.ACTIVE_PROFILE || 'local',

    /*
     Define new profiles as needed for different URLs, eg. staging, prod.
    */
    profiles: {
        local: {
            bundleUrl: 'https://localhost:8443/loader.js',
            siteUrl: process.env.npm_package_siteUrl
        },
        production: {
            bundleUrl: '',
            siteUrl: process.env.npm_package_siteUrl,
            production: true
        }
    }
}

module.exports = Site
