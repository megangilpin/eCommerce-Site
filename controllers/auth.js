const connection = require("../config/connection.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  login: async (req, res) => { 
    const { email, password } = req.body;
    
    try { 
      // Search for email inputted into log in form
      const q = "SELECT uuid, email, password, first_name, last_name FROM users WHERE email = ? LIMIT 1";

      connection.query(q, [email], async (err, r) => {
        // No email address on file
        if (r.length === 0) {     
            return res.status(200).json({
              status: 401, 
              message: "Incorrect email",
            }); 
        } else {
          // Check password if email address is found
          const isMatch = await bcrypt.compare(password, r[0].password);
          
          switch (!isMatch) { 
            case true: 
              return res.json({ 
                status: 401,
                message: "Incorrect password", 
              });
            default:  
              // If successful, update the session cookie so log in can remain active
              req.session.uuid = r[0].uuid;
              res.json({ 
                access: "granted",
              });
          };
        };
      });
    } catch (err) { 
      return res.status(500).json({ 
        message: err,
      });
    };
  },
  register: async (req, res) => { 
    try { 
      const { first_name, last_name, email, password } = req.body;

      connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        const uuid = uuidv4(); // Generate unique user id
        const saltRounds = 10; // Password hash rounds
       
        if (await results.length === 0) {        
          // Hash password
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              return res.status(500).send(err);
            } else {
              let user = [created, uuid, email, hash, first_name, last_name];
              const q = 'INSERT INTO users (created, uuid, email, password, first_name, last_name) VALUES (?)';

              // Creates new user in database
              connection.query(q, [user], (err, results) => {
                if (err) {
                  return res.status(500).send(err);
                } else {
                  req.session.uuid = uuid; // If account is created, set the uuid on the cookie
                  res.redirect("/"); // Once created, send the user back to where they had come from
                };
              });
            };
          });
        // Return error if email exists
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
    // On page load check if there is an active session
    const { uuid } = req.session;

    if (!uuid) { 
      // No user return items to be displayed in nav
      res.json({ 
        navOptions: ["Login", "Register"], 
      });
    } else { 
      try {
        const q = "SELECT uuid, email, first_name, last_name FROM users WHERE uuid = ?";
        connection.query(q, [uuid], async (err, r) => {
          if (err) { 
            console.log(err);
          } else {
            req.session.uuid = r[0].uuid;
            res.json({
              database: r, // Pass up database results in case we want to customize with name
              navOptions: ["Profile", "Logout"], // return items to be displayed in nav
            }); 
          };
        });
      } catch(err) { 
        throw new Error(err);
      }
    };
  }, 
  logout: (req, res) => { 
    req.session.destroy(function(err) {
      if (err) { 
        return res.json({ 
          message: "Logout failed"
        });
      };

      res.clearCookie(process.env.SESSION_NAME);
      return res.json({
        access: "revoked"
      });
    });
  },
};