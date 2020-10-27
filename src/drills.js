/* Get all items that contain text

A function that takes one parameter for searchTerm which will be any string
The function will query the shopping_list table using Knex methods and select the rows which have a name that contains the searchTerm using a case insensitive match.*/

/*function searchByProduceName(searchTerm) {
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

searchByProduceName('holo')*/
require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

console.log("hello from drills");

function searchForProducts(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log(searchTerm);
      console.log(result);
    });
  //SELECT id,name,price,category FROM shopping_list WHERE name ILIKE %searchTerm;
}

searchForProducts("chicken");

/*Get all items paginated

A function that takes one parameter for pageNumber which will be a number
The function will query the shopping_list table using Knex methods and select the pageNumber page of rows paginated to 6 items per page.
 searchByProduceName('holo')

function paginateProducts(page) {
  const productsPerPage = 10
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

paginateProducts(2)*/

function paginate(pageNumber) {
  const offset = 6 * (pageNumber - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(6)
    .offset(offset)
    .then((result) => {
      console.log(result);
    });
}

paginate(2);

/*3. Get all items added after date

A function that takes one parameter for daysAgo which will be a number representing a number of days.
This function will query the shopping_list table using Knex methods and select the rows which have a date_added that is greater than the daysAgo.*/

function getItemsFrom(num) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days' :: INTERVAL`, num)
    )
    .then((result) => {
      console.log(result);
    });
}

getItemsFrom(5);

// 4. Get the total cost for each category

// A function that takes no parameters
// The function will query the shopping_list table using Knex methods and select the rows grouped by their category and showing the total price for each category.

function total() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log(result);
    });
}

total();
