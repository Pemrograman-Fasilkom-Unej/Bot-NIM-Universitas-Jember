
const Telegraf  = require('telegraf')
const rateLimit = require('telegraf-ratelimit')
const { rateLimitConfig }   = require('./configs/rate-limit')
const { isDevelopment }     = require('./utils/');
const {
    BOT_TOKEN,
    BOT_NAME,
    BOT_USERNAME
} = process.env

/**
 * Import available commands
 */
const {
    aboutCommand,
    helpCommand,
    startCommand,
    findCommand,
} = require('./commands');


/**
 * Bot instance.
 */
const bot = new Telegraf(BOT_TOKEN, {
    name: BOT_NAME,
    username: BOT_USERNAME,
});


/**
 * Middlewares
 */
if (isDevelopment()) {
    // Verbose mode.
    bot.use((ctx, next) =>  {
        console.log('[BOT]', ctx.message)
        return next();
    });
} else {
    // Activates the rate-limit on prod.
    bot.use(rateLimit(rateLimitConfig))
}


/**
 * Commands
 */
bot.start(startCommand())
bot.help(helpCommand())
bot.command('about', aboutCommand())
bot.command('find', findCommand())


module.exports = bot
