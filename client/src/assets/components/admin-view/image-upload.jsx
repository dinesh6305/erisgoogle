import { useRef, useEffect } from "react";
import { Label } from "../ui/Label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/Skeleton"; // Import Skeleton component

function ProductImageupload({ imagefile, setimagefile, uploadedimageurl, setuploadedimageurl, setImageLoadingState, imageLoadingState,isEditMode }) {
    const inputRef = useRef(null);
    console.log(isEditMode)

    function handleDragover(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setimagefile(droppedFile);
    }

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setimagefile(selectedFile);
    }

    function handleremove() {
        setimagefile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        try {
            const data = new FormData();
            data.append("my_file", imagefile);
            const response = await axios.post(
                "http://localhost:5000/api/admin/products/upload-image",
                data
            );

            console.log(response, "response");

            if (response?.data?.success) {
                setuploadedimageurl(response.data.result.url);
            } else {
                console.error("Upload failed:", response.data);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imagefile && uploadedimageurl !== imagefile.name) {
            uploadImageToCloudinary();
        }
    }, [imagefile]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="text-lg font-semibold block mb-2">Upload Images</Label>
            <div 
                onDragOver={handleDragover} 
                onDrop={handleDrop} 
                className={`${isEditMode ? 'opacity-55' :  ""}border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition`}
            >
                <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    ref={inputRef} 
                    onChange={handleImageFileChange} 
                    disabled={isEditMode}
                />
 
                {!imagefile ? (
                    <Label htmlFor="image-upload" className={`${isEditMode ? 'cursor-not-allowed':''} flex flex-col items-center cursor-pointer`}>
                        <UploadCloudIcon className="w-10 h-10 text-gray-500 mb-2" />
                        <span className="text-gray-500 text-sm">Drag & Drop or Click to Upload</span>
                    </Label>
                ) : (
                    <>
                        {imageLoadingState ? (
                            <Skeleton className="w-40 h-10 mb-2" />
                        ) : (
                            <div className="flex items-center justify-between w-full bg-gray-100 p-2 rounded-lg">
                                <div className="flex items-center">
                                    <FileIcon className="w-6 h-6 text-blue-500 mr-2" />
                                    <p className="text-sm font-medium text-gray-700">{imagefile.name}</p>
                                </div>
                                <button 
                                    onClick={handleremove} 
                                    className="text-red-500 hover:text-red-700 p-1 rounded-full transition"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductImageupload;
