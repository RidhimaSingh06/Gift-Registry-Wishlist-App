import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader2, Sparkles } from 'lucide-react';
import { getUserWishlists } from '../services/wishlistService';
import WishlistCard from '../components/WishlistCard';

const Dashboard = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      const data = await getUserWishlists();
      setWishlists(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromState = (deletedId) => {
    setWishlists(wishlists.filter(w => w._id !== deletedId));
  };

  return (
    <div className="max-w-7xl mx-auto relative z-10">
      
      {/* Decorative Background Blob */}
      <div className="fixed top-20 -left-20 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10 tracking-tighter"></div>

      <div className="glass-card p-8 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 overflow-visible border-b-4 border-b-brand-500">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center">
            Your Registries <Sparkles className="h-6 w-6 text-accent ml-3 animate-pulse" />
          </h1>
          <p className="mt-3 text-lg text-slate-600 font-medium">Manage and share your magical wishlists effortlessly.</p>
        </div>
        <Link to="/wishlist/create" className="btn-primary shadow-lg whitespace-nowrap">
          <Plus className="h-5 w-5 mr-2" />
          Create New Registry
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
        </div>
      ) : wishlists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlists.map(wishlist => (
            <WishlistCard 
              key={wishlist._id} 
              wishlist={wishlist} 
              onDelete={handleRemoveFromState} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 glass-card border-dashed border-2 border-brand-300 bg-white/40">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-brand-100 to-accent-light mb-6 shadow-inner">
            <Plus className="h-10 w-10 text-brand-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No registries yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">It's quiet in here. Get started by creating your very first registry to track your gifts!</p>
          <Link to="/wishlist/create" className="btn-primary px-8">
            Create Registry
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
