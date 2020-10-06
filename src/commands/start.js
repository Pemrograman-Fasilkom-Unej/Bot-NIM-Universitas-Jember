module.exports = () => (ctx) => {
    return ctx.replyWithMarkdown(
        `Halo *${ctx.message.from.username}*,\n` +
        `Saya dapat membantu anda mencari mahasiswa Universitas Jember\n` +
        `Bisa dengan keyword seperti Nama atau NIM\n` +
        `Contoh:\n` +
        `  /find 1824101010\n` +
        `  /find Linus Torvalds\n` +
        `\n` +
        `Gunakan /help untuk melihat bantuan\n` +
        `*Gunakan dengan bijak*\n` +
        `Selamat mencoba`
    )
}
