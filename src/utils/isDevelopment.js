module.exports.isDevelopment = function () {
    return ['local', 'develop', 'dev', 'development'].includes(process.env.NODE_ENV);
}