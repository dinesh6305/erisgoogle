import { useCallback, useState } from "react";
import { useDispatch } from "react-redux"; 
import { useNavigate, Link } from "react-router-dom"; 
import { registerUser } from "../../../store/auth-slice"; 
import { toast } from "react-hot-toast"; 

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Authregister() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      
      try {
        await dispatch(registerUser(formData)).unwrap();
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
    <div className="mx-auto w-full max-w-md space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h1>
        <p className="mt-2 text-gray-600">
          Already have an account?{" "}
          <Link className="font-medium text-blue-600 hover:underline" to="/auth/login">
            Log in
          </Link>
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">UserName</label>
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
          <label className="block text-sm font-medium text-gray-700">Email</label>
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

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-medium py-2 rounded-md transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Authregister;
