export default function GameCard({ game, savesCount, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="group relative w-full aspect-square rounded-xl border border-poke-border bg-poke-card hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
      style={{ 
        '--game-color': game.color,
      }}
    >
      {/* Box Art */}
      <div className="flex-1 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img 
          src={game.boxArt} 
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      {/* Info overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6">
        <div className="flex items-center justify-between text-[11px] text-white/90">
          <div className="flex items-center gap-1.5">
            <span>{game.region}</span>
            <span className="opacity-50">•</span>
            <span>{game.maxDex}</span>
          </div>
          {savesCount > 0 && (
            <span className="text-poke-yellow font-medium">{savesCount} saves</span>
          )}
        </div>
      </div>

      {/* Hover indicator */}
      <div 
        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: game.color }}
      >
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
