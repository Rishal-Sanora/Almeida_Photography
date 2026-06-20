import { useEffect, useState } from "react";
import { getServices, deleteService } from "../../services/serviceService";
import AddServiceForm from "../../components/Forms/AddServiceForm";
import EditServiceForm from "../../components/Forms/EditServiceForm";
import AdminModal from "../../components/Modals/AdminModal";
import { API_BASE_URL } from "../../config";

function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchServices();
  }, []);

  const removeService = async (id) => {
    await deleteService(id);
    fetchServices();
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl text-pink-700 font-bold">
          Services Management
        </h1>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-400 text-pink-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 shadow-md transition"
        >
          + Add New Service
        </button>
      </div>

      <AdminModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Service">
        <AddServiceForm 
          fetchServices={() => {
            fetchServices();
            setIsAddModalOpen(false);
          }} 
        />
      </AdminModal>

      <AdminModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Service">
        <EditServiceForm 
          service={selectedService}
          fetchServices={() => {
            fetchServices();
            setIsEditModalOpen(false);
          }} 
        />
      </AdminModal>

      <div className="bg-white shadow-xl rounded-3xl mt-10 overflow-hidden border border-pink-100">
        <table className="w-full text-left">
          <thead className="bg-pink-50 text-pink-800">
            <tr>
              <th className="p-5 font-bold">Image</th>
              <th className="p-5 font-bold">Title</th>
              <th className="p-5 font-bold">Description</th>
              <th className="p-5 font-bold">Price</th>
              <th className="p-5 font-bold">Duration</th>
              <th className="p-5 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => {
              const imageUrl = service.image?.startsWith("/uploads") 
                ? `${API_BASE_URL}${service.image}` 
                : service.image;

              return (
                <tr key={service._id} className="border-b border-pink-50 hover:bg-pink-50/50 transition">
                  <td className="p-5">
                    {imageUrl ? (
                      <img src={imageUrl} alt={service.title} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                  </td>
                  <td className="p-5 text-gray-700 font-medium">{service.title}</td>
                  <td className="p-5 text-gray-500 text-sm max-w-xs truncate">{service.description}</td>
                  <td className="p-5 text-yellow-600 font-bold">₹{service.price}</td>
                  <td className="p-5 text-gray-600">{service.duration}</td>
                  <td className="p-5">
                    <div className="flex flex-row items-center gap-3">
                      <button 
                        onClick={() => openEditModal(service)}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition font-semibold whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeService(service._id)}
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-xl hover:bg-red-200 transition font-semibold whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {services.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-400">No services found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ServicesManagement;