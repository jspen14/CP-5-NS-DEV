exports.up = function(knex, Promise) {
    return knex.schema.table('posts', function(table) {
      table.string('username');
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('username');
  })

};
