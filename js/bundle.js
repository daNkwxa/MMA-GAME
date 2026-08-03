// MMA GOAT - Combined Standalone Bundle for Direct File Execution & i18n Support


/* --- data.js --- */
// MMA GOAT - Data Definitions

const FIGHT_STYLES = {
  boxer: {
    name: 'Boxer',
    nameEn: 'Boxer',
    description: 'Yumruk kombinasyonlarında ve mesafe kontrolünde usta.',
    descriptionEn: 'Master of punch combinations and distance control.',
    icon: '🥊',
    baseStats: { punch: 35, kick: 15, clinch: 15, wrestling: 15, takedownDef: 25, submission: 10, cardio: 30, strength: 25, speed: 35, fightIq: 25, mental: 25 }
  },
  kickboxer: {
    name: 'Kickboxer',
    nameEn: 'Kickboxer',
    description: 'Yıkıcı tekmeler ve dinamik ayakta dövüş.',
    descriptionEn: 'Devastating kicks and dynamic striking.',
    icon: '🦵',
    baseStats: { punch: 28, kick: 38, clinch: 18, wrestling: 15, takedownDef: 22, submission: 10, cardio: 28, strength: 25, speed: 32, fightIq: 22, mental: 25 }
  },
  wrestler: {
    name: 'Wrestler (Güreşçi)',
    nameEn: 'Wrestler',
    description: 'Dominant yere alma, fiziksel üstünlük ve kontrol.',
    descriptionEn: 'Dominant takedowns, physical superiority and ground control.',
    icon: '🤼',
    baseStats: { punch: 18, kick: 12, clinch: 30, wrestling: 40, takedownDef: 35, submission: 18, cardio: 28, strength: 35, speed: 22, fightIq: 25, mental: 25 }
  },
  bjj: {
    name: 'BJJ Specialist',
    nameEn: 'BJJ Specialist',
    description: 'Pusuda bekleyen ölümcül pes ettirme ustası.',
    descriptionEn: 'Lethal submission master waiting in ambush.',
    icon: '🥋',
    baseStats: { punch: 15, kick: 15, clinch: 28, wrestling: 25, takedownDef: 20, submission: 42, cardio: 25, strength: 20, speed: 22, fightIq: 32, mental: 28 }
  },
  muaythai: {
    name: 'Muay Thai Master',
    nameEn: 'Muay Thai Master',
    description: 'Ölümcül Clinch dizleri, dirsekler ve sert tekmeler.',
    descriptionEn: 'Lethal clinch knees, elbows and brutal kicks.',
    icon: '💥',
    baseStats: { punch: 25, kick: 32, clinch: 38, wrestling: 15, takedownDef: 20, submission: 12, cardio: 28, strength: 30, speed: 25, fightIq: 25, mental: 25 }
  },
  judoka: {
    name: 'Judocu',
    nameEn: 'Judoka',
    description: 'Denge bozucu fırlatmalar, kilitler ve sağlam defans.',
    descriptionEn: 'Devastating throws, joint locks and solid defense.',
    icon: '👘',
    baseStats: { punch: 18, kick: 15, clinch: 35, wrestling: 30, takedownDef: 38, submission: 28, cardio: 25, strength: 30, speed: 22, fightIq: 25, mental: 25 }
  },
  sambo: {
    name: 'Sambo Fighter',
    nameEn: 'Sambo Fighter',
    description: 'Komple hibrit dövüş, bacak kilitleri ve yüksek dövüş IQ.',
    descriptionEn: 'Complete hybrid fighting, leg locks and high fight IQ.',
    icon: '🛡️',
    baseStats: { punch: 22, kick: 20, clinch: 28, wrestling: 32, takedownDef: 28, submission: 30, cardio: 28, strength: 28, speed: 25, fightIq: 32, mental: 28 }
  }
};

const WEIGHT_CUT_STRATEGIES = {
  aggressive: {
    id: 'aggressive',
    name: '🔥 Agresif Dehidrasyon & Sauna',
    nameEn: '🔥 Aggressive Dehydration & Sauna',
    weightCutKg: 4.5,
    successBonus: 0.10,
    energyPenalty: 35,
    staminaPenalty: 20,
    desc: 'Sauna ve su atımı ile maksimum kilo verirsiniz (~4.5 kg). Vücut aşırı halsiz kalır!',
    descEn: 'Maximum weight cut via sauna and water depletion (~4.5 kg). Extreme body fatigue!'
  },
  balanced: {
    id: 'balanced',
    name: '⚖️ Dengeli Kamp Kilo Kesimi',
    nameEn: '⚖️ Balanced Camp Weight Cut',
    weightCutKg: 3.0,
    successBonus: 0.0,
    energyPenalty: 20,
    staminaPenalty: 10,
    desc: 'Standart profesyonel kilo kesimi (~3.0 kg). Makul enerji kaybı ve kontrollü risk.',
    descEn: 'Standard professional weight cut (~3.0 kg). Moderate energy loss and controlled risk.'
  },
  safe: {
    id: 'safe',
    name: '🛡️ Hafif & Güvenli Diyet',
    nameEn: '🛡️ Light & Safe Diet',
    weightCutKg: 1.5,
    successBonus: -0.10,
    energyPenalty: 8,
    staminaPenalty: 0,
    desc: 'Vücudu yormayan hafif kesim (~1.5 kg). Enerji korunur ancak kilo yetersiz kalabilir!',
    descEn: 'Gentle cut preserving body energy (~1.5 kg). High energy but risk of missing weight limit!'
  }
};

const WEIGHT_CLASSES = [
  { id: 'flyweight', name: 'Flyweight', limitKg: 56.7, limitLbs: 125 },
  { id: 'bantamweight', name: 'Bantamweight', limitKg: 61.2, limitLbs: 135 },
  { id: 'featherweight', name: 'Featherweight', limitKg: 65.8, limitLbs: 145 },
  { id: 'lightweight', name: 'Lightweight', limitKg: 70.3, limitLbs: 155 },
  { id: 'welterweight', name: 'Welterweight', limitKg: 77.1, limitLbs: 170 },
  { id: 'middleweight', name: 'Middleweight', limitKg: 83.9, limitLbs: 185 },
  { id: 'lightheavyweight', name: 'Light Heavyweight', limitKg: 93.0, limitLbs: 205 },
  { id: 'heavyweight', name: 'Heavyweight', limitKg: 120.2, limitLbs: 265 }
];

const ORGANIZATIONS = [
  {
    id: 'regional',
    name: 'Street Combat Underground',
    tier: 1,
    basePurse: 800,
    winBonus: 800,
    fameMultiplier: 1.0,
    color: '#8b949e',
    logo: '⚡'
  },
  {
    id: 'titan',
    name: 'Titan Combat League',
    tier: 2,
    basePurse: 4000,
    winBonus: 4000,
    fameMultiplier: 2.5,
    color: '#3b82f6',
    logo: '🛡️'
  },
  {
    id: 'apex',
    name: 'Apex Warriors Championship',
    tier: 3,
    basePurse: 20000,
    winBonus: 20000,
    fameMultiplier: 5.0,
    color: '#a855f7',
    logo: '👑'
  },
  {
    id: 'wcf',
    name: 'WCF (World Combat Federation)',
    tier: 4,
    basePurse: 100000,
    winBonus: 100000,
    fameMultiplier: 10.0,
    color: '#eab308',
    logo: '🦅'
  }
];

const FIRST_NAMES = [
  'Alex', 'Marcus', 'Igor', 'Carlos', 'Dustin', 'Khabib', 'Conor', 'Jon', 'Israel', 'Sean',
  'Charles', 'Islam', 'Justin', 'Francis', 'Max', 'Fedya', 'Stipe', 'Georges', 'Anderson',
  'Kamaru', 'Volkan', 'Giga', 'Shavkat', 'Khamzat', 'Diego', 'Mateusz', 'Jan', 'Tariq',
  'Enzo', 'Baki', 'Musa', 'Devrim', 'Arda', 'Hasan', 'Dmitry', 'Sergei', 'Ronaldo', 'Thiago',
  'Lucas', 'Liam', 'Brandon', 'Caio', 'Petr', 'Alexander', 'Ilia', 'Arman', 'Merab', 'Leon',
  'Dricus', 'Belal', 'Jiri', 'Magomed', 'Hamzat', 'Zabit', 'Tom', 'Cory', 'Gilbert'
];

const LAST_NAMES = [
  'Silva', 'Nurmagomedov', 'McGregor', 'Jones', 'Adesanya', 'Poirier', 'Oliveira', 'Gaethje',
  'Ngannou', 'Holloway', 'Emelianenko', 'Miocic', 'St-Pierre', 'Usman', 'Volkanovski', 'Chimaev',
  'Rakhmonov', 'Kovalev', 'Santos', 'Pereira', 'Diaz', 'Cevik', 'Yilmaz', 'Kaya', 'Demir',
  'Topuria', 'Tsarukyan', 'Dvalishvili', 'Edwards', 'Du Plessis', 'Muhammad', 'Prochazka',
  'Ankalaev', 'Magomedov', 'Aspinall', 'Sandhagen', 'Burns', 'Machado', 'Teixeira', 'Bisping'
];

const COUNTRIES = [
  { code: 'TR', name: 'Türkiye', nameEn: 'Turkey', flag: '🇹🇷' },
  { code: 'US', name: 'ABD', nameEn: 'USA', flag: '🇺🇸' },
  { code: 'BR', name: 'Brezilya', nameEn: 'Brazil', flag: '🇧🇷' },
  { code: 'RU', name: 'Rusya', nameEn: 'Russia', flag: '🇷🇺' },
  { code: 'IE', name: 'İrlanda', nameEn: 'Ireland', flag: '🇮🇪' },
  { code: 'NG', name: 'Nijerya', nameEn: 'Nigeria', flag: '🇳🇬' },
  { code: 'PL', name: 'Polonya', nameEn: 'Poland', flag: '🇵🇱' },
  { code: 'FR', name: 'Fransa', nameEn: 'France', flag: '🇫🇷' },
  { code: 'KZ', name: 'Kazakistan', nameEn: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'MX', name: 'Meksika', nameEn: 'Mexico', flag: '🇲🇽' },
  { code: 'AU', name: 'Avustralya', nameEn: 'Australia', flag: '🇦🇺' },
  { code: 'GB', name: 'İngiltere', nameEn: 'England', flag: '🇬🇧' },
  { code: 'GE', name: 'Gürcistan', nameEn: 'Georgia', flag: '🇬🇪' },
  { code: 'SE', name: 'İsveç', nameEn: 'Sweden', flag: '🇸🇪' },
  { code: 'ES', name: 'İspanya', nameEn: 'Spain', flag: '🇪🇸' },
  { code: 'ZA', name: 'Güney Afrika', nameEn: 'South Africa', flag: '🇿🇦' }
];

const RANDOM_EVENTS = [
  {
    id: 'press_scandal',
    title: 'Basın Konferansı Tartışması!',
    titleEn: 'Press Conference Altercation!',
    description: 'Press konferansında rakibin masayı devirdi ve sana bağırdı!',
    descriptionEn: 'Your opponent flipped the table and shouted at you during the press conference!',
    options: [
      { text: 'Sandalyeyi fırlat (Trash talk & Nefret +15, Stres +10)', textEn: 'Throw a chair (Trash talk & Fame +15, Stress +10)', fame: 15, stress: 10, mental: -5 },
      { text: 'Sakin kal ve gülümse (Saygınlık +10, Mental +10)', textEn: 'Stay calm & smile (Respect +10, Mental +10)', fame: 5, stress: -5, mental: 10 }
    ]
  },
  {
    id: 'sponsor_deal',
    title: 'Yeni Sponsor Teklifi!',
    titleEn: 'New Sponsor Offer!',
    description: 'Yerel bir enerji içeceği markası seni yüzü yapmak istiyor.',
    descriptionEn: 'A local energy drink brand wants you as the face of their campaign.',
    options: [
      { text: 'Anlaşmayı İmzala (+$3,000, Şöhret +5)', textEn: 'Sign the Deal (+$3,000, Fame +5)', money: 3000, fame: 5 },
      { text: 'Daha büyük markaları bekle', textEn: 'Wait for bigger brands', fame: 2 }
    ]
  },
  {
    id: 'sparring_injury',
    title: 'Antrenmanda Ufak Kaza!',
    titleEn: 'Sparring Accident!',
    description: 'Ağır spar sırasında hafif bir kaş kesiği yaşadın.',
    descriptionEn: 'You suffered a minor eyebrow cut during hard sparring.',
    options: [
      { text: 'Dikiş attır ve devam et (Sakatlık riski, Enerji -15)', textEn: 'Get stitches & push through (Energy -15)', energy: -15 },
      { text: '1 gün dinlen (Enerji +10, Kamp aksaması)', textEn: 'Rest 1 day (Energy +10)', energy: 10 }
    ]
  },
  {
    id: 'podcast_invite',
    title: 'Popüler Podcast Daveti',
    titleEn: 'Popular Podcast Invite',
    description: 'Bölgenin en çok izlenen spor podcastine davet edildin.',
    descriptionEn: 'You have been invited to the region’s top sports podcast.',
    options: [
      { text: 'Katıl ve dövüşünü sükse yap (+20 Şöhret, Enerji -10)', textEn: 'Attend & hype your fight (+20 Fame, Energy -10)', fame: 20, energy: -10 },
      { text: 'Odaklanmak için reddet (Mental +5)', textEn: 'Decline to stay focused (Mental +5)', mental: 5 }
    ]
  }
];

const NUTRITION_ITEMS = [
  {
    id: 'cheat_meal',
    name: '🍕 Hızlı Kalori & Pizza Menü',
    nameEn: '🍕 Quick Calories & Pizza Combo',
    cost: 50,
    weightGainKg: 1.5,
    energyGain: 15,
    stressGain: 5,
    description: 'Hızlı kilo aldırır (+1.5 kg), lezzetli ama hafif stres yaratır.',
    descriptionEn: 'Fast weight gain (+1.5 kg), tasty but adds slight stress.'
  },
  {
    id: 'protein_bulk',
    name: '🥩 Biftek & Pirinç Temiz Kütle',
    nameEn: '🥩 Steak & Rice Clean Bulk',
    cost: 150,
    weightGainKg: 2.5,
    energyGain: 25,
    strengthBonus: 1,
    description: 'Sporcu diyeti (+2.5 kg kilo), enerji yeniler ve kas gücü verir.',
    descriptionEn: 'Clean athlete diet (+2.5 kg), restores energy and builds muscle strength.'
  },
  {
    id: 'gainer_shake',
    name: '🥛 Mass Gainer & Kreatin Shaker',
    nameEn: '🥛 Mass Gainer & Creatine Shake',
    cost: 350,
    weightGainKg: 4.0,
    energyGain: 35,
    strengthBonus: 2,
    cardioBonus: 1,
    description: 'Ağır kilo aldırıcı takviye (+4.0 kg kilo) ve kas gelişimi sağlar.',
    descriptionEn: 'Heavy mass gainer (+4.0 kg) driving rapid muscle & strength growth.'
  },
  {
    id: 'detox_light',
    name: '🥗 Yeşil Detoks & Diyet Salatası',
    nameEn: '🥗 Green Detox & Diet Salad',
    cost: 80,
    weightGainKg: -1.5,
    energyGain: 20,
    stressGain: -15,
    description: 'Hafif kilo verdirir (-1.5 kg) ve vücuttaki stresi temizler.',
    descriptionEn: 'Light weight reduction (-1.5 kg) and flushes body stress.'
  }
];

const GYM_UPGRADES = [
  { id: 'local_garage', name: 'Mahalle Garajı', nameEn: 'Local Garage Gym', tier: 1, cost: 0, bonus: 1.0, description: 'Temel ekipmanlar, nemli oda.', descriptionEn: 'Basic equipment, humid room.' },
  { id: 'pro_mma_hub', name: 'Profesyonel MMA Akademi', nameEn: 'Pro MMA Academy', tier: 2, cost: 15000, bonus: 1.25, description: '+%25 Antrenman verimi, daha az sakatlık.', descriptionEn: '+25% Training efficiency, reduced injury risk.' },
  { id: 'championship_camp', name: 'Şampiyonluk Kampı Complex', nameEn: 'Championship Camp Complex', tier: 3, cost: 80000, bonus: 1.6, description: '+%60 Antrenman verimi, özel fizyoterapist.', descriptionEn: '+60% Training efficiency, private physio team.' },
  { id: 'apex_facility', name: 'Apex Elite Performance Center', nameEn: 'Apex Elite Performance Center', tier: 4, cost: 350000, bonus: 2.2, description: '+%120 Antrenman verimi, hiperbarik oksijen odası.', descriptionEn: '+120% Training efficiency, hyperbaric oxygen chamber.' }
];

const COACH_STAFF = [
  { id: 'rookie_coach', name: 'Ahmet Hoca', type: 'Striking', costPerFight: 200, bonus: 2, description: '+2 Punch/Kick antrenman verimi.', descriptionEn: '+2 Punch/Kick training efficiency.' },
  { id: 'veteran_wrestler', name: 'Coach Alexey', type: 'Wrestling', costPerFight: 1200, bonus: 5, description: '+5 Wrestling/Takedown Def verimi.', descriptionEn: '+5 Wrestling/Takedown Def efficiency.' },
  { id: 'bjj_blackbelt', name: 'Master Gracie', type: 'Grappling', costPerFight: 3500, bonus: 8, description: '+8 Submission/Clinch verimi.', descriptionEn: '+8 Submission/Clinch efficiency.' },
  { id: 'legendary_headcoach', name: 'Coach Firas', type: 'Head Coach', costPerFight: 12000, bonus: 15, description: 'Tüm stat gelişimlerine +15 verim & Fight IQ boost.', descriptionEn: '+15 efficiency to all stat gains & Fight IQ boost.' }
];

const GLOVES_CATALOG = [
  {
    id: 'glove_default',
    name: 'Standart Çaylak Eldiveni',
    nameEn: 'Standard Rookie Gloves',
    icon: '🥊',
    rarity: 'common',
    currency: 'gold',
    price: 0,
    color: '#8b949e',
    bonuses: { punchPct: 0, kickPct: 0, speedPct: 0, cardioPct: 0, goldPct: 0 },
    desc: 'Başlangıç seviye standart eldiven. Özel bonusu yoktur.',
    descEn: 'Basic rookie gloves. No extra bonuses.'
  },
  {
    id: 'glove_sparring',
    name: 'Deri Antrenman Eldiveni',
    nameEn: 'Leather Sparring Gloves',
    icon: '🥊',
    rarity: 'common',
    currency: 'gold',
    price: 1500,
    color: '#3b82f6',
    bonuses: { punchPct: 5, speedPct: 3 },
    desc: '+%5 Yumruk Gücü, +%3 Vuruş Hızı',
    descEn: '+5% Punch Power, +3% Speed'
  },
  {
    id: 'glove_pro_striker',
    name: 'Pro Striker Dövüş Eldiveni',
    nameEn: 'Pro Striker Fight Gloves',
    icon: '🥊',
    rarity: 'rare',
    currency: 'gold',
    price: 8000,
    color: '#a855f7',
    bonuses: { punchPct: 10, kickPct: 5, speedPct: 5 },
    desc: '+%10 Yumruk Gücü, +%5 Tekme, +%5 Hız',
    descEn: '+10% Punch Power, +5% Kick, +5% Speed'
  },
  {
    id: 'glove_titanium',
    name: 'Titanium Grip Eldiven',
    nameEn: 'Titanium Grip Gloves',
    icon: '🥊',
    rarity: 'epic',
    currency: 'diamonds',
    price: 45,
    color: '#00f3ff',
    bonuses: { punchPct: 15, strengthPct: 10, goldPct: 10 },
    desc: '+%15 Yumruk Gücü, +%10 Fiziksel Güç, +%10 Dövüş Ödülü Altın',
    descEn: '+15% Punch Power, +10% Strength, +10% Fight Gold'
  },
  {
    id: 'glove_gold_champion',
    name: 'Altın Kaplama Şampiyon Eldiveni',
    nameEn: 'Gold Champion Gloves',
    icon: '🏆',
    rarity: 'legendary',
    currency: 'diamonds',
    price: 120,
    color: '#ffd700',
    bonuses: { punchPct: 20, kickPct: 15, cardioPct: 10, goldPct: 20 },
    desc: '+%20 Yumruk, +%15 Tekme, +%10 Kondisyon, +%20 Dövüş Ödülü Altın',
    descEn: '+20% Punch, +15% Kick, +10% Cardio, +20% Fight Gold'
  },
  {
    id: 'glove_mythic_dragon',
    name: 'Ejderha Alevi Mythic Eldiven',
    nameEn: 'Dragon Flame Mythic Gloves',
    icon: '🔥',
    rarity: 'mythic',
    currency: 'diamonds',
    price: 300,
    color: '#ff2a5f',
    bonuses: { punchPct: 30, kickPct: 25, speedPct: 20, cardioPct: 15, goldPct: 35 },
    desc: '+%30 Yumruk, +%25 Tekme, +%20 Hız, +%15 Kondisyon, +%35 Ekstra Altın!',
    descEn: '+30% Punch, +25% Kick, +20% Speed, +15% Cardio, +35% Extra Gold!'
  }
];

const DIAMOND_PACKAGES = [
  { id: 'coffee', name: '☕ Geliştiriciye Kahve Ismarla', nameEn: '☕ Buy Dev a Coffee', amount: 30, priceTL: '₺14.99', priceUSD: '$0.49', popular: false, badge: '❤️ Destek' },
  { id: 'diamonds_small', name: '💎 Küçük Elmas Torbası', nameEn: '💎 Small Diamond Pouch', amount: 100, priceTL: '₺29.99', priceUSD: '$0.99', popular: false, badge: '' },
  { id: 'diamonds_medium', name: '💎 Orta Elmas Sandığı', nameEn: '💎 Medium Diamond Chest', amount: 350, priceTL: '₺79.99', priceUSD: '$2.49', popular: true, badge: '🔥 En Çok Satan' },
  { id: 'diamonds_large', name: '💎 Büyük Elmas Kasası', nameEn: '💎 Large Diamond Safe', amount: 1000, priceTL: '₺199.99', priceUSD: '$5.99', popular: false, badge: '⭐ %20 Ekstra' },
  { id: 'diamonds_huge', name: '💎 Efsanevî Elmas Zulası', nameEn: '💎 Mythic Diamond Vault', amount: 2500, priceTL: '₺449.99', priceUSD: '$12.99', popular: false, badge: '👑 VIP Bonus' }
];

const GOLD_EXCHANGE_PACKAGES = [
  { id: 'ex_small', diamondsCost: 15, goldGain: 3500, name: '💰 Mahalle Bütçesi', nameEn: '💰 Starter Purse' },
  { id: 'ex_medium', diamondsCost: 45, goldGain: 12000, name: '💰 Profesyonel Sözleşme Primi', nameEn: '💰 Pro Contract Bonus' },
  { id: 'ex_large', diamondsCost: 120, goldGain: 40000, name: '💰 Şampiyonluk İkramiyesi', nameEn: '💰 Championship Purse' },
  { id: 'ex_huge', diamondsCost: 300, goldGain: 120000, name: '💰 Milyoner Dövüşçü Kasası', nameEn: '💰 Millionaire Fighter Vault' }
];

