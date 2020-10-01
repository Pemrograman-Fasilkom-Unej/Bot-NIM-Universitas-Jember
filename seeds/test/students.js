exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([{
          nim: '172410101041',
          nama: 'Miqdad Yanuar Farcha',
          jenjang: 'S1',
          prodi: 'Sistem Informasi'
        },
        {
          nim: '172410101086',
          nama: 'Ermanu Azizul H',
          jenjang: 'S1',
          prodi: 'Sistem Informasi'
        },
        {
          nim: '172410101077',
          nama: 'Wahyu Kresna Rachmadika',
          jenjang: 'S1',
          prodi: 'Sistem Informasi'
        },
        {
          nim: '182410102083',
          nama: 'Gusti Wedar Dida Arda T',
          jenjang: 'S1',
          prodi: 'Teknologi Informasi'
        },
        {
          nim: '182410103030',
          nama: 'Iqbal Ah Madi',
          jenjang: 'S1',
          prodi: 'Informatika'
        }
      ]);
    });
};