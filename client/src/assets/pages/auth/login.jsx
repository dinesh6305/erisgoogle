import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginFormControls } from "../../../config";
import CommonForm from "../../components/common/CommonForm"; 
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/auth-slice";
import { toast } from "react-hot-toast";
import GoogleAuth from "../../components/auth/GoogleAuth";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success("Login Success");
      } else {
        toast.error("Login failed, please try again");
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6  rounded-lg shadow-md bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Login Here</h1>
        <p className="mt-2 text-gray-600">
          <Link className="font-medium text-purple-700 hover:underline" to="/auth/register">
            Sign Up
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <span className="flex justify-center">
        OR
      </span>

      <div className="text-center">
        <GoogleAuth />
      </div>
    </div>
  );
}

export default AuthLogin;