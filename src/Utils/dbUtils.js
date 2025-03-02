import axios from "axios";
const resourceURL = "https://api-g4fh4sabra-uc.a.run.app";

// Products

export const getProducts = async () => {
  try {
    const res = await axios.get(`${resourceURL}/api/jc/products`);
    return res.data.data.reverse();
  } catch (error) {
    return error.message;
  }
};

export const postProduct = async (data) => {
  try {
    const res = await axios.post(`${resourceURL}/api/jc/products`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const editProduct = async (id, data) => {
  try {
    const res = await axios.put(`${resourceURL}/api/jc/products/${id}`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteProductImg = async (id, index) => {
  try {
    const res = await axios.delete(
      `${resourceURL}/api/jc/products/image/${id}?index=${index}`
    );
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const uploadeProductImg = async (id, imageData) => {
  try {
    const res = await axios.post(
      `${resourceURL}/api/jc/products/image/${id}`,
      imageData
    );
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${resourceURL}/api/jc/products/${id}`);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// Socials

export const updateSocials = async (data) => {
  try {
    const res = await axios.post(`${resourceURL}/api/jc/socials`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// Offers

export const uploadeOfferImg = async (data) => {
  try {
    const res = await axios.post(`${resourceURL}/api/jc/offers`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteOfferImg = async (index) => {
  try {
    const res = await axios.delete(`${resourceURL}/api/jc/offers/${index}`);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// policies

export const uploadMds = async (path, data) => {
  try {
    const res = await axios.post(`${resourceURL}/api/jc/${path}`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
