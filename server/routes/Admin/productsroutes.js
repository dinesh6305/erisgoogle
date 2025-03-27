const express=require('express')
const {handleImageUpload,addProduct,fetchProducts,editProduct,deleteProduct}=require("../../controllers/admin/products-controllers")
const {upload}=require("../../helper/Cloudinary")
const router=express.Router()
router.post('/upload-image',upload.single("my_file"),handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchProducts);
module.exports = router;
