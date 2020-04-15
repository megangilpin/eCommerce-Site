const connection = require("../config/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  login: async (req, res) => { 
    const { email, password } = req.body;
    
    try { 
      // Check database for email address
      connection.query("select uuid, password from users where email = ? limit 1", [email], async (error, results) => {
        if(results.length === 0) {     
            // Return unauthorized for invalid email
            return res.status(200).json({
              status: 401, 
              message: "Incorrect email" 
            }); 
        } else {
          // Check password
          const isMatch = await bcrypt.compare(results[0].password, password);

          if(!isMatch) { 
            // Return unauthorized for invalid password
            return res.status(200).json({ 
              status: 401,
              message: "Incorrect password" 
            });
          } else { 
            // If password is correct, generate JWT new token
            jwt.sign({ "uuid": results[0].uuid }, process.env.JWT, { expiresIn: '6h' }, (err, access_token) => {
              if(err) console.log(err);

              connection.query(`update users set access_token = '${access_token}', last_login = ${Number(new Date().getTime())} where uuid = '${results[0].uuid}'`, (error, results) => { 
                if(error) console.log(error);

                return res.status(200).json({ 
                  access_token: access_token, 
                  access: "approve",
                });
              });
            });
          };
        };
      });
    } catch (error) { 
      return res.status(500).json({ 
        message: error 
      });
    };
  },
  register: async (req, res) => { 
    try { 
      // Creates uuid to use as user's ref number with the help of uuid npm
      const uuid = uuidv4();
      const { first_name, last_name, email, password } = req.body;
      const created = Number(new Date().getTime());

      // saltRound for bcrypt
      const saltRounds = 10;

      // Checks if user already exists
      connection.query('select * from users where email = ?', [email], async (err, results) => {
        // If no user exists create hashed password and add to user table
        if (await results.length === 0) {        
          // Creates hashed password with the help of bcrypt npm
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
              return res.status(500).send(err);
            } else {
              let user = [created, uuid, email, hash, first_name, last_name]
              // Adds user to the user table
              connection.query('insert into users (created, uuid, email, password, first_name, last_name) values (?)', [user], (error, results) => {
                if(err) {
                  return res.status(500).send(err);
                } else {
                  return res.status(200).json({
                    saved: true,
                  });
                };
              });
            };
          });
        // If user does exist send back message
        } else {
          return res.status(200).json({
            saved: false,
            message: "Email already exists, please try again",
          });
        };
      });
    } catch(error) { 
      return res.status(500).json({ 
        message: error,
      });
    };
  }, 
  validate: async (req, res) => { 
    const uuid = req.body.uuid;
    const access_token = req.body.access_token;

    try {
      // On page load, query the database to locate the user
      // Check if the stored token has not been modified
      connection.query("select * from users where uuid = ? and access_token = ?", [uuid, access_token], async (error, results) => {
        // If the uuid and access token do not match then deny access
        if(await results.length === 0) { 
          return res.status(200).json({ 
            access: "deny",
          });
        } else {
          // Refresh token
          await jwt.sign({ "uuid": uuid }, process.env.JWT, { expiresIn: '6h' }, (err, new_token) => {
            if(err) console.log(err);
            // Update database with a new token and send this upward to stored
            connection.query(`update users set access_token = '${new_token}', last_login = ${Number(new Date().getTime())} where uuid = '${uuid}'`, (error, results) => { 
              if(error) console.log(error);
              
              return res.status(200).json({ 
                access_token: new_token, 
                access: "approve",
              });
            });
          });
        };
      });
    } catch(error) { 
      return res.status(500).json({ 
        message: error,
      });
    };
  }, 
};