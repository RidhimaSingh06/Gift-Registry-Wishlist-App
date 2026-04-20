import { Link } from 'react-router-dom';
import { Eye, Globe, Lock, Trash2, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteWishlist } from '../services/wishlistService';

const WishlistCard = ({ wishlist, onDelete }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this wishlist?')) {
      try {
        await deleteWishlist(wishlist._id);
        toast.success('Wishlist deleted!');
        onDelete(wishlist._id);
      } catch (error) {
        toast.error('Failed to delete wishlist');
      }
    }
  };

  const formattedDate = new Date(wishlist.createdAt).toLocaleDateString();

  return (
    <Link to={`/wishlist/${wishlist._id}`} className="block">
      <div className="glass-card p-6 h-full flex flex-col group relative">
        {/* Glow effect blob behind the card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-accent-light rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 z-0"></div>
        
        <div className="relative z-10 flex flex-col h-full bg-white/40">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                {wishlist.isPublic ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              </div>
              <h3 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-brand-600 transition-colors">
                {wishlist.title}
              </h3>
            </div>
            
            <button
              onClick={handleDelete}
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors z-20"
              title="Delete Wishlist"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-slate-500 mb-6 flex-grow line-clamp-2 leading-relaxed">
            {wishlist.description || 'No description provided. Add details to make it exciting!'}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
             <div className="flex items-center text-xs text-slate-400 font-medium">
                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                {formattedDate}
             </div>
             <div className="flex items-center text-sm text-brand-600 font-bold group-hover:translate-x-1 transition-transform">
                Open <Eye className="h-4 w-4 ml-1.5" />
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WishlistCard;
