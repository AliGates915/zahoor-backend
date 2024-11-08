const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await connectDB(); // Connect to the database
    console.log("Database connected.");

    // Import routes after connection is established
    const UserRouter = require("./routes/user");
    const AdminRouter = require("./routes/admin");
    const CompanyRouter = require("./routes/company");

    // Register routes
    app.use("/api", UserRouter);
    app.use("/api/admin", AdminRouter);
    app.use("/api", CompanyRouter);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit process if connection fails
  }
})();
app.listen(3000, () => {
  
})
// Main route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Ensure the app is exported
module.exports = app;
