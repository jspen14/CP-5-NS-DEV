exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts', function(table) {
      table.increments('post_id').primary();
      table.string('post');
      table.dateTime('dateCreated');
      table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts'),
  ]);
};
