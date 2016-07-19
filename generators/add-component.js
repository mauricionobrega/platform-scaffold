/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))
const path = require('path')

const common = require('./common')

const USER_INPUT_SCHEMA = [
    {
        name: 'Name',
        description: 'Enter the (PascalCase) name of the component you want to add',
        type: 'string'
    },
    {
        name: 'stateful',
        description: 'Does the container require a state',
        type: 'boolean'
    }
]

const checkComponentDir = () => {
    return fs.statAsync(common.APP_COMPONENT_DIR)
        .catch(() => fs.mkdirAsync(common.APP_COMPONENT_DIR))
}

const checkComponentExistence = (component) => {
    return fs.statAsync(path.join(common.APP_COMPONENT_DIR, component.filename))
        .then(common.errorOut(`\nComponent ${component.Name} already exists\n`))
        .catchReturn(component)
}

checkComponentDir()
    .then(common.getUserInput(USER_INPUT_SCHEMA))
    .then((component) => {
        component.filename = `${common.camel2dashed(common.Pascal2camel(component.Name))}.jsx`
        component.input = component.stateful ? 'stateful.jsx' : 'stateless.jsx'
        return component
    })
    .tap(common.step('Checking for an existing component', checkComponentExistence))
    .then(common.step('Processing component template'), (component) => {
        return common.getGeneratorAsset(path.join('component-skeletons', component.input))
            .then(common.processTemplate('component', component))
            .tap(() => common.greenWrite(' ✓\n'))
            .tap(() => process.stdout.write('Writing component file'))
            .then((contents) => {
                return fs.writeFileAsync(
                    path.join(common.APP_COMPONENT_DIR, component.filename),
                    contents,
                    'utf8'
                )
            })
    })
    .then(() => console.log('Finished'))
