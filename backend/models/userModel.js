import mongoose, { version } from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  dob: String,
  phone: String,
  email: String,
  browser: String,
  version: String,
  os: String,
  platform: String,
  deviceType: String,
  ip: String,
  address1: String,
  address2: String,
  address3: String,
  address4: String,
  address5: String,
  address6: String,
  address7: String,
  address8: String,
  address9: String,
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
