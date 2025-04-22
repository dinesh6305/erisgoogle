import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Minus, Plus } from "lucide-react";

import { useToast } from "../../hooks/useToast";
import {
  deleteCartItem,
  fetchCartItems,
  updateCartItemQuantity,
} from "../../../store/shop/cart-slice";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { cart, items, isLoading, error } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [deletingItemIds, setDeletingItemIds] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    if (user.role === "admin") {
      navigate("/admin/dashboard");
    }

    if (user?.id) {
      dispatch(fetchCartItems(user.id));
      console.log("Navigation State:", {
        timestamp: "2025-04-02 18:36:10",
        userLogin: "dinesh6305",
      });
    }
  }, [dispatch, user, isAuthenticated, navigate]);

  console.log(items, "items");
  console.log(cart, "cart");
  console.log(error, "error");

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

      console.log("Quantity Change Result:", result);

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

      console.log("Attempting to delete item:", { userId: user.id, itemId });

      const result = await dispatch(
        deleteCartItem({
          userId: user.id,
          itemId,
        })
      ).unwrap();

      console.log("Remove Item Result:", result);

      if (result.success) {
        toast({
          description: "Item removed from cart",
        });
        // Refresh cart data
        dispatch(fetchCartItems(user.id));
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
  console.log(items,"cart")
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

  const handleCheckout = () => {
    navigate("/shop/checkout", {
      state: {
        specialInstructions,
        promoCode: promoCode.trim() || null,
      },
    });
  };

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-black h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black h-screen">
      
      <div className="mt-19">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-medium text-white mb-8">Error</h1>
        <div className="text-center">
          <p className="text-white mb-4">{error}</p>
        </div>
      </div>
      </div>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="bg-black h-screen ">
      <div className=" mt-19 bg-gray-700 p-6 lg:w-full">
        <h1 className="text-2xl font-medium text-white mb-8 text-center">My Cart</h1>
        <div className="text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-white mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/shop/listing")}
            className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 cursor-pointer transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <div className="mt-19 bg-black ">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl font-medium text-white mb-8">My Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6 font-lato">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 bg-gray-900 shadow-sm cursor-pointer"
                  onClick={() => navigate(`/product/${item.productId._id}`)}
                >
                  <div className="text-md font-medium text-white playfair">
                    {capitalizeFirstLetter(item.productType)}
                  </div>
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.productName}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-white playfair">
                          {item.productName}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item._id);
                          }}
                          disabled={deletingItemIds.has(item._id)}
                          className={`text-white hover:text-red-500 transition-colors ${
                            deletingItemIds.has(item._id)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between flex-col items-center mt-4">
                        <div className="flex items-center gap-3 border rounded-lg p-1 bg-slate-800">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(
                                item._id,
                                item.quantity - 1,
                                item.quantity
                              );
                            }}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed bg-purple-900"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-white ">
                            {item.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(
                                item._id,
                                item.quantity + 1,
                                item.quantity
                              );
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-purple-900"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-medium text-md text-white">
                          ₹{(item.price ?? 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 bg-gray-900 shadow-sm sticky top-4">
                <h2 className="text-xl font-medium mb-4 text-white">Order Summary</h2>

                <div className="space-y-3 mb-6 font-lato">
                  <div className="flex justify-between text-white">
                    <span>Subtotal ({cart?.totalItems} items)</span>
                    <span>₹{cart?.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
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

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-medium text-lg text-white">
                    <span>Total</span>
                    <span className="font-lato">
                      ₹{cart?.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    (Including all applicable taxes)
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special instructions for your order?"
                      className="w-full border rounded-lg p-2 text-sm min-h-[80px] resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      />
                      <button
                        onClick={handleApplyPromo}
                        disabled={applyingPromo || !promoCode.trim()}
                        className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-purple-900 text-white py-3 rounded-lg font-medium hover:bg-purple-950 transition-colors"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    
                    className="w-full border text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;