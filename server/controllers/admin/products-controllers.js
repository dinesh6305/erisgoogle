  const { imageUploadUtil } = require("../../helper/Cloudinary");

const Product = require("../../models/Products");

const handleImageUpload = async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await imageUploadUtil(url);
  
      res.json({
        success: true,
        result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Error occured",
      });
    }
  };


const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      // averageReview,
    } = req.body;
    const newcreatedproduct=new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      
    })
    await newcreatedproduct.save();
    res.status(201).json({
      success: true,
      data:newcreatedproduct,

    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured",
    })
  }
}

const fetchProducts = async (req, res) => {
  try{
    const listingallproducts=await Product.find({});
    res.status(200).json({
      success:true,
      data:listingallproducts
    })

  }catch(e){
    console.log(e)
    res.status(500).json({
      success: false,
      message: "Error occured",
    })
  }
}
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, totalStock, averageReview } = req.body;

    const findproduct = await Product.findById(id);

    if (!findproduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Moving the update logic outside the if block
    findproduct.title = title || findproduct.title;
    findproduct.description = description || findproduct.description;
    findproduct.category = category || findproduct.category;
    findproduct.brand = brand || findproduct.brand;
    findproduct.price = price === "" ? 0 : price || findproduct.price;
    findproduct.salePrice = salePrice === "" ? 0 : salePrice || findproduct.salePrice;
    findproduct.totalStock = totalStock || findproduct.totalStock;
    findproduct.image = image || findproduct.image;
    findproduct.averageReview = averageReview || findproduct.averageReview;

    await findproduct.save(); // ✅ Save the updated product

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findproduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({ 
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


module.exports={handleImageUpload,addProduct,fetchProducts,editProduct,deleteProduct}