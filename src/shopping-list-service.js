const ShoppingListService = {
  getAllItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  getById(knex, id) {
    return knex.select("*").from("shopping_list").where("id", id).first();
  },
  deleteItem(knex, id) {
    return knex.select("*").from("shopping_list").where("id", id).delete();
  },
  updateItem(knex, id, newItem) {
    return knex("shopping_list").where({ id }).update(newItem);
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then((rows) => rows[0]);
  },
};

module.exports = ShoppingListService;
