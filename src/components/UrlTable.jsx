import toast from "react-hot-toast";

const UrlTable = ({ urls, onDelete, onEdit }) => {
  const copyToClipboard = async (shortCode) => {
    const shortUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Short URL copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Original URL</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Short Code</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Clicks</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {urls.map((url) => (
            <tr key={url._id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="max-w-md">
                    <a href={url.originalURL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-900 hover:text-blue-600 truncate block" title={url.originalURL}>
                      {url.originalURL}
                    </a>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <div
                  className="inline-flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-150 group"
                  onClick={() => copyToClipboard(url.shortCode)}
                  title="Click to copy"
                >
                  <span className="font-mono text-sm font-medium text-blue-700">{url.shortCode}</span>
                  <svg className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-900">{url.clicks.toLocaleString()}</span>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">
                  {new Date(url.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onEdit(url)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-150 flex items-center gap-1"
                    title="Edit URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(url.shortCode)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-150 flex items-center gap-1"
                    title="Delete URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
