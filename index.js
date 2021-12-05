const express = require("express");
const app = express();
const PORT = 8800;
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
dotenv.config();

// Connection to mongodb
// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
//   () => {
//     console.log("Connected to MongoDB!");
//   }
// );

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

//  middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to homepage.");
});

app.listen(PORT, () => {
  console.log(`Your app is running on port ${PORT}!`);
});
