// Pokemon games with their National Dex limits
// Each game tracks all Pokemon up to and including their generation

export const GAMES = [
  // Generation 1
  {
    id: 'red',
    name: 'Pokémon Red',
    shortName: 'Red',
    generation: 1,
    maxDex: 151,
    region: 'Kanto',
    color: '#E3350D',
    year: 1996,
    boxArt: '/boxart/rb-r.webp',
  },
  {
    id: 'blue',
    name: 'Pokémon Blue',
    shortName: 'Blue',
    generation: 1,
    maxDex: 151,
    region: 'Kanto',
    color: '#0A285F',
    year: 1996,
    boxArt: '/boxart/rb-b.webp',
  },
  {
    id: 'yellow',
    name: 'Pokémon Yellow',
    shortName: 'Yellow',
    generation: 1,
    maxDex: 151,
    region: 'Kanto',
    color: '#FFD700',
    year: 1998,
    boxArt: '/boxart/y.webp',
  },
  // Generation 2
  {
    id: 'gold',
    name: 'Pokémon Gold',
    shortName: 'Gold',
    generation: 2,
    maxDex: 251,
    region: 'Johto',
    color: '#DAA520',
    year: 1999,
    boxArt: '/boxart/gs-g.webp',
  },
  {
    id: 'silver',
    name: 'Pokémon Silver',
    shortName: 'Silver',
    generation: 2,
    maxDex: 251,
    region: 'Johto',
    color: '#C0C0C0',
    year: 1999,
    boxArt: '/boxart/gs-s.webp',
  },
  {
    id: 'crystal',
    name: 'Pokémon Crystal',
    shortName: 'Crystal',
    generation: 2,
    maxDex: 251,
    region: 'Johto',
    color: '#5CB3FF',
    year: 2000,
    boxArt: '/boxart/c.webp',
  },
  // Generation 3
  {
    id: 'ruby',
    name: 'Pokémon Ruby',
    shortName: 'Ruby',
    generation: 3,
    maxDex: 386,
    region: 'Hoenn',
    color: '#A00000',
    year: 2002,
    boxArt: '/boxart/rs-r.webp',
  },
  {
    id: 'sapphire',
    name: 'Pokémon Sapphire',
    shortName: 'Sapphire',
    generation: 3,
    maxDex: 386,
    region: 'Hoenn',
    color: '#0A285F',
    year: 2002,
    boxArt: '/boxart/rs-s.webp',
  },
  {
    id: 'emerald',
    name: 'Pokémon Emerald',
    shortName: 'Emerald',
    generation: 3,
    maxDex: 386,
    region: 'Hoenn',
    color: '#50C878',
    year: 2004,
    boxArt: '/boxart/e.webp',
  },
  {
    id: 'firered',
    name: 'Pokémon FireRed',
    shortName: 'FireRed',
    generation: 3,
    maxDex: 386,
    region: 'Kanto',
    color: '#FF6B35',
    year: 2004,
    boxArt: '/boxart/frlg-fr.webp',
  },
  {
    id: 'leafgreen',
    name: 'Pokémon LeafGreen',
    shortName: 'LeafGreen',
    generation: 3,
    maxDex: 386,
    region: 'Kanto',
    color: '#228B22',
    year: 2004,
    boxArt: '/boxart/frlg-lg.webp',
  },
  // Generation 4
  {
    id: 'diamond',
    name: 'Pokémon Diamond',
    shortName: 'Diamond',
    generation: 4,
    maxDex: 493,
    region: 'Sinnoh',
    color: '#5D5DFF',
    year: 2006,
    boxArt: '/boxart/dp-d.webp',
  },
  {
    id: 'pearl',
    name: 'Pokémon Pearl',
    shortName: 'Pearl',
    generation: 4,
    maxDex: 493,
    region: 'Sinnoh',
    color: '#FFB6C1',
    year: 2006,
    boxArt: '/boxart/dp-p.webp',
  },
  {
    id: 'platinum',
    name: 'Pokémon Platinum',
    shortName: 'Platinum',
    generation: 4,
    maxDex: 493,
    region: 'Sinnoh',
    color: '#9D9DA4',
    year: 2008,
    boxArt: '/boxart/pt.webp',
  },
  {
    id: 'heartgold',
    name: 'Pokémon HeartGold',
    shortName: 'HeartGold',
    generation: 4,
    maxDex: 493,
    region: 'Johto',
    color: '#B8860B',
    year: 2009,
    boxArt: '/boxart/hgss-hg.webp',
  },
  {
    id: 'soulsilver',
    name: 'Pokémon SoulSilver',
    shortName: 'SoulSilver',
    generation: 4,
    maxDex: 493,
    region: 'Johto',
    color: '#A8A8A8',
    year: 2009,
    boxArt: '/boxart/hgss-ss.webp',
  },
  // Generation 5
  {
    id: 'black',
    name: 'Pokémon Black',
    shortName: 'Black',
    generation: 5,
    maxDex: 649,
    region: 'Unova',
    color: '#2d2d2d',
    year: 2010,
    boxArt: '/boxart/bw-b.webp',
  },
  {
    id: 'white',
    name: 'Pokémon White',
    shortName: 'White',
    generation: 5,
    maxDex: 649,
    region: 'Unova',
    color: '#f0f0f0',
    year: 2010,
    boxArt: '/boxart/bw-w.webp',
  },
  {
    id: 'black2',
    name: 'Pokémon Black 2',
    shortName: 'Black 2',
    generation: 5,
    maxDex: 649,
    region: 'Unova',
    color: '#1a1a1a',
    year: 2012,
    boxArt: '/boxart/b2w2-b2.webp',
  },
  {
    id: 'white2',
    name: 'Pokémon White 2',
    shortName: 'White 2',
    generation: 5,
    maxDex: 649,
    region: 'Unova',
    color: '#e6e6e6',
    year: 2012,
    boxArt: '/boxart/b2w2-w2.webp',
  },
  // Generation 6
  {
    id: 'x',
    name: 'Pokémon X',
    shortName: 'X',
    generation: 6,
    maxDex: 721,
    region: 'Kalos',
    color: '#025DA6',
    year: 2013,
    boxArt: '/boxart/xy-x.webp',
  },
  {
    id: 'y',
    name: 'Pokémon Y',
    shortName: 'Y',
    generation: 6,
    maxDex: 721,
    region: 'Kalos',
    color: '#EA1A3E',
    year: 2013,
    boxArt: '/boxart/xy-y.webp',
  },
  {
    id: 'omegaruby',
    name: 'Pokémon Omega Ruby',
    shortName: 'OR',
    generation: 6,
    maxDex: 721,
    region: 'Hoenn',
    color: '#CE2029',
    year: 2014,
    boxArt: '/boxart/oras-or.webp',
  },
  {
    id: 'alphasapphire',
    name: 'Pokémon Alpha Sapphire',
    shortName: 'AS',
    generation: 6,
    maxDex: 721,
    region: 'Hoenn',
    color: '#26649C',
    year: 2014,
    boxArt: '/boxart/oras-as.webp',
  },
  // Generation 7
  {
    id: 'sun',
    name: 'Pokémon Sun',
    shortName: 'Sun',
    generation: 7,
    maxDex: 802,
    region: 'Alola',
    color: '#F5A623',
    year: 2016,
    boxArt: '/boxart/sm-s.webp',
  },
  {
    id: 'moon',
    name: 'Pokémon Moon',
    shortName: 'Moon',
    generation: 7,
    maxDex: 802,
    region: 'Alola',
    color: '#5599CA',
    year: 2016,
    boxArt: '/boxart/sm-m.webp',
  },
  {
    id: 'ultrasun',
    name: 'Pokémon Ultra Sun',
    shortName: 'US',
    generation: 7,
    maxDex: 807,
    region: 'Alola',
    color: '#E95420',
    year: 2017,
    boxArt: '/boxart/usum-us.webp',
  },
  {
    id: 'ultramoon',
    name: 'Pokémon Ultra Moon',
    shortName: 'UM',
    generation: 7,
    maxDex: 807,
    region: 'Alola',
    color: '#226597',
    year: 2017,
    boxArt: '/boxart/usum-um.webp',
  },
  {
    id: 'letsgopikachu',
    name: "Pokémon Let's Go, Pikachu!",
    shortName: 'LGP',
    generation: 7,
    maxDex: 153,
    region: 'Kanto',
    color: '#FFCC00',
    year: 2018,
    boxArt: '/boxart/lgpe-lgp.webp',
    customDex: [
      ...Array.from({ length: 151 }, (_, i) => i + 1),
      808, 809
    ]
  },
  {
    id: 'letsgoeevee',
    name: "Pokémon Let's Go, Eevee!",
    shortName: 'LGE',
    generation: 7,
    maxDex: 153,
    region: 'Kanto',
    color: '#B8860B',
    year: 2018,
    boxArt: '/boxart/lgpe-lge.webp',
    customDex: [
      ...Array.from({ length: 151 }, (_, i) => i + 1),
      808, 809
    ]
  },
  // Generation 8
  {
    id: 'sword',
    name: 'Pokémon Sword',
    shortName: 'Sword',
    generation: 8,
    maxDex: 898,
    region: 'Galar',
    color: '#00A1E4',
    year: 2019,
    boxArt: '/boxart/swsh-sw.webp',
  },
  {
    id: 'shield',
    name: 'Pokémon Shield',
    shortName: 'Shield',
    generation: 8,
    maxDex: 898,
    region: 'Galar',
    color: '#E4005A',
    year: 2019,
    boxArt: '/boxart/swsh-sh.webp',
  },
  {
    id: 'brilliantdiamond',
    name: 'Pokémon Brilliant Diamond',
    shortName: 'BD',
    generation: 8,
    maxDex: 493,
    region: 'Sinnoh',
    color: '#6666FF',
    year: 2021,
    boxArt: '/boxart/bdsp-bd.webp',
  },
  {
    id: 'shiningpearl',
    name: 'Pokémon Shining Pearl',
    shortName: 'SP',
    generation: 8,
    maxDex: 493,
    region: 'Sinnoh',
    color: '#FF99CC',
    year: 2021,
    boxArt: '/boxart/bdsp-sp.webp',
  },
  {
    id: 'legendsarceus',
    name: 'Pokémon Legends: Arceus',
    shortName: 'PLA',
    generation: 8,
    maxDex: 242,
    region: 'Hisui',
    color: '#2E4053',
    year: 2022,
    boxArt: '/boxart/la.webp',
    customDex: [
      // Hisui Pokedex - 242 Pokemon (National Dex numbers)
      722, 723, 724,  // Rowlet line (Hisuian Decidueye)
      155, 156, 157,  // Cyndaquil line (Hisuian Typhlosion)
      501, 502, 503,  // Oshawott line (Hisuian Samurott)
      399, 400,       // Bidoof, Bibarel
      396, 397, 398,  // Starly line
      403, 404, 405,  // Shinx line
      265, 266, 267, 268, 269,  // Wurmple lines
      77, 78,         // Ponyta, Rapidash
      133, 134, 135, 136, 196, 197, 470, 471, 700,  // Eevee + all evolutions
      41, 42, 169,    // Zubat line
      425, 426,       // Drifloon, Drifblim
      401, 402,       // Kricketot, Kricketune
      418, 419,       // Buizel, Floatzel
      412, 413, 414,  // Burmy, Wormadam, Mothim
      74, 75, 76,     // Geodude line
      234, 899,       // Stantler, Wyrdeer
      446, 143,       // Munchlax, Snorlax
      46, 47,         // Paras, Parasect
      172, 25, 26,    // Pichu, Pikachu, Raichu
      63, 64, 65,     // Abra line
      390, 391, 392,  // Chimchar line
      427, 428,       // Buneary, Lopunny
      420, 421,       // Cherubi, Cherrim
      54, 55,         // Psyduck, Golduck
      415, 416,       // Combee, Vespiquen
      123, 900, 212,  // Scyther, Kleavor, Scizor
      214,            // Heracross
      439, 122,       // Mime Jr., Mr. Mime
      190, 424,       // Aipom, Ambipom
      129, 130,       // Magikarp, Gyarados
      422, 423,       // Shellos, Gastrodon
      211, 904,       // Qwilfish, Overqwil
      440, 113, 242,  // Happiny, Chansey, Blissey
      406, 315, 407,  // Budew, Roselia, Roserade
      455,            // Carnivine
      548, 549,       // Petilil, Lilligant (Hisuian)
      114, 465,       // Tangela, Tangrowth
      339, 340,       // Barboach, Whiscash
      453, 454,       // Croagunk, Toxicroak
      280, 281, 282, 475,  // Ralts line + Gallade
      193, 469,       // Yanma, Yanmega
      449, 450,       // Hippopotas, Hippowdon
      417,            // Pachirisu
      434, 435,       // Stunky, Skuntank
      216, 217, 901,  // Teddiursa, Ursaring, Ursaluna
      704, 705, 706,  // Goomy line (Hisuian Sliggoo/Goodra)
      95, 208,        // Onix, Steelix
      111, 112, 464,  // Rhyhorn line
      438, 185,       // Bonsly, Sudowoodo
      108, 463,       // Lickitung, Lickilicky
      175, 176, 468,  // Togepi line
      387, 388, 389,  // Turtwig line
      137, 233, 474,  // Porygon line
      92, 93, 94,     // Gastly line
      442,            // Spiritomb
      198, 430,       // Murkrow, Honchkrow
      201,            // Unown
      363, 364, 365,  // Spheal line
      223, 224,       // Remoraid, Octillery
      451, 452,       // Skorupi, Drapion
      58, 59,         // Growlithe, Arcanine (Hisuian)
      431, 432,       // Glameow, Purugly
      66, 67, 68,     // Machop line
      441,            // Chatot
      355, 356, 477,  // Duskull line
      393, 394, 395,  // Piplup line
      458, 226,       // Mantyke, Mantine
      550, 902,       // Basculin, Basculegion
      37, 38,         // Vulpix, Ninetales (Alolan in Hisui)
      72, 73,         // Tentacool, Tentacruel
      456, 457,       // Finneon, Lumineon
      240, 126, 467,  // Magby line
      81, 82, 462,    // Magnemite line
      436, 437,       // Bronzor, Bronzong
      239, 125, 466,  // Elekid line
      207, 472,       // Gligar, Gliscor
      443, 444, 445,  // Gible line
      299, 476,       // Nosepass, Probopass
      100, 101,       // Voltorb, Electrode (Hisuian)
      479,            // Rotom
      433, 358,       // Chingling, Chimecho
      200, 429,       // Misdreavus, Mismagius
      173, 35, 36,    // Cleffa line
      215, 903, 461,  // Sneasel, Sneasler, Weavile
      361, 362, 478,  // Snorunt, Glalie, Froslass
      408, 409,       // Cranidos, Rampardos
      410, 411,       // Shieldon, Bastiodon
      220, 221, 473,  // Swinub line
      712, 713,       // Bergmite, Avalugg (Hisuian)
      459, 460,       // Snover, Abomasnow
      570, 571,       // Zorua, Zoroark (Hisuian)
      627, 628,       // Rufflet, Braviary (Hisuian)
      447, 448,       // Riolu, Lucario
      480, 481, 482,  // Lake Trio
      485,            // Heatran
      486,            // Regigigas
      488,            // Cresselia
      641, 642, 645,  // Forces of Nature
      905,            // Enamorus
      483, 484,       // Dialga, Palkia
      487,            // Giratina
      493,            // Arceus
      489, 490,       // Phione, Manaphy
      492,            // Shaymin
      491,            // Darkrai
    ]
  },
  // Generation 9
  {
    id: 'scarlet',
    name: 'Pokémon Scarlet',
    shortName: 'Scarlet',
    generation: 9,
    maxDex: 1025,
    region: 'Paldea',
    color: '#F9423A',
    year: 2022,
    boxArt: '/boxart/sv-s.webp',
  },
  {
    id: 'violet',
    name: 'Pokémon Violet',
    shortName: 'Violet',
    generation: 9,
    maxDex: 1025,
    region: 'Paldea',
    color: '#9B59B6',
    year: 2022,
    boxArt: '/boxart/sv-v.webp',
  },
];