const AI_ARCHETYPES = {
  pressure_fighter: {
    id: 'pressure_fighter',
    name: 'Pressure Fighter',
    nameEn: 'Pressure Fighter',
    aggression: 85,
    preferredRange: 'striking',
    cardioManagement: 'aggressive',
    riskTolerance: 75,
    finishInstinct: 80,
    defensiveStyle: 'high_guard',
    favoredTactics: ['pressure', 'counter']
  },
  counter_fighter: {
    id: 'counter_fighter',
    name: 'Counter Fighter',
    nameEn: 'Counter Fighter',
    aggression: 35,
    preferredRange: 'striking',
    cardioManagement: 'conservative',
    riskTolerance: 35,
    finishInstinct: 60,
    defensiveStyle: 'counter_first',
    favoredTactics: ['counter', 'kicks', 'defend']
  },
  wrestler: {
    id: 'wrestler',
    name: 'Wrestler',
    nameEn: 'Wrestler',
    aggression: 70,
    preferredRange: 'clinch',
    cardioManagement: 'balanced',
    riskTolerance: 50,
    finishInstinct: 65,
    defensiveStyle: 'wrestling_defense',
    favoredTactics: ['takedown', 'clinch']
  },
  grappler: {
    id: 'grappler',
    name: 'Grappler',
    nameEn: 'Grappler',
    aggression: 60,
    preferredRange: 'ground',
    cardioManagement: 'balanced',
    riskTolerance: 60,
    finishInstinct: 85,
    defensiveStyle: 'wrestling_defense',
    favoredTactics: ['submission', 'takedown']
  },
  technical_striker: {
    id: 'technical_striker',
    name: 'Technical Striker',
    nameEn: 'Technical Striker',
    aggression: 50,
    preferredRange: 'striking',
    cardioManagement: 'conservative',
    riskTolerance: 40,
    finishInstinct: 70,
    defensiveStyle: 'head_movement',
    favoredTactics: ['kicks', 'counter']
  },
  wild_brawler: {
    id: 'wild_brawler',
    name: 'Wild Brawler',
    nameEn: 'Wild Brawler',
    aggression: 95,
    preferredRange: 'striking',
    cardioManagement: 'aggressive',
    riskTolerance: 90,
    finishInstinct: 95,
    defensiveStyle: 'high_guard',
    favoredTactics: ['pressure']
  }
};

const SPONSORS_CATALOG = [
  {
    id: 'sponsor_local_diner',
    brand: 'Mahalle Kebap & Izgara',
    brandEn: 'Neighborhood Diner',
    tier: 'Local',
    icon: '🥩',
    contractDuration: 3,
    payPerFight: 300,
    winBonus: 200,
    reqFame: 0,
    reqWins: 0,
    minRank: 99,
    objectiveType: 'win_fights',
    objectiveTarget: 1,
    objectiveDesc: '3 maçlık kontratta en az 1 galibiyet al',
    objectiveDescEn: 'Get at least 1 win during 3 fight contract',
    desc: 'Yerel mahalle işletmesinden mütevazı destek.',
    descEn: 'Modest sponsorship from local business.'
  },
  {
    id: 'sponsor_local_gym',
    brand: 'Demir Yumruk Salonu',
    brandEn: 'Iron Fist Gym',
    tier: 'Local',
    icon: '🏋️',
    contractDuration: 3,
    payPerFight: 600,
    winBonus: 400,
    reqFame: 10,
    reqWins: 1,
    minRank: 99,
    objectiveType: 'win_fights',
    objectiveTarget: 2,
    objectiveDesc: 'Kontrat süresince 2 galibiyet al',
    objectiveDescEn: 'Achieve 2 wins during contract',
    desc: 'Bölgesel dövüş salonu ekipman ve antrenman desteği.',
    descEn: 'Regional fight gym equipment & purse bonus.'
  },
  {
    id: 'sponsor_equip_phantom',
    brand: 'Phantom Combat Gear',
    brandEn: 'Phantom Combat Gear',
    tier: 'Equipment',
    icon: '🥊',
    contractDuration: 4,
    payPerFight: 1500,
    winBonus: 1000,
    reqFame: 25,
    reqWins: 3,
    minRank: 30,
    objectiveType: 'ko_wins',
    objectiveTarget: 1,
    objectiveDesc: 'En az 1 KO/TKO zaferi elde et',
    objectiveDescEn: 'Score at least 1 KO/TKO victory',
    desc: 'Profesyonel eldiven ve şort markası.',
    descEn: 'Professional fight gear apparel brand.'
  },
  {
    id: 'sponsor_nutrition_pro',
    brand: 'Apex Whey & Supplement',
    brandEn: 'Apex Whey & Supplement',
    tier: 'Nutrition',
    icon: '🥤',
    contractDuration: 4,
    payPerFight: 2500,
    winBonus: 1500,
    reqFame: 40,
    reqWins: 5,
    minRank: 20,
    objectiveType: 'win_fights',
    objectiveTarget: 3,
    objectiveDesc: '4 maçta 3 galibiyet elde et',
    objectiveDescEn: 'Secure 3 wins out of 4 fights',
    desc: 'Sporcu takviyesi ve protein markası.',
    descEn: 'Elite athlete nutrition and protein sponsor.'
  },
  {
    id: 'sponsor_energy_beast',
    brand: 'BEAST Energy Drink',
    brandEn: 'BEAST Energy Drink',
    tier: 'Energy Drink',
    icon: '⚡',
    contractDuration: 5,
    payPerFight: 5000,
    winBonus: 3500,
    reqFame: 60,
    reqWins: 8,
    minRank: 10,
    objectiveType: 'top_10',
    objectiveTarget: 1,
    objectiveDesc: 'İlk 10 sıralamasında yerini koru',
    objectiveDescEn: 'Maintain position in Top 10 rankings',
    desc: 'Küresel enerji içeceği devi.',
    descEn: 'Global extreme energy drink brand.'
  },
  {
    id: 'sponsor_luxury_crypto',
    brand: 'Crypto Vault Pay',
    brandEn: 'Crypto Vault Pay',
    tier: 'Luxury',
    icon: '💎',
    contractDuration: 5,
    payPerFight: 12000,
    winBonus: 8000,
    reqFame: 80,
    reqWins: 12,
    minRank: 5,
    objectiveType: 'win_fights',
    objectiveTarget: 4,
    objectiveDesc: '5 maçın 4 tanesini kazan',
    objectiveDescEn: 'Win 4 out of 5 fights',
    desc: 'Lüks finans ve kripto platformu sponsorluğu.',
    descEn: 'Luxury fintech and crypto brand deal.'
  },
  {
    id: 'sponsor_combat_king',
    brand: 'WCF Global Combat Apparel',
    brandEn: 'WCF Global Combat Apparel',
    tier: 'Combat Brand',
    icon: '👑',
    contractDuration: 5,
    payPerFight: 25000,
    winBonus: 15000,
    reqFame: 90,
    reqWins: 15,
    minRank: 0,
    objectiveType: 'champion',
    objectiveTarget: 1,
    objectiveDesc: 'Şampiyonluk kemerini koru',
    objectiveDescEn: 'Defend championship title belt',
    desc: 'Dünyanın 1 numaralı dövüş organizasyonu ana sponsorluğu.',
    descEn: 'Premier world fighting championship brand sponsor.'
  }
];




/* --- audio.js --- */
// MMA GOAT - Web Audio Sound Synthesizer Engine

class SoundEffectsEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        // iOS Audio Context resume on first interaction
        const resume = () => {
          if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(e => console.log('Audio resume failed', e));
          }
          document.removeEventListener('touchstart', resume);
          document.removeEventListener('click', resume);
        };
        document.addEventListener('touchstart', resume, { passive: true });
        document.addEventListener('click', resume, { passive: true });
      }
    }
  }

  playPunch() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playBell() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime); // High bell tone A5

    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.2);
  }

  playClick() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playCrowdCheer() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    // White noise simulation for crowd cheer
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 1.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(this.ctx.currentTime + 1.5);
  }
}

const sfx = new SoundEffectsEngine();


/* --- fighter.js --- */
// MMA GOAT - Fighter & AI Models



class Fighter {
  constructor(config = {}) {
    config = config || {};
    this.id = config.id || 'player_' + Date.now();
    this.name = config.name || 'Dövüşçü';
    this.nickname = config.nickname || '';
    this.socialHandle = config.socialHandle || '@' + (config.name || 'dovuscu').toLowerCase().replace(/\s+/g, '');
    this.country = config.country || COUNTRIES[0];
    this.age = config.age || 18;
    this.ageMonths = config.ageMonths || 0;
    this.styleKey = config.styleKey || 'boxer';
    this.weightClass = config.weightClass || 'lightweight';
    
    // Weight parameters
    const wcData = WEIGHT_CLASSES.find(w => w.id === this.weightClass) || WEIGHT_CLASSES[3];
    this.targetWeightKg = wcData.limitKg;
    // Walk-around weight is typically ~3.5 - 4.5 kg above limit
    this.walkWeight = config.walkWeight || Number((this.targetWeightKg + 3.8).toFixed(1));
    this.currentWeight = config.currentWeight || this.walkWeight;

    // Weight Class Adaptation & Penalties (Feature 9)
    this.weightAdaptationFightsLeft = config.weightAdaptationFightsLeft || 0;
    this.weightPenaltyType = config.weightPenaltyType || null; // 'speed_loss', 'stamina_loss', 'severe_recovery'

    // Base Stats from Style or Config
    const styleData = FIGHT_STYLES[this.styleKey];
    const defaultStats = styleData && styleData.baseStats ? styleData.baseStats : {
      punch: 20, kick: 20, clinch: 20, wrestling: 20, takedownDef: 20, submission: 20,
      cardio: 25, strength: 25, speed: 25, fightIq: 25, mental: 25
    };

    this.stats = {
      punch: config.stats?.punch !== undefined ? config.stats.punch : defaultStats.punch,
      kick: config.stats?.kick !== undefined ? config.stats.kick : defaultStats.kick,
      clinch: config.stats?.clinch !== undefined ? config.stats.clinch : defaultStats.clinch,
      wrestling: config.stats?.wrestling !== undefined ? config.stats.wrestling : defaultStats.wrestling,
      takedownDef: config.stats?.takedownDef !== undefined ? config.stats.takedownDef : defaultStats.takedownDef,
      submission: config.stats?.submission !== undefined ? config.stats.submission : defaultStats.submission,
      cardio: config.stats?.cardio !== undefined ? config.stats.cardio : defaultStats.cardio,
      strength: config.stats?.strength !== undefined ? config.stats.strength : defaultStats.strength,
      speed: config.stats?.speed !== undefined ? config.stats.speed : defaultStats.speed,
      fightIq: config.stats?.fightIq !== undefined ? config.stats.fightIq : defaultStats.fightIq,
      mental: config.stats?.mental !== undefined ? config.stats.mental : defaultStats.mental
    };

    // Manual Stat Point Allocation (Feature 2 & 8)
    this.skillPoints = config.skillPoints !== undefined ? config.skillPoints : 0;
    this.allocatedStats = config.allocatedStats || {};

    // AI Traits & Archetype (Feature 1)
    this.archetypeKey = config.archetypeKey || this.getDefaultArchetypeForStyle(this.styleKey);
    const archObj = AI_ARCHETYPES[this.archetypeKey] || AI_ARCHETYPES.pressure_fighter;
    this.aggression = config.aggression !== undefined ? config.aggression : archObj.aggression;
    this.preferredRange = config.preferredRange || archObj.preferredRange;
    this.cardioManagement = config.cardioManagement || archObj.cardioManagement;
    this.riskTolerance = config.riskTolerance !== undefined ? config.riskTolerance : archObj.riskTolerance;
    this.finishInstinct = config.finishInstinct !== undefined ? config.finishInstinct : archObj.finishInstinct;
    this.defensiveStyle = config.defensiveStyle || archObj.defensiveStyle;

    // Appearance & Gear
    this.appearance = config.appearance || {
      hair: 'short',
      beard: 'clean',
      skin: 'medium',
      shortsColor: '#ff2a5f',
      glovesColor: '#111827',
      music: 'Aggressive HipHop',
      pose: 'Aggressive'
    };

    // Status
    this.energy = 100;
    this.maxEnergy = 100;
    this.stress = 0;
    this.confidence = 50;
    this.injuries = config.injuries || [];
    
    // Career Record & Achievements
    this.record = config.record || { wins: 0, losses: 0, draws: 0, koWins: 0, subWins: 0, decWins: 0 };
    this.amateurRecord = config.amateurRecord || { wins: 0, losses: 0, draws: 0, koWins: 0, subWins: 0, decWins: 0 };
    this.amateurFightCount = config.amateurFightCount || 0;
    this.isAmateur = config.isAmateur !== undefined ? config.isAmateur : (config.rank === 99 || config.rank === undefined);

    this.fame = config.fame || 0;
    this.followers = config.followers || 50;
    this.money = config.money !== undefined ? config.money : 300;
    this.diamonds = config.diamonds !== undefined ? config.diamonds : 5;
    this.hasNoAds = config.hasNoAds || false;
    this.inventory = config.inventory || ['glove_default'];
    this.equippedGlove = config.equippedGlove || 'glove_default';

    this.organizationId = config.organizationId || 'regional';
    this.rank = config.rank !== undefined ? config.rank : 99; // 99 = Unranked (Amatör / Sıralama Dışı)
    this.isChampion = config.isChampion || false;
    this.titleDefenses = config.titleDefenses || 0;
    this.winStreak = config.winStreak || 0;

    // Upgrades
    this.gymTier = 1;
    this.hiredCoaches = [];
  }

  getDefaultArchetypeForStyle(styleKey) {
    switch (styleKey) {
      case 'boxer': return 'counter_fighter';
      case 'kickboxer': return 'technical_striker';
      case 'wrestler': return 'wrestler';
      case 'bjj': return 'grappler';
      case 'muaythai': return 'pressure_fighter';
      default: return 'wild_brawler';
    }
  }

  getStatUpgradeCost(statKey) {
    const currentVal = this.stats[statKey] || 20;
    if (currentVal >= 99) return Infinity; // Hard cap 99
    if (currentVal < 50) return 1;
    if (currentVal < 75) return 2; // Soft cap 75 starts increasing costs
    if (currentVal < 90) return 3;
    return 4;
  }

  allocateSkillPoint(statKey, count = 1) {
    let successCount = 0;
    for (let i = 0; i < count; i++) {
      const cost = this.getStatUpgradeCost(statKey);
      if (this.skillPoints >= cost && (this.stats[statKey] || 0) < 99) {
        this.skillPoints -= cost;
        this.stats[statKey] = (this.stats[statKey] || 0) + 1;
        this.allocatedStats[statKey] = (this.allocatedStats[statKey] || 0) + 1;
        successCount++;
      } else {
        break;
      }
    }
    return successCount;
  }

  getEquippedGlove() {
    const defaultGlove = GLOVES_CATALOG[0];
    if (!this.equippedGlove) return defaultGlove;
    return GLOVES_CATALOG.find(g => g.id === this.equippedGlove) || defaultGlove;
  }

  getEffectiveStats() {
    const glove = this.getEquippedGlove();
    const bonuses = glove && glove.bonuses ? glove.bonuses : {};
    
    const effective = { ...this.stats };
    
    if (bonuses.punchPct) effective.punch = Math.round(effective.punch * (1 + bonuses.punchPct / 100));
    if (bonuses.kickPct) effective.kick = Math.round(effective.kick * (1 + bonuses.kickPct / 100));
    if (bonuses.speedPct) effective.speed = Math.round(effective.speed * (1 + bonuses.speedPct / 100));
    if (bonuses.cardioPct) effective.cardio = Math.round(effective.cardio * (1 + bonuses.cardioPct / 100));
    if (bonuses.strengthPct) effective.strength = Math.round(effective.strength * (1 + bonuses.strengthPct / 100));

    // Feature 9: Apply Weight Class Adaptation Penalties
    if (this.weightAdaptationFightsLeft > 0) {
      if (this.weightPenaltyType === 'speed_loss') {
        effective.speed = Math.max(10, Math.round(effective.speed * 0.85)); // -15% speed penalty when moving up
      } else if (this.weightPenaltyType === 'stamina_loss') {
        effective.cardio = Math.max(10, Math.round(effective.cardio * 0.85)); // -15% stamina penalty when moving down
      } else if (this.weightPenaltyType === 'severe_recovery') {
        effective.speed = Math.max(10, Math.round(effective.speed * 0.88));
        effective.cardio = Math.max(10, Math.round(effective.cardio * 0.88));
      }
    }
    
    return effective;
  }

  getOverallRating() {
    const effStats = this.getEffectiveStats();
    const values = Object.values(effStats);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / values.length);
  }

  getGoatScore() {
    let score = 0;
    score += this.record.wins * 100;
    score += this.record.koWins * 150;
    score += this.record.subWins * 150;
    if (this.isChampion) score += 3000;
    score += this.titleDefenses * 1500;
    score += this.fame * 50;
    score += Math.floor(this.money / 1000);
    score += this.winStreak * 200;
    return score;
  }

  applyAging() {
    this.ageMonths = (this.ageMonths || 0) + 6;
    if (this.ageMonths >= 12) {
      this.age += 1;
      this.ageMonths = 0;
      if (this.age > 30) {
        this.maxEnergy = Math.max(70, this.maxEnergy - 2);
      }
      if (this.age > 35) {
        // Natural stat decay for older fighters
        Object.keys(this.stats).forEach(stat => {
          if (['speed', 'cardio', 'strength'].includes(stat)) {
            this.stats[stat] = Math.max(10, this.stats[stat] - Math.floor(Math.random() * 3 + 1));
          }
        });
      }
    }
  }

  healInjuries() {
    this.injuries = [];
  }

  rest(days = 1) {
    this.energy = Math.min(this.maxEnergy, this.energy + 25 * days);
    this.stress = Math.max(0, this.stress - 15 * days);
  }
}

function generateAIOpponent(weightClass, orgTier = 1, rank = 10, isTitleFight = false, amateurFightNum = 0) {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const styles = Object.keys(FIGHT_STYLES);
  const styleKey = styles[Math.floor(Math.random() * styles.length)];

  const archKeys = Object.keys(AI_ARCHETYPES);
  const archetypeKey = archKeys[Math.floor(Math.random() * archKeys.length)];

  const effectiveRank = rank >= 99 ? 30 : rank;

  // Feature 4: Better Amateur Difficulty curve (Fight 1 Very Easy, 2 Easy, 3 Med, 4 Hard)
  let baseTargetOvr = 22;
  const isAmateurOpp = rank >= 99 || amateurFightNum > 0;

  if (isAmateurOpp) {
    if (amateurFightNum === 1) baseTargetOvr = 22; // Very Easy (~24-26 OVR)
    else if (amateurFightNum === 2) baseTargetOvr = 26; // Easy (~28-30 OVR)
    else if (amateurFightNum === 3) baseTargetOvr = 30; // Medium (~32-34 OVR)
    else if (amateurFightNum >= 4) baseTargetOvr = 34; // Hard / Champ (~36-38 OVR)
    else baseTargetOvr = 24 + Math.floor(Math.random() * 4);
  } else {
    // Target OVR based on org tier & rank (WCF / UFC tier 4 is elite challenging!)
    baseTargetOvr = 28 + orgTier * 10 + (30 - effectiveRank) * 1.1;
    if (orgTier === 4) {
      baseTargetOvr = 68 + (30 - effectiveRank) * 0.95; // WCF OVR ranges 68 - 95+
    }
    if (isTitleFight) baseTargetOvr += 8;
  }
  baseTargetOvr = Math.min(97, Math.max(20, Math.round(baseTargetOvr)));

  const allStatKeys = ['punch', 'kick', 'clinch', 'wrestling', 'takedownDef', 'submission', 'cardio', 'strength', 'speed', 'fightIq', 'mental'];
  const stats = {};
  allStatKeys.forEach(st => {
    const variance = Math.floor(Math.random() * 6) - 3;
    stats[st] = Math.min(99, Math.max(15, baseTargetOvr + variance));
  });

  // Boost main stats according to fighter style baseStats (Only for pro fighters)
  if (!isAmateurOpp) {
    const styleBase = FIGHT_STYLES[styleKey]?.baseStats || {};
    Object.keys(styleBase).forEach(st => {
      if (styleBase[st] >= 30) {
        stats[st] = Math.min(99, stats[st] + 6);
      }
    });
  }

  // Realistic fight history based on rank and organization tier
  const totalFights = rank >= 99 
    ? Math.max(1, (amateurFightNum || 1) - 1 + Math.floor(Math.random() * 2)) 
    : Math.max(5, Math.floor(8 + orgTier * 3 + (30 - effectiveRank) * 0.8));
  const winRatio = rank >= 99 
    ? 0.5 
    : (0.55 + ((30 - effectiveRank) / 30) * 0.3 + Math.random() * 0.1);
  const wins = rank >= 99 
    ? Math.max(0, Math.floor(totalFights * winRatio)) 
    : Math.max(1, Math.floor(totalFights * Math.min(0.98, winRatio)));
  const losses = Math.max(0, totalFights - wins);

  return new Fighter({
    name: `${firstName} ${lastName}`,
    nickname: Math.random() > 0.6 ? `'The Machine'` : '',
    country: country,
    age: Math.floor(Math.random() * 10) + 19,
    styleKey: styleKey,
    archetypeKey: archetypeKey,
    weightClass: weightClass,
    stats: stats,
    skipStyleBonuses: true,
    record: {
      wins: wins,
      losses: losses,
      draws: 0,
      koWins: Math.floor(wins * 0.5),
      subWins: Math.floor(wins * 0.3),
      decWins: Math.floor(wins * 0.2)
    },
    rank: rank,
    isChampion: rank === 0,
    isAmateur: rank >= 99
  });
}



/* --- career.js --- */
// MMA GOAT - Career & Management Module




class CareerManager {
  constructor(playerFighter, config = {}) {
    config = config || {};
    this.player = playerFighter;

    // Camp & Fight Prerequisites State
    this.inFightCamp = false;
    this.weighInRequired = config.weighInRequired || false;
    this.readyToFight = config.readyToFight || false;
    this.campDay = 1; // 1 to 7
    this.maxCampDays = 7;
    this.campActivitiesPerDay = 2;
    this.currentDayActivitiesLeft = 2;
    this.currentOpponent = null;

    // Contract Sponsorships (Feature 6)
    this.activeSponsorships = config.activeSponsorships || [];

    // Match Offers & Rerolls Limit (Max 2 rerolls per fight phase)
    this.rerollsLeft = config.rerollsLeft !== undefined ? config.rerollsLeft : 2;

    // Separate Ecosystems: Amateur Rankings vs Pro Rankings (Feature 5)
    this.amateurRankings = config.amateurRankings ? this.generateInitialAmateurRankings(config.amateurRankings) : this.generateInitialAmateurRankings();
    this.rankings = config.rankings ? this.generateInitialRankings(config.rankings) : this.generateInitialRankings();
    
    this.matchOffers = config.matchOffers || this.generateMatchOffers();

    const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';
    // Social Media Posts Feed & Weekly Limit (Max 3 per week)
    this.weeklySocialPostsLeft = config.weeklySocialPostsLeft !== undefined ? config.weeklySocialPostsLeft : 3;
    this.socialFeed = config.socialFeed || [
      {
        author: isEn ? 'Amateur MMA League' : 'Amatör MMA Ligi',
        text: isEn 
          ? 'Young prospect ' + this.player.name + ' has entered the amateur circuit! ' + this.player.socialHandle
          : 'Genç yetenek ' + this.player.name + ' amatör ligdeki yerini aldı! ' + this.player.socialHandle,
        likes: 35,
        time: '1s'
      }
    ];

    // Ledger
    this.financialHistory = config.financialHistory || [
      { type: 'income', amount: this.player.money, description: isEn ? 'Initial Sponsor Support' : 'Başlangıç Sponsor Desteği' }
    ];
  }

  generateInitialAmateurRankings(existingRankings) {
    const ranks = [];
    const maxRank = 10;
    const existingByRank = {};
    if (existingRankings && existingRankings.length > 0) {
      existingRankings.forEach(f => {
        if (f && f.rank !== undefined) existingByRank[f.rank] = f;
      });
    }

    for (let r = 0; r <= maxRank; r++) {
      if (existingByRank[r]) {
        ranks.push(existingByRank[r]);
      } else {
        const opp = generateAIOpponent(this.player.weightClass, 1, 99, r === 0, r);
        opp.isAmateur = true;
        opp.rank = r;
        opp.isChampion = (r === 0);
        ranks.push(opp);
      }
    }

    // Sort amateur rankings by record wins desc, losses asc, overall rating desc
    ranks.sort((a, b) => {
      const aWins = a.record?.wins || 0;
      const bWins = b.record?.wins || 0;
      if (bWins !== aWins) return bWins - aWins;

      const aLosses = a.record?.losses || 0;
      const bLosses = b.record?.losses || 0;
      if (aLosses !== bLosses) return aLosses - bLosses;

      const aOvr = a.getOverallRating ? a.getOverallRating() : 30;
      const bOvr = b.getOverallRating ? b.getOverallRating() : 30;
      return bOvr - aOvr;
    });

    ranks.forEach((f, idx) => {
      f.rank = idx;
      f.isChampion = (idx === 0);
    });

    return ranks;
  }

