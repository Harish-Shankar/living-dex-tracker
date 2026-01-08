import { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';
import PokemonSlot from './PokemonSlot';
import { useSave } from '../contexts/SaveContext';
import { CATCH_STATUS } from '../data/games';

const POKEMON_PER_BOX = 30;

export default function PCBox({ pokemonNumbers, game }) {
  const { getStatus, updatePokemonStatus } = useSave();
  const [currentBox, setCurrentBox] = useState(0);
  
  const totalBoxes = Math.ceil(pokemonNumbers.length / POKEMON_PER_BOX);
  
  // Get Pokemon for current box
  const startIndex = currentBox * POKEMON_PER_BOX;
  const endIndex = Math.min(startIndex + POKEMON_PER_BOX, pokemonNumbers.length);
  const currentPokemon = pokemonNumbers.slice(startIndex, endIndex);

  // Calculate box stats
  const boxCaughtCount = currentPokemon.filter(
    num => getStatus(num) === CATCH_STATUS.CAUGHT
  ).length;

  // Navigation
  const goToBox = (boxIndex) => {
    if (boxIndex >= 0 && boxIndex < totalBoxes) {
      setCurrentBox(boxIndex);
    }
  };

  const handleStatusChange = async (dexNumber, newStatus) => {
    await updatePokemonStatus(dexNumber, newStatus);
  };

  return (
    <div className="w-full">
      {/* Box Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        {/* Previous button */}
        <button
          onClick={() => goToBox(currentBox - 1)}
          disabled={currentBox === 0}
          className={`
            p-2 rounded-lg transition-all text-poke-text
            ${currentBox === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-poke-dark active:scale-95'}
          `}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Box info */}
        <div className="text-center">
          <h3 className="font-display text-sm" style={{ color: game?.color }}>
            Box {currentBox + 1}
          </h3>
          <p className="text-xs text-poke-text-light mt-1">
            #{startIndex + 1} - #{endIndex} • {boxCaughtCount}/{currentPokemon.length} caught
          </p>
        </div>

        {/* Next button */}
        <button
          onClick={() => goToBox(currentBox + 1)}
          disabled={currentBox === totalBoxes - 1}
          className={`
            p-2 rounded-lg transition-all text-poke-text
            ${currentBox === totalBoxes - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'hover:bg-poke-dark active:scale-95'}
          `}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Box Navigation Dots */}
      <div className="flex items-center justify-center gap-1 mb-4 flex-wrap px-4">
        {Array.from({ length: totalBoxes }, (_, i) => {
          const boxStart = i * POKEMON_PER_BOX;
          const boxEnd = Math.min(boxStart + POKEMON_PER_BOX, pokemonNumbers.length);
          const boxPokemon = pokemonNumbers.slice(boxStart, boxEnd);
          const caughtCount = boxPokemon.filter(
            num => getStatus(num) === CATCH_STATUS.CAUGHT
          ).length;
          const isComplete = caughtCount === boxPokemon.length;
          
          return (
            <button
              key={i}
              onClick={() => goToBox(i)}
              className={`
                w-3 h-3 rounded-full transition-all
                ${i === currentBox 
                  ? 'scale-125' 
                  : 'hover:scale-110 opacity-60 hover:opacity-100'}
              `}
              style={{
                backgroundColor: i === currentBox 
                  ? game?.color 
                  : isComplete 
                    ? '#22c55e' 
                    : '#c4cad9'
              }}
              title={`Box ${i + 1}: ${caughtCount}/${boxPokemon.length}`}
            />
          );
        })}
      </div>

      {/* Pokemon Grid */}
      <div 
        className="glass rounded-xl p-3 sm:p-4"
        style={{ borderColor: `${game?.color}22` }}
      >
        <div className="pokemon-grid">
          {currentPokemon.map((dexNumber) => (
            <PokemonSlot
              key={dexNumber}
              dexNumber={dexNumber}
              status={getStatus(dexNumber)}
              onStatusChange={handleStatusChange}
            />
          ))}
          
          {/* Empty slots to maintain grid */}
          {currentPokemon.length < POKEMON_PER_BOX && 
            Array.from({ length: POKEMON_PER_BOX - currentPokemon.length }, (_, i) => (
              <div 
                key={`empty-${i}`} 
                className="aspect-square rounded-lg bg-poke-dark/30 border border-poke-border/30"
              />
            ))
          }
        </div>
      </div>

      {/* Quick Jump */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <Grid3X3 size={14} className="text-poke-text-light" />
        <select
          value={currentBox}
          onChange={(e) => goToBox(Number(e.target.value))}
          className="bg-poke-card border border-poke-border rounded-lg px-3 py-1.5 text-sm text-poke-text focus:outline-none focus:ring-2 focus:ring-poke-yellow/50"
        >
          {Array.from({ length: totalBoxes }, (_, i) => (
            <option key={i} value={i}>
              Box {i + 1} (#{i * POKEMON_PER_BOX + 1}-{Math.min((i + 1) * POKEMON_PER_BOX, pokemonNumbers.length)})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
