const { isDevelopment } = require('./utils');

if (!isDevelopment()){
    console.error('Run only on development!');
    process.exit(0);
}

const localtunnel = require('localtunnel');
const {
    WEBHOOK_DOMAIN,
    WEBHOOK_PATH,
    WEBHOOK_PORT
} = process.env

module.exports.launch = async (bot, hookPath = null) => {

    const launchOptions = {
        webhook: {
            domain: WEBHOOK_DOMAIN,
            hookPath: WEBHOOK_PATH,
            port: WEBHOOK_PORT
        }
    }

    if (hookPath !== null) {
        launchOptions['webhook']['hookPath'] = hookPath
    }

    if (typeof WEBHOOK_DOMAIN === 'string' && /^[a-zA-Z0-9._-]+\\[a-zA-Z0-9.-]$/.exec(WEBHOOK_DOMAIN) === true) {
        console.log('[TUNNEL]', 'Using WEBHOOK_DOMAIN instead creating a new Webhook via localtunnel.');

        bot.launch(launchOptions)

        console.log('[BOT]', `Bot launched with options: domain=${launchOptions.webhook.domain} port=${launchOptions.webhook.port} path=${launchOptions.webhook.hookPath}`)
        return;
    }


    const tunnel = await localtunnel(WEBHOOK_PORT, {
        subdomain: 'tgram-bot-' + Math.floor(Math.random() * 1000)
    });

    console.log('[TUNNEL]', `Tunnel launched on ${tunnel.url}`)

    launchOptions['webhook']['domain'] = tunnel.url;
    bot.launch(launchOptions)

    console.log('[BOT]', `Bot launched with options: domain=${launchOptions.webhook.domain} port=${launchOptions.webhook.port} path=${launchOptions.webhook.hookPath}`)

    tunnel.on('request', (info) => console.log('[TUNNEL - REQUEST]', info));
    tunnel.on('close', () => console.log('[TUNNEL]', 'Tunnels are closed!'));
    tunnel.on('error', (err) =>  {
        console.error('[TUNNEL - ERROR]', err)
        process.exit(0)
    })

    process.on('SIGINT', () => {
        tunnel.close()
        process.exit(0);
    });

    return tunnel;
}
