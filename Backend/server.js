const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

const { loadPlaces } = require("./src/services/placeLoaderService");

const PORT = process.env.PORT || 5100;

const startServer = async () => {
  try {
    await connectDB();

    await loadPlaces();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error(err);
  }
};

startServer();