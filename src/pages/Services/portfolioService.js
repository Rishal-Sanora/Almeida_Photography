import api from "./api";

// GET ALL PHOTOS
export const getPortfolio = async () => {
  const response = await api.get("/portfolio");
  return response.data;
};

// ADD PHOTO
export const addPhoto = async (photo) => {
  const response = await api.post("/portfolio", photo);
  return response.data;
};

// UPDATE PHOTO
export const updatePhoto = async (id, photo) => {
  const response = await api.put(`/portfolio/${id}`, photo);
  return response.data;
};

// DELETE PHOTO
export const deletePhoto = async (id) => {
  const response = await api.delete(`/portfolio/${id}`);
  return response.data;
};