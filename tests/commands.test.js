const TelegrafTest  = require('telegraf-test')
const { isDevelopment } = require('../src/utils/');

if (isDevelopment()) {
    require('dotenv').config();
}

const {
    WEBHOOK_DOMAIN,
    WEBHOOK_PATH,
    WEBHOOK_PORT
} = process.env

const bot           = require('../src/bot');
const callback_path = (typeof WEBHOOK_PATH === 'string' && WEBHOOK_PATH !== '') ? WEBHOOK_PATH.replace('/', '') : 'test/webhook/';
const user = {
    id: 12345,
    username: 'testingbot',
}
const tunnel = require('../src/tunnel');
let tunnelLauncher, testgram;

describe('Testing available commands', () => {
    beforeAll(async () => {
        let domain;
        if (typeof WEBHOOK_DOMAIN === 'string' && WEBHOOK_DOMAIN !== '') {
            domain = WEBHOOK_DOMAIN.startsWith('http') ? WEBHOOK_DOMAIN : `http://${WEBHOOK_DOMAIN}`;
        } else {
            tunnelLauncher = await tunnel.launch(bot, '/' + callback_path);
            domain = tunnelLauncher.url.replace('https', 'http');
        }

        testgram = new TelegrafTest({
            url: `${domain}:${WEBHOOK_PORT}/${callback_path}`
        })
        testgram.setUser(user);
        testgram.setBot(bot);
    });

    test('Command /start', async () => {
        await testgram.sendMessageWithText('/start')
            .then(res => expect(res.status).toBe(200))
            .catch(err => {
                throw new Error(`Error with /start: ${err.message}`)
            })
    })

    test('Command /about', async () => {
        await testgram.sendMessageWithText('/about')
            .then(res => expect(res.status).toBe(200))
            .catch(err => {
                throw new Error(`Error with /about: ${err.message}`)
            })
    })

    test('Command /help', async () => {
        await testgram.sendMessageWithText('/help')
            .then(res => expect(res.status).toBe(200))
            .catch(err => {
                throw new Error(`Error with /help: ${err.message}`)
            })
    })

    afterAll(async () => {
        // @TODO close tunnel if tests is completed.
        if (typeof tunnelLauncher !== 'undefined') {
            await tunnelLauncher.close();
        }
    })

})
