import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { GAMES } from '../data/games';
import { useSave } from '../contexts/SaveContext';
import GameCard from '../components/GameCard';
import SaveCard from '../components/SaveCard';
import CreateSaveModal from '../components/CreateSaveModal';

export default function GameSelectionPage() {
  const { saves, createSave, deleteSave, loadSave, loading } = useSave();
  const [selectedGame, setSelectedGame] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGen, setFilterGen] = useState(null);

  // Get saves count per game
  const savesPerGame = useMemo(() => {
    const counts = {};
    saves.forEach(save => {
      counts[save.gameId] = (counts[save.gameId] || 0) + 1;
    });
    return counts;
  }, [saves]);

  // Filter games
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = searchQuery === '' || 
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGen = filterGen === null || game.generation === filterGen;
      return matchesSearch && matchesGen;
    });
  }, [searchQuery, filterGen]);

  // Get saves for selected game
  const gameSaves = useMemo(() => {
    if (!selectedGame) return [];
    return saves.filter(save => save.gameId === selectedGame.id);
  }, [selectedGame, saves]);

  // Get unique generations for filter
  const generations = [...new Set(GAMES.map(g => g.generation))].sort((a, b) => a - b);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  const handleLoadSave = async (saveId) => {
    await loadSave(saveId);
  };

  const handleDeleteSave = async (saveId) => {
    await deleteSave(saveId);
  };

  const handleCreateSave = async (gameId, saveName) => {
    const result = await createSave(gameId, saveName);
    if (result.success) {
      await loadSave(result.saveId);
    }
    return result;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-poke-border border-t-poke-yellow rounded-full animate-spin mx-auto mb-4" />
          <p className="text-poke-text-light">Loading your saves...</p>
        </div>
      </div>
    );
  }

  // Show saves for selected game
  if (selectedGame) {
    return (
      <div className="min-h-screen pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button and game info */}
          <div className="mb-6">
            <button
              onClick={handleBackToGames}
              className="text-sm text-poke-text-light hover:text-poke-text transition-colors mb-4 flex items-center gap-1"
            >
              ← Back to Games
            </button>
            <div className="flex items-center gap-4">
              {/* Box Art */}
              <div className="w-20 h-28 rounded-lg overflow-hidden shadow-lg shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                <img 
                  src={selectedGame.boxArt} 
                  alt={selectedGame.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h2 className="font-display text-base sm:text-lg text-poke-text">{selectedGame.name}</h2>
                <p className="text-sm text-poke-text-light">
                  {selectedGame.region} • {selectedGame.maxDex} Pokémon • Gen {selectedGame.generation}
                </p>
              </div>
            </div>
          </div>

          {/* Create new save button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full mb-6 p-4 rounded-xl border-2 border-dashed border-poke-border hover:border-poke-yellow/50 transition-all flex items-center justify-center gap-2 text-poke-text-light hover:text-poke-yellow group bg-white/50"
          >
            <Plus size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Create New Save</span>
          </button>

          {/* Existing saves */}
          {gameSaves.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {gameSaves.map(save => (
                <SaveCard
                  key={save.id}
                  save={save}
                  game={selectedGame}
                  onSelect={handleLoadSave}
                  onDelete={handleDeleteSave}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-poke-text-light">
              <p className="mb-2">No saves yet for this game</p>
              <p className="text-sm">Create your first save to start tracking!</p>
            </div>
          )}
        </div>

        {/* Create Save Modal */}
        {showCreateModal && (
          <CreateSaveModal
            game={selectedGame}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateSave}
          />
        )}
      </div>
    );
  }

  // Show game selection
  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-display text-lg sm:text-xl text-poke-text mb-2">
            Choose Your Game
          </h2>
          <p className="text-poke-text-light text-sm">
            Select a game to manage your Living Dex progress
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2.5 bg-poke-card border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light pointer-events-none" />
            <select
              value={filterGen || ''}
              onChange={(e) => setFilterGen(e.target.value ? Number(e.target.value) : null)}
              className="w-full sm:w-auto pl-9 pr-8 py-2.5 bg-poke-card border border-poke-border rounded-lg text-poke-text appearance-none focus:outline-none focus:ring-2 focus:ring-poke-yellow/50 cursor-pointer"
            >
              <option value="">All Generations</option>
              {generations.map(gen => (
                <option key={gen} value={gen}>Generation {gen}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              game={game}
              savesCount={savesPerGame[game.id] || 0}
              onSelect={() => handleGameSelect(game)}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12 text-poke-text-light">
            <p>No games found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
