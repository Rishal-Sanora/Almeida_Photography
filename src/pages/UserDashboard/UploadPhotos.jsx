import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

function UploadPhotos() {
  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images || images.length === 0) return alert("Please select images.");

    const formData = new FormData();
    formData.append("eventName", eventName);
    
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/api/clientphotos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      alert("Photos uploaded successfully!");
      setEventName("");
      setImages(null);
    } catch (error) {
      console.error(error);
      alert("Error uploading photos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-yellow-500 mb-8">
        Upload Photos
      </h1>

      <form onSubmit={handleSubmit} className="bg-[#111] p-10 rounded-2xl space-y-5">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
          className="w-full p-4 bg-black rounded-xl text-white"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          required
          className="w-full p-4 bg-black rounded-xl text-white"
        />

        <button 
          type="submit" 
          disabled={loading}
          className="bg-yellow-500 px-8 py-3 rounded-xl text-black font-bold disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadPhotos;