import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";

// let conn = mongoose.connect("mongodb://localhost:27017/stack", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

dotenv.config(); // Load environment variables

const CONNECTION_URL = process.env.CONNECTION_URL; 
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

// Connect to MongoDB

const connectDB = async () => {

  try {
    if (!CONNECTION_URL) {
      throw new Error("Missing MongoDB connection URL in environment variables.");
    }
    mongoose.connect(CONNECTION_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
app.listen(PORT, async () => {
  await connectDB(); // Connect to DB before starting server
  console.log(`Server running on port ${PORT}`);
});
