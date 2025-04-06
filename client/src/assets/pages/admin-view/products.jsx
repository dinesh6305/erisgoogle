import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CommonForm from "../../components/common/commonform";
import { addProductFormElements } from "@/config";
import Productimageupload from "../../components/admin-view/image-upload";

import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";  // Corrected Path

import {
  fetchAllProducts,
  addNewProduct,
  deleteProduct,
  editProduct,
} from "../../../store/Adminproduct-slice/index";
import AdminProductTile from "../../components/admin-view/adminproductview";

const initialFormData = {
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  productName: "",
  description: "",
  productType: "",
  category: "",
  color: "",
  trend: "",
  space: "",
  price: "",
  salePrice: "",
  discount: "",
  stockQuantity: "",
  popularity: 0,
  createdAt: "",
  updatedAt: "",
  createdBy: "",
  updatedBy: "",
};

function Products() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { productList, isLoading } = useSelector(
    (state) => state.adminProducts
  );

  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState(["", "", "", ""]);
  const [imageLoadingStates, setImageLoadingStates] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const currentUser = "dinesh6305"; // Current user's login

  const getCurrentUTCDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace("T", " ");
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (uploadedImageUrls.some((url) => url)) {
      setFormData((prev) => ({
        ...prev,
        image1: uploadedImageUrls[0] || prev.image1,
        image2: uploadedImageUrls[1] || prev.image2,
        image3: uploadedImageUrls[2] || prev.image3,
        image4: uploadedImageUrls[3] || prev.image4,
      }));
    }
  }, [uploadedImageUrls]);

  const resetForm = () => {
    setFormData(initialFormData);
    setUploadedImageUrls(["", "", "", ""]);
    setImageFiles([null, null, null, null]);
    setCurrentEditedId(null);
    setImageLoadingStates([false, false, false, false]);
  };

  const isFormValid = () => {
    const requiredFields = [
      "productName",
      "description",
      "productType",
      "salePrice",
      "stockQuantity",
      "image1",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      if (typeof value === "number") {
        return value !== null && !isNaN(value);
      }
      return value !== undefined && value !== null && value !== "";
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageLoadingStates.some((state) => state)) {
      toast({
        title: "Please wait",
        description: "Images are still uploading...",
        variant: "destructive",
      });
      return;
    }

    if (!formData.image1) {
      toast({
        title: "Error",
        description: "Primary image is required",
        variant: "destructive",
      });
      return;
    }

    const currentDateTime = getCurrentUTCDateTime();

    const processedFormData = {
      ...formData,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
      discount: formData.discount ? Number(formData.discount) : undefined,
      stockQuantity: Number(formData.stockQuantity),
      popularity: Number(formData.popularity || 0),
      updatedAt: currentDateTime,
      updatedBy: currentUser,
    };

    if (!currentEditedId) {
      processedFormData.createdAt = currentDateTime;
      processedFormData.createdBy = currentUser;
    }

    try {
      const response = await dispatch(
        currentEditedId
          ? editProduct({
              id: currentEditedId,
              formData: processedFormData,
            })
          : addNewProduct(processedFormData)
      ).unwrap();

      if (response.success) {
        toast({
          title: "Success",
          description: `Product ${
            currentEditedId ? "updated" : "added"
          } successfully!`,
        });
        dispatch(fetchAllProducts());
        resetForm();
        setOpenCreateProductsDialog(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${currentEditedId ? "update" : "add"} product`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await dispatch(deleteProduct(productId)).unwrap();
      if (response.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        });
        dispatch(fetchAllProducts());
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductsDialog(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <div>Loading products...</div>
        ) : productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          if (!open) {
            resetForm();
          }
          setOpenCreateProductsDialog(open);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full max-w-2xl bg-white p-5">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            {[0, 1, 2, 3].map((index) => (
              <Productimageupload
                key={index}
                imageNumber={index + 1}
                file={imageFiles[index]}
                setFile={(newFile) => {
                  const newFiles = [...imageFiles];
                  newFiles[index] = newFile;
                  setImageFiles(newFiles);
                }}
                uploadedImageUrl={
                  formData[`image${index + 1}`] || uploadedImageUrls[index]
                }
                setUploadedImageUrl={(url) => {
                  const newUrls = [...uploadedImageUrls];
                  newUrls[index] = url;
                  setUploadedImageUrls(newUrls);
                }}
                setImageLoadingState={(state) => {
                  const newStates = [...imageLoadingStates];
                  newStates[index] = state;
                  setImageLoadingStates(newStates);
                }}
                imageLoadingState={imageLoadingStates[index]}
              />
            ))}
          </div>
          <div className="py-6">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? "Update Product" : "Add Product"
              }
              formControls={addProductFormElements}
              isBtnDisabled={
                !isFormValid() || imageLoadingStates.some((state) => state)
              }
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Products;