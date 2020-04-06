const connection = require("../config/connection.js");


module.exports = {
  address: (req, res) => {
    // should the uuid be in the params?

    // can be optimized further - left this way for readability during development
    const { uuid, type, first_name, last_name, address_line1, address_line2, city, state, postcode, country, primary } = req.body
    
    let address = [uuid, type, first_name, last_name, address_line1, address_line2, city, state, postcode, country, primary ]

    // add address to user_profile table
    connection.query('INSERT INTO user_profile (uuid, type, first_name, last_name, address_line1, address_line2, city, state,postcode, country, primary ) VALUES (?)', [address], async (err, result) => {
      if (err) {
        return res.status(500).send(err)
      }
      return res.status(200).json({
        data: result
      })
    });
  }, 
};