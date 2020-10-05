// Options
// window: how long to keep records of requests in memory in ms (default: 1 second)
// limit: max number of messages during window (default: 1)
// keyGenerator: key generator function (context -> any)
// onLimitExceeded: rate-limit middleware (ctx, next) => ctx.reply('calm down')

module.exports = {
    window: 1500,
    limit: 1,
    onLimitExceeded: (ctx, next) =>  {
        ctx.reply('Dimohon untuk tidak spam!')
        return next()
    }
}
