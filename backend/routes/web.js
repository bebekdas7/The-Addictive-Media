import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.post("/upload-detail", userController.uploadDetail);
router.put("/update-address", userController.updateAddress);

export default router;
