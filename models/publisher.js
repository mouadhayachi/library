const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between 3 and 50 characters",
  }),
  validate({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Name should contain alpha-numeric characters only",
  }),
];

const phoneNumberValidator = [
  validate({
    validator: "isLength",
    arguments: [8],
    message: "Name should be 8 characters",
  }),
  validate({
    validator: "isNumeric",
    passIfEmpty: true,
    message: "Name should contain numbers only",
  }),
];

const PublisherSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
  address: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    valide: phoneNumberValidator,
  },
  reference: {
    type: String,
    unique: true,
    require: true,
    trim: true,
  },
});

module.exports = Publisher = mongoose.model("Publisher", PublisherSchema);
