const db = require('../configs/db');

const BotService = class {
    async searchByKeyword(keyword) {
        return await db.table('students')
            .where('nama', 'like', `%${keyword}%`)
            .orWhere('nim', 'like', `%${keyword}%`)
            .limit(10);
    }
}

module.exports = new BotService();