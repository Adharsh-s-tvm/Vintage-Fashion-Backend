const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    material: { type: String },
    pattern: { type: String },
    gender: { type: String, required: true }, // Example: 'Men', 'Women', 'Unisex'
    sizeVariants: [{ type: mongoose.Schema.Types.ObjectId, ref: "SizeVariant" }], // Size-based variants
    activeOffer: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
    discountedPrice: { type: Number },
    isDeleted: { type: Boolean, default: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Fixed duplicate key
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
