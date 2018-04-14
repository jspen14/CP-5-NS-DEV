
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
      table.string('age');
      table.string('hometown');
      table.string('salesCompany');
      table.string('sports');
      table.string('major');
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('age');
    table.dropColumn('hometown');
    table.dropColumn('salesCompany');
    table.dropColumn('sports');
    table.dropColumn('major');
  })

};
