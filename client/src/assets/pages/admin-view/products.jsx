import { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "../../components/ui/Sheet";
import CommonForm from "../../components/common/commonform";
import { addProductFormElements } from "../../../config";
import ProductImageupload from "../../components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "../../../store/Adminproduct-slice/index";
import toast from "react-hot-toast";
import AdminProductTile from "../../components/admin-view/adminproductview";

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  price: '',
  brand: '',
  salePrice: '',
  totalStock: ''
};

function Adminproducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imagefile, setimagefile] = useState(null);
  const [uploadedimageurl, setuploadedimageurl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedid, setCurrentEditedid] = useState(null);
  const { productList } = useSelector(state => state.adminProducts);
  const dispatch = useDispatch();
  function handledelete(getcurrent){
    console.log(getcurrent);
    dispatch(deleteProduct(getcurrent)).then((data)=>{
      if(data?.payload?.success){
        toast.success("successfully deleted");
        dispatch(fetchAllProducts())
        

      }
    })
    

  }

  useEffect(() => {
    dispatch(fetchAllProducts()).then((response) => {
      console.log("Fetched Products:", response.payload); // ✅ Debugging
    });
  }, [dispatch]);
  function isFormValid(){
    return Object.values(formData).every(value => value !== '');

  }

  function onSubmit(event) {
    event.preventDefault(); 
    currentEditedid!==null ?
    dispatch(editProduct({
      id:currentEditedid,formData
    })).then((data)=>{
      console.log(data,"edit")
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData)
        setOpenCreateProductsDialog(false)
        setCurrentEditedid(null)

      }
    }) :

    

    

   

    dispatch(addNewProduct( {
      ...formData,
      image: uploadedimageurl // ✅ Ensure image URL is added
    }))
      .unwrap()
      .then((data) => {
        console.log("Product added:", data);
        if (data?.success) {
          dispatch(fetchAllProducts()); // ✅ Refresh product list
          setimagefile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully!");
        }
      })
      .catch((error) => console.error("Error adding product:", error));

    setOpenCreateProductsDialog(false);
  }

  return (
    <Fragment>
      <div className="w-full mb-5 flex justify-end">
        <button
          className="bg-gray-800 text-white p-2 rounded-md cursor-pointer
                     hover:bg-gray-600 transition duration-300 
                     transform hover:scale-105 active:scale-95 shadow-lg"
          onClick={() => setOpenCreateProductsDialog(true)}
        >
          Add New Product
        </button>
      </div>

      {/* ✅ Fixed Typo in Length Check */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length > 0
          ? productList.map((productItem) => (
            <AdminProductTile key={productItem._id} product={productItem} setCurrentEditedid={setCurrentEditedid} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setFormData={setFormData} handledelete={handledelete} />
          ))
          : <p className="col-span-full text-center text-gray-500">No products available</p>
        }
      </div>

      {/* Add Product Sheet */}
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false); 
        setCurrentEditedid(null);
        setimagefile(null);   // ✅ Reset image when closing
        setuploadedimageurl(""); // ✅ Clear uploaded image
        setFormData(initialFormData);
      }} >

        <SheetContent side="right" className="overflow-auto transition-all duration-500 transform">
          <SheetHeader>
            {
              currentEditedid ? "Edit Product" : "Add New Product"
            }
          </SheetHeader>

          <ProductImageupload
            imagefile={imagefile}
            setimagefile={setimagefile}
            uploadedimageurl={uploadedimageurl}
            setuploadedimageurl={setuploadedimageurl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedid !== null}
          />

          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedid!==null?'edit':"Add"}
              formControls={addProductFormElements}
              onSubmit={onSubmit}
              isButtondis={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;
