import userModel from "../models/userModel.js";
import useragent from "express-useragent";

class userController {
  static uploadDetail = async (req, res) => {
    const { name, dob, phone, email } = req.body;

    const browser = useragent.parse(req.headers["user-agent"]).browser;
    const version = useragent.parse(req.headers["user-agent"]).version;
    const os = useragent.parse(req.headers["user-agent"]).os;
    const platform = useragent.parse(req.headers["user-agent"]).platform;
    const deviceType = useragent.isMobile
      ? "Mobile"
      : useragent.isDesktop
      ? "Desktop"
      : useragent.isTablet
      ? "Tablet"
      : "Unknown";
    const ip = req.ip;
    try {
      // check first if this email is already there or not
      const check = await userModel.findOne({
        $or: [{ email: email }, { phone: phone }],
      });
      if (check) {
        return res.json({ success: false, message: "User already exists" });
      }

      const newUser = new userModel({
        name,
        dob,
        phone,
        email,
        browser,
        version,
        os,
        platform,
        deviceType,
        ip,
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        address6: "",
        address7: "",
        address8: "",
        address9: "",
      });
      await newUser.save();
      // console.log(newUser);
      res.json({
        success: true,
        message: "User added successfully",
        result: newUser,
      });
    } catch (error) {
      res.json({ success: false });
    }
  };

  static updateAddress = async (req, res) => {
    const { id } = req.query;
    const {
      address1,
      address2,
      address3,
      address4,
      address5,
      address6,
      address7,
      address8,
      address9,
    } = req.body;

    try {
      if (!id)
        return res.json({ success: false, message: "User id is required" });

      const updateUser = await userModel.findByIdAndUpdate(id, {
        address1: address1,
        address2: address2,
        address3: address3,
        address4: address4,
        address5: address5,
        address6: address6,
        address7: address7,
        address8: address8,
        address9: address9,
      });
      //if not update
      if (!updateUser)
        return res.json({ success: false, message: "User not found" });

      //elae success
      res.json({ success: true, message: "Address added successfully" });
    } catch (error) {
      console.log("Error", error);
      res.json({ success: false, message: "Couldn't add address" });
    }
  };
}
export default userController;
