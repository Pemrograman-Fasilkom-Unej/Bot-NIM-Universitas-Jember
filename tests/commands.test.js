const TelegrafTest  = require('telegraf-test')
const isDevelopment = require('../src/utils/isDevelopment');

if (isDevelopment) {
    require('dotenv').config();
}

const {
    BOT_TOKEN,
    WEBHOOK_DOMAIN,
    WEBHOOK_PATH,
    WEBHOOK_PORT
} = process.env

const bot           = require('../src/bot');
const callback_path = (WEBHOOK_PATH !== '' || typeof WEBHOOK_PATH !== 'undefined') ? WEBHOOK_PATH : 'test/webhook/';
const testgram      = new TelegrafTest({
    url: `http://${WEBHOOK_DOMAIN}:${WEBHOOK_PORT}/${callback_path}`,
    token: BOT_TOKEN,
});

const user = {
    id: 12345,
    username: 'testingbot',
}
testgram.setUser(user);
testgram.setBot(bot);

describe('Testing available commands', () => {
    beforeAll(async () => {
        await require('../src/tunnel').launch(bot, callback_path);
    });

    test('Command /start', async () => {
        await testgram.sendMessageWithText('/start')
            .then(res => expect(res.data.text).contains(user.username))
            .catch(err => console.error('/start', err.message, err.config))
    })

    test('Command /about', async () => {
        await testgram.sendMessageWithText('/about')
            .then(res => expect(res.data.text).contains('/about'))
            .catch(err => console.error('/about', err.message, err.config))
    })


    test('Command /help', async () => {
        await testgram.sendMessageWithText('/help')
            .then(res => expect(res.data.text).contains('/help'))
            .catch(err => console.error('/help', err.message, err.config))
    })

})
