import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createWishlist } from '../services/wishlistService';
import { ArrowLeft, Sparkles, Globe } from 'lucide-react';

const CreateWishlist = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createWishlist({ title, description, isPublic });
      toast.success('Registry created!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create registry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto relative z-10 pt-4">
      <button 
        onClick={() => navigate('/dashboard')}
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 mb-8 transition-colors bg-white/50 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="glass-card p-8 sm:p-10 border-t-4 border-t-accent">
        <div className="flex items-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-100 to-accent-light flex items-center justify-center mr-4 shadow-inner">
                <Sparkles className="h-6 w-6 text-brand-600" />
            </div>
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900">Create New Registry</h1>
               <p className="text-slate-500 font-medium">Design a new magical collection of gifts.</p>
            </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Registry Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-lg py-4"
              placeholder="e.g. My Wedding, Baby Shower, Birthday"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Description (Optional)</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field resize-none leading-relaxed"
              placeholder="Tell people what this registry is for..."
            />
          </div>

          <div className="flex items-start p-5 bg-gradient-to-r from-brand-50 to-white/50 rounded-2xl border border-brand-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center h-6 mt-1">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-5 w-5 text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
              />
            </div>
            <div className="ml-4 text-sm flex-grow">
              <label className="font-bold text-slate-900 text-base cursor-pointer flex items-center">
                  Make this registry public
                  <Globe className="h-4 w-4 text-brand-500 ml-2" />
              </label>
              <p className="text-slate-500 mt-1">Anyone with the specific link can securely view and reserve your items.</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-100/60">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary px-8 text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-10 text-base"
            >
              {loading ? 'Creating...' : 'Create Registry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWishlist;
