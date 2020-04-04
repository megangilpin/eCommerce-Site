const connection = require("../config/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// controller for all CRUD requests for users table in ecommerce database.
module.exports = {
  all: (req, res) => {
    connection.query('select * from users', (err, results) => {
      if(err) {
        return res.status(500).send(err)
      }
      else {
        return res.status(200).json({
          data: results
        })
      }
    })
  }, 
  validate: async (req, res) => { 
    const { email, password } = req.body

    try { 
      // Check database to see if user inputed email exists
      connection.query("select uuid, password from users where email = ? limit 1", [email], async (error, results) => {
        if(results.length === 0) { 
          // Return unauthorized for invalid email
          return res.status(401).json({ error: "Incorrect email" }); 
        } else {
          // Check password
          const isMatch = await bcrypt.compare(results[0].password, password);

          if(!isMatch) { 
            // Return unauthorized for invalid password
            return res.status(401).json({ error: "Incorrect password" });
          } else { 
            // If password is correct, generate and pass up JWT token that includes user uuid
            jwt.sign({ "uuid": results[0].uuid }, process.env.JWT, { expiresIn: '6h' }, (err, access_token) => {
              if(err) console.log(err);
              return res.status(200).json({ access_token });
            });
          }
        }
      });
    } catch (error) { 
      return res.status(500);
    }
  },
};