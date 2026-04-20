import express from 'express';
import { getWishlists, createWishlist, getWishlistById, deleteWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getWishlists)
  .post(protect, createWishlist);

router.route('/:id')
  .get(getWishlistById) // Can be public depending on logic
  .delete(protect, deleteWishlist);

export default router;
