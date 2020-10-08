const BotService = require('../services');

module.exports = () => ctx => {
    ctx.reply('Permintaan anda sudah kami proses, silahkan tunggu ⏳')
    BotService.searchStudent(ctx.update.message).then(result => {
        ctx.reply(result);
    })
}
