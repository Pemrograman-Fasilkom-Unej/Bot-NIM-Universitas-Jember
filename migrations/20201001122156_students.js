exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
        table.increments('id');
        table.string('nim', 12).unique();
        table.string('nama', 255).notNullable();
        table.string('jenjang', 4).notNullable();
        table.string('prodi', 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('students');
};