exports.up = function (knex) {
    return knex.schema.createTable('students', (table) => {
        table.string('nim', 15).unique();
        table.string('nama', 255).notNullable();
        table.string('jenjang', 255).notNullable();
        table.string('prodi', 255).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('students');
};