  generateInitialRankings(existingRankings) {
    const ranks = [];
    const maxRank = 30;

    const existingByRank = {};
    if (existingRankings && existingRankings.length > 0) {
      existingRankings.forEach(f => {
        if (f && f.rank !== undefined && f.id !== this.player.id) {
          existingByRank[f.rank] = f;
        }
      });
    }

    for (let r = 0; r <= maxRank; r++) {
      if (!this.player.isAmateur && this.player.rank === r) {
        ranks.push(this.player);
      } else if (existingByRank[r]) {
        ranks.push(existingByRank[r]);
      } else {
        const opp = generateAIOpponent(this.player.weightClass, this.getOrgTier(), r, r === 0);
        opp.isAmateur = false;
        ranks.push(opp);
      }
    }
    return ranks;
  }

  generateMatchOffers(isReroll = false) {
    if (isReroll) {
      if (this.rerollsLeft <= 0) return false;
      this.rerollsLeft--;
    }

    const orgTier = this.getOrgTier();
    const offers = [];
    const usedIds = new Set([this.player.id]);

    if (this.player.isAmateur || this.player.rank >= 99) {
      // Feature 3 & 4: Short Amateur Career (3-4 fights) with scaled difficulty
      const fightNum = (this.player.amateurFightCount || 0) + 1;

      for (let i = 0; i < 3; i++) {
        const prospect = generateAIOpponent(this.player.weightClass, 1, 99, fightNum >= 4, fightNum);
        prospect.isAmateur = true;
        const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';
        prospect.name = `${isEn ? '[Amateur]' : '[Amatör]'} ${prospect.name}`;
        usedIds.add(prospect.id);
        offers.push(prospect);
      }
    } else {
      // Professional Ranked Circuit — Pick candidate target ranks near player's rank
      const currentRank = this.player.rank;
      const targetRank1 = Math.max(1, currentRank - 1);
      const targetRank2 = Math.max(1, currentRank - 2);
      const targetRank3 = Math.max(1, currentRank - 3);

      const candidates = [targetRank1, targetRank2, targetRank3];

      for (const r of candidates) {
        let opp = this.rankings.find(f => f.rank === r && !usedIds.has(f.id));
        if (!opp) {
          opp = generateAIOpponent(this.player.weightClass, orgTier, r, r === 0);
        }
        usedIds.add(opp.id);
        offers.push(opp);
      }

      while (offers.length < 3) {
        const randRank = Math.max(1, currentRank - Math.floor(Math.random() * 4));
        const extra = generateAIOpponent(this.player.weightClass, orgTier, randRank, randRank === 0);
        if (!usedIds.has(extra.id)) {
          usedIds.add(extra.id);
          offers.push(extra);
        }
      }
    }

    this.matchOffers = offers;
    return offers;
  }

  selectMatchOffer(index) {
    if (!this.matchOffers || !this.matchOffers[index]) return null;
    const selected = this.matchOffers[index];
    this.startFightCamp(selected);
    return selected;
  }

  startFightCamp(opponentFighter) {
    this.inFightCamp = true;
    this.campDay = 1;
    this.currentDayActivitiesLeft = this.campActivitiesPerDay;
    this.currentOpponent = opponentFighter || (this.matchOffers && this.matchOffers[0]) || this.findNextOpponent();
  }

  findNextOpponent() {
    if (this.currentOpponent) return this.currentOpponent;
    if (this.matchOffers && this.matchOffers.length > 0) return this.matchOffers[0];
    const targetRank = Math.max(0, this.player.rank - 1);
    return this.rankings.find(f => f.rank === targetRank && f.id !== this.player.id) || generateAIOpponent(this.player.weightClass, this.getOrgTier(), targetRank, targetRank === 0);
  }

  getOrgTier() {
    const org = ORGANIZATIONS.find(o => o.id === this.player.organizationId);
    return org ? org.tier : 1;
  }

  // Feature 2 & 8: Rebalanced Training rewards Skill Points (SP)
  performCampActivity(activityId) {
    if (!this.inFightCamp || this.currentDayActivitiesLeft <= 0) return false;

    if (activityId !== 'rest_sauna' && this.player.energy < 5) {
      return 'no_energy';
    }

    let efficiencyMultiplier = 1.0;
    const gymInfo = GYM_UPGRADES.find(g => g.tier === this.player.gymTier);
    if (gymInfo) efficiencyMultiplier *= gymInfo.bonus;

    // Feature 2 & 8: Transparent +1 SP award per training activity (+2 for high tier gyms)
    const spEarned = (gymInfo && gymInfo.tier >= 3) ? 2 : 1;
    if (activityId !== 'rest_sauna') {
      this.player.skillPoints = (this.player.skillPoints || 0) + spEarned;
    }

    switch (activityId) {
      case 'sparring':
        this.player.stats.punch = Math.min(99, this.player.stats.punch + 1);
        this.player.energy = Math.max(0, this.player.energy - 18);
        break;
      case 'wrestling_drills':
        this.player.stats.wrestling = Math.min(99, this.player.stats.wrestling + 1);
        this.player.energy = Math.max(0, this.player.energy - 20);
        break;
      case 'bjj_rolling':
        this.player.stats.submission = Math.min(99, this.player.stats.submission + 1);
        this.player.energy = Math.max(0, this.player.energy - 15);
        break;
      case 'conditioning':
        this.player.stats.cardio = Math.min(99, this.player.stats.cardio + 1);
        this.player.energy = Math.max(0, this.player.energy - 22);
        break;
      case 'video_analysis':
        this.player.stats.fightIq = Math.min(99, this.player.stats.fightIq + 1);
        this.player.energy = Math.max(0, this.player.energy - 5);
        break;
      case 'rest_sauna':
        this.player.energy = Math.min(100, this.player.energy + 35);
        this.player.stress = Math.max(0, this.player.stress - 20);
        break;
    }

    this.currentDayActivitiesLeft--;
    if (this.currentDayActivitiesLeft <= 0) {
      this.advanceCampDay();
    }
    return true;
  }

  advanceCampDay() {
    this.campDay++;
    this.currentDayActivitiesLeft = this.campActivitiesPerDay;

    if (Math.random() < 0.2) {
      this.triggerRandomEvent();
    }

    if (this.campDay > this.maxCampDays) {
      this.inFightCamp = false;
      this.weighInRequired = true;
    }
  }

  processWeighIn(strategyKey = 'balanced') {
    const strat = WEIGHT_CUT_STRATEGIES[strategyKey] || WEIGHT_CUT_STRATEGIES.balanced;
    
    const variance = (Math.random() * 0.4) - 0.2;
    const cutAchieved = Math.max(0.5, strat.weightCutKg + variance);
    
    const startingWeight = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const finalWeight = Number((startingWeight - cutAchieved).toFixed(1));
    this.player.currentWeight = finalWeight;

    const passed = finalWeight <= Number((this.player.targetWeightKg + 0.1).toFixed(1));

    if (passed) {
      this.weighInRequired = false;
      this.readyToFight = true;
      this.inFightCamp = false;
      this.campDay = 1;
      
      this.player.energy = Math.max(10, this.player.energy - strat.energyPenalty);
      
      return {
        passed: true,
        finalWeight: finalWeight,
        targetWeight: this.player.targetWeightKg,
        message: `✅ TARTI BAŞARILI! (${finalWeight} kg / Limit: ${this.player.targetWeightKg} kg)\nKilo tutturuldu, kafes dövüşüne izin verildi.`
      };
    } else {
      this.weighInRequired = false;
      this.readyToFight = false;
      this.inFightCamp = false;
      this.campDay = 1;

      const fineAmount = 500;
      this.player.money = Math.max(0, this.player.money - fineAmount);
      this.player.fame = Math.max(0, this.player.fame - 15);
      
      this.financialHistory.unshift({
        type: 'expense',
        amount: fineAmount,
        description: 'Tartı Kaçırma & Maç Men Cezası'
      });

      const failedOpponentName = this.currentOpponent ? this.currentOpponent.name : 'Rakip';
      this.currentOpponent = null;

      // Penalize active sponsor contracts for missing weigh-in!
      (this.activeSponsorships || []).forEach(s => {
        s.warning = true;
      });

      return {
        passed: false,
        finalWeight: finalWeight,
        targetWeight: this.player.targetWeightKg,
        message: `❌ TARTI KAÇIRILDI! (${finalWeight} kg / Limit: ${this.player.targetWeightKg} kg)\nSiklet limitini tutturamadınız. ${failedOpponentName} maçı İPTAL EDİLDİ!\n💸 $${fineAmount} ceza kesildi ve sponsor uyarısı alındı.`
      };
    }
  }

  triggerRandomEvent() {
    const evt = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
    this.activeEvent = evt;
  }

  resolveActiveEvent(optionIndex) {
    if (!this.activeEvent) return;
    const opt = this.activeEvent.options[optionIndex];
    if (opt) {
      if (opt.money) {
        this.player.money += opt.money;
        this.financialHistory.unshift({ type: 'income', amount: opt.money, description: this.activeEvent.title });
      }
      if (opt.fame) this.player.fame = Math.min(100, this.player.fame + opt.fame);
      if (opt.followers) this.player.followers += opt.followers;
      if (opt.energy) this.player.energy = Math.max(10, Math.min(100, this.player.energy + opt.energy));
      if (opt.mental) this.player.stats.mental = Math.max(10, Math.min(100, this.player.stats.mental + opt.mental));
      if (opt.stress) this.player.stress = Math.max(0, Math.min(100, this.player.stress + opt.stress));
    }
    this.activeEvent = null;
  }

  postSocialMedia(type) {
    if (this.weeklySocialPostsLeft <= 0) return false;

    let postText = '';
    let followerGain = 0;
    let fameGain = 0;

    const oppName = this.currentOpponent ? this.currentOpponent.name : 'Rakiplerim';

    if (type === 'trash_talk') {
      postText = `${oppName} kafeste 1 round bile dayanamayacak. Nakavt garantili! 💥🥊 #MMAGOAT #${this.player.organizationId.toUpperCase()}`;
      followerGain = Math.floor(Math.random() * 100) + 40;
      fameGain = 2;
      this.player.stress += 4;
    } else if (type === 'show_respect') {
      postText = `${oppName} harika bir sporcu. Çok sert bir antrenman kampı geçiriyorum. Kafeste en iyisi kazansın! 🤝 #Respect #MMA`;
      followerGain = Math.floor(Math.random() * 50) + 20;
      fameGain = 1;
      this.player.stats.mental = Math.min(99, this.player.stats.mental + 2);
    } else if (type === 'flex_lifestyle') {
      postText = `Şampiyonluk yolunda çalışmaya devam! Yeni antrenman ekipmanlarım hazır 🏎️💰 #MMA`;
      followerGain = Math.floor(Math.random() * 120) + 50;
      fameGain = 1;
    }

    this.weeklySocialPostsLeft--;
    this.player.followers += followerGain;
    this.player.fame = Math.min(100, this.player.fame + fameGain);
    this.socialFeed.unshift({
      author: this.player.name,
      handle: this.player.socialHandle,
      text: postText,
      likes: followerGain * 2,
      time: 'Az önce'
    });

    return true;
  }

  // Feature 6: Contract-based Sponsorship Management
  signSponsorContract(sponsorId) {
    const sponsor = SPONSORS_CATALOG.find(s => s.id === sponsorId);
    if (!sponsor) return { success: false, message: 'Sponsor bulunamadı.' };

    if (this.activeSponsorships.some(s => s.sponsorId === sponsorId)) {
      return { success: false, message: 'Bu sponsorla zaten aktif bir sözleşmeniz var.' };
    }

    if (this.player.fame < sponsor.reqFame) {
      return { success: false, message: `Yetersiz Şöhret! En az ${sponsor.reqFame} Şöhret gerekli.` };
    }

    const totalWins = (this.player.record?.wins || 0) + (this.player.amateurRecord?.wins || 0);
    if (totalWins < sponsor.reqWins) {
      return { success: false, message: `Yetersiz Galibiyet! En az ${sponsor.reqWins} zafer gerekli.` };
    }

    if (!this.player.isAmateur && sponsor.minRank !== 99 && this.player.rank > sponsor.minRank && sponsor.minRank !== 0) {
      return { success: false, message: `Yetersiz Sıralama! En az #${sponsor.minRank} veya üstü gerekli.` };
    }

    if (sponsor.minRank === 0 && !this.player.isChampion) {
      return { success: false, message: 'Bu sözleşme sadece Şampiyonlara özeldir!' };
    }

    this.activeSponsorships.push({
      sponsorId: sponsor.id,
      brand: sponsor.brand,
      brandEn: sponsor.brandEn,
      icon: sponsor.icon,
      fightsRemaining: sponsor.contractDuration,
      payPerFight: sponsor.payPerFight,
      winBonus: sponsor.winBonus,
      objectiveType: sponsor.objectiveType,
      objectiveTarget: sponsor.objectiveTarget,
      objectiveDesc: sponsor.objectiveDesc,
      winsInContract: 0,
      koInContract: 0,
      completed: false
    });

    const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';
    const sName = isEn ? sponsor.brandEn : sponsor.brand;
    this.financialHistory.unshift({
      type: 'income',
      amount: 0,
      description: isEn ? `Signed contract with ${sName}` : `${sName} ile sponsorluk imzalandı`
    });

    return { success: true, message: `✅ ${sName} ile ${sponsor.contractDuration} maçlık sözleşme imzalandı!` };
  }

  // Feature 4.5: AI Career World Progression Engine
  simulateWorldProgression() {
    const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';

    // 1. Age and develop AI fighters in pro rankings
    (this.rankings || []).forEach(opp => {
      if (!opp || opp.id === this.player.id) return;

      opp.ageMonths = (opp.ageMonths || 0) + 3;
      if (opp.ageMonths >= 12) {
        opp.age += 1;
        opp.ageMonths = 0;
      }

      // Progression / Decay
      if (opp.age < 28) {
        // Young prospects train & improve
        const statKeys = Object.keys(opp.stats || {});
        const randStat = statKeys[Math.floor(Math.random() * statKeys.length)];
        if (randStat && opp.stats[randStat] < 95) {
          opp.stats[randStat] += Math.floor(Math.random() * 2 + 1);
        }
      } else if (opp.age > 34) {
        // Age decay
        ['speed', 'cardio', 'strength'].forEach(st => {
          if (opp.stats && opp.stats[st] > 20) opp.stats[st] -= 1;
        });
      }
    });

    // 2. Simulate AI vs AI matches in pro rankings
    if (this.rankings && this.rankings.length > 5) {
      const idx1 = Math.floor(Math.random() * (this.rankings.length - 1)) + 1;
      let idx2 = idx1 + (Math.random() > 0.5 ? 1 : -1);
      if (idx2 <= 0 || idx2 >= this.rankings.length) idx2 = Math.max(1, idx1 - 1);

      const f1 = this.rankings[idx1];
      const f2 = this.rankings[idx2];

      if (f1 && f2 && f1.id !== this.player.id && f2.id !== this.player.id) {
        const f1Ovr = f1.getOverallRating ? f1.getOverallRating() : 60;
        const f2Ovr = f2.getOverallRating ? f2.getOverallRating() : 60;

        const f1WinChance = f1Ovr / (f1Ovr + f2Ovr);
        const f1Won = Math.random() < f1WinChance;

        const winner = f1Won ? f1 : f2;
        const loser = f1Won ? f2 : f1;

        winner.record.wins++;
        loser.record.losses++;

        // Swap ranks if lower rank beats higher rank
        if (winner.rank > loser.rank) {
          const oldWinnerRank = winner.rank;
          winner.rank = loser.rank;
          loser.rank = oldWinnerRank;

          if (winner.rank === 0) {
            winner.isChampion = true;
            loser.isChampion = false;
            this.socialFeed.unshift({
              author: isEn ? 'MMA World News' : 'MMA Dünya Haber',
              text: isEn 
                ? `🚨 NEW CHAMPION! ${winner.name} defeated ${loser.name} to win the title!` 
                : `🚨 YENİ ŞAMPİYON! ${winner.name}, ${loser.name}'i yenerek unvanı kazandı!`,
              likes: 120,
              time: 'Az önce'
            });
          } else if (Math.random() > 0.5) {
            this.socialFeed.unshift({
              author: isEn ? 'League Update' : 'Sıralama Güncellemesi',
              text: isEn 
                ? `📊 ${winner.name} climbed to #${winner.rank} after defeating ${loser.name}!` 
                : `📊 ${winner.name}, ${loser.name}'i mağlup ederek #${winner.rank} numaraya yükseldi!`,
              likes: 45,
              time: 'Az önce'
            });
          }
        }
      }
    }
  }

  handlePostFightResults(fightResult, opponent) {
    const org = ORGANIZATIONS.find(o => o.id === this.player.organizationId);
    const purse = org ? org.basePurse : 300;
    const winBonus = org ? org.winBonus : 300;

    let totalEarned = purse;
    let fameGained = Math.floor(2 * (org ? org.fameMultiplier : 1));

    // Reset weekly social media posts counter after fight!
    this.weeklySocialPostsLeft = 3;

    // Feature 9: Decrement Weight Adaptation counter
    if (this.player.weightAdaptationFightsLeft > 0) {
      this.player.weightAdaptationFightsLeft--;
      if (this.player.weightAdaptationFightsLeft <= 0) {
        this.player.weightPenaltyType = null;
      }
    }

    const isWin = fightResult.winner === 'player';
    const isKO = fightResult.method === 'KO';

    if (isWin) {
      totalEarned += winBonus;
      this.player.winStreak++;
      fameGained += 5;

      const diamondReward = this.player.isAmateur ? 1 : (this.player.isChampion || opponent.rank === 0 ? 3 : 2);
      this.player.diamonds = (this.player.diamonds || 0) + diamondReward;

      if (this.player.isAmateur) {
        // Feature 3: Short Amateur Record & Progress
        this.player.amateurRecord.wins++;
        if (isKO) this.player.amateurRecord.koWins++;
        if (fightResult.method === 'Submission') this.player.amateurRecord.subWins++;
        if (fightResult.method === 'Decision') this.player.amateurRecord.decWins++;
      } else {
        this.player.record.wins++;
        if (isKO) this.player.record.koWins++;
        if (fightResult.method === 'Submission') this.player.record.subWins++;
        if (fightResult.method === 'Decision') this.player.record.decWins++;
      }

      // Ranking progression for pro ranked league
      if (!this.player.isAmateur) {
        if (this.player.isChampion) {
          this.player.titleDefenses++;
        } else {
          const oldRank = this.player.rank;
          const oppRank = opponent.rank;

          if (oppRank < oldRank) {
            this.player.rank = oppRank;
            opponent.rank = oldRank;

            if (this.player.rank === 0) {
              this.player.isChampion = true;
            }
          } else {
            this.player.rank = Math.max(1, this.player.rank - 1);
          }
        }
      }
    } else if (fightResult.winner === 'opponent') {
      if (this.player.isAmateur) {
        this.player.amateurRecord.losses++;
      } else {
        this.player.record.losses++;
      }
      this.player.winStreak = 0;
      fameGained = Math.max(1, Math.floor(fameGained * 0.3));

      if (!this.player.isAmateur && !this.player.isChampion && this.player.rank < 15) {
        const oldRank = this.player.rank;
        this.player.rank += 1;
        const lowerOpp = this.rankings.find(f => f.rank === this.player.rank && f.id !== this.player.id);
        if (lowerOpp) lowerOpp.rank = oldRank;
      }
    }

    // Feature 3 & 4: Check Amateur Career Completion (4 full fights required)
    if (this.player.isAmateur) {
      this.player.amateurFightCount = (this.player.amateurFightCount || 0) + 1;
      const fightCount = this.player.amateurFightCount;

      if (fightCount >= 4) {
        const wins = this.player.amateurRecord?.wins || 0;
        this.player.isAmateur = false;

        if (wins >= 3) {
          // WON AMATEUR CHAMPIONSHIP (4-0 or 3-1) -> WCF (UFC) CONTRACT OFFER!
          this.player.organizationId = 'wcf';
          this.player.rank = 15;
          this.rankings = this.generateInitialRankings(this.rankings);

          this.activeEvent = {
            id: 'wcf_contract_offer',
            title: '🏆 AMATÖR ŞAMPİYONU! 🦅 WCF (UFC) PRO KONTRATI!',
            description: `TEBRİKLER! Amatör Ligi ${wins}-${this.player.amateurRecord.losses} rekoruyla ŞAMPİYON olarak tamamladın! Dünyanın 1 numaralı ligi WCF (UFC) seni doğrudan Profesyonel Lig'e transfer etmek için $5,000 İmza Bonusu teklif ediyor!`,
            options: [
              { text: '✍️ WCF (UFC) Kontratını İmzala (+$5,000)', money: 5000, fame: 25 },
              { text: '🥊 Bölgesel Ligden Başla (#30)', fame: 5 }
            ]
          };
        } else {
          // Completed 4 fights with 2-2 or lower
          this.player.rank = 30;
          this.rankings = this.generateInitialRankings(this.rankings);

          this.activeEvent = {
            id: 'pro_license_earned',
            title: '📜 Profesyonel Lige Geçiş',
            description: `Amatör ligdeki 4 maçlık turnuva serüvenin (${wins}-${this.player.amateurRecord.losses}) sona erdi. Profesyonel Bölgesel Lig (#30) kapıları senin için açıldı!`,
            options: [
              { text: '🥊 Profesyonel Lige Adım At! (+$1,500 İmza Bonusu)', money: 1500, fame: 10 }
            ]
          };
        }
      }
    }

    // Feature 2 & 8: Award Skill Points (SP) for fight completion
    const spGained = isWin ? (this.player.isChampion || opponent.rank === 0 ? 5 : 3) : 1;
    this.player.skillPoints = (this.player.skillPoints || 0) + spGained;

    // Feature 6: Process Active Sponsor Contract Payments & Progress
    let sponsorIncomeTotal = 0;
    this.activeSponsorships = (this.activeSponsorships || []).filter(s => {
      sponsorIncomeTotal += s.payPerFight;
      if (isWin) {
        s.winsInContract++;
        if (isKO) s.koInContract++;
        sponsorIncomeTotal += s.winBonus;
      }

      s.fightsRemaining--;
      if (s.fightsRemaining <= 0) {
        this.financialHistory.unshift({
          type: 'income',
          amount: s.payPerFight + (isWin ? s.winBonus : 0),
          description: `${s.brand} Sponsor Sözleşmesi Tamamlandı!`
        });
        return false; // Contract completed & expired
      }
      return true;
    });

    totalEarned += sponsorIncomeTotal;

    // Apply equipped glove gold bonus % and No-Ads VIP bonus %
    const glove = this.player.getEquippedGlove ? this.player.getEquippedGlove() : null;
    const gloveGoldPct = glove && glove.bonuses && glove.bonuses.goldPct ? glove.bonuses.goldPct : 0;
    const vipBonusPct = this.player.hasNoAds ? 15 : 0;
    const totalBonusPct = gloveGoldPct + vipBonusPct;

    if (totalBonusPct > 0) {
      totalEarned = Math.round(totalEarned * (1 + totalBonusPct / 100));
    }

    this.player.money += totalEarned;
    this.player.fame = Math.min(100, this.player.fame + fameGained);
    this.player.followers += Math.floor(fameGained * 80);

    this.financialHistory.unshift({
      type: 'income',
      amount: totalEarned,
      description: `${opponent.name} Dövüş Ödülü (Purse + Sponsor Primi)`
    });

    // WCF / UFC INVITATION MECHANIC
    if (!this.player.isAmateur && !this.activeEvent && this.player.organizationId === 'regional' && this.player.rank <= 10) {
      this.activeEvent = {
        id: 'wcf_contract_offer',
        title: '🦅 WCF (UFC) Kontrat & Davet Mektubu!',
        description: 'Tebrikler! Bölgesel ligdeki sıralamada ilk 10\'a girerek dünyanın 1 numaralı ligi WCF (UFC) gözlemcilerinin dikkatini çektin! Sana $5,000 İmza Bonusu teklif ediyorlar.',
        options: [
          { text: '✍️ Kontratı İmzala ve WCF (UFC) Ligi\'ne Katıl (+$5,000)', money: 5000, fame: 20 },
          { text: '🥊 Bölgesel Ligde Kalıp Güçlenmeye Devam Et', fame: 2 }
        ]
      };
    }

    this.player.applyAging();
    
    // Feature 4.5: Background World Progression Simulation
    this.simulateWorldProgression();

    // Automatic rehydration after fight
    this.player.currentWeight = this.player.walkWeight;
    this.player.energy = 85;
    this.inFightCamp = false;
    this.readyToFight = false;
    this.weighInRequired = false;
    this.currentOpponent = null;

    this.rerollsLeft = 2;
    this.generateMatchOffers();

    return {
      isWin,
      spGained,
      totalEarned,
      fameGained,
      diamondReward: isWin ? (this.player.isAmateur ? 1 : (this.player.isChampion || opponent.rank === 0 ? 3 : 2)) : 0
    };
  }

