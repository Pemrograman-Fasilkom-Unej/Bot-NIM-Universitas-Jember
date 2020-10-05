// require('./utils/consoleTimestamp')();

const Telegraf  = require('telegraf')
const rateLimit = require('telegraf-ratelimit')
const { isDevelopment } = require('./utils');
const { rateLimitConfig } = require('./configs/rate-limit')

const {
    NODE_ENV,
    WEBHOOK_DOMAIN,
    WEBHOOK_PORT,
    WEBHOOK_PATH,
} = process.env

/**
 * Import available commands
 */
const {
    aboutCommand,
    helpCommand,
    startCommand,
    findCommand,
    configCommand
} = require('./commands');


/**
 * Bot instance.
 */
const bot = new Telegraf(process.env.BOT_TOKEN, {
    name: process.env.BOT_NAME,
    username: process.env.BOT_USERNAME,
});
console.log('[BOT]', `Booting bot runs on ${NODE_ENV} environment.`)


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
bot.command('config', configCommand())


/**
 * Launch the bot
 */
console.log('[BOT]', 'Launching ...')
if (isDevelopment()) {
    const tunnel = require('./tunnel')
    tunnel.launch(bot);

} else {
    if (typeof WEBHOOK_PATH != 'undefined')
        bot.webhookCallback(WEBHOOK_PATH);

    console.log(process.env.NODE_ENV);
    bot.launch({
        webhook: {
            domain: WEBHOOK_DOMAIN,
            hookPath: WEBHOOK_PATH,
            port: WEBHOOK_PORT
        }
    });
}
