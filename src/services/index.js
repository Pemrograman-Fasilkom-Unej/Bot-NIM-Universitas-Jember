const db = require('../configs/db');
const redis = require('../configs/redis');
const resultLimit = 10;

const BotService = class {
    async searchByKeyword(keyword) {
        return await db.table('students')
            .where('nama', 'like', `%${keyword}%`)
            .orWhere('nim', 'like', `%${keyword}%`)
            .orWhere('jenjang', 'like', `%${keyword}%`)
            .orWhere('prodi', 'like', `%${keyword}%`)
            .limit(resultLimit);
    }

    async searchByNIM(nim) {
        return await db.table('students')
            .where('nim', 'like', `%${nim}%`)
            .limit(resultLimit)
    }

    async searchByName(name) {
        return await db.table('students')
            .where('nama', 'like', `%${name}%`)
            .limit(resultLimit)
    }

    async saveUserMessage(message) {
        redis.hmset(message.from.id, message.date, message.text, (err, res) => {
            // console.log(err, res);
        });
    }

    async searchStudent(message) {
        const keyword = message.text.split(' ').slice(1).join(' ').trim();
        this.saveUserMessage(message);
        const students = await this.searchByKeyword(keyword);
        let response = '';
        if (students.length > 0) {
            students.forEach((student, index) => {
                response += `*${index + 1}*. ${student.nama} - ${student.nim} - ${student.jenjang} - ${student.prodi}\n`;
            });
        } else {
            response += `Maaf, mahasiswa yang anda cari dengan keyword '${keyword}' tidak ditemukan 🥺`;
        }
        return response;
    }
}

module.exports = new BotService();
