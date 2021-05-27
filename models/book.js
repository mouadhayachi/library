const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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

const BookSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author',
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Publisher',
  },
  isbn:{
      type:String,
      required:true
  },
  pages: {
    type: Number,
    required: true
  },
  edition: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "INAVAILABLE"],
    default: "AVAILABLE",
  },
});

module.exports = Book = mongoose.model("Book", BookSchema);
