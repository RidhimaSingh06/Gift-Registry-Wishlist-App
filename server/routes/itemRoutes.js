import express from 'express';
import { getWishlistItems, createItem, deleteItem, reserveItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createItem);

router.route('/wishlist/:id')
  .get(getWishlistItems);

router.route('/:id')
  .delete(protect, deleteItem);

router.route('/:id/reserve')
  .put(reserveItem);

export default router;
