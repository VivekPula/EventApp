import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: "UserInfo",
  },
});

const User = model("User", userSchema);

export default User;
