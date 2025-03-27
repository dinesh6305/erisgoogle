import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
              
function AdminProductTile({ product,setCurrentEditedid,setFormData,setOpenCreateProductsDialog,handledelete}) {
    return (
        <Card className="w-full max-w-sm ax-auto">
            <div>
                <div className='relative'>
                    <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg'>
                    </img>

                </div>


                <CardContent>
                    <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${product?.salePrice > 0 ? "line-through" : ""
                                } text-lg font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold">${product?.salePrice}</span>
                        ) : null}
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button variant="black"
                        onClick={() => {
                            setOpenCreateProductsDialog(true);
                            setCurrentEditedid(product?._id);
                            setFormData(product);
                        }}
                    >
                        Edit
                    </Button >
                    <Button variant="black" onClick={() =>  handledelete(product?._id)}>Delete</Button>
                     
                   
                       
                    

                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;