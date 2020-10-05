const {
    MenuTemplate,
    MenuMiddleware
} = require('telegraf-inline-menu');

module.exports = () => ctx => {
    const mainConfigMenuMessage = 
        `Pengaturan Pencarian ⚙️ \n` +
        `Atur pencarian anda dengan filter yang ada 🚩`;

    const mainConfigMenu = new MenuTemplate(ctx => mainConfigMenuMessage)
    let mainMenuToggle = false;

    mainConfigMenu.interact('Angkatan', 'angkatan', {
        do: async ctx => {
            console.log("asu");
            await ctx.answerCbQuery('Kontol');
            return false;
        }
    });

    mainConfigMenu.interact('Limit Pencarian', 'limit', {
        do: async ctx => {

        }
    });

    mainConfigMenu.interact('Fakultas', 'fakultas', {
        do: async ctx => {

        }
    });

    const menuMiddleware = new MenuMiddleware('/', mainConfigMenu);

    menuMiddleware.replyToContext(ctx);
    // console.log(ctx);
}