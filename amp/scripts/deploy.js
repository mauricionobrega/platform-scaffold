#!/usr/bin/env node

const Promise = require('bluebird');
const yargs = require('yargs');
const AWS = require('aws-sdk');
const process = require('process');
const chalk = require('chalk');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));

const info = (m) => console.log(m)
const success = (m) => console.log(chalk.green(m))
const error = (m) => console.error(chalk.red(m))

const accountId = '787649934531';
const awsConfig = {region:'us-east-1'};
const lambdaConfig = {apiVersion: '2015-03-31'};


/**
 * Deploy a built package as a Lambda function.
 *
 * See the JS SDK here:
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html#createFunction-property
 */
const createOrUpdateFunction = (zipFile, functionName) => {
    AWS.config.update(awsConfig);
    const lambda = new AWS.Lambda(lambdaConfig);

    const getFunction = Promise.promisify(lambda.getFunction.bind(lambda));
    const createFunction = Promise.promisify(lambda.createFunction.bind(lambda));
    const updateFunctionCode = Promise.promisify(lambda.updateFunctionCode.bind(lambda));


    const functionExists = () => (
        getFunction({FunctionName: functionName})
            .then(data => true)
            .catch(err => {
                if (err.cause.code === 'ResourceNotFoundException') {
                    return false
                } else {
                    throw err
                }
            })
    )

    const readCode = () => (
        fs.readFileAsync(path.resolve(zipFile))
    )

    Promise.all([functionExists(), readCode()])
        .then(results => {
            const [exists, code] = results;
            if (exists) {
                info('Updating an existing lambda function')
                return updateFunctionCode({
                    ZipFile: code,
                    Publish: true,
                    FunctionName: functionName
                })
            } else {
                info('Creating a new lambda function')
                return createFunction({
                    Code: {
                        ZipFile: code
                    },
                    FunctionName: functionName,
                    Description: 'An AMP renderer',
                    Handler: 'main.handler',
                    Role: `arn:aws:iam::${accountId}:role/lambda_basic_execution`,
                    Runtime: 'nodejs6.10',
                    Publish: true,
                    Timeout: 30,
                    MemorySize: 128
                })
            }
        })
        .tap(data => info(data))
        .then(data => success('Deployed sucessfully'))
        .catch(err => {
            error(err)
            process.exit(1);
        })
}



const getFunctionName = (businessId, siteId, environment) => (
    `${businessId}-${siteId}-${environment}`)


/**
 * Make changes on the API gateway to expose the lambda function.
 */
const configureAPI = () => {}


const main = () => {
    const argv = (
        yargs.usage('$0')
            .alias('file', 'f')
            .demand('file')
            .describe('file', 'the file to deploy')

            .alias('businessId', 'b')
            .demand('businessId')
            .describe('businessId', 'the id for the business')

            .alias('siteId', 's')
            .demand('siteId')
            .describe('siteId', 'the id for the site')

            .alias('environment', 'e')
            .demand('environment')
            .describe('environment', 'deploy to this environment')
            .choices('environment', ['staging', 'production'])

            .help()
            .argv
    )
    const functionName = getFunctionName(argv.businessId, argv.siteId, argv.environment)
    createOrUpdateFunction(argv.file, functionName)
}


if (require.main === module) {
    main()
}
