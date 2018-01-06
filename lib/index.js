var common = require('./common')
var dev = require('./dev')
var prod = require('./prod')
var test = require('./test')

var getConfig = function () {
    let env = process.env.NODE_ENV || 'dev'
    switch (env.toLowerCase()) {
        case 'prod':
        case 'production':
        case 'staging':
        case 'si':
            return prod
        case 'test':
        case 'testing':
            return test
        default:
            return dev
    }
}

module.exports = {
    common: common,
    dev: dev,
    prod: prod,
    test: test,
    getConfig: getConfig
}
