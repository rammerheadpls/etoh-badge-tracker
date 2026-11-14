// Badge categories, in display order. A line starting with "# " begins a category.
//   T:Name / S:Name / C:Name  -> "Tower of" / "Steeple of" / "Citadel of" Name (Roblox badge: "Beat The Tower of Name")
//   Title|Roblox badge name   -> custom title, with the Roblox badge name as its description
//   Plain name                -> shown as-is with no description (event badges)
const raw = `
# Tower Counts
Play The Game|You played the game!
Beat A Tower|Beat Your First Tower
Beat 10 Towers|Beat 10 Towers
Beat 25 Towers|Beat 25 Towers
Beat 50 Towers|Beat 50 Towers
Beat 75 Towers|Beat 75 Towers
Beat 100 Towers|Beat 100 Towers
Beat 125 Towers|Beat 125 Towers
Beat 150 Towers|Beat 150 Towers
Beat 175 Towers|Beat 175 Towers
Beat 200 Towers|Beat 200 Towers
Beat 250 Towers|Beat 250 Towers
Beat 300 Towers|Beat 300 Towers
Beat 350 Towers|Beat 350 Towers
Beat 400 Towers|Beat 400 Towers
Beat An Easy Tower|Beat Your First Easy Tower
Beat A Medium Tower|Beat Your First Medium Tower
Beat A Hard Tower|Beat Your First Hard Tower
Beat A Difficult Tower|Beat Your First Difficult Tower
Beat A Challenging Tower|Beat Your First Challenging Tower
Beat An Intense Tower|Beat Your First Intense Tower
Beat A Remorseless Tower|Beat Your First Remorseless Tower
Beat A Soul-Crushing Tower|Beat Your First Soul-Crushing Tower
# Area Unlocks
Unlock Ring 1|The Beginning
Unlock Ring 2|Gifted
Unlock Ring 3|Talented
Unlock Ring 4|Refined
Unlock Ring 5|Skilled
Unlock Ring 6|Woke
Unlock Ring 7|Mental
Unlock Ring 8|Insanity
Unlock Ring 9|Legendary!
Unlock Zone 2|Zoned
Unlock Zone 3|Sky-High
Unlock Zone 4|Out of This World!
Unlock Zone 5|Lunarian
Unlock Zone 6|Martian
Unlock Zone 7|Astronomical
Unlock Zone 8|Through the Cosmos
Unlock Zone 9|Infinity and Beyond
Unlock Zone 10|Deep Space
# Purgatorio
T:Genesis
T:Motion Evolution
T:Buttons
T:Critical Damage
T:Boost Mayhem
T:Various Pressures
T:Kinetic Potential
T:No Strings Attached
T:Keys To Success
T:Dancing All Night
C:Victory
# Ring 1
T:A Simple Time
T:Anger
T:Madness
T:Noticeable Infuriation
T:Hecc
T:Killjoys
T:Keyboard Yeeting
T:Stress
T:Screen Punching
T:Rage
T:Impossible Expectations
T:True Skill
T:Infinity Gauntlet
C:Laptop Splitting
# Ring 2
T:Phone Snapping
T:Big Hole
T:Overcoming Hatred
T:Cold Hands
T:Falling and Failing
T:Traps
T:Deep Darkness
T:Shattered Dreams
T:Table Flipping
T:Eternal Suffering
T:Difficulty Chart
C:Wacky Strategy
# Ring 3
T:Funny Thoughts
T:Inverted Colors
T:Ancient Trickery
T:Deep Sighing
T:Fatness
T:Winning Every Run
T:Slight Inconvenience
T:Wall Hugging
T:Lotsa Damage
T:Despair
T:Confusion
C:Heights and Depths
# Ring 4
T:Spiraling Heights
T:Getting Gnomed
T:Terrible Mondays
T:Elysium
T:Linonophobia
T:Leaning Ledges
T:Dust and Decay
T:Holy Flip
T:Oblivion
T:Nonsensical Platforms
T:Corrupted Nightmares
T:Vivid Sections
T:Inception
C:Uneasiness
# Ring 5
T:Nice Views
T:Trivial Resentment
T:Rigid Success
T:Downward Mobility
T:Obvious Chaos
T:Floral Fury
T:Extraordinary Adventures
T:Tokyo Heights
T:Glitching and Healing
T:Fractured Obstacles
T:Icy Blizzards
T:Frightening Nightmares
C:Contrasting Regions
# Ring 6
T:Friendly Jumps
T:Environmental Pain
T:Radiant Realms
T:Twisted Inquisition
T:A Depressing Future
T:Intense Solar Chaos
T:Dispersed Rooms
T:Flustering Sections
T:Niflheim
T:Strategic Mechanics
T:Impossible Movement
C:Scythe Recognition
# Ring 7
T:Rushed Building
T:Collective Collaboration
T:Feeling Lazy
T:Distorted Aerodynamics
T:Orientating Oscillating Opinions
T:Never Giving Up, Ever
T:Never Ending Dizziness
T:Ultraviolet
T:Yearning Victory
T:Extreme Hell
T:Terrifying Beauty
T:Elongated Runs
C:True Exasperation
# Ring 8
T:Somewhat Simple Scaling
T:Needing Basic Aptitude
T:Voluminous Framework
T:Vibrant Adventures
T:Aamos' Anger
T:Uneasy Scaling
T:Insanely Innovative Ideas
T:Verdant Entropy
T:Mean Tasks
T:Suffering Outside
T:Externalizing Insanity
T:Generation Failure
C:Constant Heart Stopping
# Ring 9
T:Great Overcomings
T:Beat Block Berserk
T:Questionable Trials
T:Pastel Pillars
T:High Adrenaline
T:Bent Trauma
T:Curved Ascent
T:Frightening and Confusing Trials
T:Bloodthirsty Kenos
T:Journey's End
T:Nervous Sweating
T:Augmented Misery
T:Champion's Road
T:Cruel Punishment
C:Lethargy
# Forgotten Ridge
S:Meaningless Decisions
T:Jolly Good Fun
S:Low Woe
S:Pursuit
S:Uninstalling Roblox
T:Immense Ire
S:Wall Punching
T:Versatility
T:Triangular Covering
S:Climbing
S:Huge Pain
T:Increasing Stress
T:Dangerous Expeditions
S:Towering Pillars
T:Mind Breaking
C:Weird Nostalgia
# Garden of Eeshöl
S:Beginner's Journey
S:Devil's Snare
S:Infectious Foliage
S:Overgrowth
S:Nightfall
S:Overgrown Ascension
S:Greenhouse Placidity
S:Feudal Foliage
S:Lost In Quiescence
S:Various Vivariums
S:Flourishing Wastelands
T:Perilous Antipode
S:Buoyant Automations
# Silent Abyss
S:Resort In Stasis
S:Ruinous Abate
T:Ancestral Interference
S:Descendance
T:There Is No Tower
S:Guiding Lights
S:Xenial Abyss
S:Wicked Grotto
T:Shallow Waters
S:Involuntary Isolation
T:Tenebrous Depths
S:Midnight Acropolis
S:Malignant Blight
# Lost River
T:Excessive Weirdness
T:Two Sided Troubles
T:Losing Our Zeal
T:Diverging Layers
T:Odd Odyssey
T:Witchcraft and Wizardry
T:Compact Spaces
T:Tallying Every Mistake
T:Triple Jeopardy
T:Unsettling Heights
C:Inside Situations
# Ashen Towerworks
T:Fruity Zeal
T:Viaduct Traversing
T:Corner Wedge Climbing
T:Wanting More Time
T:Shadowy Radiance
T:Whisking It All
T:Whirl of Winds
T:Largely Limited Luminance
T:Forever Sleeping Flower
T:Climactic Beats
T:Rhythm Heaven
T:Mechanical Disarray
T:Wicked Fortress
# The Starlit Archives
T:Lethean Recollection
T:You're Late For Work
T:Pursuit Led Astray
S:After-Life Detention
S:Balloon Commune
S:Two Minute Noodles
S:The Manufactured Monstrosity
T:The Umbrella, The User
T:Infiltrated Ruins
S:Itsy Bitsy
T:A Disillusioned Existence
T:Warranted Retribution
T:House Without Home
T:Fleeing From Everything Ending
S:Cheesy Vengeance
S:Forlorn Blizzard
# Zone 1
T:Zero Disturbances
T:Peaceful Happiness and Tranquility
T:Atlantic Depths
T:Peace
T:Hands Sweating
T:Mirrored Hecc
T:Contractual Obligations
T:Yearning Success
T:Absolute Vexation
T:Wanting Extra Levels
T:Ultimately Terrifying
T:Extreme Dystopia
T:Really Nasty Ideas
T:Zespluz
T:Thinning Layers
C:Peril
# Zone 2
T:Venomous Resonance
T:Slanted Anticipation
T:Ground Level Ascension
T:Troublesome Adventures
T:Unearthed Discoveries
T:Dreams and Caverns
T:Pleasant Fantasies
T:Slipping and Sliding
T:Extraterrestrial Enchantment
T:Arcanium Zenturing
T:Triangular Terror
T:Great Displeasure
T:Chaotic Moments
T:Double Trouble
C:Green Stuff
# Zone 3
T:Six Feet Under
T:Overestimating Difficulty
T:Broken Bricks
T:Client Object Frenzy
T:Cracked, Crushed Cubes
T:Xanthophobia
T:Dimensional Hopping
T:Mild Agitation
T:Cogs and Steam
T:Requiring Critical Help
T:Menacing Creations
T:Quirky Contraptions
T:Infuriating Obstacles
T:Cruel and Unusual Punishment
T:Hopeless Hell
C:Tricky Situations
# Zone 4
T:Fairly Simple Challenges
T:Aquatic Contemplation
T:Fun and Simple Trials
T:Up Is Down
T:Wicked Wedges
T:Elevator Travelling
T:Pure Chroma
T:Mechanically Induced Mayhem
T:Shifting Slopes
T:Dance Dance Destruction
T:Funky Grooves
T:Tornado Vehemence
T:Inevitable Failure
T:Astronomically Aimless Annoyances
C:Quadrilaterals
# Zone 5
T:Sovereign Travelling
T:Super Stupid Security Systems
T:Fractal Volution
T:Bright Serenity
T:Stairs To Spare
T:Unhealthy Escalation
T:Heiwana Kaze
T:Horrifying Experiences
T:Guided Trials
T:Anticlimactic Outcomes
T:Brutal and Bizarre Torment
T:Zany Architecture
T:Polychromatic Zero
T:Alien Radiance
C:Corporate Enterprise
# Zone 6
T:Foreign Domains
T:Rock Climbing
T:Conflicting Frontiers
T:Break It, Buy It
T:Angled Scenery
T:Hefty Magnitude
T:Hazardous Laddering
T:Watts
T:Sakura Bloom
T:Massive Overheating
T:Petrichor Resentment
T:Brief Challenges
T:The Dripping Amalgam
T:Micro Management
C:Twists and Weirdness
# Zone 7
T:Jazz
T:Rough Waters
T:Sweet Victory
T:Bygone Relic
T:Destructive Fever
T:Growing Madness
T:Cylindrical Extensions
T:White Space
T:Yore
T:Cone Mesh Climbing
T:Swift and Precise Sections
T:Uncontrollable Ire
T:Fractured Memories
T:Uncanny Agony
C:A Cruel Tale
# Zone 8
T:Melons In Time
T:Cosmic Tides
T:A Tetromino Disaster
T:X Madness
T:Galactic Voyage
T:Flame Restoration
T:One Nine
T:Never Ending Fun
T:Manic Lows
T:Overbearing Vertigo
T:Time and Space Manipulation
T:No Return
T:Rough Endoplasmic Reticulum
T:Astral Eclipse
T:Descent Into Exile
C:Pyramid Escapades
# Zone 9
T:Arrantly Bodeful Cavern Depths
T:Dusk To Dawn
T:Latest Sensation
T:Bonus Level
T:Sugar Rush Deluxe
T:Nothing New
T:Furious Chicken Brawl
T:Falling Up
T:Eye Candy
T:Big Blocky Beefy Buttons
T:Minus Facility
T:Voyaging Into The Earth
T:Hollow Reformations
T:Panelling Barricades
T:Wildly Wacky Wonders
T:Empty Meaningless Patterns
C:Increasing Claustrophobia
T:Clandestine Zones
# Zone 10
T:Resonant Landscapes
T:Interstellar Terrarium
T:Valiant Verges
T:Expecting The Unexpected
T:Mach Nine
T:One Two Three Four
T:The Despondent Fortress
T:Prismatic Instability
T:Power Laws
T:Rain on My World
T:Tee Hee Time
T:Blast Power
T:Complexity and Volatility
T:Raging Tempest
C:Overcoming The World's Imperfections
# Steelspire Horizon
S:Zip Zap Pop!
S:Golf Course
T:Sunshower Lambent
T:Quantum Rhythm
T:Steel and Thunder
T:Fly High
T:Calm Before The Storm
T:Ten Floors Challenge
S:Bad Cable Management
T:Weird Energy
S:Dungeon Runner
S:Sunken Kingdoms
T:Fixture Park
T:Nerves of Steel
T:Geometric Kinetics
T:Speeding Right Through
C:Treachery
# Arcane Area
S:Biome Traversing
S:Astounding Sorcery
S:Atmospheric Powers
S:Realm Odyssey
S:Twisted Crystals
S:Magical Elements
S:Crystal Ascension
S:Witch Calamity
S:Magical Collaborations
T:Icy Adventures
# Paradise Atoll
S:Mystical Marine
S:Undersea Voyage
S:Waterfall
T:Call It A Day
S:Abyssal Upturn
S:Sunny Island Shenanigans
S:Aquatic Rallies
S:Hallucinatory Spectacles
T:High Power
S:Desolate Isles
T:Cyclonic Isles
S:Upright Cliffs
S:Cliffside Falls
T:Traversing The Tropics
S:Underlying Breezes
S:Dusty Dunes
# Dark Side of The Moon
T:Faulty Cityscapes
T:Unknown Mysteries
T:Quaint Quadrant
T:Xenocrystically Yonderous Zaniness
T:Viridian Dichotomy
T:Transfigurative Zenith
T:Blossoming Nightfall
T:Kieru Taiyo
T:Incoming Danger
T:Questions
T:Poisoned Waters
T:Mind Games
T:Misleading Passages
T:Distorted Nightmares
T:Dynamic Pulse
# Mini-Towers
Tower Not Found|Error 404: Unable to detect the tower
Not Even A Tower|Can You Even Call This a Tower?
Maybe A Tower|You Could Probably Call This a Tower
Totally A Tower|You fell for it!
Will Be A Tower|Yet Another Lie
Likely A Tower|Yes, there's more!
Fortunately Not A Tower|Another one???
Far From A Surprising Tower|No surprise here!
This Is Probably A Tower|You didn't forget this one, did you?
Not Even A Flower|Taking care of the garden
Somewhat A Tower|Some More Fun
Possibly A Tower|One Interesting Flower...
Is This A Tower?|Is This A Tower?
This Is A Tower|This Is A Tower.
Wow! It’s A Tower!|Wow! It's A Tower!
Do Dat Look Like A Tower|Do Dat Look Like A Tower
It Really Looks Like a Tower…|It Really Looks Like a Tower...
# Miscellaneous
Meet The Owner|Meet Aetrnalis
Complete A Tower In 2+ Hours|2+ Hour Completion
Join On Mobile|Play On Mobile
Secret X’s On Ring Select|X Clicker
Secret ToIE On Ring Select|Rare Expectations
Complete 8 Monthly Challenges|Complete 8 Challenges In A Month
Complete All Monthly Challenges|Complete All Challenges In A Month
# Secret Endings
Citadel of Victory: Secret Ending|Coin Collector
Tower of Screen Punching: Secret Ending|The Actual Final Floor
Citadel of Laptop Splitting: Secret Ending|Beyond the Citadel
Tower of True Skill: Secret Ending|Another Secret Ending
Tower of Oblivion: Secret Ending|Power in Misery
Tower of Ultimately Terrifying: Secret Ending|Complete the Secret Ending
Tower of Brutal and Bizarre Torment: Secret Ending|A Bizarre Secret Ending
# Secrets
Secret Badge in ToR|Secret Badge
Secret Room in ToH|Find the Room of Bad Inside Jokes
Secret Badge In Ring 2|lolwut
Secret Bossfight In Ring 2|Git Gud
Secret Area In ToDD|Cowtastrophe
Secret Area In Ring 3|Find the Room of Absolute Garbage
Secret Badge In Ring 3|The Unreachable Badge
Secret Obby in Ring 5|Strange Rock
Secret Obby In Ring 7|Another secret obby
Secret Area In ToMH|Find the Not-so-secret Badge
Secret Area In Zone 1|Soul Seeker
Secret Area In Zone 2|Hamburgers
# Events
Beat The Janitor From Hell (Unobtainable) (HE2018)
Present of Throwing Cans (Unobtainable) (CE2018)
Present of Developers (Unobtainable) (CE2018)
Present of Winter Ascension (Unobtainable) (CE2018)
Present of Thirst (Unobtainable) (CE2018)
Present of Asserting Dominance (Unobtainable) (CE2018)
Beat The SPR1T3CRANB3RRY Mech (Unobtainable) (CE2018)
Fooled (Unobtainable) (AF2019)
Too Late for Easter (Unobtainable) (SE2019)
Conquer the 3 Steeples (Unobtainable) (HE2019)
Beat The Totem from Hell (Unobtainable) (HE2019)
The Tower of Autumn Harvest (Unobtainable) (TE2019)
Present of Localized Winter (Unobtainable) (CE2019)
Present of Ugliness (Unobtainable) (CE2019)
Present of Eternal Cheer (Unobtainable) (CE2019)
Present of Presents (Unobtainable) (CE2019)
Present of Legends (Unobtainable) (CE2019)
Why? (Unobtainable) (AF2020)
A Grave Mistake (Unobtainable) (HE2020)
Secret of The Manor? (Unobtainable) (HE2020)
Revenge Denied! (Unobtainable) (HE2020)
Present of Winter Frost (Unobtainable) (CE2020)
Present of Festive Memories (Unobtainable) (CE2020)
Present of Atmospheric Chill (Unobtainable) (CE2020)
Present of Christmas Delights (Unobtainable) (CE2020)
Present of Greatness (Unobtainable) (CE2020)
Present of Infectious Spirit (Unobtainable) (CE2020)
Champion of Frost (CE2020)
Encounter Ring 9! (Unobtainable) (AF2021)
ro u nd (Unobtainable) (AF2021)
Present of Festive Blizzards (Unobtainable) (CE2021)
Present of Flocked Greenery (Unobtainable) (CE2021)
Present of Frigid Findings (Unobtainable) (CE2021)
Present of Sheer C(You-Know-What) (Unobtainable) (CE2021)
Present of Shareable Bliss (Unobtainable) (CE2021)
Present of Subtle Fizz (Unobtainable) (CE2021)
Present of Cheerful Fizz (Unobtainable) (CE2021)
Present of Absolute Fizz (Unobtainable) (CE2021)
Present of Fizz Incarnate (Unobtainable) (CE2021)
Discover Terrain World! (Unobtainable) (AF2022)
Defeated the Fishing Boat (Unobtainable) (AF2022)
GOOBIE'S (Unobtainable) (AF2022)
Complex Ascent (Unobtainable) (HE2022)
A Momentous Duel (Unobtainable) (HE2022)
A Memory of Panic (Unobtainable) (HE2022)
Present of Holiday Comfort (Unobtainable) (CE2022)
Present of Sunlit Snow (Unobtainable) (CE2022)
Present of Familiar Locality (Unobtainable) (CE2022)
Present of Duplicative Merriment (Unobtainable) (CE2022)
Present of Modest Contributions (Unobtainable) (CE2022)
Present of Gathering Ornaments (Unobtainable) (CE2022)
Present of Team Impaction (Unobtainable) (CE2022)
Present of Zest (Unobtainable) (CE2022)
Discovered Something Otherworldly (Unobtainable) (AF2023)
The Lemonade (Unobtainable) (AF2023)
The Lorekeeper (Unobtainable) (AF2023)
Carnival Fun (Unobtainable) (HE2023)
Pass to The Funhouse (Unobtainable) (HE2023)
Stage Fright (Unobtainable) (HE2023)
Tricks and Treats! Again! (Unobtainable) (HE2023)
Present of Mini Wreaths (Unobtainable) (CE2023)
Present of Crazy Cabins (Unobtainable) (CE2023)
Present of Ski Training (Unobtainable) (CE2023)
Present of Magical Lights (Unobtainable) (CE2023)
Present of Frozen Sweets (Unobtainable) (CE2023)
Present of Shy Presents (Unobtainable) (CE2023)
Present of Slime (Unobtainable) (CE2023)
Present of Hidden Joy (Unobtainable) (CE2023)
Present of Iced Rooftops (Unobtainable) (CE2023)
Beat The Tower Of Generation Retro (Unobtainable) (AF2024)
Beat The Tower of Quick, Brown Fox! (Unobtainable) (AF2024)
Beat The Tower of Sparkling Rainbow Water (Unobtainable) (AF2024)
Beat The Tower of Trouble (LE) (Unobtainable) (LE2024)
Beat The Tower of Phone Snapping (LE) (Unobtainable) (LE2024)
Beat The Tower of Infuriation (LE) (Unobtainable) (LE2024)
Beat The Tower of Total Exhaustion (LE) (Unobtainable) (LE2024)
Beat The Tower of Unfortunate Possibilities (LE) (Unobtainable) (LE2024)
Beat The Tower of Gloom (LE) (Unobtainable) (LE2024)
Beat The Tower of Window Shattering (LE) (Unobtainable) (LE2024)
Beat The Tower of Tearing Up (LE) (Unobtainable) (LE2024)
Beat The Tower of Great Infamy (LE) (Unobtainable) (LE2024)
Beat The Tower of Mass Destruction (LE) (Unobtainable) (LE2024)
Tower of Spicy Torment (LE) (Unobtainable) (LE2024)
Beat The Tower of Confusion (LE) (Unobtainable) (LE2024)
Beat The Tower of Unending Bamboozles (LE) (Unobtainable) (LE2024)
100M Celebration (Unobtainable) (LE2024)
100M Trial (Unobtainable) (LE2024)
100M Finale (Unobtainable) (LE2024)
100M Revenge (LE2024)
Present of Flaming Wicks (Unobtainable) (CE2024)
Present of Sugar and Spice (Unobtainable) (CE2024)
Present of Nightmarish Holly (Unobtainable) (CE2024)
Present of Naughty or Nice (Unobtainable) (CE2024)
Present of Present of... (Unobtainable) (CE2024)
Present of Jolly Remembrance (Unobtainable) (CE2024)
Present of Somber Nights (Unobtainable) (CE2024)
Present of Wishing Star (Unobtainable) (CE2024)
Beat The Tower of Vesi Leikki (Unobtainable) (AF2025)
Beat The ETOH TYCOON TYCOON TYCOON TYCOON (Unobtainable) (AF2025)
Beat The Mush Stepl (Unobtainable) (AF2025)
Advanced Adventurer (Unobtainable) (AF2025)
Soul Crushing Adventurer (AF2025)
Step Right Up! (Unobtainable) (HE2025)
Eight Legs, No Mercy (Unobtainable) (HE2025)
Dead Serious Haunting (Unobtainable) (HE2025)
The Unseen Hand (Unobtainable) (HE2025)
Present of Apricity (Unobtainable) (CE2025)
Present of Cranberry Spice (Unobtainable) (CE2025)
Present of The Arctic Express (Unobtainable) (CE2025)
Present of Merrymaking Shrimp (Unobtainable) (CE2025)
Present of Freezing Temperatures (Unobtainable) (CE2025)
Present of Asserting Jolliness (Unobtainable) (CE2025)
Present of Invisible Mist (Unobtainable) (CE2025)
Present of Heart Warming (Unobtainable) (CE2025)
Celebration of Life (Unobtainable) (EE2026)
Deeper Than Expected (Unobtainable) (EE2026)
Distress Signal (HE2026)
The Last Expedition (HE2026)
Event Horizon Survivor (HE2026)
Found Footage (HE2026)
Lost Between Worlds (HE2026)
Spatial Anomaly (HE2026)
Present of ??? (CE2026)
Present of ??? (CE2026)
Present of ??? (CE2026)
Present of ??? (CE2026)
Present of ??? (CE2026)
`;

module.exports = raw
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)
  .reduce((cats, line) => {
    if (line.startsWith("# ")) cats.push({ name: line.slice(2), items: [] });
    else cats[cats.length - 1].items.push(line);
    return cats;
  }, []);
