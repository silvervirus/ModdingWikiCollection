
export interface Mods {
    ModName: string;
    Download: string;
    Image: string;
    Requirements: string[];
    Description: string;
	
}
export const ModData: {[name: string]: Mods[]} = {
  ["ECM"]: [
    {
      "ModName": "CameraDroneUpgrades",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832540/CameraDroneUpgrades.zip",
      "Image": "./Assets/CameraUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper"],
      "Description": "Another API for improving the camera drones. This mod by default also adds scanning functionality to all drones, without requiring an upgrade to be equipped. Any mod that uses this API will use an upgrade module that must be inserted into the scanner room upgrades slot in order for the drones to be able to use the upgrades."
    },
    {
      "ModName": "Camera Drone Defense Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832543/CameraDroneDefenseUpgrade.zip",
      "Image": ".Assets/DefenseUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to automatically shock creatures that attempt to grab the drone."
    },
    {
      "ModName": "Camera Drone Flight Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9841401/CameraDroneFlightUpgrade.zip",
      "Image": "./Assets/FlightUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to fly and have a hover."
    },
    {
      "ModName": "Camera Drone Repair Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832546/CameraDroneRepairUpgrade.zip",
      "Image": "./Assets/RepairUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to repair objects they are looking at."
    },
    {
      "ModName": "Camera Drone Shield Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832550/CameraDroneShieldUpgrade.zip",
      "Image": "./Assets/ShieldUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to use a small personal shield."
    },
    {
      "ModName": "Camera Drone Speed Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832552/CameraDroneSpeedUpgrade.zip",
      "Image": "./Assets/SpeedUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to use a speed boost at the cost of energy drain."
    },
    {
      "ModName": "Camera Drone Stasis Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832553/CameraDroneStasisUpgrade.zip",
      "Image": "./Assets/StasisUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to Deploy a stasis bubble around them. Drones are also immune to the stasis bubble while they have this module equipped."
    },
    {
      "ModName": "Camera Drone Stealth Upgrade",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/9832556/CameraDroneStealthUpgrade.zip",
      "Image": "./Assets/StealthUpgrade.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "CameraDroneUpgrades"],
      "Description": "uses Camera Drone Upgrades to add an upgrade module that allows drones to toggle a stealth mode, in which creatures can't target them or grab them. If a creature already detects the drone before activating stealth, it might continue to attack the drone though."
    },
    {
      "ModName": "Equippable Item Icons",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/10304452/EquippableItemIcons.zip",
      "Image": "./Assets/EQIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper"],
      "Description": "An API for creating new items and icons for said items. Very configurable, ask on discord for information on how to use. Still in progress, but it's basically done apart from adding new things and making sure its bug free. Any mod that uses this API will have an icon next to the quickslots for each equipped item with a special icon. This icon may or may not drain, depending on the mod it comes from."
    },
    {
      "ModName": "Armor Suit",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/files/10304456/ArmorSuit.zip",
      "Image": "./Assets/armorsuitIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "It's a suit that provides damage reduction. Wow, shocking. The twist is that it can only provide damage reduction to a single damage type at a time. So you're burning to death? Well the suit can offer you 90% heat resistance, but if you get bit by something you're taking that full damage. Or maybe you want to roll around taking 2-3 damage per bite, and laugh at everything brushing off you. Well if you get hit by something hot, or perhaps poisoned then you're now taking that full damage instead. This icon is by far the fanciest I've ever worked with. Hint; keep an eye on the icon on your hotbar when it switches damage types Speaking of switchin damage types, guess what you can do? Yea, switch damage types, how'd you know? There's two configs for the mod, one is the keybind, press this key and the suit will rotate to the next damage type in the sequence, and a config for whether or not the suit will auto adapt. auto adapting means that the suit will automatically change it's own damage type to react to whatever damage you're taking. Now, here's the downside, it only reacts after you have taken the damage. So if you're about to be bit, gotta switch to physical defense manually or you're gonna take that damage. Now, the second bite is gonna be a lot easier on you, cause the suit will automatically react to the bite and swap to the physical defense, but you're all on your own for that first bite. If you want to make full use of the suit, you need to be swapping the defense types manually, or you can just rely on the suit's auto adaptive capabilities to let yourself be lazy, at the expense of some health."
    },
    {
      "ModName": "Warp Chip",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689291/WarpChip.zip",
      "Image": "./Assets/WarpChipIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "adds a new equippable chip that warps you forward a slight distance, blueprint unlocks by scanning a warper. Key is configurable, distance is 15m out of base and 10m in base(configurable). Cooldown is 5 seconds (configurable) but is shortened if you don't teleport the full distance. Can also hold the warp key for about 5 seconds in order to teleport back to the last base you entered (including cyclops, and config for including lifepod)."
    },
    {
      "ModName": "Spy Watch",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689293/SpyWatch.zip",
      "Image": "./Assets/SpyWatchItem.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "Adds a new equippable watch(hud chip) that allows you to go invisible for a short amount of time. Creatures shouldn't be able to detect you while invisible, but if something saw you first they may still try to attack. The key is configurable, and after equipping the watch an icon should show up in the bottom right near the quickslots. When using the watch, the icon will slowly drain and this is your indication of how long you have left to be invisible."
    },
    {
      "ModName": "Burst Fins",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689294/BurstFins.zip",
      "Image": "./Assets/EQIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "Adds a new set of fins as an upgrade to the ultra glide fins. These ones have a short lasting but quick charging battery that can allow for short bursts of incredible speed even while using the seaglide"
    },
    {
      "ModName": "Shield Suit",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689295/ShieldSuit.zip",
      "Image": "./Assets/EQIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "Adds a new suit that allows for the use of a toggleable personal shield. Doesn't last forever, but lasts long enough and recharges pretty quickly."
    },
    {
      "ModName": "Miniature Suit",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689299/MiniatureSuit.zip",
      "Image": "./Assets/minisuititem.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "Simple mod. Equip suit, press button, now smol ryley. Press button again, normal ryley."
    },
    {
      "ModName": "Stasis Suit",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689300/StasisSuit.zip",
      "Image": "./Assets/stasissuititem.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "This suit uses Stasis rifle technology to temporarily freeze internal organs in time, halting natural resource consumption. Meaning this suit can, temporarily, stop all need for food, water, oxygen, and even stop you from getting hurt!"
    },
    {
      "ModName": "Time Control Suit",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689301/TimeControlSuit.zip",
      "Image": "./Assets/timesuititem.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "This suit uses Stasis rifle technology but brings it to the max. For a very short amount of time, with a fairly long cooldown, can completely stop time itself all around you, while still allowing you to remain free. It's unknown exactly who made this suit, all you know is it randomly appeared in your blueprints once finding an ion cube and you can't possibly pass it up."
    },
    {
      "ModName": "Sonar Chip",
      "Download": "https://github.com/Nagorogan/My-Subnautica-Mods/files/9689297/SonarChip.zip",
      "Image": "./Assets/SonarChipIcon.png",
      "Requirements": ["Qmodmanager", "Smlhelper", "EquippableItemIcons"],
      "Description": "Adds a new equippable chip that can be activated to let out a sonar burst. Has five charges that slowly regenerate and has a one second delay after use before recharge will begin."
    },
    {
      "ModName": "ESM's Other Legacy Mods",
      "Download": "https://github.com/EldritchCarMaker/My-Subnautica-Mods/blob/main/SubnauticaMods.md",
      "Image": "https://cdn.discordapp.com/avatars/831659483276247050/0c8ab782713c46f222f97388b8fbbbe6?size=1024",
      "Requirements": ["Qmodmanager", "Smlhelper"],
      "Description": "EldritchCarMaker rest of their legacy mods"
    }
  ]
}

		
	

