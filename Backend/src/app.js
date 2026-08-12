const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");
const routeRoutes = require("./routes/routeRoutes");
const hashMapRoutes = require("./routes/hashMapRoutes");
const priorityQueueRoutes = require("./routes/priorityQueueRoutes");
const linkedListRoutes = require("./routes/linkedListRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const tripRoutes = require("./routes/tripRoutes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/priority-queue", priorityQueueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/hashmap", hashMapRoutes);
app.use("/api/recommendations", linkedListRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel Pal Backend Running 🚀",
  });
});

module.exports = app;