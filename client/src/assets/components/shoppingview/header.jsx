import React, { useState, useEffect } from "react";
import { HousePlug, Menu, ShoppingCart, UserCog, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { shoppingViewHeaderMenuItems } from "../../../config/index";
import { logoutUser } from '../../../store/auth-slice';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

function HeaderRightContent({ handleLogout, cartItemsCount }) {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
            {/* Shopping Cart - Only in Desktop Mode */}
            <Button
                variant="outline"
                size="icon"
                className="lg:block hidden bg-white p-2 shadow-md rounded-full relative"
                onClick={() => navigate("/shop/cart")}
            >
                <ShoppingCart className="w-6 h-6 " />
                {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                    </span>
                )}
                <span className="sr-only">User Cart ({cartItemsCount} items)</span>
            </Button>

            <DropdownMenu >
                <DropdownMenuTrigger asChild >
                    <Avatar className="w-10 h-10 rounded-full border-2 border-gray-300 lg:block hidden ">
                        <AvatarImage
                            src="/path-to-user-image.jpg"
                            alt="User Avatar"
                            className="w-full h-full rounded-full"
                        />
                        <AvatarFallback className="w-full h-full flex items-center justify-center rounded-full bg-black text-purple-400 font-extrabold">
                            {user?.userName ? user.userName[0].toUpperCase() : "?"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    className="w-56  shadow-lg rounded-lg p-3 border border-gray-200 cursor-pointer hidden sm:block bg-gray-800 text-white"
                >
                    <DropdownMenuLabel className="text-sm font-semibold  text-white px-2 py-1 cursor-pointer">
                        Logged in as <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-sm font-semibold ">{user?.userName ? user.userName.toUpperCase() : "Guest"}</span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="border-t border-gray-200 my-2  text-white" />

                    <DropdownMenuItem
                        onClick={() => navigate('/shop/account')}
                        className="p-2 flex items-center gap-2  hover:bg-purple-600 rounded-md lg:cursor-pointer transition-all text-white"
                    >
                        <UserCog className="h-5 w-5 text-white" />
                        <span className="text-sm">Account</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-t border-gray-200 my-2" />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="p-2 flex items-center gap-2 text-white hover:bg-purple-600 rounded-md lg:cursor-pointer transition-all"
                    >
                        <LogOut className="h-5 w-5 text-white" />
                        <span className="text-sm">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function MenuItem({ onLinkClick, handleLogout, isAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current route
    const categoryItems = shoppingViewHeaderMenuItems.filter(item => ["Earphones", "Earbuds", "Neckband", "Headphone"].includes(item.label));
    const otherItems = shoppingViewHeaderMenuItems.filter(item => !["Earphones", "Earbuds", "Neckband", "Headphone"].includes(item.label));

    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {shoppingViewHeaderMenuItems && shoppingViewHeaderMenuItems.length > 0 ? (
                <>
                    {otherItems.map((item) => (
                        <Link
                            className={`font-bold text-1xl hover:text-purple-400 ${
                                location.pathname === item.path ? "text-purple-700" : "text-white"
                            }`}
                            key={item.id}
                            to={item.path}
                            onClick={onLinkClick}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {/* Categories dropdown for large screens */}
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button className="font-bold text-white text-1xl  items-center gap-1 hover:text-purple-400 hidden lg:flex">
                                Categories
                                <FiChevronDown className="text-lg" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 bg-gray-800 shadow-lg rounded-lg p-3 cursor-pointer">
                            {categoryItems.map((item) => (
                                <DropdownMenuItem
                                    key={item.id}
                                    onClick={() => {
                                        console.log(`Navigating to ${item.path}`);
                                        navigate(item.path);
                                        onLinkClick && onLinkClick();
                                    }}
                                    className={`p-2 flex items-center gap-4 rounded-md lg:cursor-pointer transition-all hover:border-1 mt-1 ${
                                        location.pathname === item.path ? "bg-purple-700 text-white" : "text-white"
                                    }`}
                                >
                                    {item.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Separate items for small screens */}
                    {categoryItems.map((item) => (
                        <Link
                            className={`font-bold text-1xl hover:text-purple-400 lg:hidden ${
                                location.pathname === item.path ? "text-purple-700" : "text-white"
                            }`}
                            key={item.id}
                            to={item.path}
                            onClick={onLinkClick}
                        >
                            {item.label}
                        </Link>
                    ))}
                    
                    {/* Account/Login buttons for small screens */}
                    {isAuthenticated ? (
                        <>
                            <button  
                                className="p-2 flex items-center gap-2 hover:bg-purple-700 rounded-md lg:cursor-pointer transition-all lg:hidden group font-bold text-white"
                                onClick={() => { navigate('/shop/account'); onLinkClick && onLinkClick(); }}
                            >
                                <UserCog className="h-5 w-5 text-white" />
                                <span className="text-sm">Account</span>
                            </button>
                            <button  
                                className="p-2 flex items-center gap-2 hover:bg-purple-700 rounded-md lg:cursor-pointer transition-all lg:hidden group font-bold text-white"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5 text-white" />
                                <span className="text-sm">Logout</span>
                            </button>
                        </>
                    ) : (
                        <button  
                            className="p-2 flex items-center gap-2 hover:bg-purple-700 rounded-md lg:cursor-pointer transition-all lg:hidden group font-bold text-white"
                            onClick={() => { navigate('/auth/login'); onLinkClick && onLinkClick(); }}
                        >
                            <FiUser className="h-5 w-5 text-white" />
                            <span className="text-sm">Login</span>
                        </button>
                    )}
                </>
            ) : (
                <p className="text-red-500">No menu items available</p>
            )}
        </nav>
    );
}

function Shoppingheader() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const cartState = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [cartItemsCount, setCartItemsCount] = useState(0);

    // Calculate total cart items with a safer approach
    useEffect(() => {
        if (cartState && cartState.items) {
            console.log(cartState.items,"dmjjn");
            const count = cartState.items.reduce((total, item) => {
                return total + (parseInt(item.quantity) || 1);
            }, 0);
            setCartItemsCount(count);
            console.log("Cart items count updated:", count);
        } else {
            setCartItemsCount(0);
        }
    }, [cartState, cartState?.items, isAuthenticated, user]);

    function handleLogout() {
        console.log("Logging out...");
        dispatch(logoutUser());
        // After logout, reset cart count to 0 immediately for better UX
        setCartItemsCount(0);
    }

    return (
        <header
            className="top-0 z-40 w-full border-b py-3 fixed"
            style={{ background: "rgba(32, 42, 60, 0.7)", backdropFilter: "blur(10px)" }}
        >
            <div className="relative h-16 flex items-center justify-between px-4 md:px-6">
                {/* Logo (Top-Left) */}
                <Link to="/shop/home" className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-4xl font-bold ">Eris</span>
                </Link>

                {/* Mobile Menu Button (Top-Right) */}
                <div className="lg:hidden absolute right-4 top-4 flex items-center gap-4">
                    {isAuthenticated ? (
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="relative"
                            onClick={() => navigate("/shop/cart")}
                        >
                            <ShoppingCart className="w-6 h-6 text-white" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Button>
                    ) : (
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-purple-600 text-white"
                            onClick={() => navigate("/auth/login")}
                        >
                            <FiUser className="w-6 h-6" />
                        </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
                        <FiMenu style={{ color: 'white' }} />
                    </Button>
                </div>

                {/* Mobile Menu Overlay */}
                {open && (
                    <div className="fixed inset-0 bg-opacity-50 z-40">
                        <div className="fixed top-0 right-0 w-full max-w-xs h-screen overflow-auto p-4 bg-gray-900 z-50">
                            {/* Close Button */}
                            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setOpen(false)}>
                                X
                            </button>
                            <MenuItem 
                                onLinkClick={() => setOpen(false)} 
                                handleLogout={handleLogout} 
                                isAuthenticated={isAuthenticated}
                            />
                        </div>
                    </div>
                )}

                <div className="hidden lg:block mx-auto">
                    <MenuItem 
                        handleLogout={handleLogout} 
                        isAuthenticated={isAuthenticated}
                    />
                </div>

                {/* Conditional rendering based on authentication state */}
                {isAuthenticated ? (
                    <HeaderRightContent handleLogout={handleLogout} cartItemsCount={cartItemsCount} />
                ) : (
                    <div className="hidden lg:block">
                        <Button 
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                            onClick={() => navigate("/auth/login")}
                        >
                            Login
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Shoppingheader;