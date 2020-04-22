require('dotenv').config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_PASS, 
    saveUninitialized: false, 
    resave: false, 
    cookie: { 
      maxAge: 1000 * 60 * 60 * 2, // Expire in 2 hours
      sameSite: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    }, 
    name: process.env.SESSION_NAME,
  })
);

// Routes 
app.use("/api", require("./routes/api.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/profile", require("./routes/profile.js"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});