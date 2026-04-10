import express from "express";
import dotenv from "dotenv";
import userroutes from "./src/routers/userrouters";
import content from "./src/routers/content";
import cors from "cors";
const PORT = process.env.PORT || 4000;
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/v1/users", userroutes);
app.use("/api/v2/content", content);
app.get("/health", (req, res) => {
  res.json({
    message: "server is running bitchesss hhehehhehehhh ",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
