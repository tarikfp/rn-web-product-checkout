import axiosInstance from "./axios.instance";

const getAllProducts = async () => {
  const { data } = await axiosInstance.get("/products");
  return data;
};

const checkout = async (body) => {
  const { data } = await axiosInstance.post("/checkout", body);
  return data;
};

const promocode = async (body) => {
  const { data } = await axiosInstance.post("/promocode", body);
  return data;
};

export const ProductsAPI = {
  getAllProducts,
  checkout,
  promocode,
};
