import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full ">
      <div className="hidden lg:flex items-center justify-center bg-gray-900 w-1/2">
        <div className="max-w-md space-y-6 text-center text-primary">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to Eris 
          </h1>
          <p className="text-lg text-gray-300">
            "Experience the ultimate sound journey with Eris!"
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-gray-800">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
