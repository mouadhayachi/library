const express = require("express");
const router = express.Router();

const Author = require("../models/author");

// Display all Authors :
router.get("/", (req, res) => {
  Author.find()
    .then((authors) => res.json(authors))
    .catch((err) => res.send(err));
});

// Display one Authors :
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Author.findOne({ _id: id })
    .then((authors) => res.json(authors))
    .catch((err) => res.send(err));
});

// Add New Author :
router.post("/", (req, res) => {
  const { firstname, lastname, phonenumber, reference } = req.body;
  const newAuthor = new Author({
    firstname,
    lastname,
    phonenumber,
    reference,
  });
  newAuthor
    .save()
    .then((authors) => res.json(authors))
    .catch((err) => res.send(err));
});

// delete a Author :
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Author.findByIdAndDelete({ _id: id }).then(() =>
    res.json({ msg: "The Author was deleted!" }).catch((err) => res.send(err))
  );
});

// update a Author :
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, phonenumber, reference } = req.body;
  Author.findByIdAndUpdate(
    { _id: id },
    { $set: { firstname, lastname, phonenumber, reference } }
  )
    .then((authors) => res.json(authors))
    .catch((err) => res.send(err));
});

module.exports = router;
