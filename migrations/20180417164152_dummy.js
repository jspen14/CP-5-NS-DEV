
exports.up = function(knex, Promise) {
    return knex.schema.table('posts', function(table) {
      table.string('dummy');
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('dummy');
  })

};
