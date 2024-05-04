import { Schema, model } from "mongoose";

const Admin = new Schema({
  username: String,
  password: String,
});

export default model("admin", Admin);