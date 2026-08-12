require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Restaurant = require("../models/Restaurant");

const restaurants = require("../data/restaurants");

const seedRestaurants = async () => {
  try {
    await connectDB();

    await Restaurant.deleteMany();

    await Restaurant.insertMany(restaurants);

    console.log("✅ Restaurants Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedRestaurants();