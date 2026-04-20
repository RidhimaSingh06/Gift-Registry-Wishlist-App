import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Gift, LogOut, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { user, logoutAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAuth();
    navigate('/login');
  };

  return (
    <nav className="glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-accent shadow-lg shadow-brand-500/30 transform group-hover:scale-105 transition-all duration-300">
                 <Gift className="h-6 w-6 text-white absolute" />
                 <Sparkles className="h-3 w-3 text-brand-100 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-brand-900 to-slate-800 ml-2">
                Registry
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden sm:flex items-center gap-3 bg-slate-100/50 py-1.5 px-4 rounded-full border border-slate-200/50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-brand-500 to-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
