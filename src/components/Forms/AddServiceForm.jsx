import { useState } from "react";
import { addService } from "../../services/serviceService";
import { toast } from "react-toastify";

function AddServiceForm({ fetchServices }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    duration: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image");
    
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("duration", formData.duration);
    data.append("description", formData.description);
    data.append("image", file);

    try {
      await addService(data);
      toast.success("Service added successfully!");
      fetchServices();
      setFormData({ title: "", price: "", duration: "", description: "" });
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g. 8k, 10k, or Depends)"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 2 hours)"
          value={formData.duration}
          onChange={handleChange}
          required
          className="bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          required
          accept="image/*"
          className="bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 transition"
        />
      </div>

      <textarea
        name="description"
        placeholder="Service Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full bg-white text-gray-800 p-4 rounded-xl outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 border border-pink-200 h-32 transition"
      />

      <div className="flex justify-end pt-4">
        <button
          disabled={loading}
          className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Service"}
        </button>
      </div>
    </form>
  );
}

export default AddServiceForm;