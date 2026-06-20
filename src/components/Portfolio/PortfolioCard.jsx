import { API_BASE_URL } from "../../config";

function PortfolioCard({ photo, onClick }) {
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
      <div className="p-4">
        <p className="text-pink-500 text-xs font-medium uppercase tracking-widest mt-1">
          {photo.category}
        </p>
      </div>
    </div>
  );
}

export default PortfolioCard;