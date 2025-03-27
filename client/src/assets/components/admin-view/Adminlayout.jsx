import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import Adminheader from "./header";
import { useEffect } from "react";

function Adminlayout() {
    useEffect(() => {
        const outlets = document.querySelectorAll("main Outlet");
        console.log("Number of <Outlet /> components:", outlets.length);
    }, []);
    

    return (
        <div className="flex min-h-screen w-full">
          {/* admin sidebar */}
          <AdminSideBar />
          <div className="flex flex-1 flex-col">
            {/* admin header */}
            <Adminheader />
            <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      );
}

export default Adminlayout;
