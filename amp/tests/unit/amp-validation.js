/* eslint-env node, mocha */

import chai from 'chai'
import childProcess from 'child_process'
import http from 'http'

chai.should()

const handleAMPValidation = (process, done) => {
    let payload = ''
    process.stdout.on('data', (data) => {
        payload += data.toString()
    })
    process.on('close', (code) => {
        code.should.equal(0)
        const parsedPayload = JSON.parse(payload)
        for (const key of Object.keys(parsedPayload)) {
            for (const error of parsedPayload[key].errors) {
                error.severity.should.not.equal('ERROR')
            }
        }
        done()
    })
    process.stderr.on('data', (data) => {
        done(data.toString())
    })
}

describe('AMP Validation', function() { // Cannot use () => because we need 'this' binding
    before((done) => {
        done()
    })

    after((done) => {
        done()
    })

    describe('Merlins', function() {
        const serviceUrl = `http://localhost:3000`
        const ampValidatorPath = './node_modules/amphtml-validator/index.sh'
        this.timeout(2000)

        it('Home should pass validation', (done) => {
            const path = ''
            const validatorProcess = childProcess.spawn(ampValidatorPath, ['--format', 'json', `${serviceUrl}${path}`])
            handleAMPValidation(validatorProcess, done)
        })

        it('PDP should pass validation', (done) => {
            const path = '/eye-of-newt.html'
            const validatorProcess = childProcess.spawn(ampValidatorPath, ['--format', 'json', `${serviceUrl}${path}`])
            handleAMPValidation(validatorProcess, done)
        })

        it('PLP should pass validation', (done) => {
            const path = '/potions.html'
            const validatorProcess = childProcess.spawn(ampValidatorPath, ['--format', 'json', `${serviceUrl}${path}`])
            handleAMPValidation(validatorProcess, done)
        })
    })
})
