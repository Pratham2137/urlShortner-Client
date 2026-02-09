import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/user/login", data);
      await login(res.data.accessToken);
      navigate("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl sm:text-2xl px-3 sm:px-4 py-1.5 sm:py-2 rounded">
              LS
            </div>
            <span className="font-bold text-2xl sm:text-3xl">LinkSnip</span>
          </div>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back! Login to your account</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-4 sm:space-y-5"
        >
          <h1 className="text-xl sm:text-2xl font-bold text-center">Login</h1>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="border border-gray-300 w-full p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="border border-gray-300 w-full p-2.5 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>

          <button
            className={`w-full py-2.5 sm:py-3 text-white rounded-lg font-semibold transition text-sm sm:text-base
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
