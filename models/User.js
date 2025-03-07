import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: {
    type: String,
    require: "true",
  },
  password: {
    type: String,
    require: "true",
  },
  todos: [{title: String, status: String}],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
