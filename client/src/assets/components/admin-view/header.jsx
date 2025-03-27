import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import{logoutUser} from "../../../store/auth-slice/index"

function Adminheader({setOpen}) {
  const dispatch=useDispatch()
  function handleLogout() {
    console.log("Logging out...");
    dispatch(logoutUser());


    // Add logout logic here (e.g., clearing session, redirecting)
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b">
      {/* Menu Toggle Button for Mobile */}
      <button className="lg:hidden sm:block" onClick={()=>setOpen(true)}>
       
        <span className="sr-only"></span>
      </button>

      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Adminheader;
