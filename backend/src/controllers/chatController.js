import { chatClient } from "../libs/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = chatClient.createToken(req.user.clerkId);
    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userImage: req.user.profileImage,
      userName: req.user.name,
    });
  } catch (error) {
    console.error("error in protected route", error.message);
    res.status(500).json({ msg: "Internal server error" });
  }
}
