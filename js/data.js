// MMA GOAT - Data Definitions

export const FIGHT_STYLES = {
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

export const WEIGHT_CUT_STRATEGIES = {
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

export const WEIGHT_CLASSES = [
  { id: 'flyweight', name: 'Flyweight', limitKg: 56.7, limitLbs: 125 },
  { id: 'bantamweight', name: 'Bantamweight', limitKg: 61.2, limitLbs: 135 },
  { id: 'featherweight', name: 'Featherweight', limitKg: 65.8, limitLbs: 145 },
  { id: 'lightweight', name: 'Lightweight', limitKg: 70.3, limitLbs: 155 },
  { id: 'welterweight', name: 'Welterweight', limitKg: 77.1, limitLbs: 170 },
  { id: 'middleweight', name: 'Middleweight', limitKg: 83.9, limitLbs: 185 },
  { id: 'lightheavyweight', name: 'Light Heavyweight', limitKg: 93.0, limitLbs: 205 },
  { id: 'heavyweight', name: 'Heavyweight', limitKg: 120.2, limitLbs: 265 }
];

export const ORGANIZATIONS = [
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

export const FIRST_NAMES = [
  'Alex', 'Marcus', 'Igor', 'Carlos', 'Dustin', 'Khabib', 'Conor', 'Jon', 'Israel', 'Sean',
  'Charles', 'Islam', 'Justin', 'Francis', 'Max', 'Fedya', 'Stipe', 'Georges', 'Anderson',
  'Kamaru', 'Volkan', 'Giga', 'Shavkat', 'Khamzat', 'Diego', 'Mateusz', 'Jan', 'Tariq',
  'Enzo', 'Baki', 'Musa', 'Devrim', 'Arda', 'Hasan', 'Dmitry', 'Sergei', 'Ronaldo', 'Thiago',
  'Lucas', 'Liam', 'Brandon', 'Caio', 'Petr', 'Alexander', 'Ilia', 'Arman', 'Merab', 'Leon',
  'Dricus', 'Belal', 'Jiri', 'Magomed', 'Hamzat', 'Zabit', 'Tom', 'Cory', 'Gilbert'
];

export const LAST_NAMES = [
  'Silva', 'Nurmagomedov', 'McGregor', 'Jones', 'Adesanya', 'Poirier', 'Oliveira', 'Gaethje',
  'Ngannou', 'Holloway', 'Emelianenko', 'Miocic', 'St-Pierre', 'Usman', 'Volkanovski', 'Chimaev',
  'Rakhmonov', 'Kovalev', 'Santos', 'Pereira', 'Diaz', 'Cevik', 'Yilmaz', 'Kaya', 'Demir',
  'Topuria', 'Tsarukyan', 'Dvalishvili', 'Edwards', 'Du Plessis', 'Muhammad', 'Prochazka',
  'Ankalaev', 'Magomedov', 'Aspinall', 'Sandhagen', 'Burns', 'Machado', 'Teixeira', 'Bisping'
];

export const COUNTRIES = [
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

export const RANDOM_EVENTS = [
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

export const NUTRITION_ITEMS = [
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

export const GYM_UPGRADES = [
  { id: 'local_garage', name: 'Mahalle Garajı', nameEn: 'Local Garage Gym', tier: 1, cost: 0, bonus: 1.0, description: 'Temel ekipmanlar, nemli oda.', descriptionEn: 'Basic equipment, humid room.' },
  { id: 'pro_mma_hub', name: 'Profesyonel MMA Akademi', nameEn: 'Pro MMA Academy', tier: 2, cost: 15000, bonus: 1.25, description: '+%25 Antrenman verimi, daha az sakatlık.', descriptionEn: '+25% Training efficiency, reduced injury risk.' },
  { id: 'championship_camp', name: 'Şampiyonluk Kampı Complex', nameEn: 'Championship Camp Complex', tier: 3, cost: 80000, bonus: 1.6, description: '+%60 Antrenman verimi, özel fizyoterapist.', descriptionEn: '+60% Training efficiency, private physio team.' },
  { id: 'apex_facility', name: 'Apex Elite Performance Center', nameEn: 'Apex Elite Performance Center', tier: 4, cost: 350000, bonus: 2.2, description: '+%120 Antrenman verimi, hiperbarik oksijen odası.', descriptionEn: '+120% Training efficiency, hyperbaric oxygen chamber.' }
];

export const COACH_STAFF = [
  { id: 'rookie_coach', name: 'Ahmet Hoca', type: 'Striking', costPerFight: 200, bonus: 2, description: '+2 Punch/Kick antrenman verimi.', descriptionEn: '+2 Punch/Kick training efficiency.' },
  { id: 'veteran_wrestler', name: 'Coach Alexey', type: 'Wrestling', costPerFight: 1200, bonus: 5, description: '+5 Wrestling/Takedown Def verimi.', descriptionEn: '+5 Wrestling/Takedown Def efficiency.' },
  { id: 'bjj_blackbelt', name: 'Master Gracie', type: 'Grappling', costPerFight: 3500, bonus: 8, description: '+8 Submission/Clinch verimi.', descriptionEn: '+8 Submission/Clinch efficiency.' },
  { id: 'legendary_headcoach', name: 'Coach Firas', type: 'Head Coach', costPerFight: 12000, bonus: 15, description: 'Tüm stat gelişimlerine +15 verim & Fight IQ boost.', descriptionEn: '+15 efficiency to all stat gains & Fight IQ boost.' }
];

export const GLOVES_CATALOG = [
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

export const DIAMOND_PACKAGES = [
  { id: 'coffee', name: '☕ Geliştiriciye Kahve Ismarla', nameEn: '☕ Buy Dev a Coffee', amount: 30, priceTL: '₺14.99', priceUSD: '$0.49', popular: false, badge: '❤️ Destek' },
  { id: 'diamonds_small', name: '💎 Küçük Elmas Torbası', nameEn: '💎 Small Diamond Pouch', amount: 100, priceTL: '₺29.99', priceUSD: '$0.99', popular: false, badge: '' },
  { id: 'diamonds_medium', name: '💎 Orta Elmas Sandığı', nameEn: '💎 Medium Diamond Chest', amount: 350, priceTL: '₺79.99', priceUSD: '$2.49', popular: true, badge: '🔥 En Çok Satan' },
  { id: 'diamonds_large', name: '💎 Büyük Elmas Kasası', nameEn: '💎 Large Diamond Safe', amount: 1000, priceTL: '₺199.99', priceUSD: '$5.99', popular: false, badge: '⭐ %20 Ekstra' },
  { id: 'diamonds_huge', name: '💎 Efsanevî Elmas Zulası', nameEn: '💎 Mythic Diamond Vault', amount: 2500, priceTL: '₺449.99', priceUSD: '$12.99', popular: false, badge: '👑 VIP Bonus' }
];

export const GOLD_EXCHANGE_PACKAGES = [
  { id: 'ex_small', diamondsCost: 15, goldGain: 3500, name: '💰 Mahalle Bütçesi', nameEn: '💰 Starter Purse' },
  { id: 'ex_medium', diamondsCost: 45, goldGain: 12000, name: '💰 Profesyonel Sözleşme Primi', nameEn: '💰 Pro Contract Bonus' },
  { id: 'ex_large', diamondsCost: 120, goldGain: 40000, name: '💰 Şampiyonluk İkramiyesi', nameEn: '💰 Championship Purse' },
  { id: 'ex_huge', diamondsCost: 300, goldGain: 120000, name: '💰 Milyoner Dövüşçü Kasası', nameEn: '💰 Millionaire Fighter Vault' }
];

export const AI_ARCHETYPES = {
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

export const SPONSORS_CATALOG = [
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


