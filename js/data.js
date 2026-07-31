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
