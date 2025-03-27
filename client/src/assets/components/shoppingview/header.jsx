import React, { useState } from "react";
import { HousePlug, Menu, ShoppingCart, UserCog, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'; // Import FiChevronDown
import { shoppingViewHeaderMenuItems } from "../../../config/index";
console.log(shoppingViewHeaderMenuItems.path);
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

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        console.log("Logging out...");
        dispatch(logoutUser());

        // Add logout logic here (e.g., clearing session, redirecting)
    }

    return (
        <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
            {/* Shopping Cart - Only in Desktop Mode */}
            <Button
                variant="outline"
                size="icon"
                className="lg:block hidden bg-white p-2 shadow-md rounded-full"
            >
                <ShoppingCart className="w-6 h-6" />
                <span className="sr-only">User Cart</span>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-10 h-10 rounded-full border-2 border-gray-300 lg:block hidden">
                        <AvatarImage
                            src="/path-to-user-image.jpg"
                            alt="User Avatar"
                            className="w-full h-full rounded-full"
                        />
                        <AvatarFallback className="w-full h-full flex items-center justify-center rounded-full bg-black text-purple-400 font-extrabold">
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    className="w-56 bg-white shadow-lg rounded-lg p-3 border border-gray-200 cursor-pointer hidden sm:block"
                >
                    <DropdownMenuLabel className="text-sm font-semibold text-gray-700 px-2 py-1 cursor-pointer">
                        Logged in as <span className="text-blue-600">{user?.userName.toUpperCase()}</span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="border-t border-gray-200 my-2" />

                    <DropdownMenuItem
                        onClick={() => navigate('/shop/account')}
                        className="p-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-md lg:cursor-pointer transition-all"
                    >
                        <UserCog className="h-5 w-5 text-gray-500" />
                        <span className="text-sm">Account</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="border-t border-gray-200 my-2" />

                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="p-2 flex items-center gap-2 text-red-600 hover:bg-red-100 rounded-md lg:cursor-pointer transition-all"
                    >
                        <LogOut className="h-5 w-5 text-red-500" />
                        <span className="text-sm">Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function MenuItem({ onLinkClick }) {
    const navigate = useNavigate();
    const categoryItems = shoppingViewHeaderMenuItems.filter(item => ["Earphones", "Headphones"].includes(item.label));
    const otherItems = shoppingViewHeaderMenuItems.filter(item => !["Earphones", "Headphones"].includes(item.label));

    return (
        <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
            {shoppingViewHeaderMenuItems && shoppingViewHeaderMenuItems.length > 0 ? (
                <>
                    {otherItems.map((item) => (
                        <Link className="font-bold text-white text-1xl hover:text-purple-400" key={item.id} to={item.path} onClick={onLinkClick}>
                            {item.label}
                        </Link>
                    ))}
                    {/* Categories dropdown for large screens */}
                    <DropdownMenu >
                    <DropdownMenuTrigger asChild>
  <Button className="font-bold text-white text-1xl flex items-center gap-1 hover:text-purple-400 sm:hidden lg:flex">
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
                                    className="p-2 flex items-center gap-4 text-white rounded-md lg:cursor-pointer transition-all hover:border-1 mt-1"
                                >
                                    {item.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* Separate items for small screens */}
                    {categoryItems.map((item) => (
                        <Link className="font-bold text-white text-1xl hover:text-purple-400 lg:hidden" key={item.id} to={item.path} onClick={onLinkClick}>
                            {item.label}
                        </Link>
                    ))}
                </>
            ) : (
                <p className="text-red-500">No menu items available</p>
            )}
        </nav>
    );
}

function Shoppingheader() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(user);
    const [open, setOpen] = useState(false);

    return (
        <header className="top-0 z-40 w-full border-b bg-gray-900 py-4 fixed">
            <div className="relative h-16 flex items-center justify-between px-4 md:px-6">
                {/* Logo (Top-Left) */}
                <Link to="/shop/home" className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent text-4xl font-bold ">Eris</span>
                </Link>

                {/* Mobile Menu Button (Top-Right) */}
                <div className="lg:hidden absolute right-4 top-4">
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
                            <MenuItem onLinkClick={() => setOpen(false)} />
                        </div>
                    </div>
                )}

                <div className="hidden lg:block mx-auto">
                    <MenuItem />
                </div>

                {isAuthenticated && <HeaderRightContent />}
            </div>
        </header>
    );
}

export default Shoppingheader;