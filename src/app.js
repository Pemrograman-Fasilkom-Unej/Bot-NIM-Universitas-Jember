require('./utils/consoleTimestamp')();

const bot = require('./bot')
const { isDevelopment } = require('./utils/isDevelopment');
const {
    WEBHOOK_DOMAIN,
    WEBHOOK_PATH,
    WEBHOOK_PORT,
} = process.env

/**
 * Launch the bot
 */
console.log('[BOT]', 'Launching ...')
if (isDevelopment()) {
    const tunnel = require('./tunnel')
    tunnel.launch(bot);

} else {
    const launchOptions = {
        webhook: {
            domain: WEBHOOK_DOMAIN,
            port: WEBHOOK_PORT
        }
    }

    if (typeof WEBHOOK_PATH !== 'undefined' && WEBHOOK_PATH !== '') launchOptions['webhook']['hookPath'] = WEBHOOK_PATH

    bot.launch(launchOptions);
}
