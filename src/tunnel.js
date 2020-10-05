const { isDevelopment } = require('./utils');

if (!isDevelopment()){
    console.error('Run only on development!');
    process.exit(0);
}

const localtunnel = require('localtunnel');
const {
    WEBHOOK_DOMAIN,
    WEBHOOK_PORT
} = process.env

module.exports.launch = async (bot) => {
    if (typeof WEBHOOK_DOMAIN != 'undefined') {
        console.log('[TUNNEL]', 'Using WEBHOOK_DOMAIN instead creating a new Webhook via localtunnel.');
        return bot.launch({
            webhook: {
                domain: WEBHOOK_DOMAIN,
                port: WEBHOOK_PORT
            }
        })
    }

    const tunnel = await localtunnel(WEBHOOK_PORT, {
        subdomain: 'tgram-bot-' + Math.floor(Math.random() * 1000)
    });
    console.log('[TUNNEL]', 'Tunnel launched on ', tunnel.url)

    bot.launch({
        webhook: {
            domain: tunnel.url,
            port: WEBHOOK_PORT
        }
    })

    tunnel.on('request', (info) => console.log('[TUNNEL - REQUEST]', info));
    tunnel.on('error', (err) => console.log('[TUNNEL - ERROR]', err))
    tunnel.on('close', () => console.log('[TUNNEL]', 'Tunnels are closed!'));
}
