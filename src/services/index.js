const db = require('../configs/db');
const redis = require('../configs/redis');

const BotService = class {
    async searchByKeyword(keyword) {
        return await db.table('students')
            .where('nama', 'like', `%${keyword}%`)
            .orWhere('nim', 'like', `%${keyword}%`)
            .limit(10);
    }

    async saveUserMessage(message) {
        redis.hmset(message.from.id, message.date, message.text, (err, res) => {
            // console.log(err, res);
        });
    }

    async searchStudent(message) {
        const keyword = message.text.split(' ')[1];
        this.saveUserMessage(message);
        const students = await this.searchByKeyword(keyword);
        let response = '';
        if (students.length > 0) {
            students.forEach((student, index) => {
                response += `${index + 1}. ${student.nama} - ${student.nim}\n`;
            });
        } else {
            response += `Maaf, mahasiswa yang anda cari dengan keyword '${keyword}' tidak ditemukan 🥺`;
        }
        return response;
    }
}

module.exports = new BotService();