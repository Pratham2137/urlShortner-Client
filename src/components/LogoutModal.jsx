const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Confirm Logout</h2>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-sm sm:text-base text-gray-600">
            Are you sure you want to logout? You will need to login again to access
            your account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm sm:text-base order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm sm:text-base order-1 sm:order-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
