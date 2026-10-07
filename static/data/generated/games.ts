export const GAMES = [
  {
    slug: 'wuwa',
    name: 'Wuthering Waves',
    description: 'Open World Gacha Game',
    gachaTerm: 'Convene',
    image: '',
    website: 'https://wutheringwaves.kurogames.com/en/main',
    developer: 'Kuro Games',
    features: {
      import: true,
      manualEntry: false,
    },
    itemTypes: [
      {
        name: 'characters',
        label: 'Resonators',
        icon: 'character',
        mappedTo: 'r',
        rarities: [
          '5',
          '4',
        ],
        attrs: [
          'elements',
          'weapons',
        ],
      },
      {
        name: 'weapons',
        label: 'Weapons',
        icon: 'weapon',
        mappedTo: 'w',
        rarities: [
          '5',
          '4',
        ],
        attrs: [
          'weapons',
        ],
      },
    ],
    attrTypes: [
      {
        name: 'elements',
        label: 'Elements',
        icon: 'element',
        values: [
          'aero',
          'electro',
          'fusion',
          'glacio',
          'havoc',
          'spectro',
        ],
      },
      {
        name: 'weapons',
        label: 'Weapon Types',
        icon: 'weapon',
        values: [
          'broadblade',
          'gauntlets',
          'pistols',
          'rectifier',
          'sword',
        ],
      },
    ],
    collectionConfig: {
      characters: {
        countOffset: -1,
        countLabel: 'S',
      },
      weapons: {
        countOffset: 0,
        countLabel: 'R',
      },
    },
    mappings: {
      characters: {
        matchedAs: 'resonator',
        storedAs: 'r',
      },
      weapons: {
        matchedAs: 'weapon',
        storedAs: 'w',
      },
    },
    rarities: [
      {
        name: '5',
        label: '5✦',
        styles: {
          text: 'text-yellow-400',
          background: 'bg-yellow-500',
          gradientFrom: 'from-orange-500',
          gradientTo: 'to-yellow-500',
          border: 'border-yellow-500',
          glow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]',
        },
      },
      {
        name: '4',
        label: '4✦',
        styles: {
          text: 'text-purple-400',
          background: 'bg-purple-500',
          gradientFrom: 'from-indigo-500',
          gradientTo: 'to-purple-500',
          border: 'border-purple-500',
          glow: 'shadow-[0_0_10px_rgba(168,85,247,0.45)] hover:shadow-[0_0_15px_rgba(168,85,247,0.65)]',
        },
      },
      {
        name: '3',
        label: '3✦',
        styles: {
          text: 'text-blue-400',
          background: 'bg-blue-500',
          gradientFrom: 'from-blue-500',
          gradientTo: 'to-cyan-500',
          border: 'border-blue-500',
          glow: 'shadow-[0_0_8px_rgba(59,130,246,0.4)] hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]',
        },
      },
    ],
  },
  {
    slug: 'endfield',
    name: 'Arknights: Endfield',
    description: 'Open World Gacha Game',
    gachaTerm: 'Headhunt',
    image: '',
    website: 'https://endfield.gryphline.com/en-us',
    developer: 'Gryphline',
    features: {
      import: true,
      manualEntry: false,
    },
    itemTypes: [
      {
        name: 'characters',
        label: 'operator',
        icon: 'character',
        mappedTo: 'c',
        rarities: [
          '6',
          '5',
        ],
        attrs: [
          'elements',
          'weapons',
          'classes',
        ],
      },
      {
        name: 'weapons',
        label: 'weapon',
        icon: 'weapon',
        mappedTo: 'w',
        rarities: [
          '6',
          '5',
        ],
        attrs: [
          'weapons',
        ],
      },
    ],
    attrTypes: [
      {
        name: 'elements',
        label: 'Elements',
        icon: 'element',
        values: [
          'cyro',
          'electric',
          'heat',
          'nature',
          'physical',
        ],
      },
      {
        name: 'weapons',
        label: 'Weapon Types',
        icon: 'weapon',
        values: [
          'arts unit',
          'greatsword',
          'handcannon',
          'polearm',
          'sword',
        ],
      },
      {
        name: 'classes',
        label: 'Class Types',
        icon: 'class',
        values: [
          'caster',
          'defender',
          'guard',
          'striker',
          'supporter',
          'vanguard',
        ],
      },
    ],
    collectionConfig: {
      characters: {
        countOffset: -1,
        countLabel: 'P',
      },
      weapons: {
        countOffset: 0,
        countLabel: 'P',
      },
    },
    mappings: {
      characters: {
        matchedAs: 'character',
        storedAs: 'c',
      },
      weapons: {
        matchedAs: 'weapon',
        storedAs: 'w',
      },
    },
    rarities: [
      {
        name: '6',
        label: '6✦',
        styles: {
          text: 'text-rose-400',
          background: 'bg-rose-500',
          gradientFrom: 'from-rose-500',
          gradientTo: 'to-rose-500',
          border: 'border-rose-500',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]',
        },
      },
      {
        name: '5',
        label: '5✦',
        styles: {
          text: 'text-yellow-400',
          background: 'bg-yellow-500',
          gradientFrom: 'from-orange-500',
          gradientTo: 'to-yellow-500',
          border: 'border-yellow-500',
          glow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]',
        },
      },
      {
        name: '4',
        label: '4✦',
        styles: {
          text: 'text-purple-400',
          background: 'bg-purple-500',
          gradientFrom: 'from-indigo-500',
          gradientTo: 'to-purple-500',
          border: 'border-purple-500',
          glow: 'shadow-[0_0_10px_rgba(168,85,247,0.45)] hover:shadow-[0_0_15px_rgba(168,85,247,0.65)]',
        },
      },
    ],
  },
  {
    slug: 'zzz',
    name: 'Zenless Zone Zero',
    description: 'Open World Gacha Game',
    gachaTerm: 'Signal',
    image: '',
    website: 'https://zenless.hoyoverse.com/en-us/',
    developer: 'miHoYo',
    features: {
      import: true,
      manualEntry: false,
    },
    itemTypes: [
      {
        name: 'characters',
        label: 'Agents',
        icon: 'character',
        mappedTo: 'c',
        rarities: [
          '4',
          '3',
        ],
        attrs: [
          'attributes',
          'specialties',
        ],
        forceIds: true,
      },
      {
        name: 'weapons',
        label: 'W-Engines',
        icon: 'weapon',
        mappedTo: 'w',
        rarities: [
          '4',
          '3',
        ],
        attrs: [
          'specialties',
        ],
        forceIds: true,
      },
      {
        name: 'bangboo',
        label: 'Bangboo',
        icon: 'cat',
        mappedTo: 'b',
        rarities: [
          '4',
          '3',
        ],
        attrs: [],
        forceIds: true,
      },
    ],
    attrTypes: [
      {
        name: 'attributes',
        label: 'Attributes',
        icon: 'attributes',
        values: [
          'physical',
          'fire',
          'ice',
          'electric',
          'wind',
          'ether',
          'lumiflux',
        ],
      },
      {
        name: 'specialties',
        label: 'Specialties',
        icon: 'specialties',
        values: [
          'attack',
          'stun',
          'anomaly',
          'support',
          'defense',
          'rupture',
          'armorer',
        ],
      },
    ],
    collectionConfig: {
      characters: {
        countOffset: -1,
        countLabel: 'M',
      },
      weapons: {
        countOffset: 0,
        countLabel: 'P',
      },
      bangboo: {
        countOffset: 0,
        countLabel: 'L',
      },
    },
    mappings: {
      characters: {
        matchedAs: 'Agents',
        storedAs: 'c',
      },
      weapons: {
        matchedAs: 'W-Engine',
        storedAs: 'w',
      },
      bangboo: {
        matchedAs: 'Bangboo',
        storedAs: 'b',
      },
    },
    rarities: [
      {
        name: '4',
        label: 'S Rank',
        styles: {
          text: 'text-yellow-400',
          background: 'bg-yellow-500',
          gradientFrom: 'from-orange-500',
          gradientTo: 'to-yellow-500',
          border: 'border-yellow-500',
          glow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]',
        },
      },
      {
        name: '3',
        label: 'A Rank',
        styles: {
          text: 'text-purple-400',
          background: 'bg-purple-500',
          gradientFrom: 'from-indigo-500',
          gradientTo: 'to-purple-500',
          border: 'border-purple-500',
          glow: 'shadow-[0_0_10px_rgba(168,85,247,0.45)] hover:shadow-[0_0_15px_rgba(168,85,247,0.65)]',
        },
      },
      {
        name: '2',
        label: 'B Rank',
        styles: {
          text: 'text-blue-400',
          background: 'bg-blue-500',
          gradientFrom: 'from-blue-500',
          gradientTo: 'to-cyan-500',
          border: 'border-blue-500',
          glow: 'shadow-[0_0_8px_rgba(59,130,246,0.4)] hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]',
        },
      },
    ],
  },
];
