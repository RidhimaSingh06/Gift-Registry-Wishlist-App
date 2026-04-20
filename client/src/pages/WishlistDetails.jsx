import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Plus, Copy, Loader2, Gift } from 'lucide-react';
import toast from 'react-hot-toast';
import { getWishlistById } from '../services/wishlistService';
import { getWishlistItems, createItem, deleteItem } from '../services/itemService';
import ItemCard from '../components/ItemCard';

const WishlistDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [wishlist, setWishlist] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New Item State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', productLink: '', description: '' });
  const [addingItem, setAddingItem] = useState(false);

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
    } catch (error) {
      toast.error('Failed to load registry details');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const currentUrl = `${window.location.origin}/public/wishlist/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success('Public link copied to clipboard!');
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    try {
      setAddingItem(true);
      const createdItem = await createItem({ ...newItem, wishlistId: id });
      setItems([...items, createdItem]);
      setNewItem({ name: '', productLink: '', description: '' });
      setShowAddForm(false);
      toast.success('Item added!');
    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setAddingItem(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      try {
        await deleteItem(itemId);
        setItems(items.filter(item => item._id !== itemId));
        toast.success('Item removed');
      } catch (error) {
        toast.error('Failed to remove item');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20 relative z-10">
        <Loader2 className="h-10 w-10 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto relative z-10 pb-12">
      
      {/* Decorative Blob */}
      <div className="fixed top-40 right-10 w-80 h-80 bg-accent-light rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob -z-10"></div>

      <button 
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 mb-6 transition-colors bg-white/50 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      {/* Hero Header */}
      <div className="glass-card p-6 sm:p-10 mb-10 border-b-4 border-b-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
             <Gift className="w-48 h-48 rotate-12" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{wishlist.title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{wishlist.description || 'No description provided.'}</p>
          </div>
          {wishlist.isPublic && (
            <button 
              onClick={handleCopyLink}
              className="btn-primary shadow-xl shadow-brand-500/20 whitespace-nowrap px-6 py-3"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Test Public Link
            </button>
          )}
        </div>
        
        {wishlist.isPublic && (
          <div className="mt-8 flex items-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-brand-100 shadow-inner">
            <span className="text-sm font-bold text-brand-800 mr-3 uppercase tracking-wider">URL:</span>
            <span className="text-sm text-slate-700 truncate flex-grow select-all font-mono font-medium">{currentUrl}</span>
            <button onClick={handleCopyLink} className="ml-3 p-2 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors shadow-sm bg-white" title="Copy">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            Registry Items <span className="ml-3 bg-brand-100 text-brand-700 py-1 px-3 rounded-full text-sm font-bold">{items.length}</span>
        </h2>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-primary shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Gift Idea
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="glass-card bg-gradient-to-br from-brand-50/80 to-white/80 p-8 mb-10 border-l-4 border-l-brand-500">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center">
              <Gift className="h-5 w-5 mr-2 text-brand-500" /> Define New Gift
          </h3>
          <form onSubmit={handleAddItem} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Item Name *</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                  className="input-field"
                  placeholder="e.g. MacBook Pro M3"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Product URL (Optional)</label>
                <input
                  type="url"
                  value={newItem.productLink}
                  onChange={e => setNewItem({...newItem, productLink: e.target.value})}
                  className="input-field"
                  placeholder="https://apple.com/..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Details / Preferences (Optional)</label>
              <textarea
                rows={3}
                value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
                className="input-field resize-none"
                placeholder="Specific color, size, or notes..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-brand-100">
              <button type="button" onClick={() => setShowAddForm(false)} className="btn-secondary px-6">Cancel</button>
              <button type="submit" disabled={addingItem} className="btn-primary px-8">{addingItem ? 'Processing...' : 'Save Item'}</button>
            </div>
          </form>
        </div>
      )}

      {items.length > 0 ? (
        <div className="space-y-5">
          {items.map(item => (
            <ItemCard 
              key={item._id} 
              item={item} 
              isPublicView={false} 
              onDelete={handleDeleteItem} 
            />
          ))}
        </div>
      ) : (
        !showAddForm && (
          <div className="text-center py-20 glass-card border-dashed border-2 border-brand-200 bg-white/40">
            <div className="mx-auto flex bg-gradient-to-br from-brand-100 to-accent-light items-center justify-center h-20 w-20 rounded-full mb-6 shadow-inner">
                <Gift className="h-10 w-10 text-brand-600" />
            </div>
            <p className="text-slate-500 mb-6 text-lg max-w-md mx-auto">This registry is currently empty. Start adding gift ideas so your friends know what you'd love!</p>
            <button onClick={() => setShowAddForm(true)} className="btn-primary px-8 py-3 text-lg">
              Add First Gift
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default WishlistDetails;
