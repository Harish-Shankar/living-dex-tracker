import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function CreateSaveModal({ game, onClose, onCreate }) {
  const [saveName, setSaveName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!saveName.trim()) {
      setError('Please enter a name for your save');
      return;
    }

    setLoading(true);
    setError('');
    
    const result = await onCreate(game.id, saveName.trim());
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Failed to create save');
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-2xl overflow-hidden">
        {/* Header */}
        <div 
          className="relative px-6 py-4 border-b border-poke-border"
          style={{ backgroundColor: `${game.color}11` }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 hover:bg-poke-dark rounded-lg transition-colors text-poke-text-light"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-3">
            {/* Box Art Thumbnail */}
            <div className="w-12 h-16 rounded-lg overflow-hidden shadow-md shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
              <img 
                src={game.boxArt} 
                alt={game.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h2 className="font-display text-sm text-poke-text">New Save</h2>
              <p className="text-xs text-poke-text-light">{game.name}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-poke-text mb-2">
              Save Name
            </label>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="My Living Dex..."
              className="w-full px-4 py-3 bg-poke-dark border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50 focus:border-transparent transition-all"
              maxLength={50}
              autoFocus
            />
            <p className="text-xs text-poke-text-light mt-1">
              {saveName.length}/50 characters
            </p>
          </div>

          {/* Game Info */}
          <div className="mb-6 p-3 bg-poke-dark/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-poke-text-light">Pokémon to collect:</span>
              <span className="font-semibold" style={{ color: game.color }}>
                {game.maxDex}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-poke-text-light">Region:</span>
              <span className="text-poke-text">{game.region}</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-poke-dark hover:bg-poke-darker rounded-lg font-medium transition-colors text-poke-text"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 hover:opacity-90"
              style={{ 
                backgroundColor: game.color,
                color: 'white',
              }}
            >
              {loading ? 'Creating...' : 'Create Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
