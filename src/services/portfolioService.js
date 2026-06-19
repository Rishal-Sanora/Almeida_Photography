import api from "./api";


// GET
export const getPortfolio =
async()=>{

const response =
await api.get(
"/portfolio"
);

return response.data;

};


// ADD
export const addPortfolio =
async(photo)=>{

const response =
await api.post(
"/portfolio",
photo
);

return response.data;

};


// DELETE
export const deletePortfolio =
async(id)=>{

const response =
await api.delete(
`/portfolio/${id}`
);

return response.data;

};