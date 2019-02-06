const express = require("express");

const mongoose = require("mongoose");
const bodyParser=require("body-parser")
const app = express();
const PORT = process.env.PORT || 3001;

const blogs = require("./routes/api/blogs");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use("/api/blogs",blogs);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/blogging",{useNewUrlParser: true} );

// { useNewUrlParser: true }

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
