const connection = require("../config/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  // Support logging in
  login: async (req, res) => { 
    const { email, password } = req.body;

    try { 
      // Check database to see if user inputed email exists
      connection.query("select uuid, password from users where email = ? limit 1", [email], async (error, results) => {
        switch (results.length) { 
          // No results
          case 0:
            // Return unauthorized for invalid email
            return res.status(401).json({ message: "Incorrect email" }); 
          // Results
          default:
            // Check password
            // const isMatch = await bcrypt.compare(results[0].password, password);
            const isMatch = await results[0].password === password; 

            switch (!isMatch) { 
              case true: 
                // Return unauthorized for invalid password
                return res.status(401).json({ message: "Incorrect password" });
              default: 
                // If password is correct, generate JWT token
                jwt.sign({ "uuid": results[0].uuid }, process.env.JWT, { expiresIn: '6h' }, (err, access_token) => {
                  if(err) console.log(err);
                  // Update token in database
                  connection.query(`update users set access_token = '${access_token}', last_login = ${Number(new Date().getTime())} where uuid = '${results[0].uuid}'`, (error, results) => { 
                    if(error) console.log(error);
                    return res.status(200).json({ access_token: access_token, access: "approve" });
                  });
                });
            };
        };
      });
    } catch (error) { 
      return res.status(500).json({ message: error });
    }
  },
  // Support access_token validation 
  validate: async (req, res) => { 
    const uuid = req.body.uuid;
    const access_token = req.body.access_token;

    try {
      // On page load, query the database to locate the user
      // Check if the stored token has not been modified
      connection.query("select * from users where uuid = ? and access_token = ?", [uuid, access_token], async (error, results) => {
        // If the uuid and access token do not match then deny access
        switch (results[0]) { 
          case undefined: 
            return res.status(200).json({ access: "deny" });
          // If match
          default: 
            // Refresh token
            await jwt.sign({ "uuid": uuid }, process.env.JWT, { expiresIn: '6h' }, (err, new_token) => {
              if(err) console.log(err);
              // Update database with a new token and send this upward to stored
              connection.query(`update users set access_token = '${new_token}', last_login = ${Number(new Date().getTime())} where uuid = '${uuid}'`, (error, results) => { 
                if(error) console.log(error);
                return res.status(200).json({ access_token: new_token, access: "approve" });
              });
            });
        };
      });
    } catch (error) { 
      return res.status(500).json({ message: error })
    };
  }, 
  register: async (req, res) => { 
    try { 
      // Insert register code
    } catch (error) { 
      return res.status(500).json({ message: error })
    };
  }, 
};