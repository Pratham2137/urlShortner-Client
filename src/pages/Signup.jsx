import { useForm } from "react-hook-form";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/user/signup", data);
      await login(res.data.accessToken);
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      console.log(data);
      

      if (data?.errors?.length) {
        data.errors.forEach((e) => toast.error(e.message));
      } else if (data?.message) {
        toast.error(data.message);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-2xl px-4 py-2 rounded">
              LS
            </div>
            <span className="font-bold text-3xl">LinkSnip</span>
          </div>
          <p className="text-gray-600 mt-2">Create your account and start shortening URLs</p>
        </div>

        {/* Signup Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg rounded-lg p-8 space-y-5"
        >
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Create a password"
              {...register("password", { required: true })}
            />
          </div>

          <button
            className={`w-full py-3 text-white rounded-lg font-semibold transition
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}
            `}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
