import api from './api';

export const getUserWishlists = async () => {
  const response = await api.get('/wishlists');
  return response.data;
};

export const createWishlist = async (wishlistData) => {
  const response = await api.post('/wishlists', wishlistData);
  return response.data;
};

export const getWishlistById = async (id) => {
  const response = await api.get(`/wishlists/${id}`);
  return response.data;
};

export const deleteWishlist = async (id) => {
  const response = await api.delete(`/wishlists/${id}`);
  return response.data;
};
