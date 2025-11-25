import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const { userId } = req.auth;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findOne({ clerkId: userId });
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("error in protected route", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
