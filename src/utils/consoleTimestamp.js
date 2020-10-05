module.exports = function () {
    originalLog = console.log;

    console.log = function () {
      var args = [].slice.call(arguments);
      originalLog.apply(console.log, [getCurrentDateString()].concat(args));
    };

    function getCurrentDateString() {
      return (new Date()).toISOString() + ' ::';
    };
}
