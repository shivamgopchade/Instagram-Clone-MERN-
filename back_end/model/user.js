const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username already taken"],
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Min length should be 6"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        (val) => {
          isEmail;
        },
        "Enter valid email address",
      ],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//hashing password before saving
schema.pre("save", async function (next) {
  //console.log("hashing pass");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const model = mongoose.model("USER", schema);

module.exports = model;
