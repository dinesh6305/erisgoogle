import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";
import {
    addNewAddress,
    editaAddress,
    deleteAddress,
    fetchAllAddresses,
} from "../../../store/Address/Adress-slice";
import {
    updateCartItemQuantity,
    deleteCartItem,
} from "../../../store/shop/cart-slice";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Label } from "@/assets/components/ui/Label";
import CommonForm from "@/assets/components/common/commonform";
import { addressFormControls } from "@/config";
import { unwrapResult } from '@reduxjs/toolkit';
import { useToast } from "../../hooks/useToast";
import Checkout from "@/assets/components/checkout/checkout";

const initialAddressFormData = {
  name: "",
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function generateAddressLabels(address) {
    const excludedFields = ["_id", "userId", "createdAt", "updatedAt", "__v"];
    
    return (
        <div className="grid gap-4">
            {Object.keys(address).map((key) => (
                !excludedFields.includes(key) && (
                    <Label key={key}>
                        {`${capitalizeFirstLetter(key)}: ${address[key]}`}
                    </Label>
                )
            ))}
        </div>
    );
}

function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Shoppingcheckout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    
    const addressList = useSelector((state) => state.shopAddress.addressList);
    const { user } = useSelector((state) => state.auth);
    const { cart, items } = useSelector((state) => state.cart);
    
    const [formData, setFormData] = useState(initialAddressFormData);
    const [editid, setEditId] = useState(null);
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [applyingPromo, setApplyingPromo] = useState(false);
    const [deletingItemIds, setDeletingItemIds] = useState(new Set());

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchAllAddresses(user.id)).then((result) => {
                unwrapResult(result);
            });
        }
    }, [dispatch, user?.id]);

    async function handleManageAddress(event) {
        event.preventDefault();
        try {
            if (editid) {
                const resultAction = await dispatch(editaAddress({ userId: user.id, addressId: editid, formData }));
                unwrapResult(resultAction);
                setEditId(null);
            } else {
                const resultAction = await dispatch(addNewAddress({ ...formData, userId: user.id }));
                unwrapResult(resultAction);
            }
            dispatch(fetchAllAddresses(user.id));
            setFormData(initialAddressFormData);
        } catch (error) {
            console.error('Failed to manage address: ', error);
        }
    }

    function isFormValid() {
        return Object.keys(formData).every(key => formData[key] !== '');
    }
    
    // Cart functionality
    const handleQuantityChange = async (itemId, newQuantity, currentQuantity) => {
        if (newQuantity < 1 || newQuantity === currentQuantity) return;

        try {
            const result = await dispatch(
                updateCartItemQuantity({
                    userId: user.id,
                    itemId,
                    quantity: newQuantity,
                })
            ).unwrap();

            toast({
                description: "Cart updated successfully",
            });
        } catch (error) {
            console.error("Quantity Change Error:", error);
            toast({
                variant: "destructive",
                description: "Failed to update quantity",
            });
        }
    };

    const handleRemoveItem = async (itemId) => {
        if (deletingItemIds.has(itemId)) return;

        try {
            setDeletingItemIds((prev) => new Set([...prev, itemId]));

            const result = await dispatch(
                deleteCartItem({
                    userId: user.id,
                    itemId,
                })
            ).unwrap();

            if (result.success) {
                toast({
                    description: "Item removed from cart",
                });
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast({
                variant: "destructive",
                description: "Failed to remove item",
            });
        } finally {
            setDeletingItemIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };
    console.log(items,"check")

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        setApplyingPromo(true);
        try {
            // Implement promo code logic here
            toast({
                description: "Promo code applied successfully",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Invalid promo code",
            });
        } finally {
            setApplyingPromo(false);
        }
    };

    const handleContinueShopping = () => {
        navigate("/shop/");
    };

    const handleCheckout = () => {
        navigate("/shop/checkout", {
            state: {
                specialInstructions,
                promoCode: promoCode.trim() || null,
            },
        });
    };

    return (
        <div className="bg-black">
            <div className="mt-24">
                <div >
                    <h1 className="text-3xl font-bold text-center text-white">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-6 p-4">
                        <div className="w-full md:w-1/2">
                            <Checkout/>
                        </div>
                        
                        {/* Right side content - Cart Summary */}
                        <div className="w-full md:w-1/2">
                            <Card className="bg-gray-900 text-white">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {items && items.length > 0 ? (
                                        <>
                                            <div className="space-y-4 max-h-80 overflow-y-auto">
                                                {items.map((item) => (
                                                    <div key={item._id} className="flex gap-3 border-b border-gray-700 pb-3">
                                                        <img
                                                            src={item.image || "/placeholder-image.jpg"}
                                                            alt={item.productName}
                                                            className="w-20 h-20 object-cover rounded-md"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between">
                                                                <h3 className="font-medium text-white">
                                                                    {item.productName}
                                                                </h3>
                                                                <button
                                                                    onClick={() => handleRemoveItem(item._id)}
                                                                    disabled={deletingItemIds.has(item._id)}
                                                                    className={`text-white hover:text-red-500 transition-colors ${
                                                                        deletingItemIds.has(item._id) ? "opacity-50 cursor-not-allowed" : ""
                                                                    }`}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                            <div className="flex justify-between items-center mt-2">
                                                                <div className="flex items-center gap-2 border rounded-md p-1 bg-gray-800">
                                                                    <button
                                                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.quantity)}
                                                                        disabled={item.quantity <= 1}
                                                                        className="w-6 h-6 flex items-center justify-center rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed bg-purple-600 hover:bg-purple-700"
                                                                    >
                                                                        <Minus className="w-3 h-3" />
                                                                    </button>
                                                                    <span className="w-6 text-center font-medium text-white">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.quantity)}
                                                                        className="w-6 h-6 flex items-center justify-center rounded-md text-white bg-purple-600  hover:bg-purple-700"
                                                                    >
                                                                        <Plus className="w-3 h-3" />
                                                                    </button>
                                                                </div>
                                                                <p className="font-medium">₹{(item.price ?? 0).toFixed(2)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-3 mt-4">
                                                <div className="flex justify-between">
                                                    <span>Subtotal ({cart?.totalItems} items)</span>
                                                    <span>₹{cart?.totalAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Shipping</span>
                                                    <span>Calculated at checkout</span>
                                                </div>
                                                {promoCode && (
                                                    <div className="flex justify-between text-green-600">
                                                        <span>Discount</span>
                                                        <span>-₹0.00</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="border-t border-gray-700 pt-4">
                                                <div className="flex justify-between font-medium text-lg">
                                                    <span>Total</span>
                                                    <span>₹{cart?.totalAmount.toFixed(2)}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    (Including all applicable taxes)
                                                </p>
                                            </div>

                                            <div className="space-y-4 mt-6">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        Special Instructions
                                                    </label>
                                                    <textarea
                                                        value={specialInstructions}
                                                        onChange={(e) => setSpecialInstructions(e.target.value)}
                                                        placeholder="Any special instructions for your order?"
                                                        className="w-full border rounded-lg p-2 text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        Promo Code
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={promoCode}
                                                            onChange={(e) => setPromoCode(e.target.value)}
                                                            placeholder="Enter promo code"
                                                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white"
                                                        />
                                                        <button
                                                            onClick={handleApplyPromo}
                                                            disabled={applyingPromo || !promoCode.trim()}
                                                            className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={handleCheckout}
                                                    className="w-full  bg-purple-600  hover:bg-purple-700 text-white py-3 rounded-lg font-medium cursor-pointer transition-colors"
                                                >
                                                    Proceed to Checkout
                                                </button>

                                                <button
                                                    onClick={handleContinueShopping}
                                                    className="w-full border border-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Continue Shopping
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-8">
                                            <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                                            <p className="text-gray-400 mb-4">Your cart is empty</p>
                                            <button
                                                onClick={handleContinueShopping}
                                                className=" bg-purple-600  hover:bg-purple-700 text-white px-6 py-2 rounded-lg  transition-colors"
                                            >
                                                Start Shopping
                                            </button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shoppingcheckout;