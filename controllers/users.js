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
          data: results,
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
  register: async (req, res) => {
    // creates uuid to use as user's ref number with the help of uuid npm
    const uuid = uuidv4();
    const { first_name, last_name, email, password } = req.body

    // saltRound for bcrypt
    const saltRounds = 10;
    
    // creates hashed password with the help of bcrypt npm
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        return res.status(500).send(err)
      }
      else {
        let user = [uuid, email, hash, first_name, last_name ]


        // adds user to the user table
        connection.query('INSERT INTO users (uuid, email, password, first_name, last_name) VALUES (?)', [ user ], async (err, result) => {
          if (err) {
            return res.status(500).send(err)
          }
          return res.status(200).json({
              data: result,
            })
        });
      }
    });
  },
  shipping: async(req, res) => {

  }
};