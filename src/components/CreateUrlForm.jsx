import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createUrl } from "../api/url.api";

const CreateUrlForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      originalURL: data.originalURL,
      ...(data.code?.trim() ? { code: data.code.trim() } : {}),
    };

    try {
      await createUrl(payload);
      toast.success("Short URL created");
      onSuccess();
    } catch (err) {
      const res = err.response;

      if (res?.status === 429) {
        toast.error("Rate limit hit. Try again later.");
      } else if (res?.data?.errors?.length) {
        res.data.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(res?.data?.message || "Failed to create URL");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Original URL
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2.5 sm:p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          placeholder="https://example.com/very/long/url"
          {...register("originalURL", { required: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom short code (optional)
        </label>
        <input
          className="border border-gray-300 rounded-lg p-2.5 sm:p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          placeholder="my-custom-code"
          {...register("code")}
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty to generate automatically</p>
      </div>

      <button
        disabled={isSubmitting}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full py-2.5 sm:py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
      >
        {isSubmitting ? "Creating..." : "Create Short URL"}
      </button>
    </form>
  );
};

export default CreateUrlForm;
