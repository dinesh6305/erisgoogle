import { useState } from "react";
import {
  BadgeCheck,
  LayoutDashboard,
  ShoppingBasket,
  Menu,
  X,
  ChartLine,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/product",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/order",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false); // Close sidebar in mobile view
          }}
          className="flex cursor-pointer text-lg items-center gap-2 rounded-md px-3 py-2 text-gray-600 hover:bg-gray-200 hover:text-black"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Sidebar Button */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 bg-gray-800 text-white p-2 rounded-md"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        } lg:hidden`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r p-6 transition-transform transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } z-50 lg:hidden`}
      >
        <button
          className="absolute top-5 right-5 text-gray-600"
          onClick={() => setOpen(false)}
        >
          <X size={24} />
        </button>
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartLine size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-white p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartLine size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
}

export default AdminSideBar;
