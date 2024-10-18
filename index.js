// importing modules
const express = require("express");
const morgan = require("morgan");

// routes
const books = require("./routes/books");
const home = require("./routes/home");
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use("/books", books);
app.use("/", home);

// listening to port
app.listen(3000, ()=> console.log("express app running at : http://localhost:3000"));