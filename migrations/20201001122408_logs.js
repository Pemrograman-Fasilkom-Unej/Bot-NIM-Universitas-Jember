exports.up = function (knex) {
    return knex.schema.createTable('logs', (table) => {
        table.increments('id');
        table.bigInteger('message_id');
        table.bigInteger('user_id');
        table.string('text', 255);
        table.timestamp('created_at');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('logs');
};