import express from "express";
import "dotenv/config";
import { connectDB } from "./libs/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { functions, inngest } from "./libs/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/ProtectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("api/chat", chatRoutes);
app.use("api/session", chatRoutes);
connectDB();
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});
app.get("/book", protectRoute, (req, res) => {
  res.status(200).json({ msg: "Hello book World" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