// Pokemon status options
export const CATCH_STATUS = {
  NOT_CAUGHT: 'not_caught',
  CAUGHT: 'caught',
  EVOLVE: 'evolve',
  BREED: 'breed',
  HATCH: 'hatch',
};

// Status display configuration
export const STATUS_CONFIG = {
  [CATCH_STATUS.NOT_CAUGHT]: {
    label: 'Not Caught',
    icon: '○',
    color: 'status-not-caught',
    description: 'Need to catch',
  },
  [CATCH_STATUS.CAUGHT]: {
    label: 'Caught',
    icon: '●',
    color: 'status-caught',
    description: 'Already caught',
  },
  [CATCH_STATUS.EVOLVE]: {
    label: 'Evolve',
    icon: '↑',
    color: 'status-evolve',
    description: 'Need to evolve another Pokemon',
  },
  [CATCH_STATUS.BREED]: {
    label: 'Breed',
    icon: '♥',
    color: 'status-breed',
    description: 'Need to breed',
  },
  [CATCH_STATUS.HATCH]: {
    label: 'Hatch',
    icon: '◎',
    color: 'status-hatch',
    description: 'Need to hatch from egg',
  },
};

// Helper function to get Pokemon numbers for a game
export function getPokemonNumbersForGame(gameId) {
  const game = GAMES.find(g => g.id === gameId);
  if (!game) return [];
  
  if (game.customDex) {
    return game.customDex;
  }
  
  return Array.from({ length: game.maxDex }, (_, i) => i + 1);
}

// Helper to calculate box count
export function getBoxCount(gameId, pokemonPerBox = 30) {
  const numbers = getPokemonNumbersForGame(gameId);
  return Math.ceil(numbers.length / pokemonPerBox);
}
