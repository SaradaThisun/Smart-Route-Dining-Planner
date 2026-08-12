require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Place = require("../models/Place");

const places = require("../data/places.json");

const seedPlaces = async () => {

    try{

        await connectDB();

        await Place.deleteMany();

        await Place.insertMany(places);

        console.log("✅ Places Seeded");

        process.exit();

    }catch(err){

        console.log(err);

        process.exit(1);

    }

}

seedPlaces();