  buyNutrition(item) {
    if (!item || this.player.money < item.cost) return false;

    this.player.money -= item.cost;
    this.player.walkWeight = Number((this.player.walkWeight + item.weightGainKg).toFixed(1));
    this.player.currentWeight = this.player.walkWeight;

    if (item.energyGain) this.player.energy = Math.min(100, this.player.energy + item.energyGain);
    if (item.stressGain) this.player.stress = Math.max(0, Math.min(100, this.player.stress + item.stressGain));
    if (item.strengthBonus) this.player.stats.strength = Math.min(99, this.player.stats.strength + item.strengthBonus);
    if (item.cardioBonus) this.player.stats.cardio = Math.min(99, this.player.stats.cardio + item.cardioBonus);

    this.financialHistory.unshift({
      type: 'expense',
      amount: item.cost,
      description: `Beslenme: ${item.name}`
    });

    return true;
  }

  // Feature 9 & 11: Weight Class Adaptation & Penalties
  changeWeightClass(weightClassId) {
    const wc = WEIGHT_CLASSES.find(w => w.id === weightClassId);
    if (!wc) return false;

    const oldIndex = WEIGHT_CLASSES.findIndex(w => w.id === this.player.weightClass);
    const newIndex = WEIGHT_CLASSES.findIndex(w => w.id === weightClassId);
    const diff = newIndex - oldIndex;

    this.player.weightClass = wc.id;
    this.player.targetWeightKg = wc.limitKg;

    if (diff > 0) {
      // Moving up in weight class -> Speed loss penalty
      this.player.weightAdaptationFightsLeft = 3;
      this.player.weightPenaltyType = diff >= 2 ? 'severe_recovery' : 'speed_loss';
    } else if (diff < 0) {
      // Moving down in weight class -> Stamina loss penalty
      this.player.weightAdaptationFightsLeft = 3;
      this.player.weightPenaltyType = diff <= -2 ? 'severe_recovery' : 'stamina_loss';
    }

    if (this.player.walkWeight < wc.limitKg) {
      this.player.walkWeight = Number((wc.limitKg + 3.5).toFixed(1));
      this.player.currentWeight = this.player.walkWeight;
    }

    this.rankings = this.generateInitialRankings();
    this.amateurRankings = this.generateInitialAmateurRankings();
    this.generateMatchOffers();
    return true;
  }
}



/* --- fightEngine.js --- */
// MMA GOAT - Tactical Fight Engine & Round Simulator

class FightEngine {
  constructor(player, opponent, totalRounds = 3, isTitle = false) {
    this.player = player;
    this.opponent = opponent;
    this.totalRounds = totalRounds;
    this.isTitle = isTitle;
    this.currentRound = 1;
    this.isFinished = false;

    // Live Fight States
    this.state = {
      player: {
        headHp: 100,
        bodyHp: 100,
        legHp: 100,
        stamina: 100,
        cuts: 0,
        subDanger: 0
      },
      opponent: {
        headHp: 100,
        bodyHp: 100,
        legHp: 100,
        stamina: 100,
        cuts: 0,
        subDanger: 0
      },
      position: 'center', // 'center', 'fence', 'clinch', 'ground_guard', 'ground_mount', 'ground_back'
      positionOwner: null, // 'player' or 'opponent'
      roundScores: [] // [{ player: 10, opponent: 9 }]
    };

    this.commentary = [];
  }

  addCommentary(text, type = 'normal') {
    this.commentary.unshift({ text, type, timestamp: new Date().toLocaleTimeString() });
  }

  // Tactical Options available for the player each round phase
  getAvailableTactics(lang = 'tr') {
    if (lang === 'en') {
      return [
        { id: 'counter', name: '🎯 Counter & Distance', desc: 'Maintain distance, punish opponent with counters. (Punch + Speed)' },
        { id: 'pressure', name: '🔥 Heavy Pressure', desc: 'Walk down opponent with heavy combinations. (Punch + Strength)' },
        { id: 'takedown', name: '🤼 Double-Leg Takedown', desc: 'Shoot double leg and drag opponent to canvas. (Wrestling + Strength)' },
        { id: 'clinch', name: '💥 Clinch & Knees', desc: 'Close distance, grab collar tie and land knees. (Clinch + Strength)' },
        { id: 'kicks', name: '🦵 Distance & Leg Kicks', desc: 'Chop legs and body with kickboxing attacks. (Kick + Speed)' },
        { id: 'submission', name: '🥋 Submission Hunt', desc: 'Hunt joint locks and chokes on ground or clinch. (Submission + Fight IQ)' },
        { id: 'defend', name: '🛡️ Cautious Defense', desc: 'Shell up, catch breath and avoid damage. (Takedown Def + Cardio)' }
      ];
    }
    return [
      { id: 'counter', name: '🎯 Counter & Kontra', desc: 'Mesafe koru, rakibin hatalarını kontra yumruklarla cezalandır. (Punch + Speed)' },
      { id: 'pressure', name: '🔥 Baskı Kur (Heavy Pressure)', desc: 'Rakibin üstüne yürü, sert kombolar savur. (Punch + Strength, Yüksek Enerji Tüketimi)' },
      { id: 'takedown', name: '🤼 Takedown (Yere Alma)', desc: 'Çift bacak dal, kafese sıkıştır ve yere indir. (Wrestling + Strength)' },
      { id: 'clinch', name: '💥 Clinch & Dirsek/Diz', desc: 'Yakın mesafeye gir, boynunu yakala ve diz vuruşları savur. (Clinch + Strength)' },
      { id: 'kicks', name: '🦵 Mesafe Koru & Alçak Tekme', desc: 'Bacak ve gövde tekmeleri ile rakibin dengesini boz. (Kick + Speed)' },
      { id: 'submission', name: '🥋 Submission Avı', desc: 'Yerde veya clinch’te pes ettirme kilitleri ara. (Submission + Fight IQ)' },
      { id: 'defend', name: '🛡️ Temkinli Defans & Nefes Len', desc: 'Kapan, enerjini toparla ve rakipten kaçın. (Takedown Def + Cardio)' }
    ];
  }

  // Execute a Round based on chosen tactics
  playRound(playerTacticId) {
    if (this.isFinished) return null;

    const isEn = window.app && window.app.lang === 'en';
    const roundNum = this.currentRound;
    this.addCommentary(isEn ? `--- ROUND ${roundNum} STARTED ---` : `--- ROUND ${roundNum} BAŞLADI ---`, 'header');

    // AI selects tactic based on its style and current state
    const aiTacticId = this.chooseAITactic();

    // Determine exchange outcomes
    let pEff = this.calculateTacticEfficiency(this.player, playerTacticId, this.state.player);
    let aiEff = this.calculateTacticEfficiency(this.opponent, aiTacticId, this.state.opponent);

    // Apply Random Fight RNG Variance
    pEff *= (0.85 + Math.random() * 0.3);
    aiEff *= (0.85 + Math.random() * 0.3);

    let roundPlayerPoints = 0;
    let roundAIPoints = 0;

    // Simulate 3 key exchanges in the round
    for (let exchange = 1; exchange <= 3; exchange++) {
      const result = this.simulateExchange(playerTacticId, aiTacticId, pEff, aiEff);
      roundPlayerPoints += result.pScore;
      roundAIPoints += result.aiScore;

      // Check Finish Conditions (KO / TKO / Submission)
      if (this.state.opponent.headHp <= 0 || this.state.opponent.bodyHp <= 0) {
        this.addCommentary(isEn ? `💥 INCREDIBLE KO! ${this.player.name} KNOCKED OUT ${this.opponent.name}!` : `💥 İNANILMAZ KO! ${this.player.name} RAKİBİNİ YERE SERDİ VE DÖVÜŞÜ BİTİRDİ!`, 'finish');
        this.isFinished = true;
        return { winner: 'player', method: 'KO', round: roundNum };
      }
      if (this.state.player.headHp <= 0 || this.state.player.bodyHp <= 0) {
        this.addCommentary(isEn ? `💥 KNOCKOUT! ${this.opponent.name} KNOCKED YOU OUT!` : `💥 NAKAVT! ${this.opponent.name} MÜTHİŞ BİR VURUŞLA SENİ NAKAVT ETTİ!`, 'danger');
        this.isFinished = true;
        return { winner: 'opponent', method: 'KO', round: roundNum };
      }
      if (this.state.opponent.subDanger >= 100) {
        this.addCommentary(isEn ? `🥋 SUBMISSION! ${this.player.name} SUBMITTED ${this.opponent.name}!` : `🥋 PES ETTİRME! ${this.player.name} RAKİBİNİ PES ETTİRDİ (SUBMISSION)!`, 'finish');
        this.isFinished = true;
        return { winner: 'player', method: 'Submission', round: roundNum };
      }
      if (this.state.player.subDanger >= 100) {
        this.addCommentary(isEn ? `🥋 SUBMISSION! ${this.opponent.name} SUBMITTED YOU!` : `🥋 PES ETTİRME! ${this.opponent.name} SENİ PES ETTİRDİ (SUBMISSION)!`, 'danger');
        this.isFinished = true;
        return { winner: 'opponent', method: 'Submission', round: roundNum };
      }
    }

    // Round Scoring by 3 judges (10-9 or 10-8)
    let pScore = 10;
    let aiScore = 10;
    const diff = roundPlayerPoints - roundAIPoints;
    if (diff > 15) { pScore = 10; aiScore = 8; }
    else if (diff > 0) { pScore = 10; aiScore = 9; }
    else if (diff < -15) { pScore = 8; aiScore = 10; }
    else { pScore = 9; aiScore = 10; }

    this.state.roundScores.push({ player: pScore, opponent: aiScore });
    this.addCommentary(isEn ? `🔔 Round ${roundNum} Ended. Judges Score: ${pScore} - ${aiScore}` : `🔔 Round ${roundNum} Sona Erdi. Hakem Puan Eğilimi: ${pScore} - ${aiScore}`, 'info');

    // Recovery & Stamina consumption
    this.state.player.stamina = Math.min(100, this.state.player.stamina + 10);
    this.state.opponent.stamina = Math.min(100, this.state.opponent.stamina + 10);
    this.state.player.subDanger = 0;
    this.state.opponent.subDanger = 0;

    this.currentRound++;

    // End of match by Decision check
    if (this.currentRound > this.totalRounds) {
      this.isFinished = true;
      let totalP = 0;
      let totalAI = 0;
      this.state.roundScores.forEach(r => { totalP += r.player; totalAI += r.opponent; });

      if (totalP > totalAI) {
        this.addCommentary(isEn ? `🏆 WINNER BY UNANIMOUS DECISION: ${this.player.name}!` : `🏆 OYBİRLİĞİ İLE KAZANAN (Unanimous Decision): ${this.player.name}!`, 'finish');
        return { winner: 'player', method: 'Decision', scores: `${totalP}-${totalAI}` };
      } else if (totalAI > totalP) {
        this.addCommentary(isEn ? `❌ WINNER BY DECISION: ${this.opponent.name}!` : `❌ HAKEM KARARI İLE KAZANAN: ${this.opponent.name}!`, 'danger');
        return { winner: 'opponent', method: 'Decision', scores: `${totalP}-${totalAI}` };
      } else {
        this.addCommentary(isEn ? `⚖️ DRAW (Split Draw)!` : `⚖️ BERABERE (Split Draw)!`, 'info');
        return { winner: 'draw', method: 'Draw', scores: `${totalP}-${totalAI}` };
      }
    }

    return { ongoing: true, currentRound: this.currentRound };
  }

  chooseAITactic() {
    const opp = this.opponent;
    const aiState = this.state.opponent;
    const playerState = this.state.player;
    const stamina = aiState.stamina;
    const hp = Math.min(aiState.headHp, aiState.bodyHp);
    const playerHp = Math.min(playerState.headHp, playerState.bodyHp);
    const roundNum = this.currentRound;

    const aggression = opp.aggression !== undefined ? opp.aggression : 60;
    const riskTolerance = opp.riskTolerance !== undefined ? opp.riskTolerance : 50;
    const finishInstinct = opp.finishInstinct !== undefined ? opp.finishInstinct : 70;
    const cardioMgmt = opp.cardioManagement || 'balanced';
    const archetypeKey = opp.archetypeKey || 'pressure_fighter';

    // 1. Finish Instinct: If player HP is severely compromised (< 35), hunt for finish!
    if (playerHp < 35 && Math.random() * 100 < finishInstinct) {
      if (opp.stats && opp.stats.submission > 40 && Math.random() > 0.5) {
        return 'submission';
      }
      return 'pressure';
    }

    // 2. Scorecards Desperation: Check if AI is trailing in roundScores in round 3+
    let aiScoreSum = 0;
    let pScoreSum = 0;
    (this.state.roundScores || []).forEach(sc => {
      aiScoreSum += sc.opponent;
      pScoreSum += sc.player;
    });

    const isBehindOnPoints = roundNum >= 3 && aiScoreSum < pScoreSum;
    if (isBehindOnPoints && Math.random() * 100 < riskTolerance) {
      // AI is losing on points! High risk push for KO/Takedown
      return Math.random() > 0.4 ? 'pressure' : 'takedown';
    }

    // 3. Low Stamina & Cardio Management
    if (stamina < 30) {
      if (cardioMgmt === 'conservative' || (cardioMgmt === 'balanced' && Math.random() > 0.3)) {
        return 'defend';
      }
    }

    // 4. Low HP Defensive Reaction
    if (hp < 30) {
      if (opp.defensiveStyle === 'high_guard' || opp.defensiveStyle === 'counter_first') {
        return Math.random() > 0.4 ? 'defend' : 'counter';
      } else if (opp.defensiveStyle === 'wrestling_defense') {
        return Math.random() > 0.4 ? 'takedown' : 'defend';
      }
      return 'defend';
    }

    // 5. Archetype Tactical Selection
    if (archetypeKey === 'wrestler') {
      return Math.random() > 0.3 ? 'takedown' : 'clinch';
    } else if (archetypeKey === 'grappler') {
      return Math.random() > 0.35 ? 'submission' : 'takedown';
    } else if (archetypeKey === 'counter_fighter') {
      return Math.random() > 0.35 ? 'counter' : 'kicks';
    } else if (archetypeKey === 'technical_striker') {
      return Math.random() > 0.35 ? 'kicks' : 'counter';
    } else if (archetypeKey === 'wild_brawler') {
      return Math.random() > 0.2 ? 'pressure' : 'clinch';
    } else {
      // Pressure Fighter / Default
      return Math.random() > 0.4 ? 'pressure' : 'counter';
    }
  }

  calculateTacticEfficiency(fighter, tacticId, state) {
    const s = fighter.getEffectiveStats ? fighter.getEffectiveStats() : fighter.stats;
    let base = 50;

    switch (tacticId) {
      case 'counter': base = (s.punch * 0.5 + s.speed * 0.3 + s.fightIq * 0.2); break;
      case 'pressure': base = (s.punch * 0.4 + s.strength * 0.4 + s.cardio * 0.2); break;
      case 'takedown': base = (s.wrestling * 0.6 + s.strength * 0.4); break;
      case 'clinch': base = (s.clinch * 0.6 + s.strength * 0.4); break;
      case 'kicks': base = (s.kick * 0.6 + s.speed * 0.4); break;
      case 'submission': base = (s.submission * 0.7 + s.fightIq * 0.3); break;
      case 'defend': base = (s.takedownDef * 0.5 + s.cardio * 0.5); break;
    }

    // Stamina penalty
    base *= (state.stamina / 100);
    return Math.max(10, base);
  }

  simulateExchange(pTactic, aiTactic, pEff, aiEff) {
    let pScore = 0;
    let aiScore = 0;
    const isEn = window.app && window.app.lang === 'en';
    const pName = this.player.name;
    const oppName = this.opponent.name;

    const pStrikesTR = [
      `🥊 ${pName} sert bir sol jab - sağ direk kombosuyla ${oppName}'ı sarsıyor!`,
      `💥 ${pName} mükemmel zamanlamayla aparkat çıkarıp ${oppName}'ın dengesini bozdu!`,
      `⚡ ${pName} çengelle sert bir kroşe oturtuyor! ${oppName} geriye yalpaladı!`
    ];
    const pStrikesEN = [
      `🥊 ${pName} landed a crisp jab-cross combination on ${oppName}!`,
      `💥 ${pName} connected with a brutal uppercut, staggering ${oppName}!`,
      `⚡ ${pName} caught ${oppName} with a sharp hook!`
    ];

    const aiStrikesTR = [
      `⚠️ ${oppName} sert bir kontra vuruşla karşılık verdi!`,
      `💥 ${oppName} güçlü bir kroşeyle seni geriye püskürttü!`,
      `⚡ ${oppName} hızlı bir kombinasyonla savunmanı deldi!`
    ];
    const aiStrikesEN = [
      `⚠️ ${oppName} countered with a powerful strike!`,
      `💥 ${oppName} landed a heavy hook pushing you back!`,
      `⚡ ${oppName} breached your guard with a quick combination!`
    ];

    if (pEff > aiEff * 1.2) {
      // Player clean exchange win
      const dmg = Math.floor((pEff - aiEff * 0.5) * 0.35);
      if (['counter', 'pressure', 'kicks'].includes(pTactic)) {
        this.state.opponent.headHp -= dmg;
        const pool = isEn ? pStrikesEN : pStrikesTR;
        const line = pool[Math.floor(Math.random() * pool.length)];
        this.addCommentary(`${line} (-${dmg} HP)`, 'player_hit');
      } else if (pTactic === 'takedown') {
        this.state.position = 'ground_mount';
        this.state.positionOwner = 'player';
        this.state.opponent.bodyHp -= Math.floor(dmg * 0.7);
        this.addCommentary(isEn ? `🤼 ${pName} executed a double-leg takedown!` : `🤼 ${pName} mükemmel bir timing ile çift bacak takedown aldı!`, 'player_hit');
      } else if (pTactic === 'submission') {
        this.state.opponent.subDanger += Math.floor(dmg * 1.8);
        this.addCommentary(isEn ? `🥋 ${pName} locked in a deep submission attempt!` : `🥋 ${pName} derin bir kilit/pes ettirme poziyonu yakaladı!`, 'player_hit');
      } else {
        this.addCommentary(isEn ? `✨ ${pName} controlled the distance and negated damage.` : `✨ ${pName} mesafeyi korudu ve hamleyi boşa çıkardı.`, 'normal');
      }
      pScore = 10;
      aiScore = 3;
    } else if (aiEff > pEff * 1.2) {
      // AI clean exchange win
      const dmg = Math.floor((aiEff - pEff * 0.5) * 0.35);
      if (['counter', 'pressure', 'kicks'].includes(aiTactic)) {
        this.state.player.headHp -= dmg;
        const pool = isEn ? aiStrikesEN : aiStrikesTR;
        const line = pool[Math.floor(Math.random() * pool.length)];
        this.addCommentary(`${line} (-${dmg} HP)`, 'danger');
      } else if (aiTactic === 'takedown') {
        this.state.position = 'ground_guard';
        this.state.positionOwner = 'opponent';
        this.state.player.bodyHp -= Math.floor(dmg * 0.7);
        this.addCommentary(isEn ? `🤼 ${oppName} dragged you down to the canvas!` : `🤼 ${oppName} seni yakaladı ve yere indirdi!`, 'danger');
      } else if (aiTactic === 'submission') {
        this.state.player.subDanger += Math.floor(dmg * 1.8);
        this.addCommentary(isEn ? `⚠️ ${oppName} locked in a submission hold! Danger!` : `⚠️ ${oppName} boynunu yakaladı! Pes etme tehlikesindesin!`, 'danger');
      } else {
        this.addCommentary(isEn ? `🛑 ${oppName} negated your attempt.` : `🛑 ${oppName} atağını etkisiz hale getirdi.`, 'normal');
      }
      pScore = 3;
      aiScore = 10;
    } else {
      // Even exchange
      this.state.player.headHp -= 4;
      this.state.opponent.headHp -= 4;
      this.addCommentary(isEn ? `⚔️ Both fighters exchanged heavy blows in close range!` : `⚔️ İki dövüşçü de yakın mesafede karşılıklı sert darbelere girdi!`, 'normal');
      pScore = 5;
      aiScore = 5;
    }

    // Decrease stamina
    this.state.player.stamina = Math.max(10, this.state.player.stamina - 6);
    this.state.opponent.stamina = Math.max(10, this.state.opponent.stamina - 6);

    return { pScore, aiScore };
  }
}


/* --- adManager.js --- */
// MMA GOAT - Google AdMob Rewarded Ad Manager
// Modular, cross-platform (Android, iOS, Web Simulation) Ad Manager

class AdManager {
  constructor() {
    // Official Google AdMob Rewarded Test Ad IDs
    this.TEST_AD_UNITS = {
      android: 'ca-app-pub-4672765985243640/9005989954',
      ios: 'ca-app-pub-3940256099942544/1712485638'
    };

    this.platform = this.detectPlatform();
    this.adUnitId = this.TEST_AD_UNITS[this.platform] || this.TEST_AD_UNITS.android;

    this.isAdReady = false;
    this.isLoading = false;
    this.isNativePluginAvailable = false;

    this.initAdMob();
  }

