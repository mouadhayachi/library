const express = require("express");
const router = express.Router();

const Book = require("../models/book");

// Display all Books :
router.get("/", (req, res) => {
  Book.find()
  .populate({ path: "author" })
  .populate({ path: "publisher" })
  .then((books) => res.json(books))
  .catch((err) => res.send(err));
});

// Display one Books :
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Book.findOne({ _id: id })
    .then((books) => res.json(books))
    .catch((err) => res.send(err));
});

// Add New Book :
router.post("/", (req, res) => {
  const { name, author, publisher, isbn, pages, edition } = req.body;
  const newBook = new Book({
    name,
    author,
    publisher,
    isbn,
    pages,
    edition,
  });
  newBook
    .save()
    .then((books) => res.json(books))
    .catch((err) => res.send(err));
});

// delete a Book :
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Book.findByIdAndDelete({ _id: id }).then(() =>
    res.json({ msg: "The Book was deleted!" }).catch((err) => res.send(err))
  );
});

// update a Book :
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, author, publisher, isbn, pages, edition } = req.body;
  Book.findByIdAndUpdate(
    { _id: id },
    { $set: { name, author, publisher, isbn, pages, edition } }
  )
    .then((books) => res.json(books))
    .catch((err) => res.send(err));
});

module.exports = router;
