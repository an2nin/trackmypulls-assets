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
  "rarities": {
    "3": {
      "colors": "blue"
    },
    "4": {
      "colors": "purple"
    },
    "5": {
      "colors": "yellow"
    }
  }
} as const;

export default WUWA;
