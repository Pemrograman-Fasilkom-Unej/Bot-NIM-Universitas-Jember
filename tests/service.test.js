const BotService = require('../src/services/index');
// const db = require('knex')(require('../knexfile')['test']);
const db = require('../src/configs/db');


describe("Testing searching data", () => {
    beforeAll(async () => {
        await db.migrate.latest();
        await db.seed.run();
    });

    test('Searching by NIM "172410101041" should be Miqdad Yanuar Farcha data', async () => {
        const data = await BotService.searchByKeyword('172410101041');
        expect(data[0].nama).toBe('Miqdad Yanuar Farcha');
    });

    test('Searching by NIM prefix "1724" should be students with prefix nim 1724', async () => {
        const data = await BotService.searchByKeyword('1724');
        expect(data.length).toBe(3);
    });

    test('Searching by Name "Dida" should be 182410102083 data', async () => {
        const data = await BotService.searchByKeyword('dida');
        expect(data[0].nim).toBe('182410102083');
    });

    test('Searching by Name with random case "iQbAl" should be 182410103030 data', async () => {
        const data = await BotService.searchByKeyword('iQbAl');
        expect(data[0].nim).toBe('182410103030');
    });

    afterAll(async () => {
        await db.migrate.down();
    });
})