const mongoose = require('mongoose');

const SizeVariantSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Link to Product
    size: { type: String, required: true },  // Example: 'S', 'M', 'L', 'XL'
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    inStock: { type: Boolean, default: true }, 
    stockCount: { type: Number, required: true, default: 0 },
    description: { type: String }, 
  },
  { timestamps: true }
);

const SizeVariant = mongoose.model('SizeVariant', SizeVariantSchema);
module.exports = SizeVariant;
