import { ExternalLink, Trash2, CheckCircle2, Gift } from 'lucide-react';

const ItemCard = ({ item, isPublicView, onReserve, onDelete }) => {
  const isTaken = item.status === 'taken';

  return (
    <div className={`glass-card p-5 flex flex-col sm:flex-row gap-5 sm:items-center relative overflow-hidden ${isTaken ? 'opacity-80 bg-slate-50/50' : 'bg-white/60'}`}>
      
      {/* Decorative side bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isTaken ? 'bg-slate-300' : 'bg-gradient-to-b from-brand-400 to-accent'}`}></div>

      {/* Icon block */}
      <div className={`hidden sm:flex h-12 w-12 rounded-xl items-center justify-center shrink-0 ${isTaken ? 'bg-slate-200 text-slate-400' : 'bg-brand-50 text-brand-600 shadow-sm'}`}>
        <Gift className="h-6 w-6" />
      </div>

      <div className="flex-grow pl-2">
        <div className="flex items-center gap-3 mb-1.5">
          <h4 className={`text-lg font-bold ${isTaken ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {item.name}
          </h4>
          {item.productLink && (
            <a 
              href={item.productLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100 hover:text-brand-700 text-xs font-semibold inline-flex items-center transition-colors"
            >
              Shop Link <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </div>
        
        {item.description && (
          <p className={`text-sm mb-3 ${isTaken ? 'text-slate-400' : 'text-slate-500'}`}>{item.description}</p>
        )}
        
        {isTaken && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-200/50 text-slate-600 border border-slate-300/50">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
            Reserved by {item.reservedBy?.name || 'Someone'}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end sm:flex-col gap-3 shrink-0">
        {isPublicView && !isTaken && (
          <button 
            onClick={() => onReserve(item)}
            className="btn-primary w-full sm:w-auto px-8"
          >
            Claim
          </button>
        )}
        
        {!isPublicView && (
          <button
            onClick={() => onDelete(item._id)}
            className="btn-danger w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 sm:mr-1.5" />
            <span>Remove</span>
          </button>
        )}

        {isPublicView && isTaken && (
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Gone</span>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
