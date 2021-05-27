const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const config = require("config");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const author = require("./routes/authors");
const publisher = require("./routes/publishers");
const book = require("./routes/books");

// connect to database
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("The database is connected!"))
  .catch((err) => console.error(err));

// API Router
app.use("/authors", author);
app.use("/publishers", publisher);
app.use("/books",book);

// Run Server
app.listen(PORT, (err) => {
  err
    ? console.log("Server Failed!")
    : console.log(`Server is running on port: ${PORT}!`);
})