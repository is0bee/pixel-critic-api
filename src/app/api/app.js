const express = require("express");
const bcrypt = require('bcryptjs');
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/users");
const gameRouter = require("./routes/games");
const reviewRouter = require("./routes/reviews");
const followerRouter = require("./routes/followers");
const topFourRouter = require("./routes/topFour");
var cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(fileUpload());

app.use("/api/users", userRouter);
app.use("/api/games", gameRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/followers", followerRouter);
app.use("/api/top-four", topFourRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
