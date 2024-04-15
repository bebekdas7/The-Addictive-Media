import express from "express";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import router from "./routes/web.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 8000;

app.use(cors());

app.use(bodyParser.json());

app.use("/", router);

//can replace with your mongo db cluster link to check the database.
connectDB(process.env.DATABASE_URL);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
