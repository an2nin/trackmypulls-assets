const ENDFIELD = {
  "slug": "endfield",
  "name": "Arknights: Endfield",
  "description": "Open World Gacha Game",
  "gachaTerm": "Headhunt",
  "image": "",
  "website": "https://endfield.gryphline.com/en-us",
  "developer": "Gryphline",
  "features": {
    "tracker": true,
    "collections": true,
    "import": true,
    "manualEntry": false
  },
  "itemTypes": [
    {
      "name": "characters",
      "label": "operator",
      "icon": "character",
      "rarities": [
        "6",
        "5"
      ],
      "attrs": [
        "elements",
        "weapons",
        "classes"
      ]
    },
    {
      "name": "weapons",
      "label": "weapon",
      "icon": "weapon",
      "rarities": [
        "6",
        "5"
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
        "cyro",
        "electric",
        "heat",
        "nature",
        "physical"
      ]
    },
    {
      "name": "weapons",
      "label": "Weapon Types",
      "icon": "weapon",
      "values": [
        "arts unit",
        "greatsword",
        "handcannon",
        "polearm",
        "sword"
      ]
    },
    {
      "name": "classes",
      "label": "Class Types",
      "icon": "class",
      "values": [
        "caster",
        "defender",
        "guard",
        "striker",
        "supporter",
        "vanguard"
      ]
    }
  ],
  "collectionConfig": {
    "characters": {
      "countOffset": -1,
      "countLabel": "P"
    },
    "weapons": {
      "countOffset": 0,
      "countLabel": "P"
    }
  },
  "mappings": {
    "characters": {
      "matchedAs": "character",
      "storedAs": "c"
    },
    "weapons": {
      "matchedAs": "weapon",
      "storedAs": "w"
    }
  },
  "rarities": [
    {
      "name": "6",
      "label": "6★",
      "styles": {
        "text": "text-rose-400",
        "background": "bg-rose-500",
        "gradientFrom": "from-rose-500",
        "gradientTo": "to-rose-500",
        "border": "border-rose-500",
        "glow": "shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]"
      }
    },
    {
      "name": "5",
      "label": "5★",
      "styles": {
        "text": "text-yellow-400",
        "background": "bg-yellow-500",
        "gradientFrom": "from-orange-500",
        "gradientTo": "to-yellow-500",
        "border": "border-yellow-500",
        "glow": "shadow-[0_0_15px_rgba(234,179,8,0.5)] hover:shadow-[0_0_20px_rgba(234,179,8,0.7)]"
      }
    },
    {
      "name": "4",
      "label": "4★",
      "styles": {
        "text": "text-purple-400",
        "background": "bg-purple-500",
        "gradientFrom": "from-indigo-500",
        "gradientTo": "to-purple-500",
        "border": "border-purple-500",
        "glow": "shadow-[0_0_10px_rgba(168,85,247,0.45)] hover:shadow-[0_0_15px_rgba(168,85,247,0.65)]"
      }
    }
  ]
};


export default ENDFIELD;
