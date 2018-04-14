exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('user_id').primary();
      table.string('email');
      table.string('hash');
      table.string('username');
      table.string('name');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
  ]);
};
