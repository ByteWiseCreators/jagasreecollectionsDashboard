import axios from "axios";

// Products

export const getProducts = async () => {
  try {
    const res = await axios.get("/jc/products");
    return res.data.data.reverse();
  } catch (error) {
    return error.message;
  }
}

export const postProduct = async (data) => {
  try {
    const res = await axios.post("/jc/products", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const editProduct = async (id, data) => {
  try {
    const res = await axios.put(`/jc/products/${id}`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteProductImg = async (id, index) => {
  try {
    const res = await axios.delete(`/jc/products/image/${id}?index=${index}`);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const uploadeProductImg = async (id, imageData) => {
  try {
    console.log(id, ...imageData);
    const res = await axios.post(`/jc/products/image/${id}`, imageData);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`/jc/products/${id}`);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// Socials

export const updateSocials = async (data) => {
  try {
    const res = await axios.post("/jc/socials", data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// Offers

export const uploadeOfferImg = async (data) => {
  try {
    const res = await axios.post("/jc/offers", data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

export const deleteOfferImg = async (index) => {
  try {
    const res = await axios.delete(`/jc/offers/${index}`);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
};

/* ========================================================================================================== */
// policies

export const uploadMds = async (path, data) => {
  try {
    const res = await axios.post(`/jc/${path}`, data);
    return res.data.message;
  } catch (error) {
    return error.message;
  }
}

/* ========================================================================================================== */