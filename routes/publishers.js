const express = require("express");
const router = express.Router();

const Publisher = require("../models/publisher");

// Display all Publishers :
router.get("/", (req, res) => {
  Publisher.find()
    .then((publishers) => res.json(publishers))
    .catch((err) => res.send(err));
});

// Display one Publishers :
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Publisher.findOne({ _id: id })
    .then((publishers) => res.json(publishers))
    .catch((err) => res.send(err));
});

// Add New Publisher :
router.post("/", (req, res) => {
  const { name, address, phonenumber, reference } = req.body;
  const newPublisher = new Publisher({
    name,
    address,
    phonenumber,
    reference,
  });
  newPublisher
    .save()
    .then((publishers) => res.json(publishers))
    .catch((err) => res.send(err));
});

// delete a Publisher :
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Publisher.findByIdAndDelete({ _id: id }).then(() =>
    res.json({ msg: "The Publisher was deleted!" }).catch((err) => res.send(err))
  );
});

// update a Publisher :
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, address, phonenumber, reference } = req.body;
  Publisher.findByIdAndUpdate(
    { _id: id },
    { $set: { name, address, phonenumber, reference } }
  )
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

module.exports = router;
