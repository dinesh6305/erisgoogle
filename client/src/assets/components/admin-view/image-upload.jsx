import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Skeleton } from "../../components/ui/Skeleton";

export default function Productimageupload({
  file,
  setFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageNumber,
}) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      if (!droppedFile.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      setError(null);
      setFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setFile(null);
    setUploadedImageUrl("");
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      console.log(formData,"fromupload");

      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        console.log("Upload successful:", response.data.result.url);
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Failed to upload image");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (file) {
      uploadImageToCloudinary();
    }
  }, [file]);

  return (
    <div className="w-full mt-4">
      <label className="text-lg font-semibold mb-2 block">
        {imageNumber === 1
          ? "Primary Image *"
          : `Additional Image ${imageNumber}`}
      </label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${
          error ? "border-red-500" : ""
        }`}
      >
        <input
          id={`image-upload-${imageNumber}`}
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!uploadedImageUrl ? (
          <label
            htmlFor={`image-upload-${imageNumber}`}
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon
              className={`w-10 h-10 mb-2 ${
                error ? "text-red-500" : "text-muted-foreground"
              }`}
            />
            <span className="text-center">
              {imageNumber === 1
                ? "Upload primary image (required)"
                : "Upload additional image"}
            </span>
            {error && (
              <span className="text-sm text-red-500 mt-2 text-center">
                {error}
              </span>
            )}
          </label>
        ) : imageLoadingState ? (
          <div className="h-32 flex items-center justify-center flex-col">
            <Skeleton className="h-24 w-24" />
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={uploadedImageUrl}
                alt={`Product ${imageNumber}`}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium">
                  {imageNumber === 1 ? "Primary Image" : `Image ${imageNumber}`}
                </p>
                {file && (
                  <p className="text-xs text-gray-500 mt-1">{file.name}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove Image</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}