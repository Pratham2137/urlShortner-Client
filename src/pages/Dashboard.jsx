import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { deleteUrl, fetchUrls } from "../api/url.api";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";
import UrlTable from "../components/UrlTable";
import { useDebounce } from "../hooks/useDebounce";
import Modal from "../components/Modal";
import CreateUrlForm from "../components/CreateUrlForm";
import EditUrlForm from "../components/EditUrlForm";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [isActive, setIsActive] = useState("true");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  const [editingUrl, setEditingUrl] = useState(null);

  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const loadUrls = async () => {
    setLoading(true);
    try {
      console.log(debouncedSearch);

      const res = await fetchUrls({
        page,
        limit: 10,
        search: debouncedSearch || undefined,
        sort,
        isActive,
      });
      setUrls(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      const data = err.response?.data;

      if (err.response?.status === 429) {
        toast.error(`Too many requests. Try again in ${data.retryAfter}s`);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, [page, debouncedSearch, sort, isActive]);

  const openDeleteModal = (shortCode) => {
    setUrlToDelete(shortCode);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUrl(urlToDelete);
      toast.success("URL deleted");
      loadUrls();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete URL");
    } finally {
      setIsDeleteModalOpen(false);
      setUrlToDelete(null);
    }
  };

  const SkeletonRow = () => (
    <div className="animate-pulse h-10 bg-gray-200 rounded mb-2" />
  );

  // Calculate stats
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const activeUrls = urls.filter(url => url.isActive).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor your short URLs</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Short URL
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total URLs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {pagination?.total || 0}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clicks</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {totalClicks.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active URLs</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {activeUrls}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-62.5">
              <div className="relative">
                <input
                  className="border border-gray-300 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search by URL or short code..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setPage(1);
                    }}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
            </div>

            {/* Active filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <select
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={isActive}
                onChange={(e) => {
                  setIsActive(e.target.value);
                  setPage(1);
                }}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* URLs Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Short URL"
        >
          <CreateUrlForm
            onSuccess={() => {
              setIsModalOpen(false);
              loadUrls();
            }}
          />
        </Modal>

          {loading ? (
            <div className="p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : urls.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No URLs found</h3>
              <p className="text-gray-500 mb-6">Create your first short URL to get started</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Short URL
              </button>
            </div>
          ) : (
            <UrlTable
              urls={urls}
              onDelete={openDeleteModal}
              onEdit={setEditingUrl}
            />
          )}
        </div>

        {pagination && (
          <Pagination pagination={pagination} onPageChange={setPage} />
        )}

        <Modal
          isOpen={!!editingUrl}
          onClose={() => setEditingUrl(null)}
          title="Edit URL"
        >
          {editingUrl && (
            <EditUrlForm
              url={editingUrl}
              onSuccess={() => {
                setEditingUrl(null);
                loadUrls();
              }}
            />
          )}
        </Modal>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setUrlToDelete(null);
          }}
          title="Delete URL"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this short URL? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUrlToDelete(null);
                }}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-150"
              >
                Delete URL
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
