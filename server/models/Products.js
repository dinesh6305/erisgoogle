const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
    image: {
        type: String, // Store image URL or file path
        required: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      brand: {
        type: String,
        required: true
      },
      salePrice: {
        type: Number,
        default: 0 // Optional, in case there's no sale price
      },
      totalStock: {
        type: Number,
        required: true
      }
},{timestamps:true})
module.exports=mongoose.model("product",ProductSchema)