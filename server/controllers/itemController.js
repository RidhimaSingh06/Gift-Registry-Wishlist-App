import Item from '../models/Item.js';
import Wishlist from '../models/Wishlist.js';

// @desc    Get items for a wishlist
// @route   GET /api/items/wishlist/:id
// @access  Public (if wishlist is public)
export const getWishlistItems = async (req, res) => {
  const items = await Item.find({ wishlist: req.params.id });
  res.json(items);
};

// @desc    Add item to wishlist
// @route   POST /api/items
// @access  Private
export const createItem = async (req, res) => {
  const { wishlistId, name, productLink, description } = req.body;

  const wishlist = await Wishlist.findById(wishlistId);

  if (wishlist && wishlist.user.toString() === req.user._id.toString()) {
    const item = new Item({
      wishlist: wishlistId,
      name,
      productLink,
      description
    });
    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } else {
    res.status(401).json({ message: 'Not authorized or wishlist not found' });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    const wishlist = await Wishlist.findById(item.wishlist);
    if (wishlist && wishlist.user.toString() === req.user._id.toString()) {
      await Item.deleteOne({ _id: item._id });
      res.json({ message: 'Item removed' });
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// @desc    Reserve an item
// @route   PUT /api/items/:id/reserve
// @access  Public
export const reserveItem = async (req, res) => {
  const { name } = req.body; // Visitor name
  const item = await Item.findById(req.params.id);

  if (item) {
    if (item.status === 'taken') {
      return res.status(400).json({ message: 'Item already reserved' });
    }

    item.status = 'taken';
    item.reservedBy = {
      name: name || 'Anonymous',
    };

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};
