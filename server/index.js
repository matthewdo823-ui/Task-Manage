import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();
const app = express();
const port = "5001";

app.get("/", (req, res) =>
  {res.send("Server is running");}
)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(port, ()=> {
    console.log(`Server is running on http://localhost:${port}`);
})
  })
  .catch((err) => {
    console.log("error: ", err.message);
    process.exit(1);
  })

