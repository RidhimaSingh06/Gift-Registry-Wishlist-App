import api from './api';

export const getWishlistItems = async (wishlistId) => {
  const response = await api.get(`/items/wishlist/${wishlistId}`);
  return response.data;
};

export const createItem = async (itemData) => {
  const response = await api.post('/items', itemData);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/items/${id}`);
  return response.data;
};

export const reserveItem = async (id, visitorName) => {
  const response = await api.put(`/items/${id}/reserve`, { name: visitorName });
  return response.data;
};
