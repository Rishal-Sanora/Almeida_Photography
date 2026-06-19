import { useState, useEffect } from "react";
import api from "../../services/api";
import { getServices } from "../../services/serviceService";
import { toast } from "react-toastify";

function UploadPhotoForm({ fetchPhotos }) {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services for categories:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      toast.error("Please select at least one image");
      return;
    }
    
    if (!category.trim()) {
      toast.error("Please enter or select a category");
      return;
    }

    const formData = new FormData();
    formData.append("category", category.trim());
    
    // Append all selected files under the 'images' key
    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    try {
      await api.post("/upload/portfolio", formData);
      toast.success("Photos Uploaded Successfully");
      fetchPhotos();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading photos. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Category (Select or Type New)"
          list="category-options"
          className="w-full bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <datalist id="category-options">
          {services.map((service) => (
            <option key={service._id || service.title} value={service.title} />
          ))}
        </datalist>
      </div>

      <input
        type="file"
        multiple
        className="w-full bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
        onChange={(e) => setImages(e.target.files)}
      />

      <div className="flex justify-end pt-4">
        <button
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition"
        >
          Upload Photos
        </button>
      </div>
    </form>
  );
}

export default UploadPhotoForm;