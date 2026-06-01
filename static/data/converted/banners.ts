const BANNERS = {
  "wuwa": [
    {
      "id": "featured_resonator",
      "pool_id": 1,
      "name": "Featured Resonator",
      "currency": "radiant_tide",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "featured_weapon",
      "pool_id": 2,
      "name": "Featured Weapon",
      "currency": "forging_tide",
      "duration": "limited",
      "icon": "weapon",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "standard_resonator",
      "pool_id": 3,
      "name": "Standard Resonator",
      "currency": "lustrous_tide",
      "duration": "permanent",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "standard_weapon",
      "pool_id": 4,
      "name": "Standard Weapon",
      "currency": "lustrous_tide",
      "duration": "permanent",
      "icon": "weapon",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "beginner",
      "pool_id": 5,
      "name": "Beginner",
      "currency": "lustrous_tide",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 50
      },
      "isHidden": true,
      "topResetPityForAll": true
    },
    {
      "id": "beginner_choice",
      "pool_id": 6,
      "name": "Beginner Choice",
      "currency": "lustrous_tide",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 10,
        "5": 80
      },
      "isHidden": true,
      "topResetPityForAll": true
    },
    {
      "id": "giveback_event",
      "pool_id": 7,
      "name": "Giveback Event",
      "currency": "lustrous_tide",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "4": 0,
        "5": 1
      },
      "isHidden": true,
      "topResetPityForAll": true
    }
  ],
  "endfield": [
    {
      "id": "special",
      "pool_id": "E_CharacterGachaPoolType_Special",
      "name": "Chartered Headhunting",
      "currency": "chartered_hh_permit",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "5": 10,
        "6": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "joint",
      "pool_id": "E_CharacterGachaPoolType_Joint",
      "name": "Rerun Headhunting",
      "currency": "chartered_hh_permit",
      "duration": "limited",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "5": 10,
        "6": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "arsenal",
      "pool_id": "E_CharacterGachaPoolType_Arsenal",
      "name": "Arsenal Issues",
      "currency": "arsenal_ticket",
      "duration": "limited",
      "icon": "weapon",
      "rate": 4,
      "pityMaxByRarity": {
        "5": 10,
        "6": 40
      },
      "topResetPityForAll": true,
      "canSplitBannersBy": "b"
    },
    {
      "id": "standard",
      "pool_id": "E_CharacterGachaPoolType_Standard",
      "name": "Basic Headhunting",
      "currency": "basic_hh_permit",
      "duration": "permanent",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "5": 10,
        "6": 80
      },
      "topResetPityForAll": true
    },
    {
      "id": "beginner",
      "pool_id": "E_CharacterGachaPoolType_Beginner",
      "name": "New Horizons Headhunting",
      "currency": "new_horizons_hh_permit",
      "duration": "permanent",
      "icon": "character",
      "rate": 0.8,
      "pityMaxByRarity": {
        "5": 10,
        "6": 40
      },
      "topResetPityForAll": true
    }
  ]
};

export default BANNERS;
