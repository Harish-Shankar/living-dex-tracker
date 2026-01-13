import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSave } from '../contexts/SaveContext';
import { GAMES, getPokemonNumbersForGame, CATCH_STATUS } from '../data/games';
import PCBox from '../components/PCBox';
import { getPokemonName } from '../data/pokemon';

const EXP_SHARE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png';
const EGG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/egg.png';
const STATUS_COLORS = {
  [CATCH_STATUS.NOT_CAUGHT]: '#6b7280',
  [CATCH_STATUS.CAUGHT]: '#22c55e',
  [CATCH_STATUS.EVOLVE]: '#a855f7',
  [CATCH_STATUS.BREED]: '#f472b6',
  [CATCH_STATUS.HATCH]: '#fbbf24',
};

export default function TrackerPage() {
  const { currentSave, getCompletionStats, pokemonStatus } = useSave();
  const [searchQuery, setSearchQuery] = useState('');

  const game = useMemo(() => {
    return GAMES.find(g => g.id === currentSave?.gameId);
  }, [currentSave]);

  const pokemonNumbers = useMemo(() => {
    if (!currentSave) return [];
    return getPokemonNumbersForGame(currentSave.gameId);
  }, [currentSave]);

  // Get matching Pokemon dex numbers based on search
  const matchingPokemon = useMemo(() => {
    if (!searchQuery.trim()) return new Set();
    const query = searchQuery.toLowerCase().trim();
    const matches = new Set();
    pokemonNumbers.forEach(num => {
      const name = getPokemonName(num).toLowerCase();
      const dexStr = String(num);
      if (name.includes(query) || dexStr.includes(query)) {
        matches.add(num);
      }
    });
    return matches;
  }, [searchQuery, pokemonNumbers]);

  const stats = getCompletionStats();

  // Calculate stats by status
  const statusStats = useMemo(() => {
    const counts = {
      [CATCH_STATUS.CAUGHT]: 0,
      [CATCH_STATUS.EVOLVE]: 0,
      [CATCH_STATUS.BREED]: 0,
      [CATCH_STATUS.HATCH]: 0,
      [CATCH_STATUS.NOT_CAUGHT]: 0,
    };
    
    pokemonNumbers.forEach(num => {
      const status = pokemonStatus[num] || CATCH_STATUS.NOT_CAUGHT;
      counts[status]++;
    });
    
    return counts;
  }, [pokemonNumbers, pokemonStatus]);

  if (!currentSave || !game) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-poke-text-light">No save loaded</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Save Info Header */}
        <div className="mb-6">
          <div className="glass rounded-xl p-4 sm:p-6" style={{ borderColor: `${game.color}22` }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Save Details */}
              <div className="flex items-center gap-4">
                {/* Box Art */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shadow-lg shrink-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={game.boxArt} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-sm sm:text-base text-poke-text truncate">
                    {currentSave.name}
                  </h2>
                  <p className="text-sm text-poke-text-light truncate">
                    {game.name}
                  </p>
                  <p className="text-xs text-poke-text-light">
                    {game.region} • Gen {game.generation}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="text-center sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-poke-yellow">
                  {stats.percentage}%
                </div>
                <div className="text-sm text-poke-text-light">
                  {stats.caught} / {stats.total} caught
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="h-3 bg-poke-dark rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${stats.percentage}%`,
                    background: `linear-gradient(90deg, ${game.color}, ${game.color}cc)`
                  }}
                />
              </div>
            </div>

            {/* Status breakdown */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              <div className="text-center p-2 bg-poke-dark/50 rounded-lg">
                <div className="text-lg font-bold text-green-600">{statusStats[CATCH_STATUS.CAUGHT]}</div>
                <div className="text-[10px] text-poke-text-light">Caught</div>
              </div>
              <div className="text-center p-2 bg-poke-dark/50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{statusStats[CATCH_STATUS.EVOLVE]}</div>
                <div className="text-[10px] text-poke-text-light">Evolve</div>
              </div>
              <div className="text-center p-2 bg-poke-dark/50 rounded-lg">
                <div className="text-lg font-bold text-pink-500">{statusStats[CATCH_STATUS.BREED]}</div>
                <div className="text-[10px] text-poke-text-light">Breed</div>
              </div>
              <div className="text-center p-2 bg-poke-dark/50 rounded-lg">
                <div className="text-lg font-bold text-amber-500">{statusStats[CATCH_STATUS.HATCH]}</div>
                <div className="text-[10px] text-poke-text-light">Hatch</div>
              </div>
              <div className="text-center p-2 bg-poke-dark/50 rounded-lg">
                <div className="text-lg font-bold text-gray-500">{statusStats[CATCH_STATUS.NOT_CAUGHT]}</div>
                <div className="text-[10px] text-poke-text-light">Needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mb-4 text-center text-sm text-poke-text-light">
          <p>Click a slot to set/clear • use <span className="font-medium">⋮</span> to change status anytime</p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-poke-text-light" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pokemon by name or number..."
              className="w-full pl-10 pr-10 py-2.5 bg-poke-card border border-poke-border rounded-lg text-poke-text placeholder-poke-text-light focus:outline-none focus:ring-2 focus:ring-poke-yellow/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-poke-text-light hover:text-poke-text transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-poke-text-light mt-2 text-center">
              Found {matchingPokemon.size} matching Pokemon
            </p>
          )}
        </div>

        {/* PC Box */}
        <PCBox pokemonNumbers={pokemonNumbers} game={game} searchQuery={searchQuery} matchingPokemon={matchingPokemon} />

        {/* Legend */}
        <div className="mt-6 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-poke-text-light mb-3">Status Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${STATUS_COLORS[CATCH_STATUS.CAUGHT]}33`,
                }}
              >
                <div className="pokeball-indicator" />
              </div>
              <span className="text-sm text-poke-text">Caught</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: `${STATUS_COLORS[CATCH_STATUS.EVOLVE]}33`,
                  color: STATUS_COLORS[CATCH_STATUS.EVOLVE],
                }}
              >
                <img
                  src={EXP_SHARE_URL}
                  alt="Evolve"
                  className="w-3.5 h-3.5 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
              </div>
              <span className="text-sm text-poke-text">Evolve</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: `${STATUS_COLORS[CATCH_STATUS.BREED]}33`,
                  color: STATUS_COLORS[CATCH_STATUS.BREED],
                }}
              >
                <img
                  src={EGG_URL}
                  alt="Breed"
                  className="w-3.5 h-3.5 object-contain opacity-60"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
              </div>
              <span className="text-sm text-poke-text">Breed</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: `${STATUS_COLORS[CATCH_STATUS.HATCH]}33`,
                  color: STATUS_COLORS[CATCH_STATUS.HATCH],
                }}
              >
                <img
                  src={EGG_URL}
                  alt="Hatch"
                  className="w-3.5 h-3.5 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
              </div>
              <span className="text-sm text-poke-text">Hatch</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: `${STATUS_COLORS[CATCH_STATUS.NOT_CAUGHT]}33`,
                  color: STATUS_COLORS[CATCH_STATUS.NOT_CAUGHT],
                }}
              >
                ○
              </div>
              <span className="text-sm text-poke-text">Not Caught</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
