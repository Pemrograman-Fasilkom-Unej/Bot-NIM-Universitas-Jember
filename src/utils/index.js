function isDevelopment() {
    return ['local', 'develop', 'dev', 'development'].includes(process.env.NODE_ENV);
}

function consoleTimestamp() {
    originalLog = console.log;

    console.log = function () {
        var args = [].slice.call(arguments);
        originalLog.apply(console.log, [getCurrentDateString()].concat(args));
    };

    function getCurrentDateString() {
        return (new Date()).toISOString() + ' ::';
    };
}

module.exports = {
    isDevelopment,
    consoleTimestamp
}
