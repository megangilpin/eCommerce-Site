const connection = require("../config/connection.js");

// controller for all CRUD requests for users table in ecommerce database.
module.exports = {
  all: (req, res) => {
    connection.query('select * from users', (err, results) => {
      if(err) {
        return res.status(500).json({ 
          message: err,
        })
      } else {
        return res.status(200).json({
          data: results,
        })
      };
    });
  }, 
  productSearch: (req, res) => { 
    connection.query('select id, name, image, color, size from products', (err, results) => {
      if(err) {
        return res.status(500).json({ 
          message: err,
        })
      } else {
        return res.status(200).json({
          data: results,
        })
      };
    });
  }
};