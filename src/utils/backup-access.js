require('dotenv').config();

const redis = require('../configs/redis');
const db = require('../configs/db');

async function backup() {
    const keys = redis.keys('*', async (err, keys) => {
        if (err) {
            return;
        }

        const trx = await db.transaction();
        let data = [];
        for (key of keys) {
            redis.hgetall(key, (err_, res) => {
                for (const [date, text] of Object.entries(res)) {
                    data.push({
                        user_id: key,
                        text: text,
                        created_at: new Date(date * 1000)
                    });
                }
            });
        }
        
        setTimeout(async () => {
            trx('logs')
                .insert(data)
                .then(trx.commit)
                .then(res => {
                    redis.flushdb();
                    console.log("Backup Done  ✅");
                    process.exit();
                })
                .catch(trx.rollback);
        }, 30000);
    });

    // redis.end(false);
}

backup();