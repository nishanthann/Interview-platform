import express from "express";
import "dotenv/config";
import { connectDB } from "./libs/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./libs/inngest.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/api/inngest", serve({ client: inngest, functions }));
connectDB();
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
