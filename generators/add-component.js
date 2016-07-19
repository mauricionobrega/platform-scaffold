/* eslint-env node */
/* eslint-disable import/no-commonjs */

const Promise = require('bluebird')

const fs = Promise.promisifyAll(require('fs'))

const common = require('./common')

const USER_INPUT_SCHEMA = [
    {
        name: 'Name',
        description: 'Enter the (PascalCase) name of the component you want to add',
        type: 'string',
        pattern: /^[A-Z]/,
        message: 'The name must begin with a capital letter'
    },
    {
        name: 'stateful',
        description: 'Is the component stateful? (t/f)',
        type: 'boolean',
        default: false
    }
]

const checkComponentExistence = (component) => {
    return fs.statAsync(common.component(component.filename))
        .then(common.errorOut(`\nComponent ${component.Name} already exists\n`))
        .catchReturn()
}

const processUserInput = (component) => {
    component.filename = `${common.Pascal2dashed(component.Name)}.jsx`
    component.input = component.stateful ? 'stateful.template.jsx' : 'stateless.template.jsx'
    return component
}

common.mkdirIfNonexistent(common.APP_COMPONENT_DIR)
    .then(() => common.getUserInput(USER_INPUT_SCHEMA))
    .then(processUserInput)
    .tap(common.step('Checking for an existing component', checkComponentExistence))
    .tap(() => process.stdout.write('Processing component template'))
    .then((component) => {
        return common.getGeneratorAsset(component.input)
            .then(common.processTemplate('component', component))
            .tap(common.printCheckMark)
            .then(common.step(
                'Writing component file',
                common.writeToPath(common.component(component.filename))
            ))
    })
    .then(() => console.log('Finished'))
