import { API_BASE_URL } from "../../config";

function PortfolioCard({ photo, onClick, onDelete }) {
  const imageUrl = photo.image?.startsWith("/uploads") 
    ? `${API_BASE_URL}${photo.image}` 
    : photo.image;

  return (
    <div 
      onClick={() => onClick(photo)}
      className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden cursor-pointer hover:shadow-md hover:border-pink-300 transition-all duration-300 group"
    >
      <div className="overflow-hidden h-40 bg-gray-50 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={photo.category || "Portfolio Item"}
          className="w-full h-full object-contain transform group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-4 flex justify-between items-center">
        <p className="text-pink-500 text-xs font-medium uppercase tracking-widest mt-1">
          {photo.category}
        </p>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(photo._id);
            }}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete Photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default PortfolioCard;