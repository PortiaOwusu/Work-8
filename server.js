const express = require("express");

require("./Config/dbConnect");

require("./router/authRouter");
require("./router/userRouter");

const app = express();
app.use(express.json());

app.use("/auth", require("./routers/authRouter"));
app.use("/user", require("./routers/userRouter"));

app.all("*", (req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

app.listen(4000, () => console.log("Server up avnd running"));
