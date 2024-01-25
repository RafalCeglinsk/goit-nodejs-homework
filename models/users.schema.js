import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
});

usersSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("users", usersSchema);

export { User };
