var CONFIG = {
	tileSize: 16,
	tileGap: 0,
	debug: false,
	playerRoundDelay: 140,
	enemyRoundDelay: 100,
	playerMoveDuration: 130,
	enemyMoveDuration: 100,
	animFrameDuration: 64,
	// Not really correct/reliable, but detecting touch screen is currently impossible
	touch: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
};

// User settings, saved to localStorage
var SETTINGS = {
	sounds: true,
	vibration: true,
	tileMag: 2
};

var TILES = {
	empty: {
		tileCoords: [ 0, 23 ], walkable: false, transparent: false,
		desc: "Nothing"
	},
	grass_plain: {
		tileCoords: [ 0, 0 ], walkable: true, transparent: true,
		desc: "Grass"
	},
	grass_little: {
		tileCoords: [ 1, 0 ], walkable: true, transparent: true,
		desc: "Grass"
	},
	grass_lots: {
		tileCoords: [ 2, 0 ], walkable: true, transparent: true,
		desc: "Grass"
	},
	grass_dark: {
		tileCoords: [ 7, 0 ], walkable: true, transparent: true,
		desc: "Grass"
	},
	grass_darker: {
		tileCoords: [ 6, 0 ], walkable: true, transparent: true,
		desc: "Grass"
	},
	floor_wood: {
		tileCoords: [ 0, 1 ], walkable: true, transparent: true,
		desc: "Wooden floor"
	},
	floor_wood2: {
		tileCoords: [ 1, 1 ], walkable: true, transparent: true,
		desc: "Wooden floor"
	},
	floor_sand_a: {
		tileCoords: [ 0, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_b: {
		tileCoords: [ 1, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_c: {
		tileCoords: [ 2, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_d: {
		tileCoords: [ 3, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_rock1: {
		tileCoords: [ 4, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_rock2: {
		tileCoords: [ 5, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_rock3: {
		tileCoords: [ 6, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_rock4: {
		tileCoords: [ 7, 3 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_alt: {
		tileCoords: [ 0, 2 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_sand_dunes: {
		tileCoords: [ 1, 2 ], walkable: true, transparent: true,
		desc: "Sand"
	},
	floor_tiles: {
		tileCoords: [ 3, 1 ], walkable: true, transparent: true,
		desc: "Floor tiling"
	},
	floor_cobblestone: {
		tileCoords: [ 0, 6 ], walkable: true, transparent: true,
		desc: "Cobblestone"
	},
	floor_cobblestone2: {
		tileCoords: [ 1, 6 ], walkable: true, transparent: true,
		desc: "Cobblestone"
	},
	floor_marble_a: {
		tileCoords: [ 6, 7 ], walkable: true, transparent: true,
		desc: "Marble floor"
	},
	floor_marble_b: {
		tileCoords: [ 7, 7 ], walkable: true, transparent: true,
		desc: "Marble floor"
	},
	floor_marble_c: {
		tileCoords: [ 6, 8 ], walkable: true, transparent: true,
		desc: "Marble floor"
	},
	floor_marble_d: {
		tileCoords: [ 7, 8 ], walkable: true, transparent: true,
		desc: "Marble floor"
	},
	wall_stone: {
		tileCoords: [ 2, 5 ], walkable: false, transparent: false,
		desc: "Stone wall"
	},
	wall_stone2: {
		tileCoords: [ 7, 5 ], walkable: false, transparent: false,
		desc: "Stone wall"
	},
	wall_stone_blue1: {
		tileCoords: [ 3, 6 ], walkable: false, transparent: false,
		desc: "Stone wall"
	},
	wall_stone_blue2: {
		tileCoords: [ 4, 6 ], walkable: false, transparent: false,
		desc: "Stone wall"
	},
	wall_stone_classy: {
		tileCoords: [ 6, 6 ], walkable: false, transparent: false,
		desc: "Stone wall"
	},
	wall_stone_old: {
		tileCoords: [ 1, 4 ], walkable: false, transparent: false,
		desc: "Old stone wall"
	},
	wall_stone_old_small: {
		tileCoords: [ 0, 4 ], walkable: false, transparent: false,
		desc: "Old stone wall"
	},
	wall_bricks: {
		tileCoords: [ 1, 5 ], walkable: false, transparent: false,
		desc: "Brick wall"
	},
	wall_mossy: {
		tileCoords: [ 0, 5 ], walkable: false, transparent: false,
		desc: "Mossy stone wall"
	},
	wall_rocks: {
		tileCoords: [ 3, 5 ], walkable: false, transparent: false,
		desc: "Rocky wall"
	},
	wall_rocks2: {
		tileCoords: [ 4, 5 ], walkable: false, transparent: false,
		desc: "Rocky wall"
	},
	wall_rocks3: {
		tileCoords: [ 5, 5 ], walkable: false, transparent: false,
		desc: "Rocky wall"
	},
	wall_logs: {
		tileCoords: [ 6, 5 ], walkable: false, transparent: false,
		desc: "Log wall"
	},
	wall_water: {
		tileCoords: [ 7, 2 ], walkable: false, transparent: true,
		desc: "Water"
	},
	wall_lava: {
		tileCoords: [ 4, 12 ], walkable: false, transparent: true,
		desc: "Hot lava"
	},
	wall_lava2: {
		tileCoords: [ 5, 12 ], walkable: false, transparent: true,
		desc: "Hot lava"
	},
	door_wood: {
		tileCoords: [ 8, 0 ], walkable: true, transparent: false,
		desc: "Closed wooden door, can be opened"
	},
	door_wood_open: {
		tileCoords: [ 8, 2 ], walkable: true, transparent: true,
		desc: "Open wooden door"
	},
	door_metal: {
		tileCoords: [ 9, 0 ], walkable: true, transparent: false,
		desc: "Locked metal door"
	},
	door_metal_open: {
		tileCoords: [ 9, 2 ], walkable: true, transparent: true,
		desc: "Open metal door"
	},
	stairs_down: {
		tileCoords: [ 10, 1 ], walkable: true, transparent: true,
		desc: "Stairs leading to a deeper level"
	},
	stairs_up: {
		tileCoords: [ 10, 0 ], walkable: true, transparent: true,
		desc: "Stairs leading upwards"
	},

	pot: {
		tileCoords: [ 12, 0 ], walkable: true, transparent: true,
		desc: "Clay pot"
	},
	chest: {
		tileCoords: [ 11, 0 ], walkable: true, transparent: true,
		desc: "Chest"
	},
	chest_open: {
		tileCoords: [ 11, 2 ], walkable: true, transparent: true,
		desc: "Open chest"
	},

	flowers: {
		tileCoords: [ 3, 0 ], walkable: true, transparent: true,
		desc: "Some nice flowers"
	},
	bush: {
		tileCoords: [ 19, 0 ], walkable: true, transparent: true,
		desc: "Bush"
	},
	tree: {
		tileCoords: [ 19, 1 ], walkable: false, transparent: true,
		desc: "Tree"
	},
	tree2: {
		tileCoords: [ 19, 2 ], walkable: false, transparent: true,
		desc: "Tree"
	},
	tree3: {
		tileCoords: [ 19, 3 ], walkable: false, transparent: true,
		desc: "Tree"
	},
	rocks: {
		tileCoords: [ 19, 5 ], walkable: false, transparent: true,
		desc: "Rocks"
	},
	well: {
		tileCoords: [ 16, 0 ], walkable: false, transparent: true,
		desc: "Well, probably dry"
	},
	pillar: {
		tileCoords: [ 16, 1 ], walkable: false, transparent: true,
		desc: "Pillar"
	},
	statue: {
		tileCoords: [ 16, 2 ], walkable: false, transparent: true,
		desc: "Cool statue"
	},
	cupboard: {
		tileCoords: [ 16, 3 ], walkable: false, transparent: true,
		desc: "Cupboard"
	},
	table: {
		tileCoords: [ 14, 1 ], walkable: false, transparent: true,
		desc: "Table"
	},

	altar: {
		tileCoords: [ 8, 7 ], walkable: true, transparent: true,
		desc: "Gods offer favors for sacrifices on this altar",
		anim: [ [ 8, 7 ], [ 9, 7 ], [ 10, 7 ] ], shop: true
	},
	altar_used: {
		tileCoords: [ 8, 6 ], walkable: true, transparent: true,
		desc: "No more sacrifices on this altar",
		anim: [ [ 8, 7 ], [ 9, 7 ], [ 10, 7 ] ]
	},
	key: {
		tileCoords: [ 8, 8 ], walkable: true, transparent: true,
		desc: "A key opens any one locked door"
	},
	coin: {
		tileCoords: [ 8, 9 ], walkable: true, transparent: true,
		desc: "A coin, can be sacrificed on altars"
	},
	gem: {
		tileCoords: [ 11, 9 ], walkable: true, transparent: true,
		desc: "A pretty gem, can be sacrificed on altars"
	},
	ring: {
		tileCoords: [ 14, 9 ], walkable: true, transparent: true,
		desc: "Token of Victory!"
	},
	potion_health: {
		name: "health potion", desc: "Health potion restores one heart",
		tileCoords: [ 8, 13 ], walkable: true, transparent: true
	},

	player_male: {
		tileCoords: [ 24, 0 ], walkable: false, transparent: true,
		desc: "That's you!",
		anim: [ [ 23, 0 ], [ 24, 0 ], [ 25, 0 ], [ 24, 0 ] ]
	},
	player_female: {
		tileCoords: [ 27, 0 ], walkable: false, transparent: true,
		desc: "That's you!",
		anim: [ [ 26, 0 ], [ 27, 0 ], [ 28, 0 ], [ 27, 0 ] ]
	},

	skeleton: {
		tileCoords: [ 30, 0 ], walkable: false, transparent: true,
		anim: [ [ 29, 0 ], [ 30, 0 ], [ 31, 0 ], [ 30, 0 ] ]
	},
	slime: {
		tileCoords: [ 24, 2 ], walkable: false, transparent: true,
		anim: [ [ 23, 2 ], [ 24, 2 ], [ 25, 2 ], [ 24, 2 ] ]
	},
	bat: {
		tileCoords: [ 24, 1 ], walkable: false, transparent: true,
		anim: [ [ 23, 1 ], [ 24, 1 ], [ 25, 1 ], [ 24, 1 ] ]
	},
	ghost: {
		tileCoords: [ 27, 1 ], walkable: false, transparent: true,
		anim: [ [ 26, 1 ], [ 27, 1 ], [ 28, 1 ], [ 27, 1 ] ]
	},
	spider: {
		tileCoords: [ 30, 1 ], walkable: false, transparent: true,
		anim: [ [ 29, 1 ], [ 30, 1 ], [ 31, 1 ], [ 30, 1 ] ]
	},
	goblin: {
		tileCoords: [ 27, 2 ], walkable: false, transparent: true,
		anim: [ [ 26, 2 ], [ 27, 2 ], [ 28, 2 ], [ 27, 2 ] ]
	},
	rat: {
		tileCoords: [ 30, 2 ], walkable: false, transparent: true,
		anim: [ [ 29, 2 ], [ 30, 2 ], [ 31, 2 ], [ 30, 2 ] ]
	},
	golem: {
		tileCoords: [ 24, 3 ], walkable: false, transparent: true,
		anim: [ [ 23, 3 ], [ 24, 3 ], [ 25, 3 ], [ 24, 3 ] ]
	},
	mummy: {
		tileCoords: [ 27, 3 ], walkable: false, transparent: true,
		anim: [ [ 26, 3 ], [ 27, 3 ], [ 28, 3 ], [ 27, 3 ] ]
	},
	skull: {
		tileCoords: [ 30, 3 ], walkable: false, transparent: true,
		anim: [ [ 29, 3 ], [ 30, 3 ], [ 31, 3 ], [ 30, 3 ] ]
	},

	tileset: null,
	tileArray: [],
	tilemap: {} // Obsolete
};

(function() {
	TILES.tileset = document.createElement("img");
	TILES.tileset.src = "assets/tileset.png";
	for (var i in TILES) {
		var tile = TILES[i];
		if (!tile.tileCoords) continue;
		tile.id = i;
		tile.name = tile.name || i;
		tile.name = tile.name[0].toUpperCase() + tile.name.substr(1);
		tile.ch = TILES.tileArray.length;
		tile.tileCoords[0] *= (CONFIG.tileSize + CONFIG.tileGap);
		tile.tileCoords[1] *= (CONFIG.tileSize + CONFIG.tileGap);
		if (tile.anim) {
			for (var a = 0; a < tile.anim.length; ++a) {
				tile.anim[a][0] *= (CONFIG.tileSize + CONFIG.tileGap);
				tile.anim[a][1] *= (CONFIG.tileSize + CONFIG.tileGap);
			}
		}
		TILES.tileArray.push(tile);
	}
})();


var MOBS = {
	skeleton: {
		name: "Skeleton", ch: TILES.skeleton.ch, ai: "hunter",
		desc: "Dangerous and rather scary",
		health: 3, vision: 9, speed: 1,
		loot: TILES.coin, lootChance: 0.5
	},
	slime: {
		name: "Slime", ch: TILES.slime.ch, ai: "hunter",
		desc: "Disgusting but thankfully very slow",
		health: 3, vision: 5, speed: 0.5,
		loot: TILES.potion_health, lootChance: 0.333
	},
	bat: {
		name: "Giant Bat", ch: TILES.bat.ch, ai: "hunter",
		desc: "Easy to kill and has bad vision, but they are fast and plentyful",
		health: 1, vision: 4, speed: 1.5,
		loot: TILES.potion_health, lootChance: 0.333
	},
	ghost: {
		name: "Ghost", ch: TILES.ghost.ch, ai: "hunter",
		desc: "Dangerous and scary",
		health: 2, vision: 9, speed: 1,
		loot: TILES.gem, lootChance: 0.333
	},
	spider: {
		name: "Giant Spider", ch: TILES.spider.ch, ai: "hunter",
		desc: "Dangerous, scary and fast",
		health: 2, vision: 7, speed: 1.2,
		loot: TILES.coin, lootChance: 0.4
	},
	goblin: {
		name: "Goblin", ch: TILES.goblin.ch, ai: "hunter",
		desc: "Tough enemy",
		health: 4, vision: 8, speed: 1,
		loot: TILES.coin, lootChance: 1
	},
	rat: {
		name: "Giant rat", ch: TILES.rat.ch, ai: "hunter",
		desc: "Weak enemy with poor vision",
		health: 1, vision: 3, speed: 1,
		loot: TILES.coin, lootChance: 0.4
	},
	golem: {
		name: "Rock Golem", ch: TILES.golem.ch, ai: "hunter",
		desc: "Extremely tough and strong, but thankfully slow and doesn't see far",
		health: 8, vision: 3, speed: 0.5, criticalChance: 0.6,
		loot: TILES.potion_health, lootChance: 1
	},
	mummy: {
		name: "Mummy", ch: TILES.mummy.ch, ai: "hunter",
		desc: "Scary and semi-dangerous",
		health: 2, vision: 3, speed: 0.75,
		loot: TILES.coin, lootChance: 0.5
	},
	skull: {
		name: "Flaming Skull", ch: TILES.skull.ch, ai: "hunter",
		desc: "Super fast and difficult to kill",
		health: 6, vision: 3, speed: 2, criticalChance: 0.2,
		loot: TILES.gem, lootChance: 1
	}
};

(function() {
	for (var i in MOBS)
		MOBS[i].id = i;
})();


var SOUNDS = {
	click: {
		src: "assets/sounds/click"
	},
	pickup: {
		src: "assets/sounds/pickup"
	},
	powerup: {
		src: "assets/sounds/powerup"
	},
	door_locked: {
		src: "assets/sounds/door_locked"
	},
	door_open: {
		src: "assets/sounds/door_open"
	},
	hit: {
		src: "assets/sounds/hit"
	},
	miss: {
		src: "assets/sounds/miss"
	}
};

(function() {
	var format = ".ogg";
	if (document.createElement("audio").canPlayType("audio/mp3"))
		format = ".mp3";
	for (var i in SOUNDS) {
		SOUNDS[i].id = i;
		SOUNDS[i].audio = new Audio(SOUNDS[i].src + format);
	}
})();

var PERKS = [
	{
		name: "Health",
		desc: 'Restores full health. Cost <span class="sprite coin"></span> 5',
		isAvailable: function(actor) { return actor.health < actor.maxHealth; },
		canGet: function(actor) { return actor.coins >= 5; },
		get: function(actor) { actor.coins -= 5; actor.health = actor.maxHealth; }
	},{
		name: "Vitality",
		desc: 'Increases maximum health. Cost <span class="sprite gem"></span> 2',
		isAvailable: function(actor) { return true; },
		canGet: function(actor) { return actor.gems >= 2; },
		get: function(actor) { actor.gems -= 2; actor.health += 1; actor.maxHealth += 2; }
	},{
		name: "Strength",
		desc: 'Increases critical hit chance, which doubles damage.' +
			' Cost <span class="sprite gem"></span> 2',
		isAvailable: function(actor) { return actor.criticalChance < 0.9; },
		canGet: function(actor) { return actor.gems >= 2; },
		get: function(actor) { actor.gems -= 2; actor.criticalChance += 0.15; }
	},{
		name: "Swiftness",
		desc: 'Increases your speed, which periodically results in extra turns.' +
			' Cost <span class="sprite gem"></span> 2',
		isAvailable: function(actor) { return actor.speed < 3; },
		canGet: function(actor) { return actor.gems >= 2; },
		get: function(actor) { actor.gems -= 2; actor.speed += 0.2; }
	},{
		name: "Dexterity",
		desc: 'Increases your chance to hit. Cost <span class="sprite gem"></span> 3',
		isAvailable: function(actor) { return actor.dexterity < 0.8; },
		canGet: function(actor) { return actor.gems >= 3; },
		get: function(actor) { actor.gems -= 3; actor.dexterity += 0.15; }
	},{
		name: "Eagle Eyes",
		desc: 'You can see further. Cost <span class="sprite coin"></span> 3',
		isAvailable: function(actor) { return actor.vision < 10; },
		canGet: function(actor) { return actor.coins >= 3; },
		get: function(actor) { actor.coins -= 3; actor.vision += 2; }
	},{
		name: "Luck",
		desc: 'Increases the chance of monsters dropping loot.' +
			' Cost <span class="sprite coin"></span> 5',
		isAvailable: function(actor) { return actor.luck < 0.4; },
		canGet: function(actor) { return actor.coins >= 5; },
		get: function(actor) { actor.coins -= 5; actor.luck += 0.2; }
	},{
		name: "Drain",
		desc: 'Adds a chance to heal you a bit by draining power from kills.' +
			' Not at all black magic. Cost <span class="sprite gem"></span> 3',
		isAvailable: function(actor) { return actor.drainChance < 1; },
		canGet: function(actor) { return actor.gems >= 3; },
		get: function(actor) { actor.gems -= 3; actor.drainChance += 0.35; }
	},{
		name: "Clairvoyant",
		desc: 'Always see where the stairs are. Cost <span class="sprite coin"></span> 3',
		isAvailable: function(actor) { return !actor.clairvoyant; },
		canGet: function(actor) { return actor.coins >= 3; },
		get: function(actor) { actor.coins -= 3; actor.clairvoyant = true; }
	},{
		name: "Monster Mind",
		desc: 'Telepathically see monsters through the walls. Cost <span class="sprite coin"></span> 5',
		isAvailable: function(actor) { return !actor.monsterMind; },
		canGet: function(actor) { return actor.coins >= 5; },
		get: function(actor) { actor.coins -= 5; actor.monsterMind = true; }
	},{
		name: "Stealth",
		desc: 'Enemies have a harder time spotting you. Cost <span class="sprite coin"></span> 3',
		isAvailable: function(actor) { return actor.stealth < 2; },
		canGet: function(actor) { return actor.coins >= 3; },
		get: function(actor) { actor.coins -= 3; actor.stealth += 1; }
	}
];

var LEVELS = [
	{
		name: "Start Area",
		desc: "What a lovely forest clearing. But down leads the journey, monsters are waiting!",
		generator: "arena",
		width: 20,
		height: 15,
		altar: false,
		wallOnStaticLayer: true,
		wall: [ TILES.tree, TILES.tree2, TILES.tree3 ],
		floor: [ TILES.grass_plain, TILES.grass_plain, TILES.grass_plain, TILES.grass_little, TILES.grass_little, TILES.grass_lots ],
		decor: [ TILES.flowers, TILES.flowers, TILES.bush, TILES.bush, TILES.rocks, TILES.tree, TILES.tree2, TILES.tree3 ],
		decorAmount: 30,
		mobs: [],
		mobAmount: 0,
		items: [ TILES.coin ],
		itemAmount: 1
	},{
		name: "Log House",
		desc: "Curiously, you arrive at an underground log house.",
		generator: "dungeon",
		width: 40,
		height: 20,
		wall: [ TILES.wall_logs ],
		floor: [ TILES.floor_wood ],
		decor: [ TILES.table, TILES.cupboard, TILES.pot ],
		decorAmount: [ 15, 20 ],
		mobs: [ MOBS.rat, MOBS.rat, MOBS.rat, MOBS.bat ],
		mobAmount: [4, 5],
		items: [ TILES.potion_health, TILES.coin, TILES.coin, TILES.coin ],
		itemAmount: [ 4, 5 ]
	},{
		name: "Small Maze",
		desc: "Argh, I hate mazes! Thankfully this doesn't look that big.",
		generator: "maze",
		width: [ 20, 25 ],
		height: [ 20, 25 ],
		wall: [ TILES.wall_stone2 ],
		floor: [ TILES.floor_tiles ],
		decor: [ ],
		decorAmount: 0,
		mobs: [ MOBS.ghost, MOBS.slime ],
		mobAmount: [ 4, 5 ],
		items: [ TILES.coin, TILES.gem ],
		itemAmount: [ 4, 6 ]
	},{
		name: "Sand cave",
		desc: "There is fine sand everywhere. No idea how they've formed dunes though, because there is no wind here.",
		generator: "cave",
		width: 40,
		height: 20,
		wall: [ TILES.wall_rocks3 ],
		floor: [ TILES.floor_sand_dunes ],
		decor: [ TILES.rocks ],
		decorAmount: [ 30, 35 ],
		mobs: [ MOBS.spider, MOBS.mummy ],
		mobAmount: [ 5, 6 ],
		items: [ TILES.potion_health, TILES.coin, TILES.gem, TILES.gem ],
		itemAmount: [ 4, 6 ]
	},{
		name: "Prison",
		desc: "This looks like an old prison. Better be careful.",
		generator: "dungeon",
		width: 45,
		height: 35,
		roomWidth: [ 3, 5 ],
		roomHeight: [ 2, 5 ],
		dugPercentage: 0.5,
		wall: [ TILES.wall_stone_old ],
		floor: [ TILES.floor_tiles ],
		decor: [ TILES.pot ],
		decorAmount: [ 5, 8 ],
		mobs: [ MOBS.skeleton, MOBS.mummy, MOBS.ghost, MOBS.rat ],
		mobAmount: [ 9, 12 ],
		items: [ TILES.potion_health, TILES.coin, TILES.coin, TILES.coin ],
		itemAmount: [ 5, 7 ]
	},{
		name: "Underground Garden",
		desc: "What a surprise, an underground garden. It is wonderful how these plants can grow here beneath the surface.",
		generator: "cave",
		width: 30,
		height: 30,
		wall: [ TILES.wall_water ],
		floor: [ TILES.grass_dark ],
		decor: [ TILES.well, TILES.statue, TILES.bush, TILES.bush, TILES.rocks, TILES.tree, TILES.tree2, TILES.tree3 ],
		decorAmount: 50,
		mobs: [ MOBS.spider, MOBS.spider, MOBS.goblin, MOBS.golem ],
		mobAmount: [ 2, 3 ],
		items: [ TILES.potion_health, TILES.potion_health, TILES.potion_health, TILES.gem ],
		itemAmount: [ 5, 6 ]
	},{
		name: "Another Sand Cave",
		desc: "Sand again. Familiar stuff.",
		generator: "cave",
		width: 50,
		height: 40,
		wall: [ TILES.wall_rocks2 ],
		floor: [ TILES.floor_sand_a, TILES.floor_sand_b, TILES.floor_sand_c, TILES.floor_sand_d ],
		decor: [ TILES.floor_sand_rock1, TILES.floor_sand_rock2, TILES.floor_sand_rock3, TILES.floor_sand_rock4 ],
		decorAmount: [ 40, 50 ],
		mobs: [ MOBS.spider, MOBS.bat, MOBS.slime ],
		mobAmount: [ 8, 10 ],
		items: [ TILES.potion_health, TILES.coin, TILES.gem, TILES.gem ],
		itemAmount: [ 6, 8 ]
	},{
		name: "City",
		desc: "Vast underground city - infested with goblins.",
		generator: "dungeon",
		width: [ 45, 55 ],
		height: [ 40, 50 ],
		roomWidth: [ 6, 10 ],
		roomHeight: [ 4, 10 ],
		corridorLength: [ 3, 6 ],
		dugPercentage: 0.4,
		wall: [ TILES.wall_stone_blue1, TILES.wall_stone_blue2 ],
		floor: [ TILES.floor_marble_a, TILES.floor_marble_b, TILES.floor_marble_c, TILES.floor_marble_d ],
		decor: [ TILES.pillar, TILES.pillar, TILES.statue, TILES.statue, TILES.well, TILES.pot, TILES.chest ],
		decorAmount: [ 30, 35 ],
		mobs: [ MOBS.goblin, MOBS.goblin, MOBS.goblin, MOBS.golem ],
		mobAmount: [ 10, 14 ],
		items: [ TILES.potion_health, TILES.coin, TILES.gem, TILES.gem ],
		itemAmount: [ 15, 20 ]
	},{
		name: "Lava Maze",
		desc: "It's hot in here.",
		generator: "maze",
		width: 40,
		height: 30,
		wall: [ TILES.wall_lava, TILES.wall_lava2 ],
		floor: [ TILES.floor_cobblestone, TILES.floor_cobblestone2 ],
		decor: [ ],
		decorAmount: 0,
		mobs: [ MOBS.skull, MOBS.golem ],
		mobAmount: [ 5, 6 ],
		items: [ TILES.gem ],
		itemAmount: [ 3, 4 ]
	},{
		name: "Lava Cave",
		desc: "It's really hot in here.",
		generator: "cave",
		width: 40,
		height: 30,
		wall: [ TILES.wall_lava, TILES.wall_lava2 ],
		floor: [ TILES.floor_cobblestone, TILES.floor_cobblestone2 ],
		decor: [ TILES.rocks ],
		decorAmount: [ 30, 35 ],
		mobs: [ MOBS.skull, MOBS.skull, MOBS.skull, MOBS.golem, MOBS.golem ],
		mobAmount: [ 6, 7 ],
		items: [ TILES.gem ],
		itemAmount: [ 4, 6 ]
	},{
		name: "End Area",
		desc: "Yay, the end has been reached!",
		generator: "arena",
		width: 20,
		height: 15,
		altar: false,
		wallOnStaticLayer: true,
		wall: [ TILES.wall_stone_classy ],
		floor: [ TILES.floor_cobblestone, TILES.floor_cobblestone2 ],
		decor: [ TILES.chest, TILES.chest_open, TILES.pot, TILES.statue ],
		decorAmount: 10,
		mobs: [],
		mobAmount: 0,
		items: [ TILES.coin, TILES.gem ],
		itemAmount: 20
	}
];

(function() {
	for (var i = 0; i < LEVELS.length; ++i)
		LEVELS[i].id = i;
})();
