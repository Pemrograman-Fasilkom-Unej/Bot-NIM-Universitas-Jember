const packageJson = require('../../package.json')

const name          = process.env.BOT_NAME
const description   = packageJson.description
const version       = packageJson.version

module.exports = () => ctx => {
    const about = 
        `*${name}* (_${version}_)\n` +
        `_${description}_\n\n` +
        `Gunakan perintah /help untuk melihat daftar perintah\n\n` +
        `🤖 oleh *Lab Pemrograman Fasilkom UNEJ*`;

    ctx.replyWithMarkdown(about)
}
