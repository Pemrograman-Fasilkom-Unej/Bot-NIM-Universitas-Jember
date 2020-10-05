exports.up = function (knex) {
    return knex.schema.createTable('logs', (table) => {
        table.increments('id');
        table.bigInteger('user_id');
        table.text('text');
        table.timestamp('created_at');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('logs');
};