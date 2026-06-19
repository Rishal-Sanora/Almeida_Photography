import { useEffect, useState } from "react";
import * as PortfolioService from "../../services/portfolioService";
import UploadPhotoForm from "../../components/Forms/UploadPhotoForm";
import PortfolioCard from "../../components/Portfolio/PortfolioCard";
import AdminModal from "../../components/Modals/AdminModal";

function PortfolioManagement() {
  const [photos, setPhotos] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const data = await PortfolioService.getPortfolio();
      setPhotos(data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function removePhoto(id) {
    try {
      await PortfolioService.deletePortfolio(id);
      setSelectedPhoto(null);
      fetchPhotos();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl text-gray-900 font-bold uppercase tracking-widest">
          Portfolio <span className="text-pink-500">Management</span>
        </h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-pink-500 text-white font-bold px-6 py-3 rounded-full hover:bg-pink-600 shadow-md transition uppercase tracking-widest text-sm"
        >
          + Upload Photo
        </button>
      </div>

      <AdminModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload New Photo">
        <UploadPhotoForm 
          fetchPhotos={() => {
            fetchPhotos();
            setIsUploadModalOpen(false);
          }} 
        />
      </AdminModal>

      {/* View Photo Details Modal */}
      <AdminModal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} title="Photo Details">
        {selectedPhoto && (
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-6 shadow-md border border-gray-100">
              <img 
                src={selectedPhoto.image?.startsWith("/uploads") ? `http://localhost:5000${selectedPhoto.image}` : selectedPhoto.image} 
                alt={selectedPhoto.category || "Portfolio Item"} 
                className="w-full max-h-96 object-contain bg-gray-50"
              />
            </div>
            <p className="text-pink-500 font-medium uppercase tracking-widest mb-8">{selectedPhoto.category}</p>
            
            <div className="flex justify-center gap-4 border-t border-gray-100 pt-6">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-6 py-2 border border-gray-300 text-gray-600 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => removePhoto(selectedPhoto._id)}
                className="px-6 py-2 bg-red-500 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-red-600 transition shadow-md"
              >
                Delete Photo
              </button>
            </div>
          </div>
        )}
      </AdminModal>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
        {photos.length > 0 &&
          photos.map((photo) => (
            <PortfolioCard
              key={photo._id}
              photo={photo}
              onClick={(p) => setSelectedPhoto(p)}
            />
          ))}
        {photos.length === 0 && (
          <div className="col-span-full p-10 bg-white border border-pink-100 rounded-3xl text-center text-gray-400 shadow-sm">
            No photos found in portfolio.
          </div>
        )}
      </div>
    </section>
  );
}

export default PortfolioManagement;