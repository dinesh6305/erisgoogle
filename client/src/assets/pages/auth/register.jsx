import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../../store/auth-slice";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "", // Static field for client-side validation
};

function Authregister() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Client-side validation for matching passwords
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      setLoading(true);

      try {
        const { confirmPassword, ...payload } = formData; // Exclude confirmPassword before dispatching
        await dispatch(registerUser(payload)).unwrap();
        toast.success("Registration successful! Redirecting...");
        navigate("/auth/login");
      } catch (error) {
        toast.error(error.message || "Registration failed.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, formData, navigate]
  );

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6 border rounded-lg shadow-md  bg-gray-900 text-white">
      <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-white">Sign Up Here</h1>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h1>
        <p className="mt-2 text-white">
          Already have an account?{" "}
          <Link className="font-medium text-purple-700 hover:underline" to="/auth/login">
            Log in
          </Link>
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium">UserName</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium ">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter password"
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="absolute top-10 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium ">Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Confirm password"
            required
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            className="absolute top-10 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-700 text-white font-medium py-2 rounded-md transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-800"
          }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Authregister;
