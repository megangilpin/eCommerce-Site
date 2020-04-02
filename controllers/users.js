var connection = require("../config/connection.js");

// controller for all CRUD requests for users table in ecommerce database.
module.exports = {
  all: (req, res) => {
    connection.query('SELECT * FROM ecommerce.users', (err, results) => {
      if(err) {
        return res.send(err)
      }
      else {
        return res.json({
          data: results
        })
      }
    })
  }
}