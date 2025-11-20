import express from "express";
import "dotenv/config";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World" });
});
app.listen(process.env.PORT, () => console.log("Server ruing on port 3000"));
