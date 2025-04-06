import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

function AdminProductTile({ product, setCurrentEditedId, setFormData, setOpenCreateProductsDialog, handleDelete }) {
    console.log("Product Image URL:", product?.image1); // Debugging log

    return (
        <Card className="w-full max-w-sm mx-auto">
            <div className="relative">
                <img
                    src={product?.image1}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                />
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                <div className="flex justify-between items-center mb-2">
                    <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                        ${product?.price}
                    </span>
                    {product?.salePrice > 0 && (
                        <span className="text-lg font-bold">${product?.salePrice}</span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button
                    variant="black"
                    onClick={() => {
                        setOpenCreateProductsDialog(true);
                        setCurrentEditedId(product?._id);
                        setFormData(product);
                    }}
                >
                    Edit
                </Button>
                <Button variant="black" onClick={() => handleDelete(product?._id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;