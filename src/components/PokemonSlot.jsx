import { useState, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import { createPortal } from 'react-dom';
import { CATCH_STATUS } from '../data/games';
import { getPokemonName, getPokemonSprite } from '../data/pokemon';

// Pokemon item sprite URLs
const EXP_SHARE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/exp-share.png';
const EGG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/egg.png';

export default function PokemonSlot({ dexNumber, status, onStatusChange }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuIncludeNotCaught, setMenuIncludeNotCaught] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 }); // fixed-position anchor in viewport coords
  const [animating, setAnimating] = useState(false);
  const slotRef = useRef(null);

  const isCaught = status === CATCH_STATUS.CAUGHT;
  const pokemonName = getPokemonName(dexNumber);
  const spriteUrl = getPokemonSprite(dexNumber, true); // Shiny variant

  const openMenu = ({ includeNotCaught }) => {
    setMenuIncludeNotCaught(Boolean(includeNotCaught));

    // Anchor the menu to the slot, but render it via a portal to avoid clipping by parents.
    const rect = slotRef.current?.getBoundingClientRect();
    const MENU_W = 200;
    const MENU_H = 220;
    const PAD = 8;
    const OFFSET = 6;

    let x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    let y = rect ? rect.bottom + OFFSET : PAD;

    // Clamp horizontally
    if (x + MENU_W / 2 > window.innerWidth - PAD) x = window.innerWidth - PAD - MENU_W / 2;
    if (x - MENU_W / 2 < PAD) x = PAD + MENU_W / 2;

    // If it would go off-screen at bottom, open above the slot
    if (rect && y + MENU_H > window.innerHeight - PAD) {
      y = rect.top - OFFSET - MENU_H;
    }
    y = Math.max(PAD, y);

    setMenuPos({ x, y });

    setShowContextMenu(true);
  };

  // Handle click - show menu if not caught, otherwise reset to not caught
  const handleClick = (e) => {
    if (status === CATCH_STATUS.NOT_CAUGHT) {
      // Show menu with options
      openMenu({ includeNotCaught: false });
    } else {
      // If already marked (caught, evolve, breed, hatch), reset to not caught
      setAnimating(true);
      onStatusChange(dexNumber, CATCH_STATUS.NOT_CAUGHT);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  // Right click / ctrl+click on mac should behave like a normal click for the slot
  const handleContextMenu = (e) => {
    e.preventDefault();
    handleClick(e);
  };

  // Handle status selection from context menu
  const handleStatusSelect = (newStatus) => {
    setAnimating(true);
    onStatusChange(dexNumber, newStatus);
    setShowContextMenu(false);
    setTimeout(() => setAnimating(false), 300);
  };

  // Status menu items
  const statusOptions = [
    ...(menuIncludeNotCaught
      ? [{ status: CATCH_STATUS.NOT_CAUGHT, icon: '○', color: '#6b7280', label: 'Not Caught', sprite: null }]
      : []),
    { status: CATCH_STATUS.CAUGHT, icon: '✓', color: '#22c55e', label: 'Caught', sprite: null },
    { status: CATCH_STATUS.EVOLVE, icon: null, color: '#a855f7', label: 'Evolve', sprite: EXP_SHARE_URL },
    { status: CATCH_STATUS.BREED, icon: null, color: '#f472b6', label: 'Breed', sprite: EGG_URL, spriteOpacity: 0.6 },
    { status: CATCH_STATUS.HATCH, icon: null, color: '#fbbf24', label: 'Hatch', sprite: EGG_URL },
  ];

  return (
    <>
      <div ref={slotRef}>
        <div
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          className={`
            relative aspect-square rounded-lg cursor-pointer
            transition-all duration-200 select-none
            ${animating ? 'catch-animation' : ''}
            ${isCaught ? 'bg-poke-card shadow-sm' : 'bg-poke-dark/50'}
            hover:bg-poke-card border border-poke-border/50
            hover:border-poke-border hover:scale-[1.02] hover:shadow-md
            group overflow-hidden
          `}
        >
          {/* Options button (change status without resetting) */}
          <button
            type="button"
            className="absolute top-1.5 right-1.5 z-20 w-6 h-6 rounded-md bg-black/25 hover:bg-black/35 text-white/90 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openMenu({ includeNotCaught: true });
            }}
            aria-label={`Change status for #${dexNumber} ${pokemonName}`}
            title="Change status"
          >
            <MoreVertical size={14} />
          </button>

          {/* Pokemon sprite */}
          <div className="absolute inset-0 flex items-center justify-center p-1 pointer-events-none">
          <img
            src={spriteUrl}
            alt={pokemonName}
            className={`
              w-full h-full object-contain
              transition-all duration-300
              ${!isCaught && status === CATCH_STATUS.NOT_CAUGHT ? 'silhouette opacity-40' : ''}
              ${status === CATCH_STATUS.EVOLVE ? 'opacity-50' : ''}
              ${status === CATCH_STATUS.BREED ? 'opacity-50' : ''}
              ${status === CATCH_STATUS.HATCH ? 'opacity-40' : ''}
              ${imageLoaded ? '' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            draggable={false}
          />

          {/* Evolve overlay - Exp Share */}
          {status === CATCH_STATUS.EVOLVE && (
            <img
              src={EXP_SHARE_URL}
              alt="Need to evolve"
              className="absolute w-16 h-16 object-contain drop-shadow-lg z-10"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          )}

          {/* Breed overlay - Translucent Egg */}
          {status === CATCH_STATUS.BREED && (
            <img
              src={EGG_URL}
              alt="Need to breed"
              className="absolute w-20 h-20 object-contain opacity-60 drop-shadow-lg z-10"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          )}

          {/* Hatch overlay - Opaque Egg */}
          {status === CATCH_STATUS.HATCH && (
            <img
              src={EGG_URL}
              alt="Need to hatch"
              className="absolute w-20 h-20 object-contain drop-shadow-lg z-10"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          )}

          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-poke-border border-t-poke-yellow rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Dex number */}
        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/40 rounded text-[10px] font-mono text-white pointer-events-none">
          #{String(dexNumber).padStart(3, '0')}
        </div>

        {/* Status indicator (Pokeball for caught) */}
        {status === CATCH_STATUS.CAUGHT && (
          <div className="absolute bottom-1 right-1 pointer-events-none">
            <div className="pokeball-indicator" title="Caught!" />
          </div>
        )}

        {/* Shiny sparkle effect when caught */}
        {isCaught && <div className="shiny-sparkle absolute inset-0 pointer-events-none" />}

        {/* Hover tooltip */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p className="text-[11px] font-medium text-white truncate text-center">
            {pokemonName}
          </p>
        </div>
        </div>

      </div>

      {/* Context Menu (portal to body to avoid any clipping) */}
      {showContextMenu && createPortal(
        <>
          <div className="fixed inset-0 z-[2000]" onClick={() => setShowContextMenu(false)} />
          <div
            className="context-menu"
            style={{
              left: menuPos.x,
              top: menuPos.y,
              transform: 'translateX(-50%)',
              zIndex: 2001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-poke-border">
              <p className="text-xs font-semibold text-poke-text">#{dexNumber} {pokemonName}</p>
            </div>
            {statusOptions.map((option) => (
              <button
                key={option.status}
                onClick={() => handleStatusSelect(option.status)}
                className={`context-menu-item ${status === option.status ? 'bg-poke-dark' : ''}`}
              >
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
                  style={{ backgroundColor: `${option.color}33`, color: option.color }}
                >
                  {option.sprite ? (
                    <img
                      src={option.sprite}
                      alt={option.label}
                      className="w-5 h-5 object-contain"
                      style={{
                        imageRendering: 'pixelated',
                        opacity: option.spriteOpacity || 1,
                      }}
                    />
                  ) : (
                    option.icon
                  )}
                </span>
                <span className={status === option.status ? 'text-poke-text' : 'text-poke-text-light'}>
                  {option.label}
                </span>
                {status === option.status && (
                  <span className="ml-auto text-poke-yellow">✓</span>
                )}
              </button>
            ))}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
