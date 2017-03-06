#!/usr/bin/env node

const fs = require('fs')

/**
 * So, funny story... Lighthouse doesn't return total score in JSON or CLI formats. Only in HTML.
 * And we're going to parse it here.
 */

const report = fs.readFileSync('lighthouse/audit-local.html', 'utf8')

// I confirm that I read & accept http://stackoverflow.com/a/1732454/899937
const results = report.match(/<span class="section-result__points">(.*)<\/span>/)

const actualLighthouseScore = parseInt(results[1])
const minimumLighthouseScore = parseInt(process.env.npm_package_config_min_lighthouse_score)

if (actualLighthouseScore < minimumLighthouseScore) {
    console.log(`Lighthouse score is lower than required! ${actualLighthouseScore} < ${minimumLighthouseScore}`)
    process.exit(1)
} else {
    console.log(`Lighthouse score is fine (${actualLighthouseScore})`)
    process.exit(0)
}