  // Detect runtime platform (iOS, Android, or Web)
  detectPlatform() {
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      return window.Capacitor.getPlatform() === 'ios' ? 'ios' : 'android';
    }
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
    if (/android/i.test(ua)) return 'android';
    return 'web';
  }

  // Initialize AdMob Plugin / Web Fallback Bridge
  async initAdMob() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.initialize({
          requestTrackingAuthorization: true,
          initializeForTesting: true
        });
        this.isNativePluginAvailable = true;
        console.log(`[AdManager] Native AdMob initialized for ${this.platform}`);
      } else {
        console.log(`[AdManager] Running in Web Simulation mode (${this.platform})`);
        this.isNativePluginAvailable = false;
      }
    } catch (e) {
      console.warn('[AdManager] AdMob init notice (Web mode fallback enabled):', e.message || e);
      this.isNativePluginAvailable = false;
    }

    // Preload first ad
    this.preloadRewardedAd();
  }

  // Preload Rewarded Video Ad
  async preloadRewardedAd() {
    if (this.isLoading || this.isAdReady) return;
    this.isLoading = true;

    try {
      if (this.isNativePluginAvailable && window.Capacitor?.Plugins?.AdMob) {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.prepareRewardVideoAd({
          adId: this.adUnitId,
          isTesting: true
        });
        this.isAdReady = true;
        console.log('[AdManager] Native Rewarded Ad preloaded successfully.');
      } else {
        // Web Simulation Mode — Ready instantly
        this.isAdReady = true;
        console.log('[AdManager] Web Simulation Rewarded Ad ready.');
      }
    } catch (err) {
      console.warn('[AdManager] Preload notice, retrying simulation mode:', err.message || err);
      // Fallback to web simulation ready so gameplay is never blocked
      this.isAdReady = true;
    } finally {
      this.isLoading = false;
    }
  }

  // Check if rewarded ad is ready to present
  isReady() {
    return this.isAdReady;
  }

  // Show Rewarded Video Ad
  // onSuccess: Callback executed ONLY when the user watches the entire video
  // onCancel: Callback executed if the ad fails or user cancels early
  async showRewardedAd(onSuccess, onCancel) {
    if (!this.isReady()) {
      // Re-trigger preload and show web simulation fallback if unavailable
      await this.preloadRewardedAd();
    }

    if (this.isNativePluginAvailable && window.Capacitor?.Plugins?.AdMob) {
      try {
        const { AdMob } = window.Capacitor.Plugins;

        let rewardGranted = false;

        const rewardListener = await AdMob.addListener('onRewardedVideoReward', () => {
          rewardGranted = true;
        });

        const dismissListener = await AdMob.addListener('onRewardedVideoDismissed', () => {
          rewardListener.remove();
          dismissListener.remove();
          this.isAdReady = false;
          this.preloadRewardedAd(); // Preload next ad

          if (rewardGranted) {
            if (typeof onSuccess === 'function') onSuccess();
          } else {
            if (typeof onCancel === 'function') onCancel('incomplete');
          }
        });

        await AdMob.showRewardVideoAd();
      } catch (err) {
        console.warn('[AdManager] Native ad show error, launching web simulation:', err);
        this.showWebSimulatedAd(onSuccess, onCancel);
      }
    } else {
      // Web Simulation Modal
      this.showWebSimulatedAd(onSuccess, onCancel);
    }
  }

  // In-Game Web Simulation Modal Overlay for local/browser testing
  showWebSimulatedAd(onSuccess, onCancel) {
    let simModal = document.getElementById('admob-sim-modal');
    if (!simModal) {
      this.createWebSimModalHTML();
      simModal = document.getElementById('admob-sim-modal');
    }

    const timerEl = document.getElementById('admob-sim-timer');
    const closeBtn = document.getElementById('admob-sim-close');
    const progressFill = document.getElementById('admob-sim-progress-fill');

    let secondsLeft = 5; // 5-second test video simulation
    if (timerEl) timerEl.innerText = `${secondsLeft}s`;
    if (progressFill) progressFill.style.width = '0%';
    if (closeBtn) {
      closeBtn.style.display = 'none';
      closeBtn.onclick = null;
    }

    simModal.classList.add('active');

    const interval = setInterval(() => {
      secondsLeft--;
      const pct = Math.round(((5 - secondsLeft) / 5) * 100);
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (timerEl) timerEl.innerText = secondsLeft > 0 ? `${secondsLeft}s` : 'REWARD GRANTED!';

      if (secondsLeft <= 0) {
        clearInterval(interval);
        if (closeBtn) {
          closeBtn.style.display = 'inline-block';
          closeBtn.innerText = '✅ ÖDÜLÜ AL & KAPAT';
          closeBtn.onclick = () => {
            simModal.classList.remove('active');
            this.isAdReady = false;
            this.preloadRewardedAd();
            if (typeof onSuccess === 'function') onSuccess();
          };
        }
      }
    }, 1000);
  }

  // Creates the HTML element for Web Simulation Modal
  createWebSimModalHTML() {
    const div = document.createElement('div');
    div.id = 'admob-sim-modal';
    div.className = 'modal-overlay';
    div.innerHTML = `
      <div class="modal-content" style="max-width: 420px; text-align: center; border: 2px solid var(--accent-cyan); background: rgba(18,22,31,0.98); box-shadow: 0 0 35px rgba(0,243,255,0.3);">
        <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem;">
          🎬 ADMOB REKLAM SİMÜLASYONU (TEST MODE)
        </div>
        <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 0.6rem;">🎥 Ödüllü Video Reklamı Oynatılıyor</h3>
        
        <div style="background: #000; border-radius: 12px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--bg-card-border); margin-bottom: 1rem; position: relative; overflow: hidden;">
          <div style="font-size: 2.5rem; animation: pulse 1.5s infinite;">🥊</div>
          <div style="font-size: 0.85rem; color: var(--accent-cyan); margin-top: 0.4rem; font-weight: 600;">MMA GOAT Sponsors</div>
          <div style="position: absolute; top: 8px; right: 12px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; color: #fff;" id="admob-sim-timer">
            5s
          </div>
        </div>

        <div class="bar-container" style="height: 8px; margin-bottom: 1.2rem;">
          <div id="admob-sim-progress-fill" class="bar-fill fill-cyan" style="width: 0%; transition: width 1s linear;"></div>
        </div>

        <button id="admob-sim-close" class="btn btn-gold" style="width: 100%; display: none; font-weight: 800;">
          ✅ ÖDÜLÜ AL & KAPAT
        </button>
      </div>
    `;
    document.body.appendChild(div);
  }
}


/* --- app.js --- */
// MMA GOAT - Main Application Orchestrator








const SAVE_KEY = 'mma_goat_save_v2';

const TRANSLATIONS = {
  tr: {
    mainTitle: '🥊 MMA GOAT',
    mainSubtitle: 'Kariyer Menajerlik & RPG Simülasyonu',
    continueSaveTitle: '📂 Devam Eden Kariyer',
    btnContinue: '▶️ Kariyere Devam Et',
    btnNewCareer: '🚀 Yeni Kariyer Başlat',
    btnDeleteSave: '🗑️ Kayıtlı Kariyeri Sil',
    homeMenu: '🏠 Ana Menü',

    newFighter: '🥋 Yeni Dövüşçü',
    labelName: 'İsim',
    placeholderName: 'Dövüşçü Adı & Soyadı...',
    labelSocial: '📱 Sosyal Medya Adı',
    labelCountry: 'Ülke',
    labelWeight: 'Siklet',
    labelStyle: 'Dövüş Stili',
    startingStats: '📊 Başlangıç Statları',
    btnStartCareer: '🚀 Kariyeri Başlat',

    tabDashboard: '🏠 Özeti',
    tabStats: '📊 Statlar',
    tabGloves: '🥊 Eldiven',
    tabCamp: '🏋️ Kamp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 Lig',
    tabSocial: '📱 Sosyal',
    tabShop: '🏬 Mağaza',
    tabLegacy: '👑 GOAT',

    energy: '⚡ Enerji',
    stress: '😤 Stres',
    rest: '🛌 Dinlen',
    attributes: '📊 Nitelikler',
    selectedFight: '🔥 Seçilen Dövüş',
    btnStartCamp: '🥊 KAMP BAŞLAT (7 Gün)',
    btnWeighIn: '⚖️ RESMİ TARTIYA ÇIK (WEIGH-IN)',
    btnEnterOctagon: '🥊 MAÇA GİR (OCTAGON)',
    btnGoToCamp: '🏋️ KAMPA GİT',
    matchOffers: '📜 Dövüş Teklifleri',
    acceptContract: '✍️ Sözleşmeyi İmzala',
    rerollOffers: '🎲 Teklifleri Yenile',
    retireCareer: '👑 Emekli Ol',

    socialTitle: '📱 Sosyal Medya',
    postLimit: 'Haftalık Gönderi Hakkı:',
    btnTrashTalk: '💥 Trash Talk',
    btnRespect: '🤝 Saygı',
    btnFlex: '🏎️ Lüks Yaşam',

    campTitle: '🏋️ Antrenman Kampı',
    dayActivitiesLeft: 'Günün Kalan Aktivite Hakkı:',
    btnNextDay: '🌙 Günü Bitir & Dinlen',
    btnTrainStriking: '🥊 Boks & Kickboks (Punch/Kick +2)',
    btnTrainWrestling: '🤼 Güreş & Takedown (Wrestling/TDD +2)',
    btnTrainBjj: '🥋 BJJ & Pes Ettirme (Submission/Clinch +2)',
    btnTrainCardio: '🏃 Kardiyo & Kondisyon (Cardio +2, Enerji -15)',
    btnPhysio: '💆 Fizyoterapi & Masaj (Stres -20, Enerji +15)',

    nutritionMarket: '🍎 Beslenme & Kütle Marketi',
    fighterWeight: 'Dövüşçü Kilosu:',
    targetLimit: 'Siklet Limiti:',
    weightClassSwitch: '⚖️ Siklet Değiştir / Yükselt',
    gymUpgrades: '🏬 Salon & Tesis Yükseltmeleri',
    btnBuy: 'Satın Al',
    btnSwitchWeight: '⚖️ Siklete Geç',

    fightCenter: '🥊 Dövüş Merkezi',
    chooseTactic: 'Raund Taktiği Seç:',
    btnPlayRound: '⚡ Raundu Başlat',

    goatRanking: '👑 GOAT Derecelendirmesi',
    goatScore: 'GOAT Puanı:',
    totalRecord: 'Toplam Rekor:',
    koWins: 'Nakavt Zaferleri:',
    subWins: 'Pes Ettirme Zaferleri:',
    titleBelts: 'Şampiyonluk Kemer Sayısı:',
    titleDefenses: 'Kemer Savunmaları:',
    totalWealth: 'Toplam Servet:',

    rankHeadRank: 'Sıra',
    rankHeadFighter: 'Dövüşçü',
    rankHeadStyle: 'Stil',
    rankHeadRecord: 'Rekor',
    rankHeadOvr: 'OVR',

    btnRankPro: '👑 Profesyonel',
    btnRankAmateur: '🥊 Amatör Lig',

    statsTitle: '📊 Dövüşçü Statları & Nitelikleri',
    statsFighterLabel: 'Dövüşçü',
    spBannerText: '✨ Kullanılabilir Yetenek Puanı (Skill Points):',
    spBannerDesc: 'Puanlar kampa katılarak kazanılır. Yüksek statlar daha fazla SP gerektirir (Soft Cap: 75).',
    careerSummaryTitle: '🏆 Kariyer Özeti',

    shopDiamondsTitle: '💎 Elmas & Geliştiriciye Bağış Mağazası',
    shopDiamondsDesc: 'Oyunu desteklemek ve efsanevî eldivenler, altın takasları ve VIP ayrıcalıklar açmak için Elmas paketlerini tercih edebilirsiniz:',
    shopVipTitle: '🛡️ Reklam Engelleme & VIP Dövüşçü Statüsü',
    shopVipDesc: '• Reklamsız Kesintisiz Deneyim<br>• Dövüş Kazanımlarında <strong>+%15 Ekstra Altın Bonusu</strong><br>• VIP Profil Rozeti & Altın İsim Parlaması',
    shopExchangeTitle: '💱 Döviz Bürosu (Elmas ➔ Altın Takası)',
    shopExchangeDesc: 'Elmaslarınızı anında oyun içi nakit paraya (💰) dönüştürebilirsiniz:',
    shopGymTitle: '🏬 Salon & Tesis Yükseltmeleri',
    balance: 'Bakiye',

    glovesTitle: '🥊 Eldiven Ekipman Mağazası & Soyunma Odası',
    glovesDesc: 'Eldivenler dövüşte % Stat Bonusu verir'
  },
  en: {
    mainTitle: '🥊 MMA GOAT',
    mainSubtitle: 'Career Management & RPG Simulation',
    continueSaveTitle: '📂 Saved Career',
    btnContinue: '▶️ Continue Career',
    btnNewCareer: '🚀 Start New Career',
    btnDeleteSave: '🗑️ Delete Saved Career',
    homeMenu: '🏠 Main Menu',

    newFighter: '🥋 New Fighter',
    labelName: 'Name',
    placeholderName: 'Fighter Name & Surname...',
    labelSocial: '📱 Social Media Handle',
    labelCountry: 'Country',
    labelWeight: 'Weight Class',
    labelStyle: 'Fighting Style',
    startingStats: '📊 Starting Stats',
    btnStartCareer: '🚀 Start Career',

    tabDashboard: '🏠 Dashboard',
    tabStats: '📊 Stats',
    tabGloves: '🥊 Gloves',
    tabCamp: '🏋️ Camp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 League',
    tabSocial: '📱 Social',
    tabShop: '🏬 Shop',
    tabLegacy: '👑 GOAT',

    energy: '⚡ Energy',
    stress: '😤 Stress',
    rest: '🛌 Rest',
    attributes: '📊 Attributes',
    selectedFight: '🔥 Selected Fight',
    btnStartCamp: '🥊 START CAMP (7 Days)',
    btnWeighIn: '⚖️ OFFICIAL WEIGH-IN',
    btnEnterOctagon: '🥊 ENTER OCTAGON',
    btnGoToCamp: '🏋️ GO TO CAMP',
    matchOffers: '📜 Match Offers',
    acceptContract: '✍️ Sign Contract',
    rerollOffers: '🎲 Reroll Offers',
    retireCareer: '👑 Retire',

    socialTitle: '📱 Social Media',
    postLimit: 'Weekly Post Limit:',
    btnTrashTalk: '💥 Trash Talk',
    btnRespect: '🤝 Respect',
    btnFlex: '🏎️ Flex Lifestyle',

    campTitle: '🏋️ Training Camp',
    dayActivitiesLeft: 'Activities Left Today:',
    btnNextDay: '🌙 End Day & Rest',
    btnTrainStriking: '🥊 Boxing & Kickboxing (Punch/Kick +2)',
    btnTrainWrestling: '🤼 Wrestling & Takedowns (Wrestling/TDD +2)',
    btnTrainBjj: '🥋 BJJ & Submissions (Submission/Clinch +2)',
    btnTrainCardio: '🏃 Cardio & Conditioning (Cardio +2, Energy -15)',
    btnPhysio: '💆 Physio & Recovery (Stress -20, Energy +15)',

    nutritionMarket: '🍎 Nutrition & Mass Market',
    fighterWeight: 'Fighter Weight:',
    targetLimit: 'Weight Limit:',
    weightClassSwitch: '⚖️ Change / Move Weight Class',
    gymUpgrades: '🏬 Gym & Facility Upgrades',
    btnBuy: 'Buy',
    btnSwitchWeight: '⚖️ Switch Class',

    fightCenter: '🥊 Fight Center',
    chooseTactic: 'Select Round Tactic:',
    btnPlayRound: '⚡ Execute Round',

    goatRanking: '👑 GOAT Ranking',
    goatScore: 'GOAT Score:',
    totalRecord: 'Total Record:',
    koWins: 'KO Victories:',
    subWins: 'Submission Victories:',
    titleBelts: 'Title Belts Held:',
    titleDefenses: 'Title Defenses:',
    totalWealth: 'Total Wealth:',

    rankHeadRank: 'Rank',
    rankHeadFighter: 'Fighter',
    rankHeadStyle: 'Style',
    rankHeadRecord: 'Record',
    rankHeadOvr: 'OVR',

    btnRankPro: '👑 Professional',
    btnRankAmateur: '🥊 Amateur League',

    statsTitle: '📊 Fighter Stats & Attributes',
    statsFighterLabel: 'Fighter',
    spBannerText: '✨ Available Skill Points (SP):',
    spBannerDesc: 'Points are earned in camp. Higher stats require more SP (Soft Cap: 75).',
    careerSummaryTitle: '🏆 Career Summary',

    shopDiamondsTitle: '💎 Diamond & Supporter Store',
    shopDiamondsDesc: 'Support the game and unlock legendary gloves, gold exchanges, and VIP perks with Diamond packs:',
    shopVipTitle: '🛡️ Ad-Free & VIP Fighter Pass',
    shopVipDesc: '• Seamless Ad-Free Experience<br>• <strong>+15% Extra Gold Bonus</strong> on All Fight Earnings<br>• VIP Profile Badge & Gold Name Glow',
    shopExchangeTitle: '💱 Exchange Bureau (Diamonds ➔ Gold)',
    shopExchangeDesc: 'Convert your Diamonds into in-game Cash (💰) instantly:',
    shopGymTitle: '🏬 Gym & Facility Upgrades',
    balance: 'Balance',

    glovesTitle: '🥊 Gloves Equipment Store & Locker',
    glovesDesc: 'Gloves grant percentage Stat Bonuses in fights'
  }
};

class MMAGoatApp {
  constructor() {
    window.app = this;
    this.player = null;
    this.career = null;
    this.fightEngine = null;
    this.selectedStyleKey = 'boxer';
    this.lang = localStorage.getItem('mma_goat_lang') || 'tr';
    this.adManager = new AdManager();

    this.initUI();
    this.checkExistingSave();
  }

  t(key) {
    return TRANSLATIONS[this.lang]?.[key] || TRANSLATIONS['tr']?.[key] || key;
  }

  setLanguage(lang) {
    this.lang = lang;
    localStorage.setItem('mma_goat_lang', lang);
    this.updateLanguageUI();
    this.populateCreatorDropdowns();
    this.updateStylePreview();
    if (this.player) {
      this.updateHeaderAndDashboard();
      this.renderSocialFeedView();
      this.renderShopView();
      this.renderStatsView();
      this.renderLegacyView();
      this.renderRankingsView();
      if (this.fightEngine) this.updateFightUI();
    }
  }

