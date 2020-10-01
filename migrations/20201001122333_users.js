exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.bigInteger('id').primary();
        table.string('name', 255);
        table.string('username', 255);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};