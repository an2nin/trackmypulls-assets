const WUWA = {
  "slug": "wuwa",
  "name": "Wuthering Waves",
  "description": "Open World Gacha Game",
  "gachaTerm": "Convene",
  "image": "",
  "website": "https://wutheringwaves.kurogames.com/en/main",
  "developer": "Kuro Games",
  "features": {
    "tracker": true,
    "collections": true,
    "import": true,
    "manualEntry": false
  },
  "itemTypes": [
    {
      "name": "characters",
      "label": "Resonators",
      "icon": "character",
      "rarities": [
        "5",
        "4"
      ],
      "attrs": [
        "elements",
        "weapons"
      ]
    },
    {
      "name": "weapons",
      "label": "Weapons",
      "icon": "weapon",
      "rarities": [
        "5",
        "4"
      ],
      "attrs": [
        "weapons"
      ]
    }
  ],
  "attrTypes": [
    {
      "name": "elements",
      "label": "Elements",
      "icon": "element",
      "values": [
        "aero",
        "electro",
        "fusion",
        "glacio",
        "havoc",
        "spectro"
      ]
    },
    {
      "name": "weapons",
      "label": "Weapon Types",
      "icon": "weapon",
      "values": [
        "broadblade",
        "gauntlets",
        "pistols",
        "rectifier",
        "sword"
      ]
    }
  ],
  "collectionConfig": {
    "characters": {
      "countOffset": -1,
      "countLabel": "S"
    },
    "weapons": {
      "countOffset": 0,
      "countLabel": "R"
    }
  },
  "mappings": {
    "characters": {
      "matchedAs": "resonator",
      "storedAs": "r"
    },
    "weapons": {
      "matchedAs": "weapon",
      "storedAs": "w"
    }
  },
  "rarityStyles": {
    "3": {
      "text": "text-blue-400",
      "background": "bg-blue-500",
      "gradientFrom": "from-blue-500",
      "gradientTo": "to-cyan-500",
      "border": "border-blue-500",
      "glow": "shadow-[0_0_8px_rgba(59,130,246,0.4)] hover:shadow-[0_0_12px_rgba(59,130,246,0.6)]"
    },
    "4": {
      "text": "text-purple-400",
      "background": "bg-purple-500",
      "gradientFrom": "from-indigo-500",
      "gradientTo": "to-purple-500",
      "border": "border-purple-500",
      "glow": "shadow-[0_0_10px_rgba(168,85,247,0.45)] hover:shadow-[0_0_15px_rgba(168,85,247,0.65)]"
    },
    "5": {
      "text": "text-yellow-400",
      "background": "bg-yellow-500",
      "gradientFrom": "from-orange-500",
      "gradientTo": "to-yellow-500",
      "border": "border-yellow-500",
      "glow": "shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]"
    }
  }
};

export default WUWA;