  updateLanguageUI() {
    document.querySelectorAll('.btn-lang').forEach(btn => {
      const active = btn.dataset.lang === this.lang;
      btn.style.opacity = active ? '1' : '0.5';
      btn.style.fontWeight = active ? 'bold' : 'normal';
      btn.style.borderColor = active ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)';
      btn.style.background = active ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255,255,255,0.05)';
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = this.t(key);
      if (translation) {
        el.innerText = translation;
      }
    });

    const createNameInput = document.getElementById('create-name');
    if (createNameInput) {
      createNameInput.placeholder = this.t('placeholderName');
    }
  }

  initUI() {
    this.updateLanguageUI();
    this.populateCreatorDropdowns();
    this.bindEvents();
    this.updateStylePreview();
  }

  checkExistingSave() {
    // Clean up old v1 save to force update to new Amatör (NR) & 30-Rankings system
    if (localStorage.getItem('mma_goat_save_v1')) {
      try { localStorage.removeItem('mma_goat_save_v1'); } catch (e) {}
    }

    const rawSave = localStorage.getItem(SAVE_KEY);
    const continueCard = document.getElementById('continue-save-card');
    const deleteBtn = document.getElementById('btn-menu-delete');

    if (rawSave) {
      try {
        const data = JSON.parse(rawSave);
        if (data && data.player) {
          if (continueCard) continueCard.style.display = 'block';
          if (deleteBtn) deleteBtn.style.display = 'block';

          const flag = data.player.country?.flag || '';
          const name = data.player.name || 'Dövüşçü';
          document.getElementById('save-player-name').innerText = `${flag} ${name}`;

          const orgId = data.player.organizationId ? data.player.organizationId.toUpperCase() : 'REGIONAL';
          const wins = (data.player.record && data.player.record.wins !== undefined) ? data.player.record.wins : 0;
          const losses = (data.player.record && data.player.record.losses !== undefined) ? data.player.record.losses : 0;
          const money = data.player.money !== undefined ? data.player.money.toLocaleString() : '0';
          document.getElementById('save-player-details').innerText = `${orgId} | Rekor: ${wins}-${losses} | $${money}`;

          // Calculate OVR from saved stats
          const values = Object.values(data.player.stats || {});
          const ovr = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 65;
          document.getElementById('save-player-ovr').innerText = ovr;
        }
      } catch (e) {
        console.error('Error reading save', e);
      }
    } else {
      if (continueCard) continueCard.style.display = 'none';
      if (deleteBtn) deleteBtn.style.display = 'none';
    }
  }

  saveGame() {
    if (!this.player || !this.career) return;

    const saveData = {
      player: this.player,
      career: {
        inFightCamp: this.career.inFightCamp,
        campDay: this.career.campDay,
        currentDayActivitiesLeft: this.career.currentDayActivitiesLeft,
        weeklySocialPostsLeft: this.career.weeklySocialPostsLeft,
        rerollsLeft: this.career.rerollsLeft,
        socialFeed: this.career.socialFeed,
        financialHistory: this.career.financialHistory,
        activeSponsorships: this.career.activeSponsorships || [],
        amateurRankings: this.career.amateurRankings || [],
        rankings: this.career.rankings,
        currentOpponent: this.career.currentOpponent,
        matchOffers: this.career.matchOffers,
        activeEvent: this.career.activeEvent,
        weighInRequired: this.career.weighInRequired,
        readyToFight: this.career.readyToFight
      },
      timestamp: Date.now()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    this.checkExistingSave();
  }

  loadGame() {
    const rawSave = localStorage.getItem(SAVE_KEY);
    if (!rawSave) return false;

    try {
      const data = JSON.parse(rawSave);
      if (!data || !data.player) {
        throw new Error('Kayıt verisi eksik veya bozuk.');
      }

      // Reconstruct Fighter
      this.player = new Fighter(data.player);

      // Reconstruct CareerManager
      this.career = new CareerManager(this.player, data.career);
      if (data.career) {
        this.career.inFightCamp = data.career.inFightCamp || false;
        this.career.campDay = data.career.campDay || 1;
        this.career.currentDayActivitiesLeft = data.career.currentDayActivitiesLeft !== undefined ? data.career.currentDayActivitiesLeft : 2;
        this.career.weeklySocialPostsLeft = data.career.weeklySocialPostsLeft !== undefined ? data.career.weeklySocialPostsLeft : 3;
        this.career.rerollsLeft = data.career.rerollsLeft !== undefined ? data.career.rerollsLeft : 2;
        this.career.socialFeed = data.career.socialFeed || [];
        this.career.financialHistory = data.career.financialHistory || [];
        this.career.activeSponsorships = data.career.activeSponsorships || [];

        // Reconstruct amateur rankings safely
        if (data.career.amateurRankings && Array.isArray(data.career.amateurRankings)) {
          this.career.amateurRankings = data.career.amateurRankings
            .filter(rData => rData !== null && rData !== undefined)
            .map(rData => {
              if (rData.id === this.player.id) return this.player;
              return new Fighter(rData);
            });
        } else {
          this.career.amateurRankings = this.career.generateInitialAmateurRankings();
        }

        // Reconstruct pro ranking Fighter objects safely
        if (data.career.rankings && Array.isArray(data.career.rankings)) {
          this.career.rankings = data.career.rankings
            .filter(rData => rData !== null && rData !== undefined)
            .map(rData => {
              if (rData.id === this.player.id) return this.player;
              return new Fighter(rData);
            });
        }


        // Reconstruct opponent and match offers safely
        if (data.career.currentOpponent) {
          this.career.currentOpponent = new Fighter(data.career.currentOpponent);
        } else {
          this.career.currentOpponent = null;
        }

        if (data.career.matchOffers && Array.isArray(data.career.matchOffers)) {
          this.career.matchOffers = data.career.matchOffers
            .filter(o => o !== null && o !== undefined)
            .map(o => new Fighter(o));
        }

        this.career.activeEvent = data.career.activeEvent || null;
        this.career.weighInRequired = data.career.weighInRequired || false;
        this.career.readyToFight = data.career.readyToFight || false;
      }

      // Show header & nav tabs
      document.getElementById('top-header').style.display = 'flex';
      document.getElementById('main-nav-tabs').style.display = 'flex';
      document.querySelector('main')?.classList.remove('no-header', 'no-nav');

      this.switchScreen('screen-dashboard');
      this.updateHeaderAndDashboard();
      return true;
    } catch (e) {
      console.error('Failed to load save file', e);
      alert('Kayıtlı oyun yüklenirken hata oluştu: ' + e.message);
      return false;
    }
  }

  deleteSave() {
    if (confirm('Kayıtlı kariyeri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
      localStorage.removeItem(SAVE_KEY);
      this.checkExistingSave();
    }
  }

  populateCreatorDropdowns() {
    // Countries
    const countrySelect = document.getElementById('create-country');
    const countryPlaceholder = this.lang === 'en' ? 'Select Country...' : 'Ülke Seçiniz...';
    countrySelect.innerHTML = `<option value="" disabled selected>${countryPlaceholder}</option>` +
      COUNTRIES.map(c => `<option value="${c.code}">${c.flag} ${this.lang === 'en' && c.nameEn ? c.nameEn : c.name}</option>`).join('');

    // Weight Classes
    const weightSelect = document.getElementById('create-weight');
    weightSelect.innerHTML = WEIGHT_CLASSES.map(w => `<option value="${w.id}">${w.name} (${w.limitLbs} lbs / ${w.limitKg} kg)</option>`).join('');

    // Fighting Styles
    const styleContainer = document.getElementById('style-selector-container');
    styleContainer.innerHTML = Object.keys(FIGHT_STYLES).map(key => {
      const s = FIGHT_STYLES[key];
      const sName = this.lang === 'en' && s.nameEn ? s.nameEn : s.name;
      return `
        <div class="style-card ${key === this.selectedStyleKey ? 'selected' : ''}" data-style="${key}">
          <div class="icon">${s.icon}</div>
          <strong style="display:block; font-size:0.8rem;">${sName}</strong>
        </div>
      `;
    }).join('');

    // Style click listener
    styleContainer.querySelectorAll('.style-card').forEach(card => {
      card.addEventListener('click', (e) => {
        styleContainer.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.selectedStyleKey = target.dataset.style;
        this.updateStylePreview();
        sfx.playClick();
      });
    });
  }

  updateStylePreview() {
    const previewGrid = document.getElementById('style-stats-preview-grid');
    if (!previewGrid) return;
    const styleData = FIGHT_STYLES[this.selectedStyleKey];
    if (!styleData || !styleData.baseStats) return;

    const statLabelsTR = {
      punch: 'Yumruk', kick: 'Tekme', clinch: 'Clinch', wrestling: 'Güreş',
      takedownDef: 'TDD', submission: 'Submission', cardio: 'Kondisyon',
      strength: 'Güç', speed: 'Hız', fightIq: 'Dövüş IQ', mental: 'Mental'
    };
    const statLabelsEN = {
      punch: 'Punch', kick: 'Kick', clinch: 'Clinch', wrestling: 'Wrestling',
      takedownDef: 'TDD', submission: 'Submission', cardio: 'Cardio',
      strength: 'Strength', speed: 'Speed', fightIq: 'Fight IQ', mental: 'Mental'
    };
    const statLabels = this.lang === 'en' ? statLabelsEN : statLabelsTR;

    previewGrid.innerHTML = Object.keys(styleData.baseStats).map(k => `
      <div style="background: rgba(255,255,255,0.05); padding: 0.3rem 0.2rem; border-radius: 6px; text-align: center;">
        <span style="font-size: 0.62rem; color: var(--text-muted); display: block; line-height: 1.2;">${statLabels[k] || k}</span>
        <strong style="color: var(--accent-gold); font-size: 0.82rem;">${styleData.baseStats[k]}</strong>
      </div>
    `).join('');
  }

  bindEvents() {
    // Language Switcher Buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        this.setLanguage(lang);
        sfx.playClick();
      });
    });

    // Main Menu Buttons
    document.getElementById('btn-menu-new')?.addEventListener('click', () => {
      sfx.playClick();
      this.switchScreen('screen-creation');
    });

    document.getElementById('btn-continue-career')?.addEventListener('click', () => {
      sfx.playClick();
      this.loadGame();
    });

    document.getElementById('btn-menu-delete')?.addEventListener('click', () => {
      sfx.playClick();
      this.deleteSave();
    });

    // Return to Main Menu Header Button
    document.getElementById('btn-return-menu')?.addEventListener('click', () => {
      sfx.playClick();
      this.saveGame();
      document.getElementById('top-header').style.display = 'none';
      document.getElementById('main-nav-tabs').style.display = 'none';
      document.querySelector('main')?.classList.add('no-header', 'no-nav');
      this.switchScreen('screen-main-menu');
    });

    // Start Career Button
    document.getElementById('btn-start-career')?.addEventListener('click', () => {
      sfx.playClick();
      this.startNewCareer();
    });

    // Tab buttons navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.playClick();
        const targetScreenId = e.currentTarget.dataset.target;
        this.switchScreen(targetScreenId);
      });
    });

    // Dashboard Quick Actions
    document.getElementById('btn-quick-rest')?.addEventListener('click', () => {
      if (this.player) {
        sfx.playClick();
        this.player.rest(1);
        this.saveGame();
        this.updateHeaderAndDashboard();
      }
    });

    document.getElementById('btn-retire-career')?.addEventListener('click', () => {
      sfx.playClick();
      if (confirm('Kariyerinizi tamamlayıp emekli olmak istediğinize emin misiniz?')) {
        this.deleteSave();
        location.reload();
      }
    });
  }

  startNewCareer() {
    const name = document.getElementById('create-name').value.trim();
    if (!name) {
      alert('Lütfen dövüşçünüz için bir isim giriniz!');
      return;
    }

    const countryCode = document.getElementById('create-country').value;
    if (!countryCode) {
      alert('Lütfen dövüşçünüz için bir ülke seçiniz!');
      return;
    }

    const countryObj = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
    const weightClass = document.getElementById('create-weight').value;

    // Social Handle — auto-prefix @ if missing and remove spaces
    let socialRaw = document.getElementById('create-social')?.value.trim() || '';
    if (socialRaw) {
      socialRaw = socialRaw.replace(/\s+/g, '');
      if (!socialRaw.startsWith('@')) socialRaw = '@' + socialRaw;
    }
    const socialHandle = socialRaw || '@' + name.toLowerCase().replace(/\s+/g, '');

    this.player = new Fighter({
      name: name,
      age: 18,
      country: countryObj,
      weightClass: weightClass,
      styleKey: this.selectedStyleKey,
      socialHandle: socialHandle
    });

    this.career = new CareerManager(this.player);

    // Save initial game state
    this.saveGame();

    // Show Header & Main Nav Tabs
    document.getElementById('top-header').style.display = 'flex';
    document.getElementById('main-nav-tabs').style.display = 'flex';
    document.querySelector('main')?.classList.remove('no-header', 'no-nav');

    this.switchScreen('screen-dashboard');
    this.updateHeaderAndDashboard();
  }

  switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');

    // Update active tab button style
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.target === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update screen specific content
    if (screenId === 'screen-dashboard') this.updateHeaderAndDashboard();
    if (screenId === 'screen-camp') this.updateCampView();
    if (screenId === 'screen-octagon') {
      // Only allow Octagon if there's an active (non-finished) fight
      if (this.fightEngine && !this.fightEngine.isFinished) {
        this.updateFightUI();
      } else {
        // No active fight — redirect to dashboard
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-dashboard').classList.add('active');
        this.updateHeaderAndDashboard();
        return;
      }
    }
    if (screenId === 'screen-rankings') this.renderRankingsView();
    if (screenId === 'screen-social') this.renderSocialFeedView();
    if (screenId === 'screen-shop') this.renderShopView();
    if (screenId === 'screen-gloves') this.renderGlovesView();
    if (screenId === 'screen-legacy') this.renderLegacyView();
    if (screenId === 'screen-stats') this.renderStatsView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderAndDashboard() {
    if (!this.player) return;

    const isEn = this.lang === 'en';

    // Header updates
    const rankText = this.player.isAmateur ? (isEn ? 'Amateur' : 'Amatör') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    document.getElementById('hdr-org').innerText = this.player.isAmateur ? (isEn ? 'AMATEUR' : 'AMATÖR') : this.player.organizationId.toUpperCase();
    document.getElementById('hdr-weight').innerText = `${this.player.weightClass} (${rankText})`;
    
    const recObj = this.player.isAmateur ? (this.player.amateurRecord || { wins: 0, losses: 0, draws: 0 }) : this.player.record;
    document.getElementById('hdr-record').innerText = `${recObj.wins}-${recObj.losses}-${recObj.draws || 0}`;
    document.getElementById('hdr-money').innerText = `$${this.player.money.toLocaleString()}`;
    const diamondsEl = document.getElementById('hdr-diamonds');
    if (diamondsEl) diamondsEl.innerText = (this.player.diamonds || 0).toLocaleString();
    document.getElementById('hdr-fame').innerText = `${this.player.fame}`;
    document.getElementById('hdr-energy').innerText = `${this.player.energy}%`;

    // Profile Card
    const ageStr = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('dash-name').innerText = `${this.player.country.flag} ${this.player.name} (${ageStr})`;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('dash-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'Fighter');
    document.getElementById('dash-ovr').innerText = this.player.getOverallRating();

    document.getElementById('dash-energy-bar').style.width = `${this.player.energy}%`;
    document.getElementById('dash-stress-bar').style.width = `${this.player.stress}%`;

    // Render Feature 11: Dashboard Weight Management Card
    this.renderDashboardWeightCard();

    // Render Next Fight OR 3 Match Offers
    const fightContainer = document.getElementById('dash-fight-container');
    if (fightContainer) {
      if (this.career.currentOpponent) {
        const opp = this.career.currentOpponent;
        let btnText = isEn ? '🥊 START CAMP (7 Days)' : '🥊 KAMP BAŞLAT (7 Gün)';
        let btnClass = 'btn btn-gold';

        if (this.career.weighInRequired) {
          btnText = isEn ? '⚖️ OFFICIAL WEIGH-IN' : '⚖️ RESMİ TARTIYA ÇIK (WEIGH-IN)';
          btnClass = 'btn btn-gold';
        } else if (this.career.readyToFight) {
          btnText = isEn ? '🥊 ENTER OCTAGON' : '🥊 MAÇA GİR (OCTAGON)';
          btnClass = 'btn btn-cyan';
        } else if (this.career.inFightCamp) {
          btnText = isEn ? `🏋️ GO TO CAMP (Day ${this.career.campDay}/7)` : `🏋️ KAMPA GİT (Gün ${this.career.campDay}/7)`;
          btnClass = 'btn btn-cyan';
        }

        const oppStyleName = isEn && FIGHT_STYLES[opp.styleKey]?.nameEn ? FIGHT_STYLES[opp.styleKey].nameEn : (FIGHT_STYLES[opp.styleKey]?.name || opp.styleKey);

        fightContainer.innerHTML = `
          <h3 style="font-size: 1rem; margin-bottom: 0.4rem;">${isEn ? '🔥 Selected Fight' : '🔥 Seçilen Dövüş'}</h3>
          <h2 style="color: var(--accent-gold); font-size: 1.2rem; margin-bottom: 0.1rem;">${opp.country.flag} ${opp.name}</h2>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.6rem;">
            ${isEn ? `Rank #${opp.rank} | ${oppStyleName} | Record: ${opp.record.wins}-${opp.record.losses} | OVR: ${opp.getOverallRating()}` : `Sıralama #${opp.rank} | ${oppStyleName} | Rekor: ${opp.record.wins}-${opp.record.losses} | OVR: ${opp.getOverallRating()}`}
          </p>
          <button id="btn-start-camp" class="${btnClass}" style="width: 100%;">
            ${btnText}
          </button>
        `;

        const campBtn = document.getElementById('btn-start-camp');
        if (campBtn) {
          campBtn.onclick = () => {
            sfx.playClick();
            if (this.career.weighInRequired) {
              this.showWeighInModal();
            } else if (this.career.readyToFight) {
              this.prepareOctagonView();
              this.switchScreen('screen-octagon');
            } else if (this.career.inFightCamp) {
              this.switchScreen('screen-camp');
              this.updateCampView();
            } else {
              this.career.startFightCamp(this.career.currentOpponent);
              this.saveGame();
              this.switchScreen('screen-camp');
              this.updateCampView();
            }
          };
        }
      } else {
        // No opponent selected yet -> Render 3 Match Offers!
        if (!this.career.matchOffers || this.career.matchOffers.length === 0) {
          this.career.generateMatchOffers();
        }

        const rerollsLeft = this.career.rerollsLeft !== undefined ? this.career.rerollsLeft : 2;
        const rerollLabel = isEn ? 'Reroll' : 'Yenile';
        const rerollBtnHtml = rerollsLeft > 0
          ? `<button class="btn btn-secondary btn-sm" onclick="window.app.refreshMatchOffers()" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">🔄 ${rerollLabel} (${rerollsLeft}/2)</button>`
          : `<button class="btn btn-secondary btn-sm" disabled style="padding: 0.2rem 0.5rem; font-size: 0.75rem; opacity: 0.4; cursor: not-allowed;">🔄 ${rerollLabel} (0/2)</button>`;

        let offersHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h3 style="font-size: 0.95rem; margin: 0;">${isEn ? '🔥 Fight Offers (Select Match)' : '🔥 Dövüş Teklifleri (Maçını Seç)'}</h3>
            ${rerollBtnHtml}
          </div>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.6rem;">${isEn ? 'Accept one of the 3 offers below to advance in rankings:' : 'Sıralamada yükselmek için aşağıdaki 3 tekliften birini kabul et:'}</p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        `;

        this.career.matchOffers.forEach((opp, idx) => {
          const styleName = isEn && FIGHT_STYLES[opp.styleKey]?.nameEn ? FIGHT_STYLES[opp.styleKey].nameEn : FIGHT_STYLES[opp.styleKey]?.name;
          offersHtml += `
            <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${opp.country.flag} ${opp.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">
                  ${isEn ? 'Rank:' : 'Sıra:'} <strong style="color:var(--accent-gold);">${opp.isAmateur ? 'Amatör' : '#' + opp.rank}</strong> | ${styleName} | OVR: ${opp.getOverallRating()} | (${opp.record.wins}-${opp.record.losses})
                </div>
              </div>
              <button class="btn btn-gold btn-sm" onclick="window.app.acceptMatchOffer(${idx})">${isEn ? '🎯 Accept' : '🎯 Seç'}</button>
            </div>
          `;
        });

        offersHtml += `</div>`;
        fightContainer.innerHTML = offersHtml;
      }
    }

    // Stats Grid Rendering
    const statsGrid = document.getElementById('dash-stats-grid');
    if (statsGrid) {
      statsGrid.innerHTML = Object.keys(this.player.stats).map(st => `
        <div style="background: rgba(0,0,0,0.3); padding: 0.4rem; border-radius: 8px; border: 1px solid var(--bg-card-border); text-align: center;">
          <span style="font-size:0.65rem; color:var(--text-muted); display:block;">${st.toUpperCase()}</span>
          <strong style="font-family:var(--font-heading); font-size:0.9rem; color:var(--accent-cyan);">${this.player.stats[st]}</strong>
        </div>
      `).join('');
    }

    // Check and show active career event modal on Dashboard
    if (this.career && this.career.activeEvent) {
      setTimeout(() => {
        this.showEventModal(this.career.activeEvent);
      }, 300);
    }
  }

  showWeighInModal() {
    const modal = document.getElementById('weighin-modal');
    if (!modal || !this.player) return;

    const currentKg = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const targetKg = this.player.targetWeightKg;
    const diffKg = Number((currentKg - targetKg).toFixed(1));

    document.getElementById('weighin-current-kg').innerText = `${currentKg} kg`;
    document.getElementById('weighin-target-kg').innerText = `${targetKg} kg`;
    document.getElementById('weighin-diff-kg').innerText = diffKg > 0 ? `+${diffKg} kg` : `${diffKg} kg`;

    document.getElementById('weighin-strategy-section').style.display = 'block';
    document.getElementById('weighin-result-section').style.display = 'none';

    const stratList = document.getElementById('weighin-strategies-list');
    if (stratList) {
      stratList.innerHTML = Object.keys(WEIGHT_CUT_STRATEGIES).map(key => {
        const s = WEIGHT_CUT_STRATEGIES[key];
        const sName = this.lang === 'en' && s.nameEn ? s.nameEn : s.name;
        const sDesc = this.lang === 'en' && s.descEn ? s.descEn : s.desc;
        return `
          <div class="glass-card" style="cursor: pointer; transition: transform 0.2s; border-color: var(--accent-gold); margin-bottom: 0.5rem;" onclick="window.app.handleWeighInChoice('${key}')">
            <h4 style="color: var(--accent-gold); margin-bottom: 0.3rem;">${sName}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${sDesc}</p>
            <div style="font-size: 0.75rem; color: var(--accent-cyan);">⚡ Enerji Düşüşü: -${s.energyPenalty} | Tahmini Kilo Kaybı: ~${s.weightCutKg} kg</div>
          </div>
        `;
      }).join('');
    }

    modal.style.display = 'flex';
  }

  handleWeighInChoice(strategyKey) {
    if (!this.career) return;
    sfx.playClick();
    const res = this.career.processWeighIn(strategyKey);
    this.saveGame();

    document.getElementById('weighin-strategy-section').style.display = 'none';
    const resultSec = document.getElementById('weighin-result-section');
    if (resultSec) resultSec.style.display = 'block';

    const badge = document.getElementById('weighin-status-badge');
    if (badge) {
      if (res.passed) {
        badge.style.background = 'rgba(34, 197, 94, 0.2)';
        badge.style.border = '2px solid #22c55e';
        badge.style.color = '#22c55e';
        badge.innerText = '✅ TARTI PASSED (KİLO TUTTU)';
      } else {
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.border = '2px solid #ef4444';
        badge.style.color = '#ef4444';
        badge.innerText = '❌ TARTI KAÇIRILDI (MAÇ İPTAL)';
      }
    }

    const txt = document.getElementById('weighin-result-text');
    if (txt) txt.innerText = res.message;

    const confirmBtn = document.getElementById('btn-weighin-confirm');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        sfx.playClick();
        const modal = document.getElementById('weighin-modal');
        if (modal) modal.style.display = 'none';
        this.updateHeaderAndDashboard();
        if (res.passed) {
          this.prepareOctagonView();
          this.switchScreen('screen-octagon');
        } else {
          this.switchScreen('screen-dashboard');
        }
      };
    }
  }

  // Feature 11: Render Dashboard Weight Class Card
  renderDashboardWeightCard() {
    const card = document.getElementById('dash-weight-card');
    if (!card || !this.player) return;

    const isEn = this.lang === 'en';
    const wcObj = WEIGHT_CLASSES.find(w => w.id === this.player.weightClass) || WEIGHT_CLASSES[3];
    const currentIndex = WEIGHT_CLASSES.findIndex(w => w.id === this.player.weightClass);

    let statusBadge = '';
    if (this.player.weightAdaptationFightsLeft > 0) {
      let penaltyDesc = isEn ? '-15% Speed Penalty' : '-%15 Hız Cezası (Sıklet Üstü)';
      if (this.player.weightPenaltyType === 'stamina_loss') {
        penaltyDesc = isEn ? '-15% Stamina Penalty' : '-%15 Kondisyon Cezası (Kilo Kesimi)';
      } else if (this.player.weightPenaltyType === 'severe_recovery') {
        penaltyDesc = isEn ? '-12% Speed & Stamina' : '-%12 Hız & Kondisyon (Aşırı Geçiş)';
      }

      statusBadge = `
        <div style="background: rgba(255,42,95,0.15); border: 1px solid var(--accent-red); border-radius: 6px; padding: 0.35rem 0.6rem; color: var(--accent-red); font-size: 0.78rem; font-weight: 700; margin-top: 0.4rem;">
          ⚠️ ${isEn ? 'Weight Adaptation' : 'Sıklet Uyum Süresi'}: ${this.player.weightAdaptationFightsLeft} ${isEn ? 'fights left' : 'maç kaldı'} (${penaltyDesc})
        </div>
      `;
    } else {
      statusBadge = `
        <div style="background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 6px; padding: 0.25rem 0.5rem; color: #22c55e; font-size: 0.75rem; font-weight: 700; margin-top: 0.4rem; display: inline-block;">
          ✅ ${isEn ? 'Fully Adapted to Division' : 'Sıklete Tam Uyumlu'}
        </div>
      `;
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">${isEn ? '⚖️ Division & Weight Target' : '⚖️ Siklet & Kilo Hedefi'}</span>
          <h3 style="font-size: 1.05rem; color: var(--accent-cyan); margin: 0.1rem 0;">${wcObj.name} (${wcObj.limitKg} kg / ${wcObj.limitLbs} lbs)</h3>
          <p style="font-size: 0.8rem; color: #fff;">
            ${isEn ? 'Current Weight:' : 'Mevcut Kilo:'} <strong>${this.player.walkWeight} kg</strong> | ${isEn ? 'Target Limit:' : 'Limit:'} <strong>${wcObj.limitKg} kg</strong>
          </p>
        </div>
        <div style="display: flex; gap: 0.3rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.app.changeWeightClassDashboard(-1)" ${currentIndex <= 0 ? 'disabled style="opacity:0.4;"' : ''}>
            ⬇️ ${isEn ? 'Down' : 'Alt Siklet'}
          </button>
          <button class="btn btn-cyan btn-sm" onclick="window.app.changeWeightClassDashboard(1)" ${currentIndex >= WEIGHT_CLASSES.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
            ⬆️ ${isEn ? 'Up' : 'Üst Siklet'}
          </button>
        </div>
      </div>
      ${statusBadge}
    `;
  }

  changeWeightClassDashboard(direction) {
    if (!this.career || !this.player) return;
    const isEn = this.lang === 'en';
    const currentIndex = WEIGHT_CLASSES.findIndex(w => w.id === this.player.weightClass);
    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= WEIGHT_CLASSES.length) return;

    const targetWc = WEIGHT_CLASSES[newIndex];
    sfx.playClick();
    this.career.changeWeightClass(targetWc.id);
    this.saveGame();
    this.updateHeaderAndDashboard();
    alert(isEn 
      ? `⚖️ Division changed to ${targetWc.name} (${targetWc.limitKg} kg)!\nWeight adaptation period initiated (3 fights).`
      : `⚖️ Sikletiniz ${targetWc.name} (${targetWc.limitKg} kg) olarak değiştirildi!\n3 maçlık sıklet uyum süreci başladı.`
    );
  }

  acceptMatchOffer(index) {
    if (!this.career) return;
    sfx.playClick();
    const selected = this.career.selectMatchOffer(index);
    if (selected) {
      this.saveGame();
      this.updateHeaderAndDashboard();
    }
  }

  refreshMatchOffers() {
    if (!this.career) return;

    if (this.career.rerollsLeft <= 0) {
      alert('Bu dövüş seçimi için yenileme hakkınız kalmadı! (Maksimum 2 yenileme yapabilirsiniz).');
      return;
    }

    sfx.playClick();
    this.career.generateMatchOffers(true);
    this.saveGame();
    this.updateHeaderAndDashboard();
  }

  // Feature 10: Training Camp with Nutrition & Meal Plan
  updateCampView() {
    if (!this.career) return;

    const wrapper = document.getElementById('camp-card-wrapper');
    if (!wrapper) return;

    if (this.career.weighInRequired) {
      this.switchScreen('screen-dashboard');
      this.showWeighInModal();
      return;
    }

    if (!this.career.inFightCamp) {
      wrapper.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0.8rem;">
          <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem; font-size: 1.1rem;">🥊 Aktif Dövüş Kampı Yok</h3>
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">
            Henüz bir dövüş teklifi kabul etmediniz. Antrenman yapmak ve maça hazırlanmak için önce ana sayfadan bir rakip teklifini seçin.
          </p>
          <button class="btn btn-gold" onclick="window.app.switchScreen('screen-dashboard')">
            🔥 Ana Sayfaya Git & Rakip Seç
          </button>
        </div>
      `;
      return;
    }

    const isEn = this.lang === 'en';
    const energyColor = this.player.energy < 5 ? 'var(--accent-red)' : 'var(--accent-cyan)';

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <h2 style="font-size: 1rem;">🏋️ Kamp (${this.career.currentOpponent?.name || 'Rakip'})</h2>
        <div style="display: flex; gap: 0.4rem;">
          <div class="stat-pill">📅 <strong>${this.career.campDay} / ${this.career.maxCampDays}</strong></div>
          <div class="stat-pill">⚡ <strong style="color: ${energyColor};">${this.player.energy}%</strong></div>
          <div class="stat-pill">🎯 <strong>${this.career.currentDayActivitiesLeft}</strong></div>
        </div>
      </div>

      <div class="tactics-grid" style="margin-bottom: 1rem;">
        <div class="tactic-btn" onclick="window.app.doCampActivity('sparring')">
          <h4>🥊 Ağır Sparring</h4>
          <p>Punch (+1) | +1 SP | -18 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('wrestling_drills')">
          <h4>🤼 Güreş & TDD</h4>
          <p>Wrestling (+1) | +1 SP | -20 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('bjj_rolling')">
          <h4>🥋 BJJ Rolling</h4>
          <p>Submission (+1) | +1 SP | -15 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('conditioning')">
          <h4>🏃 Kondisyon</h4>
          <p>Cardio (+1) | +1 SP | -22 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('video_analysis')">
          <h4>📹 Rakip Analiz</h4>
          <p>Fight IQ (+1) | +1 SP | -5 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('rest_sauna')">
          <h4>🧘 Sauna & Dinlen</h4>
          <p>+35 ⚡ | Stres (-)</p>
        </div>
        <div class="tactic-btn" style="border: 1px solid var(--accent-cyan); background: rgba(0,243,255,0.08);" onclick="window.app.watchAdForEnergyBoost()">
          <h4 style="color: var(--accent-cyan);">🎥 ${isEn ? 'Instant Recovery' : 'Hızlı Enerji'}</h4>
          <p>${isEn ? 'Watch Ad (+50 Energy)' : 'Reklam İzle (+50 Enerji)'}</p>
        </div>
      </div>

      <!-- Feature 10: Nutrition Section in Training Camp -->
      <div style="border-top: 1px dashed var(--bg-card-border); padding-top: 0.8rem; margin-top: 0.8rem;">
        <h3 style="font-size: 0.95rem; color: var(--accent-gold); margin-bottom: 0.4rem;">🍎 Kamp Beslenme & Kütle Programı</h3>
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.6rem;">
          Mevcut Kilo: <strong>${this.player.walkWeight} kg</strong> | Limit: <strong>${this.player.targetWeightKg} kg</strong>
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">
    `;

    NUTRITION_ITEMS.forEach(item => {
      const iName = isEn && item.nameEn ? item.nameEn : item.name;
      const iDesc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
      html += `
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 0.5rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #fff;">${iName}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin: 0.2rem 0;">${iDesc}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem;">
            <strong style="color: var(--accent-gold); font-size: 0.85rem;">$${item.cost}</strong>
            <button class="btn btn-gold btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="window.app.buyNutrition('${item.id}')">${isEn ? 'Eat' : 'Tüket'}</button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    wrapper.innerHTML = html;
  }

  doCampActivity(activityId) {
    if (!this.career) return;

    sfx.playClick();
    const result = this.career.performCampActivity(activityId);

    if (result === 'no_energy') {
      const isEn = this.lang === 'en';
      alert(isEn ? 'Too exhausted to train! Take sauna or rest.' : 'Çok yorgunsunuz! Antrenman yapmak için önce dinlenmeli veya saunaya girmelisiniz.');
      return;
    }

    this.saveGame();
    this.updateCampView();
    this.updateHeaderAndDashboard();
  }

  prepareOctagonView() {
    if (!this.career) return;
    const opponent = this.career.currentOpponent || this.career.findNextOpponent();
    if (!opponent) return;

    this.fightEngine = new FightEngine(this.player, opponent, 3, this.player.rank === 0);

    const isEn = this.lang === 'en';
    const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
    const oppStyle = isEn && FIGHT_STYLES[opponent.styleKey]?.nameEn ? FIGHT_STYLES[opponent.styleKey].nameEn : (FIGHT_STYLES[opponent.styleKey]?.name || 'MMA');

    const pNameEl = document.getElementById('fight-player-name');
    if (pNameEl) pNameEl.innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    const pStyleEl = document.getElementById('fight-player-style');
    if (pStyleEl) pStyleEl.innerText = pStyle;

    const oppNameEl = document.getElementById('fight-opp-name');
    if (oppNameEl) oppNameEl.innerText = `${opponent.country?.flag || ''} ${opponent.name}`;
    const oppStyleEl = document.getElementById('fight-opp-style');
    if (oppStyleEl) oppStyleEl.innerText = oppStyle;

    this.renderTacticsButtons();
    this.updateFightUI();
  }

  renderTacticsButtons() {
    const container = document.getElementById('tactics-buttons-container');
    if (!container || !this.fightEngine) return;

    const tactics = this.fightEngine.getAvailableTactics();
    container.innerHTML = tactics.map(t => {
      const tName = this.lang === 'en' && t.nameEn ? t.nameEn : t.name;
      const tDesc = this.lang === 'en' && t.descEn ? t.descEn : t.desc;
      return `
        <div class="tactic-btn" onclick="window.app.playRoundChoice('${t.id}')">
          <h4>${tName}</h4>
          <p>${tDesc}</p>
        </div>
      `;
    }).join('');
  }

  playRoundChoice(tacticId) {
    if (!this.fightEngine || this.fightEngine.isFinished) return;

    sfx.playPunch();
    const outcome = this.fightEngine.playRound(tacticId);

    this.updateFightUI();

    if (outcome && outcome.winner) {
      sfx.playBell();
      if (outcome.winner === 'player') sfx.playCrowdCheer();

      const resultObj = this.career.handlePostFightResults(outcome, this.fightEngine.opponent);
      this.saveGame();

      setTimeout(() => {
        this.showFightResultModal(outcome, resultObj);
      }, 700);
    }
  }

  showFightResultModal(outcome, resultObj) {
    const modal = document.getElementById('fight-result-modal');
    if (!modal) return;
    const isEn = this.lang === 'en';

    this.lastFightOutcome = outcome;
    this.lastFightResultObj = resultObj;
    this.doubleRewardClaimed = false;

    const isPlayerWin = outcome.winner === 'player';
    const winName = isPlayerWin ? this.player.name : this.fightEngine.opponent.name;
    const winFlag = isPlayerWin ? (this.player.country?.flag || '🇹🇷') : (this.fightEngine.opponent.country?.flag || '🏳️');

    const iconEl = document.getElementById('fight-result-icon');
    if (iconEl) iconEl.innerText = isPlayerWin ? '🏆' : (outcome.winner === 'draw' ? '⚖️' : '💔');

    const titleEl = document.getElementById('fight-result-title');
    if (titleEl) titleEl.innerText = isEn ? '🥊 FIGHT FINISHED' : '🥊 DÖVÜŞ SONA ERDİ';
    
    const winnerBadge = document.getElementById('fight-result-winner-badge');
    if (winnerBadge) {
      if (outcome.winner === 'draw') {
        winnerBadge.innerHTML = isEn ? '⚖️ MATCH DRAW' : '⚖️ BERABERE';
        winnerBadge.style.borderColor = 'var(--text-muted)';
        winnerBadge.style.color = '#fff';
        winnerBadge.style.background = 'rgba(255,255,255,0.1)';
      } else if (isPlayerWin) {
        winnerBadge.innerHTML = `🏆 ${isEn ? 'Winner:' : 'Kazanan:'} ${winFlag} ${winName}`;
        winnerBadge.style.borderColor = 'var(--accent-gold)';
        winnerBadge.style.color = 'var(--accent-gold)';
        winnerBadge.style.background = 'rgba(255,215,0,0.15)';
      } else {
        winnerBadge.innerHTML = `❌ ${isEn ? 'Winner:' : 'Kazanan:'} ${winFlag} ${winName}`;
        winnerBadge.style.borderColor = 'var(--accent-red)';
        winnerBadge.style.color = 'var(--accent-red)';
        winnerBadge.style.background = 'rgba(255,42,95,0.15)';
      }
    }

    const methodEl = document.getElementById('fight-result-method');
    if (methodEl) {
      methodEl.innerText = isEn 
        ? `Method: ${outcome.method}`
        : `Yöntem: ${outcome.method}`;
    }

    this.renderFightResultRewardsGrid();

    const doubleBtn = document.getElementById('btn-fight-result-double-reward');
    if (doubleBtn) {
      doubleBtn.style.display = 'block';
      doubleBtn.disabled = false;
      doubleBtn.style.opacity = '1';
      doubleBtn.innerText = isEn ? '🎥 CLAIM 2X FIGHT REWARD (WATCH AD)' : '🎥 2X MAÇ ÖDÜLÜ KAZAN (REKLAM İZLE)';
    }

    const closeBtn = document.getElementById('btn-fight-result-close');
    if (closeBtn) {
      closeBtn.innerText = isEn 
        ? '🔥 RETURN TO DASHBOARD & CONTINUE CAREER' 
        : '🔥 ANA SAYFAYA DÖN & KARİYERE DEVAM ET';
    }

    modal.classList.add('active');
  }

  renderFightResultRewardsGrid() {
    const grid = document.getElementById('fight-result-rewards-grid');
    if (!grid) return;
    const isEn = this.lang === 'en';
    const resultObj = this.lastFightResultObj || {};
    const isPlayerWin = this.lastFightOutcome?.winner === 'player';

    const multiplier = this.doubleRewardClaimed ? 2 : 1;
    const spVal = (resultObj?.spGained || (isPlayerWin ? 3 : 1)) * multiplier;
    const moneyVal = (resultObj?.totalEarned || 0) * multiplier;
    const fameVal = (resultObj?.fameGained || 0) * multiplier;
    const diaVal = (resultObj?.diamondReward || 0) * multiplier;

    const claimedTag = this.doubleRewardClaimed ? ` <span style="font-size:0.72rem; color:#4caf50;">(2X AKTİF!)</span>` : '';

    grid.innerHTML = `
      <div style="background: rgba(255,215,0,0.1); border: 1px solid var(--accent-gold); border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Skill Points' : 'Yetenek Puanı'}</span>
        <strong style="color: var(--accent-gold); font-size: 1.1rem;">+${spVal} SP${claimedTag}</strong>
      </div>
      <div style="background: rgba(76,175,80,0.1); border: 1px solid #4caf50; border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Purse Money' : 'Para Ödülü'}</span>
        <strong style="color: #4caf50; font-size: 1.1rem;">+$${moneyVal.toLocaleString()}${claimedTag}</strong>
      </div>
      <div style="background: rgba(38,198,218,0.1); border: 1px solid var(--accent-cyan); border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Fame' : 'Şöhret'}</span>
        <strong style="color: var(--accent-cyan); font-size: 1.1rem;">+${fameVal} ⭐${claimedTag}</strong>
      </div>
      <div style="background: rgba(171,71,188,0.1); border: 1px solid #ab47bc; border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Diamonds' : 'Elmas'}</span>
        <strong style="color: #ab47bc; font-size: 1.1rem;">+${diaVal} 💎${claimedTag}</strong>
      </div>
    `;
  }

  // Rewarded Ad Action 1: 2x Fight Rewards
  watchAdForDoubleReward() {
    if (this.doubleRewardClaimed) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.adManager.showRewardedAd(
      () => {
        // Reward Callback — Grant 2x rewards!
        const resultObj = this.lastFightResultObj || {};
        const bonusMoney = resultObj.totalEarned || 0;
        const bonusSp = resultObj.spGained || 0;
        const bonusFame = resultObj.fameGained || 0;
        const bonusDia = resultObj.diamondReward || 0;

        this.player.money += bonusMoney;
        this.player.skillPoints = (this.player.skillPoints || 0) + bonusSp;
        this.player.fame = Math.min(100, this.player.fame + bonusFame);
        this.player.diamonds = (this.player.diamonds || 0) + bonusDia;

        this.doubleRewardClaimed = true;
        this.saveGame();
        this.updateHeaderAndDashboard();
        this.renderFightResultRewardsGrid();

        const doubleBtn = document.getElementById('btn-fight-result-double-reward');
        if (doubleBtn) {
          doubleBtn.disabled = true;
          doubleBtn.style.opacity = '0.5';
          doubleBtn.innerText = isEn ? '✅ 2X REWARD CLAIMED!' : '✅ 2X ÖDÜL ALINDI!';
        }

        sfx.playCrowdCheer();
        alert(isEn ? '🎉 2x Fight Reward Claimed Successfully!' : '🎉 Tebrikler! 2 Katı Maç Ödülü Hesabınıza Eklendi!');
      },
      (reason) => {
        alert(isEn ? 'Ad was cancelled or not completed. No bonus granted.' : 'Reklam tamamlanmadı veya kapatıldı. Ekstra 2x ödül verilmedi.');
      }
    );
  }

  // Rewarded Ad Action 2: Camp Instant +50 Energy
  watchAdForEnergyBoost() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.adManager.showRewardedAd(
      () => {
        this.player.energy = Math.min(100, this.player.energy + 50);
        this.saveGame();
        this.updateHeaderAndDashboard();
        this.updateCampView();
        sfx.playClick();
        alert(isEn ? '⚡ +50 Energy Boost Claimed!' : '⚡ Tebrikler! Reklam izleyerek +50 Enerji Kazandınız!');
      },
      () => {
        alert(isEn ? 'Ad was cancelled or not completed.' : 'Reklam tamamlanmadı veya kapatıldı. Enerji ödülü verilmedi.');
      }
    );
  }

  closeFightResultModal() {
    sfx.playClick();
    const modal = document.getElementById('fight-result-modal');
    if (modal) modal.classList.remove('active');
    this.switchScreen('screen-dashboard');
  }

  updateFightUI() {
    if (!this.fightEngine) return;

    const st = this.fightEngine.state;
    const pHead = document.getElementById('fight-p-head');
    if (pHead) pHead.style.width = `${Math.max(0, st.player.headHp)}%`;
    const pStam = document.getElementById('fight-p-stam');
    if (pStam) pStam.style.width = `${Math.max(0, st.player.stamina)}%`;

    const oppHead = document.getElementById('fight-opp-head');
    if (oppHead) oppHead.style.width = `${Math.max(0, st.opponent.headHp)}%`;
    const oppStam = document.getElementById('fight-opp-stam');
    if (oppStam) oppStam.style.width = `${Math.max(0, st.opponent.stamina)}%`;

    // Commentary feed — keep scroll position steady without page jump
    const box = document.getElementById('fight-commentary-box');
    if (box) {
      box.innerHTML = this.fightEngine.commentary.map(c => `
        <div class="commentary-line ${c.type}">${c.text}</div>
      `).join('');
      box.scrollTop = 0;
    }
  }

  showEventModal(evt) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-desc').innerText = evt.description;

    const optContainer = document.getElementById('modal-options');
    if (optContainer) {
      optContainer.innerHTML = evt.options.map((opt, idx) => `
        <button class="btn btn-secondary" onclick="window.app.resolveEventOption(${idx})">${opt.text}</button>
      `).join('');
    }

    modal.classList.add('active');
  }

  resolveEventOption(index) {
    if (this.career) {
      sfx.playClick();
      if (this.career.activeEvent && this.career.activeEvent.id === 'wcf_contract_offer' && index === 0) {
        this.player.organizationId = 'wcf';
        this.player.rank = 15;
        this.player.isChampion = false;
        this.career.rankings = this.career.generateInitialRankings();
        this.career.generateMatchOffers();
        alert('🎉 TEBRİKLER! WCF (UFC) Organizasyonuna Transfer Oldun!\nDünyanın 1 numaralı liginde başarılar!');
      }

      this.career.resolveActiveEvent(index);
      this.saveGame();
      const modal = document.getElementById('event-modal');
      if (modal) modal.classList.remove('active');
      this.updateHeaderAndDashboard();
    }
  }

  // Feature 5: Rankings Tab Switch (Pro vs Amateur)
  switchRankingsTab(tab) {
    this.currentRankingsTab = tab;
    sfx.playClick();
    this.renderRankingsView();
  }

  renderRankingsView() {
    if (!this.career) return;
    const isEn = this.lang === 'en';

    const proBtn = document.getElementById('btn-rankings-pro');
    const amBtn = document.getElementById('btn-rankings-amateur');

    const showAmateur = this.currentRankingsTab === 'amateur';

    if (proBtn) proBtn.className = `btn btn-sm ${!showAmateur ? 'btn-gold' : 'btn-secondary'}`;
    if (amBtn) amBtn.className = `btn btn-sm ${showAmateur ? 'btn-gold' : 'btn-secondary'}`;

    const tbody = document.getElementById('rankings-tbody');
    if (!tbody) return;

    let html = '';
    const youTag = isEn ? '(YOU)' : '(SEN)';
    const champTitle = isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON';

    if (showAmateur) {
      // Amateur Rankings — Sort by Wins desc, Losses asc, OVR desc
      const amRanks = [...(this.career.amateurRankings || [])];
      
      amRanks.sort((a, b) => {
        const aRec = a.id === this.player.id ? (this.player.amateurRecord || { wins: 0, losses: 0 }) : (a.record || { wins: 0, losses: 0 });
        const bRec = b.id === this.player.id ? (this.player.amateurRecord || { wins: 0, losses: 0 }) : (b.record || { wins: 0, losses: 0 });

        const aWins = aRec.wins || 0;
        const bWins = bRec.wins || 0;
        if (bWins !== aWins) return bWins - aWins;

        const aLosses = aRec.losses || 0;
        const bLosses = bRec.losses || 0;
        if (aLosses !== bLosses) return aLosses - bLosses;

        const aOvr = a.getOverallRating ? a.getOverallRating() : 30;
        const bOvr = b.getOverallRating ? b.getOverallRating() : 30;
        return bOvr - aOvr;
      });

      amRanks.forEach((f, idx) => {
        const isPlayer = this.player.isAmateur && f.id === this.player.id;
        const rankDisplay = idx === 0 ? champTitle : `#${idx}`;
        const fName = `${f.country?.flag || '🇹🇷'} ${f.name}`;
        const fStyle = isEn && FIGHT_STYLES[f.styleKey]?.nameEn ? FIGHT_STYLES[f.styleKey].nameEn : (FIGHT_STYLES[f.styleKey]?.name || 'MMA');
        const ovr = f.getOverallRating ? f.getOverallRating() : 35;
        const rec = f.id === this.player.id 
          ? `${this.player.amateurRecord?.wins || 0}-${this.player.amateurRecord?.losses || 0}`
          : `${f.record?.wins || 0}-${f.record?.losses || 0}`;

        html += `
          <tr class="${isPlayer ? 'highlight' : ''}">
            <td>${rankDisplay}</td>
            <td>${fName} ${isPlayer ? youTag : ''}</td>
            <td>${fStyle}</td>
            <td>${rec}</td>
            <td><strong style="color:var(--accent-cyan);">${ovr}</strong></td>
          </tr>
        `;
      });

      if (this.player.isAmateur && !amRanks.some(f => f.id === this.player.id)) {
        const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
        const amRec = this.player.amateurRecord || { wins: 0, losses: 0 };
        html += `
          <tr class="highlight" style="border-top: 2px dashed var(--accent-gold);">
            <td><span style="color: var(--accent-gold); font-weight: 700;">${isEn ? 'Amateur (NR)' : 'Amatör (NR)'}</span></td>
            <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
            <td>${pStyle}</td>
            <td>${amRec.wins}-${amRec.losses}</td>
            <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
          </tr>
        `;
      }
    } else {
      // Pro Rankings
      const proRanks = this.career.rankings || [];
      const byRank = {};
      proRanks.forEach(f => { if (f && f.rank !== undefined) byRank[f.rank] = f; });

      for (let r = 0; r <= 30; r++) {
        const rankDisplay = r === 0 ? champTitle : `#${r}`;

        if (!this.player.isAmateur && r === this.player.rank) {
          const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
          html += `
            <tr class="highlight">
              <td>${rankDisplay}</td>
              <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
              <td>${pStyle}</td>
              <td>${this.player.record.wins}-${this.player.record.losses}</td>
              <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
            </tr>
          `;
        } else if (byRank[r]) {
          const f = byRank[r];
          const ovr = f.getOverallRating ? f.getOverallRating() : 60;
          const fStyle = isEn && FIGHT_STYLES[f.styleKey]?.nameEn ? FIGHT_STYLES[f.styleKey].nameEn : (FIGHT_STYLES[f.styleKey]?.name || 'MMA');
          html += `
            <tr>
              <td>${rankDisplay}</td>
              <td>${f.country?.flag || '🏳️'} ${f.name}</td>
              <td>${fStyle}</td>
              <td>${f.record ? f.record.wins + '-' + f.record.losses : '0-0'}</td>
              <td><strong style="color:var(--accent-cyan);">${ovr}</strong></td>
            </tr>
          `;
        }
      }
    }

    tbody.innerHTML = html;
  }

  // Feature 8 & 2: Manual Stat Point Allocation in Stats View
  allocateStatPoint(statKey, points = 1) {
    if (!this.player) return;
    const isEn = this.lang === 'en';
    const allocated = this.player.allocateSkillPoint(statKey, points);
    if (allocated > 0) {
      sfx.playClick();
      this.saveGame();
      this.renderStatsView();
      this.updateHeaderAndDashboard();
    } else {
      const cost = this.player.getStatUpgradeCost(statKey);
      if (cost === Infinity) {
        alert(isEn ? 'Stat is at maximum (99)!' : 'Bu stat maksimum seviyeye (99) ulaştı!');
      } else {
        alert(isEn ? `Requires at least ${cost} Skill Points!` : `Bu statı geliştirmek için en az ${cost} Yetenek Puanı (SP) gerekiyor!`);
      }
    }
  }

  renderStatsView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    const statLabelsTR = {
      punch: { name: 'Yumruk Gücü', icon: '👊', color: '#ff4d6a' },
      kick: { name: 'Tekme Gücü', icon: '🦵', color: '#ff6b35' },
      clinch: { name: 'Clinch Becerisi', icon: '🤼', color: '#ffa726' },
      wrestling: { name: 'Güreş / Takedown', icon: '💪', color: '#42a5f5' },
      takedownDef: { name: 'Takedown Defansı', icon: '🛡️', color: '#26c6da' },
      submission: { name: 'Submission (Kilit)', icon: '🔒', color: '#ab47bc' },
      cardio: { name: 'Kondisyon (Cardio)', icon: '❤️', color: '#66bb6a' },
      strength: { name: 'Fiziksel Güç', icon: '🏋️', color: '#ef5350' },
      speed: { name: 'Hız & Çabukluk', icon: '⚡', color: '#ffee58' },
      fightIq: { name: 'Dövüş IQ', icon: '🧠', color: '#29b6f6' },
      mental: { name: 'Mental & Özgüven', icon: '🧘', color: '#78909c' }
    };

    const statLabelsEN = {
      punch: { name: 'Punch Power', icon: '👊', color: '#ff4d6a' },
      kick: { name: 'Kick Power', icon: '🦵', color: '#ff6b35' },
      clinch: { name: 'Clinch Skill', icon: '🤼', color: '#ffa726' },
      wrestling: { name: 'Wrestling / Takedown', icon: '💪', color: '#42a5f5' },
      takedownDef: { name: 'Takedown Defense', icon: '🛡️', color: '#26c6da' },
      submission: { name: 'Submission Skill', icon: '🔒', color: '#ab47bc' },
      cardio: { name: 'Cardio & Endurance', icon: '❤️', color: '#66bb6a' },
      strength: { name: 'Physical Strength', icon: '🏋️', color: '#ef5350' },
      speed: { name: 'Speed & Agility', icon: '⚡', color: '#ffee58' },
      fightIq: { name: 'Fight IQ', icon: '🧠', color: '#29b6f6' },
      mental: { name: 'Mental & Confidence', icon: '🧘', color: '#78909c' }
    };

    const statLabels = isEn ? statLabelsEN : statLabelsTR;

    document.getElementById('stats-fighter-name').innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    document.getElementById('stats-ovr').innerText = this.player.getOverallRating();
    const ageStrStats = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('stats-age').innerText = ageStrStats;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('stats-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'MMA');

    // Render Skill Points counter
    const spEl = document.getElementById('stats-sp-count');
    if (spEl) spEl.innerText = this.player.skillPoints || 0;

    // Render Stat bars with [+1] and [+5] buttons
    const container = document.getElementById('stats-bars-container');
    const spAvailable = (this.player.skillPoints || 0);

    container.innerHTML = Object.keys(this.player.stats).map(key => {
      const val = this.player.stats[key];
      const info = statLabels[key] || { name: key, icon: '📊', color: '#90caf9' };
      const pct = Math.min(100, val);
      const cost = this.player.getStatUpgradeCost(key);

      const canUpgrade1 = spAvailable >= cost && val < 99;
      const canUpgrade5 = spAvailable >= cost && val < 99;
      const costTag = cost === Infinity ? 'MAX' : `${cost} SP`;

      return `
        <div style="margin-bottom: 0.7rem; background: rgba(0,0,0,0.2); padding: 0.4rem; border-radius: 8px; border: 1px solid var(--bg-card-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <span style="font-size: 0.85rem; color: var(--text-main);">${info.icon} ${info.name}</span>
            <div style="display: flex; align-items: center; gap: 0.3rem;">
              <strong style="font-family: var(--font-heading); font-size: 1.05rem; color: ${info.color}; margin-right: 0.2rem;">${val}</strong>
              <button class="btn btn-gold btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="window.app.allocateStatPoint('${key}', 1)" ${!canUpgrade1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                +1 (${costTag})
              </button>
              <button class="btn btn-cyan btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="window.app.allocateStatPoint('${key}', 5)" ${!canUpgrade5 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                +5 SP
              </button>
            </div>
          </div>
          <div class="bar-container" style="height: 10px;">
            <div class="bar-fill" style="width: ${pct}%; background: ${info.color}; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Career summary
    const summaryDiv = document.getElementById('stats-career-summary');
    const rankText = this.player.isAmateur ? (isEn ? 'Amateur' : 'Amatör (NR)') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    const rec = this.player.isAmateur ? (this.player.amateurRecord || { wins: 0, losses: 0, draws: 0 }) : this.player.record;

    summaryDiv.innerHTML = `
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Record' : 'Rekor'}</div>
        <strong style="color:var(--accent-cyan);">${rec.wins}W - ${rec.losses}L - ${rec.draws || 0}D</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Ranking' : 'Sıralama'}</div>
        <strong style="color:var(--accent-gold);">${rankText}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'KO Wins' : 'KO Galibiyeti'}</div>
        <strong style="color:var(--accent-red);">${rec.koWins || 0}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Sub Wins' : 'Sub Galibiyeti'}</div>
        <strong style="color:#ab47bc;">${rec.subWins || 0}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Money' : 'Bakiye'}</div>
        <strong style="color:var(--accent-gold);">$${this.player.money.toLocaleString()}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Fame' : 'Şöhret'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.fame}</strong>
      </div>
    `;
  }

  // Feature 6: Render Sponsors View in Social Screen
  renderSponsorsView() {
    const container = document.getElementById('sponsors-section-container');
    if (!container || !this.career) return;
    const isEn = this.lang === 'en';

    const activeList = this.career.activeSponsorships || [];
    let html = `
      <h3 style="font-size: 1rem; color: var(--accent-gold); margin-bottom: 0.6rem;">💼 ${isEn ? 'Sponsorship Contracts' : 'Sponsorluk Sözleşmeleri & Kontratlar'}</h3>
    `;

    if (activeList.length > 0) {
      html += `
        <h4 style="font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">${isEn ? 'Active Contracts' : 'Aktif İmzalı Sözleşmeler'}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
      `;

      activeList.forEach(s => {
        const brandName = isEn && s.brandEn ? s.brandEn : s.brand;
        html += `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--accent-gold); border-radius: 8px; padding: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
              <span style="font-weight: 700; font-size: 0.9rem; color: #fff;">${s.icon || '💼'} ${brandName}</span>
              <span style="font-size: 0.78rem; color: var(--accent-cyan); font-weight: 700;">Kalan: ${s.fightsRemaining} Maç</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.3rem;">${s.objectiveDesc || ''}</p>
            <div style="font-size: 0.75rem; color: var(--accent-gold);">
              Maç Başı Ödeme: <strong>$${s.payPerFight.toLocaleString()}</strong> | Galibiyet Bonusu: <strong>+$${s.winBonus.toLocaleString()}</strong>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `
      <h4 style="font-size: 0.85rem; color: var(--accent-gold); margin-bottom: 0.4rem;">${isEn ? 'Available Sponsor Offers' : 'Mevcut Sponsor Teklifleri'}</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem;">
    `;

    SPONSORS_CATALOG.forEach(s => {
      const isSigned = activeList.some(act => act.sponsorId === s.id);
      const bName = isEn ? s.brandEn : s.brand;
      const bDesc = isEn ? s.descEn : s.desc;
      const bObj = isEn ? s.objectiveDescEn : s.objectiveDesc;

      const totalWins = (this.player.record?.wins || 0) + (this.player.amateurRecord?.wins || 0);
      const meetsFame = this.player.fame >= s.reqFame;
      const meetsWins = totalWins >= s.reqWins;
      const meetsRank = s.minRank === 99 || (s.minRank === 0 ? this.player.isChampion : (!this.player.isAmateur && this.player.rank <= s.minRank));

      const canSign = !isSigned && meetsFame && meetsWins && meetsRank;

      let btnHtml = '';
      if (isSigned) {
        btnHtml = `<button class="btn btn-sm" disabled style="width: 100%; opacity: 0.6; background: rgba(0,243,255,0.2); border: 1px solid var(--accent-cyan); color: var(--accent-cyan);">✅ İMZALANDI</button>`;
      } else if (canSign) {
        btnHtml = `<button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.signSponsor('${s.id}')">✍️ Sözleşmeyi İmzala</button>`;
      } else {
        btnHtml = `<button class="btn btn-secondary btn-sm" disabled style="width: 100%; opacity: 0.5;">🔒 Kilitli</button>`;
      }

      html += `
        <div class="glass-card" style="padding: 0.6rem; border-color: var(--bg-card-border);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem;">
            <span style="font-size: 1.4rem;">${s.icon}</span>
            <span class="rarity-badge rarity-common">${s.tier}</span>
          </div>
          <h4 style="font-size: 0.88rem; color: #fff; margin-bottom: 0.2rem;">${bName}</h4>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.4rem;">${bDesc}</p>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">
            🎯 ${bObj}<br>
            💰 $${s.payPerFight.toLocaleString()} / maç (+$${s.winBonus.toLocaleString()} bonus)
          </div>
          <div style="font-size: 0.68rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            Gereksinim: ${s.reqFame} Şöhret | ${s.reqWins} Galibiyet ${s.minRank === 0 ? '| Şampiyonluk' : (s.minRank < 99 ? `| Top #${s.minRank}` : '')}
          </div>
          ${btnHtml}
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  signSponsor(sponsorId) {
    if (!this.career) return;
    sfx.playClick();
    const res = this.career.signSponsorContract(sponsorId);
    alert(res.message);
    if (res.success) {
      this.saveGame();
      this.renderSocialFeedView();
    }
  }

  renderSocialFeedView() {
    if (!this.career) return;

    const handleEl = document.getElementById('social-player-handle');
    if (handleEl && this.player) {
      handleEl.innerText = this.player.socialHandle;
    }

    const limitText = document.getElementById('social-post-limit-text');
    if (limitText) {
      limitText.innerText = `${this.career.weeklySocialPostsLeft} / 3`;
    }

    const isDisabled = this.career.weeklySocialPostsLeft <= 0;
    ['btn-post-trash', 'btn-post-respect', 'btn-post-flex'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.disabled = isDisabled;
        btn.style.opacity = isDisabled ? '0.4' : '1';
        btn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
      }
    });

    const container = document.getElementById('social-feed-container');
    if (container) {
      container.innerHTML = this.career.socialFeed.map(item => `
        <div class="social-item">
          <div class="social-header">
            <strong>${item.author} ${item.handle ? item.handle : ''}</strong>
            <span>${item.time}</span>
          </div>
          <p style="font-size:0.9rem; line-height:1.4;">${item.text}</p>
          <span style="font-size:0.8rem; color:var(--accent-gold); margin-top:0.4rem; display:inline-block;">❤️ ${item.likes.toLocaleString()} ${this.lang === 'en' ? 'Likes' : 'Beğeni'}</span>
        </div>
      `).join('');
    }

    this.renderSponsorsView();
  }

  postSocial(type) {
    if (this.career) {
      sfx.playClick();
      const posted = this.career.postSocialMedia(type);
      const isEn = this.lang === 'en';
      if (!posted) {
        alert(isEn ? 'Weekly social post limit reached! (Max 3/week). Resets next week.' : 'Bu haftalık sosyal medya paylaşım hakkınız bitti! (Haftada max 3 gönderi). Sıradaki dövüş/hafta yenilendiğinde hakkınız yenilenecektir.');
        return;
      }
      this.saveGame();
      this.renderSocialFeedView();
      this.updateHeaderAndDashboard();
    }
  }

  renderShopView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    const diaBalEl = document.getElementById('shop-diamond-balance');
    if (diaBalEl) diaBalEl.innerText = (this.player.diamonds || 0).toLocaleString();

    // 1. Diamond & Donation Packages
    const diamondContainer = document.getElementById('diamond-packages-container');
    if (diamondContainer) {
      diamondContainer.innerHTML = DIAMOND_PACKAGES.map(pkg => {
        const pName = isEn && pkg.nameEn ? pkg.nameEn : pkg.name;
        const priceStr = isEn ? pkg.priceUSD : pkg.priceTL;
        return `
          <div class="glass-card" style="padding: 0.6rem; text-align: center; position: relative; border-color: ${pkg.popular ? 'var(--accent-cyan)' : 'var(--bg-card-border)'};">
            ${pkg.badge ? `<span style="position: absolute; top: -8px; right: 8px; background: var(--accent-cyan); color: #000; font-size: 0.62rem; font-weight: 800; padding: 2px 6px; border-radius: 8px;">${pkg.badge}</span>` : ''}
            <h4 style="font-size: 0.85rem; color: #fff; margin-bottom: 0.2rem;">${pName}</h4>
            <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan); margin: 0.4rem 0;">
              +${pkg.amount} 💎
            </div>
            <button class="btn btn-cyan btn-sm" style="width: 100%; font-size: 0.8rem;" onclick="window.app.buyDiamondPackage('${pkg.id}')">
              ${priceStr} ${isEn ? 'Buy' : 'Satın Al'}
            </button>
          </div>
        `;
      }).join('');
    }

    // 2. No Ads & VIP Pass
    const vipBox = document.getElementById('no-ads-vip-box');
    if (vipBox) {
      if (this.player.hasNoAds) {
        vipBox.innerHTML = `
          <span style="background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; color: #22c55e; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; display: inline-block;">
            ✅ VIP AKTİF
          </span>
        `;
      } else {
        vipBox.innerHTML = `
          <button class="btn btn-gold btn-sm" style="margin-bottom: 0.4rem; width: 100%;" onclick="window.app.buyNoAdsPass('diamonds')">
            💎 150 Elmas
          </button>
          <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 0.75rem;" onclick="window.app.buyNoAdsPass('real')">
            ₺49.99 / $1.99
          </button>
        `;
      }
    }

    // 3. Gem to Gold Exchange
    const exContainer = document.getElementById('gold-exchange-container');
    if (exContainer) {
      exContainer.innerHTML = GOLD_EXCHANGE_PACKAGES.map(ex => {
        const eName = isEn && ex.nameEn ? ex.nameEn : ex.name;
        return `
          <div class="glass-card" style="padding: 0.6rem; text-align: center; border-color: var(--bg-card-border);">
            <h4 style="font-size: 0.82rem; color: var(--accent-gold); margin-bottom: 0.2rem;">${eName}</h4>
            <div style="font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0.3rem 0;">
              +$${ex.goldGain.toLocaleString()} 💰
            </div>
            <button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.exchangeDiamondsForGold('${ex.id}')">
              💎 ${ex.diamondsCost} Elmas
            </button>
          </div>
        `;
      }).join('');
    }

    document.getElementById('shop-current-weight').innerText = `${this.player.walkWeight} kg`;
    document.getElementById('shop-target-weight').innerText = `${this.player.targetWeightKg} kg`;

    // Weight class switcher select dropdown
    const wcSelect = document.getElementById('shop-weight-class-select');
    if (wcSelect) {
      const currentTag = isEn ? '★ Current' : '★ Mevcut';
      wcSelect.innerHTML = WEIGHT_CLASSES.map(w => `
        <option value="${w.id}" ${this.player.weightClass === w.id ? 'selected' : ''}>
          ${w.name} (Limit: ${w.limitKg} kg / ${w.limitLbs} lbs) ${this.player.weightClass === w.id ? currentTag : ''}
        </option>
      `).join('');
    }

    // Nutrition items
    const nutContainer = document.getElementById('nutrition-items-container');
    if (nutContainer) {
      const buyText = isEn ? 'Buy & Consume' : 'Satın Al & Ye';
      nutContainer.innerHTML = NUTRITION_ITEMS.map(item => {
        const iName = isEn && item.nameEn ? item.nameEn : item.name;
        const iDesc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
        return `
          <div class="glass-card" style="padding: 0.6rem; border-color: var(--bg-card-border);">
            <h4 style="font-size: 0.88rem; color: var(--accent-gold); margin-bottom: 0.2rem;">${iName}</h4>
            <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.4rem;">${iDesc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--accent-cyan); font-size: 0.95rem;">$${item.cost}</strong>
              <button class="btn btn-gold btn-sm" onclick="window.app.buyNutrition('${item.id}')">${buyText}</button>
            </div>
          </div>
        `;
      }).join('');
    }

    // Gym upgrades
    const gymContainer = document.getElementById('gym-upgrades-container');
    if (gymContainer) {
      const buyLabel = isEn ? 'Purchase' : 'Satın Al';
      const activeLabel = isEn ? 'Active Facility' : 'Aktif Tesis';
      const currentLabel = isEn ? ' (CURRENT)' : ' (MEVCUT)';
      gymContainer.innerHTML = GYM_UPGRADES.map(g => {
        const gName = isEn && g.nameEn ? g.nameEn : g.name;
        const gDesc = isEn && g.descriptionEn ? g.descriptionEn : g.description;
        return `
          <div class="glass-card" style="padding: 0.6rem; border-color:${this.player.gymTier === g.tier ? 'var(--accent-gold)' : 'var(--bg-card-border)'};">
            <h4 style="font-size: 0.88rem; margin-bottom: 0.2rem;">${gName} ${this.player.gymTier === g.tier ? currentLabel : ''}</h4>
            <p style="font-size: 0.72rem; color:var(--text-muted); margin-bottom: 0.4rem;">${gDesc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color:var(--accent-gold); font-size:0.95rem;">$${g.cost.toLocaleString()}</strong>
              ${this.player.gymTier < g.tier ? `
                <button class="btn btn-gold btn-sm" onclick="window.app.buyGym(${g.tier}, ${g.cost})">${buyLabel}</button>
              ` : `<span style="color:#10b981; font-weight:700; font-size:0.75rem;">${activeLabel}</span>`}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  buyDiamondPackage(pkgId) {
    const pkg = DIAMOND_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.player.diamonds = (this.player.diamonds || 0) + pkg.amount;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    const pName = isEn && pkg.nameEn ? pkg.nameEn : pkg.name;
    alert(isEn 
      ? `💎 THANK YOU FOR SUPPORTING THE DEVELOPER!\n+${pkg.amount} Diamonds added to your account for ${pName}.`
      : `💎 GELİŞTİRİCİYE DESTEK OLDUĞUNUZ İÇİN TEŞEKKÜRLER!\n${pName} satın alımı gerçekleştirildi. +${pkg.amount} Elmas hesabınıza eklendi!`
    );
  }

  buyNoAdsPass(type) {
    const isEn = this.lang === 'en';
    if (this.player.hasNoAds) return;

    if (type === 'diamonds') {
      if ((this.player.diamonds || 0) < 150) {
        alert(isEn ? 'Not enough diamonds! You need 150 💎.' : 'Yetersiz Elmas! 150 💎 Elmasınız olmalıdır.');
        return;
      }
      this.player.diamonds -= 150;
    }

    sfx.playClick();
    this.player.hasNoAds = true;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    alert(isEn 
      ? '🛡️ VIP NO-ADS STATUS UNLOCKED!\nEnjoy ad-free gameplay and +15% extra gold reward on all fights!' 
      : '🛡️ VIP REKLAMSIZ STATÜ AKTİF EDİLDİ!\nReklamsız oyun deneyimi ve tüm dövüşlerde +%15 ekstra altın ödülü tanımlandı!'
    );
  }

  exchangeDiamondsForGold(exId) {
    const ex = GOLD_EXCHANGE_PACKAGES.find(e => e.id === exId);
    if (!ex) return;
    const isEn = this.lang === 'en';

    if ((this.player.diamonds || 0) < ex.diamondsCost) {
      alert(isEn ? 'Insufficient diamonds!' : 'Yetersiz Elmas! Bu işlem için daha fazla elmasa ihtiyacınız var.');
      return;
    }

    sfx.playClick();
    this.player.diamonds -= ex.diamondsCost;
    this.player.money += ex.goldGain;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    const eName = isEn && ex.nameEn ? ex.nameEn : ex.name;
    alert(isEn 
      ? `💱 EXCHANGED ${ex.diamondsCost} 💎 FOR $${ex.goldGain.toLocaleString()} 💰!\n${eName} credited.` 
      : `💱 ${ex.diamondsCost} 💎 Elmas, $${ex.goldGain.toLocaleString()} 💰 Altın bakiyesine dönüştürüldü!\n${eName} hesabınıza aktarıldı.`
    );
  }

  renderGlovesView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    const currentGlove = this.player.getEquippedGlove();
    const summaryCard = document.getElementById('equipped-glove-summary-card');

    if (summaryCard) {
      const gName = isEn && currentGlove.nameEn ? currentGlove.nameEn : currentGlove.name;
      const gDesc = isEn && currentGlove.descEn ? currentGlove.descEn : currentGlove.desc;
      const rarityUpper = currentGlove.rarity.toUpperCase();

      summaryCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 0.8rem; align-items: center;">
            <div style="font-size: 2.2rem; background: rgba(0,0,0,0.3); padding: 0.4rem 0.8rem; border-radius: 12px; border: 1px solid ${currentGlove.color};">
              ${currentGlove.icon}
            </div>
            <div>
              <span class="rarity-badge rarity-${currentGlove.rarity}">${rarityUpper}</span>
              <h3 style="font-size: 1.1rem; color: #fff; margin-top: 0.2rem;">${gName}</h3>
              <p style="font-size: 0.78rem; color: var(--accent-cyan); font-weight: 600;">${gDesc}</p>
            </div>
          </div>
          <div class="ovr-badge" style="border-color: ${currentGlove.color}; color: ${currentGlove.color};">
            EQUIPPED
          </div>
        </div>
      `;
    }

    const container = document.getElementById('gloves-catalog-container');
    if (container) {
      container.innerHTML = GLOVES_CATALOG.map(g => {
        const isOwned = (this.player.inventory || []).includes(g.id);
        const isEquipped = this.player.equippedGlove === g.id;
        const gName = isEn && g.nameEn ? g.nameEn : g.name;
        const gDesc = isEn && g.descEn ? g.descEn : g.desc;
        const priceLabel = g.price === 0 ? (isEn ? 'Free' : 'Ücretsiz') : (g.currency === 'diamonds' ? `${g.price} 💎` : `$${g.price.toLocaleString()} 💰`);

        let btnHtml = '';
        if (isEquipped) {
          btnHtml = `<button class="btn btn-sm" disabled style="width: 100%; opacity: 0.6; background: rgba(0,243,255,0.2); border: 1px solid var(--accent-cyan); color: var(--accent-cyan);">✅ KUŞANILDI</button>`;
        } else if (isOwned) {
          btnHtml = `<button class="btn btn-cyan btn-sm" style="width: 100%;" onclick="window.app.equipGlove('${g.id}')">🥋 GİY (EQUIP)</button>`;
        } else {
          btnHtml = `<button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.buyGlove('${g.id}')">🛒 ${isEn ? 'Buy' : 'Satın Al'} (${priceLabel})</button>`;
        }

        return `
          <div class="glove-card ${isEquipped ? 'equipped' : ''}" style="border-color: ${g.color};">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                <span style="font-size: 1.8rem;">${g.icon}</span>
                <span class="rarity-badge rarity-${g.rarity}">${g.rarity}</span>
              </div>
              <h4 style="font-size: 0.92rem; color: #fff; margin-bottom: 0.2rem;">${gName}</h4>
              <p style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.6rem; min-height: 2.2em;">${gDesc}</p>
            </div>
            <div>
              ${btnHtml}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  buyGlove(gloveId) {
    const glove = GLOVES_CATALOG.find(g => g.id === gloveId);
    if (!glove || !this.player) return;
    const isEn = this.lang === 'en';

    if (glove.currency === 'diamonds') {
      if ((this.player.diamonds || 0) < glove.price) {
        alert(isEn ? 'Insufficient diamonds!' : 'Yetersiz Elmas! Bu eldiveni satın almak için daha fazla elmasa ihtiyacınız var.');
        return;
      }
      this.player.diamonds -= glove.price;
    } else {
      if (this.player.money < glove.price) {
        alert(isEn ? 'Insufficient funds!' : 'Yetersiz Bakiye! Bu eldiveni almak için yeterli altınınız yok.');
        return;
      }
      this.player.money -= glove.price;
    }

    sfx.playClick();
    if (!this.player.inventory) this.player.inventory = ['glove_default'];
    if (!this.player.inventory.includes(gloveId)) {
      this.player.inventory.push(gloveId);
    }
    this.player.equippedGlove = gloveId;

    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderGlovesView();

    const gName = isEn && glove.nameEn ? glove.nameEn : glove.name;
    alert(isEn ? `🥊 ${gName} purchased and equipped!` : `🥊 ${gName} satın alındı ve karakterinize kuşanıldı!`);
  }

  equipGlove(gloveId) {
    if (!this.player || !this.player.inventory || !this.player.inventory.includes(gloveId)) return;
    sfx.playClick();
    this.player.equippedGlove = gloveId;

    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderGlovesView();
  }

  buyNutrition(itemId) {
    if (!this.career) return;
    const item = NUTRITION_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const isEn = this.lang === 'en';

    if (this.player.money < item.cost) {
      alert(isEn ? 'Insufficient funds!' : 'Yetersiz bakiye! Yemek/Takviye alacak paranız yok.');
      return;
    }

    sfx.playClick();
    this.career.buyNutrition(item);
    this.saveGame();
    this.updateCampView();
    this.updateHeaderAndDashboard();
    this.renderShopView();
  }

  changeWeightClassFromShop() {
    if (!this.career) return;
    const wcSelect = document.getElementById('shop-weight-class-select');
    if (!wcSelect) return;
    const isEn = this.lang === 'en';

    const newWcId = wcSelect.value;
    if (newWcId === this.player.weightClass) {
      alert(isEn ? 'You are already in this weight class!' : 'Zaten bu sıklet sınıfındasınız!');
      return;
    }

    sfx.playClick();
    this.career.changeWeightClass(newWcId);
    this.saveGame();
    this.renderShopView();
    this.updateHeaderAndDashboard();
    const wcObj = WEIGHT_CLASSES.find(w => w.id === newWcId);
    alert(isEn ? `⚖️ CONGRATS! Your division was changed to ${wcObj?.name} (${wcObj?.limitKg} kg)!\nNew match offers generated.` : `⚖️ TEBRİKLER! Sıkletiniz ${wcObj?.name} (${wcObj?.limitKg} kg) olarak değiştirildi!\nYeni rakip teklifleri oluşturuldu.`);
  }

  buyGym(tier, cost) {
    const isEn = this.lang === 'en';
    if (this.player && this.player.money >= cost) {
      sfx.playClick();
      this.player.money -= cost;
      this.player.gymTier = tier;
      this.saveGame();
      this.renderShopView();
      this.updateHeaderAndDashboard();
    } else {
      alert(isEn ? 'Insufficient funds!' : 'Yetersiz bakiye!');
    }
  }

  renderLegacyView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';
    const score = this.player.getGoatScore();
    document.getElementById('legacy-goat-score').innerText = score.toLocaleString();

    const details = document.getElementById('legacy-summary-details');
    if (isEn) {
      details.innerHTML = `
        <p style="margin-bottom:0.4rem;"><strong>Total Record:</strong> ${this.player.record.wins} Wins, ${this.player.record.losses} Losses</p>
        <p style="margin-bottom:0.4rem;"><strong>Knockout Victories:</strong> ${this.player.record.koWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Submission Victories:</strong> ${this.player.record.subWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Title Belts Held:</strong> ${this.player.isChampion ? 1 : 0}</p>
        <p style="margin-bottom:0.4rem;"><strong>Title Defenses:</strong> ${this.player.titleDefenses}</p>
        <p style="margin-bottom:0.4rem;"><strong>Total Wealth:</strong> $${this.player.money.toLocaleString()}</p>
      `;
    } else {
      details.innerHTML = `
        <p style="margin-bottom:0.4rem;"><strong>Toplam Rekor:</strong> ${this.player.record.wins} Galibiyet, ${this.player.record.losses} Yenilgi</p>
        <p style="margin-bottom:0.4rem;"><strong>Nakavt Zaferleri:</strong> ${this.player.record.koWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Pes Ettirme Zaferleri:</strong> ${this.player.record.subWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Şampiyonluk Kemer Sayısı:</strong> ${this.player.isChampion ? 1 : 0}</p>
        <p style="margin-bottom:0.4rem;"><strong>Kemer Savunmaları:</strong> ${this.player.titleDefenses}</p>
        <p style="margin-bottom:0.4rem;"><strong>Toplam Servet:</strong> $${this.player.money.toLocaleString()}</p>
      `;
    }
  }
}

// Global attachment for inline onclick handlers

function initMMAGoat() {
  if (!window.app) {
    window.app = new MMAGoatApp();
  }
}
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initMMAGoat);
} else {
  initMMAGoat();
}


