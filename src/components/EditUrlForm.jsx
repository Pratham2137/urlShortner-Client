import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateUrl } from "../api/url.api";

const EditUrlForm = ({ url, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      originalURL: url.originalURL,
      code: url.shortCode,
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      ...(data.originalURL !== url.originalURL && {
        originalURL: data.originalURL,
      }),
      ...(data.code !== url.shortCode && data.code && {
        code: data.code,
      }),
    };

    try {
      await updateUrl(url.shortCode, payload);
      toast.success("URL updated successfully");
      onSuccess();
    } catch (err) {
      const res = err.response;
      if (res?.data?.errors?.length) {
        res.data.errors.forEach((e) => toast.error(e.message));
      } else {
        toast.error(res?.data?.message || "Update failed");
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
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("originalURL")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Code
        </label>
        <input
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("code")}
        />
        <p className="text-xs text-gray-500 mt-1">Update the short code if needed</p>
      </div>

      <button
        disabled={isSubmitting}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isSubmitting ? "Updating..." : "Update URL"}
      </button>
    </form>
  );
};

export default EditUrlForm;
