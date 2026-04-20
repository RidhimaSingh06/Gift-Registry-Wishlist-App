import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Wishlist',
  },
  name: {
    type: String,
    required: true,
  },
  productLink: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'taken'],
    default: 'available',
  },
  reservedBy: {
    name: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }
}, {
  timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
