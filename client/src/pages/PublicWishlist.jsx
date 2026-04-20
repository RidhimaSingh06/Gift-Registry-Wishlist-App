import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Gift, Loader2, Sparkles, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { getWishlistById } from '../services/wishlistService';
import { getWishlistItems, reserveItem } from '../services/itemService';
import ItemCard from '../components/ItemCard';

const PublicWishlist = () => {
  const { id } = useParams();
  
  const [wishlist, setWishlist] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reserve modal state
  const [reservingItem, setReservingItem] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [wishlistData, itemsData] = await Promise.all([
        getWishlistById(id),
        getWishlistItems(id)
      ]);
      setWishlist(wishlistData);
      setItems(itemsData);
    } catch (err) {
      setError('This registry is not available or private.');
    } finally {
      setLoading(false);
    }
  };

  const handleReserveClick = (item) => {
    setReservingItem(item);
  };

  const handleReserveSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const updatedItem = await reserveItem(reservingItem._id, visitorName);
      setItems(items.map(i => i._id === updatedItem._id ? updatedItem : i));
      setReservingItem(null);
      setVisitorName('');
      toast.success('Gift successfully claimed!');
    } catch (error) {
      toast.error('Failed to claim gift');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center">
        <Loader2 className="h-12 w-12 text-brand-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Unlocking the magic...</p>
      </div>
    );
  }

  if (error || !wishlist) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center p-4">
        <div className="h-24 w-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <Gift className="h-12 w-12 text-red-300" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Registry Blocked</h1>
        <p className="text-slate-500 text-lg max-w-md text-center">{error || "The magic link might be broken or the registry is set to private."}</p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen">
       {/* High-impact decorative backgrounds for public view */}
      <div className="fixed top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-brand-100 via-accent-light to-transparent opacity-60 -z-10"></div>
      <div className="fixed top-20 right-0 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500 to-accent shadow-2xl shadow-brand-500/40 mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
            <Gift className="h-12 w-12 text-white" />
            <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-brand-200 animate-pulse-slow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            {wishlist.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {wishlist.description || 'Welcome! Take a look around and help make the occasion spectacular.'}
          </p>
        </div>

        <div className="glass-card overflow-hidden mb-12 shadow-2xl shadow-brand-900/5">
          <div className="px-8 py-6 border-b border-brand-100 bg-white/50 flex justify-between items-center">
            <h2 className="font-extrabold text-xl text-slate-800 flex items-center">
                Wishlist Items <span className="ml-3 bg-brand-600 text-white py-1 px-3 rounded-full text-sm">{items.length}</span>
            </h2>
          </div>
          <div className="p-8">
            {items.length > 0 ? (
              <div className="space-y-6">
                {items.map(item => (
                  <ItemCard 
                    key={item._id} 
                    item={item} 
                    isPublicView={true} 
                    onReserve={handleReserveClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                  <Heart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">No gifts have been added to this registry yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>

        {/* Futuristic Reserve Modal */}
        {reservingItem && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform scale-100 animate-in zoom-in-95 duration-300">
              <div className="h-3 bg-gradient-to-r from-brand-400 via-accent to-brand-500 w-full"></div>
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Claim this Gift</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  You are beautifully claiming <span className="font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">"{reservingItem.name}"</span>. 
                  Provide your name so the owner knows you got it, or leave it blank to remain a secret admirer!
                </p>
                <form onSubmit={handleReserveSubmit}>
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name (Optional)</label>
                    <input
                      type="text"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="input-field py-4 text-lg"
                      placeholder="e.g. Jane Doe"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button 
                      type="button" 
                      onClick={() => setReservingItem(null)}
                      className="btn-secondary px-6"
                    >
                      Nevermind
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary px-8"
                    >
                      {isSubmitting ? 'Confirming...' : 'Confirm Claim'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicWishlist;
