import { useState } from 'react';
import { Trash2, Play, MoreVertical } from 'lucide-react';

export default function SaveCard({ save, game, onSelect, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(save.id);
      setConfirmDelete(false);
      setShowMenu(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="relative group">
      <div 
        className="p-4 rounded-xl border border-poke-border bg-poke-card hover:shadow-lg transition-all"
        style={{ borderColor: `${game?.color}33` }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-poke-text truncate mb-1">{save.name}</h3>
            <p className="text-xs text-poke-text-light">
              Updated {formatDate(save.updatedAt)}
            </p>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 hover:bg-poke-dark rounded-lg transition-colors"
            >
              <MoreVertical size={16} className="text-poke-text-light" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => {
                    setShowMenu(false);
                    setConfirmDelete(false);
                  }} 
                />
                <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-poke-card border border-poke-border rounded-lg shadow-xl overflow-hidden">
                  <button
                    onClick={handleDelete}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
                      confirmDelete 
                        ? 'bg-red-500/10 text-red-500' 
                        : 'hover:bg-poke-dark text-poke-text-light'
                    }`}
                  >
                    <Trash2 size={14} />
                    {confirmDelete ? 'Confirm Delete?' : 'Delete Save'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelect(save.id)}
          className="w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ 
            backgroundColor: `${game?.color}22`,
            color: game?.color,
          }}
        >
          <Play size={16} fill="currentColor" />
          Continue
        </button>
      </div>
    </div>
  );
}
