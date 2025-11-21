import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  // followin requir auth is redirect to "/"
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized" });
      const user = await User.findOne({ clerkId });
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      req.user = user;
      next();
    } catch (error) {
      console.error("error in protected route");
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
