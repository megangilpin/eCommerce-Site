require('dotenv').config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes 
app.use("/api", require("./routes/api.js"));
app.use("/auth", require("./routes/auth.js"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});