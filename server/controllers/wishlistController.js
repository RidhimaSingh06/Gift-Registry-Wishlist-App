import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlists
// @route   GET /api/wishlists
// @access  Private
export const getWishlists = async (req, res) => {
  const wishlists = await Wishlist.find({ user: req.user._id });
  res.json(wishlists);
};

// @desc    Create a wishlist
// @route   POST /api/wishlists
// @access  Private
export const createWishlist = async (req, res) => {
  const { title, isPublic, description } = req.body;

  const wishlist = new Wishlist({
    user: req.user._id,
    title,
    isPublic,
    description
  });

  const createdWishlist = await wishlist.save();
  res.status(201).json(createdWishlist);
};

// @desc    Get single wishlist by ID
// @route   GET /api/wishlists/:id
// @access  Private (if private) or Public (if public)
export const getWishlistById = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);

  if (wishlist) {
    if (!wishlist.isPublic) {
      if (!req.user || wishlist.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to view this wishlist' });
      }
    }
    res.json(wishlist);
  } else {
    res.status(404).json({ message: 'Wishlist not found' });
  }
};

// @desc    Delete a wishlist
// @route   DELETE /api/wishlists/:id
// @access  Private
export const deleteWishlist = async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);

  if (wishlist) {
    if (wishlist.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Wishlist.deleteOne({ _id: wishlist._id });
    res.json({ message: 'Wishlist removed' });
  } else {
    res.status(404).json({ message: 'Wishlist not found' });
  }
};
