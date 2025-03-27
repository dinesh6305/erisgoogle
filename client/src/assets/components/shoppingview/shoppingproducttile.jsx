import { Badge } from "../ui/Badge";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

function ShoppingProducttile({ product }) {
    return (
        <Card className="w-full max-w-sm mx-auto mt-2">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[300px] object-cover rounded-t-lg gap-2"
                    />
                    {product?.salePrice > 0 ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer">
                            sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[16px] text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-[16px] text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className={`${product?.salePrice > 0 ? "line-through" : ""
                                } text-lg font-semibold text-primary`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-semibold text-primary">
                                ${product?.salePrice}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="black" className="w-full">ADD TO CART</Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default ShoppingProducttile;