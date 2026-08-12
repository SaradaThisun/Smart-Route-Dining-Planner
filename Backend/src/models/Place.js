const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        "restaurant",
        "hotel",
        "cafe",
        "fuel",
        "attraction",
        "hospital",
      ],
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    priceRange: {
      type: String,
      enum: ["$", "$$", "$$$", "$$$$"],
      default: "$",
    },

    parking: {
      type: Boolean,
      default: false,
    },

    familyFriendly: {
      type: Boolean,
      default: false,
    },

    openingHours: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    contactNumber: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", placeSchema);