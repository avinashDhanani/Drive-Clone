const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const awsRouter = require("./routers/buckets");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
  res.send("you are in our drive")
})
app.use(userRouter);
app.use(awsRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
