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
    
    // Career Record & Achievements (Starts at Amatör Regional)
    this.record = config.record || { wins: 0, losses: 0, draws: 0, koWins: 0, subWins: 0, decWins: 0 };
    this.fame = config.fame || 0;
    this.followers = config.followers || 50;
    this.money = config.money || 300;
    this.organizationId = config.organizationId || 'regional';
    this.rank = config.rank !== undefined ? config.rank : 99; // 99 = Unranked (Amatör / Sıralama Dışı)
    this.isChampion = config.isChampion || false;
    this.titleDefenses = config.titleDefenses || 0;
    this.winStreak = config.winStreak || 0;

    // Upgrades
    this.gymTier = 1;
    this.hiredCoaches = [];
  }

  getOverallRating() {
    const values = Object.values(this.stats);
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

function generateAIOpponent(weightClass, orgTier = 1, rank = 10, isTitleFight = false) {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const country = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  const styles = Object.keys(FIGHT_STYLES);
  const styleKey = styles[Math.floor(Math.random() * styles.length)];

  const effectiveRank = rank >= 99 ? 30 : rank;

  // Target OVR based on org tier & rank (WCF / UFC tier 4 is elite challenging!)
  let baseTargetOvr = 28 + orgTier * 10 + (30 - effectiveRank) * 1.1;
  if (orgTier === 4) {
    baseTargetOvr = 68 + (30 - effectiveRank) * 0.95; // WCF (UFC) OVR ranges 68 - 95+
  }
  if (isTitleFight) baseTargetOvr += 8;
  baseTargetOvr = Math.min(97, Math.max(25, Math.round(baseTargetOvr)));

  const allStatKeys = ['punch', 'kick', 'clinch', 'wrestling', 'takedownDef', 'submission', 'cardio', 'strength', 'speed', 'fightIq', 'mental'];
  const stats = {};
  allStatKeys.forEach(st => {
    const variance = Math.floor(Math.random() * 14) - 7;
    stats[st] = Math.min(99, Math.max(20, baseTargetOvr + variance));
  });

  // Boost main stats according to fighter style baseStats
  const styleBase = FIGHT_STYLES[styleKey]?.baseStats || {};
  Object.keys(styleBase).forEach(st => {
    if (styleBase[st] >= 30) {
      stats[st] = Math.min(99, stats[st] + 12);
    }
  });

  // Realistic professional fight history based on rank and organization tier
  const totalFights = rank >= 99 
    ? 2 
    : Math.max(5, Math.floor(8 + orgTier * 3 + (30 - effectiveRank) * 0.8));
  const winRatio = rank >= 99 
    ? 0.5 
    : (0.55 + ((30 - effectiveRank) / 30) * 0.3 + Math.random() * 0.1);
  const wins = rank >= 99 
    ? Math.max(1, Math.floor(totalFights * winRatio)) 
    : Math.max(1, Math.floor(totalFights * Math.min(0.98, winRatio)));
  const losses = Math.max(0, totalFights - wins);

  return new Fighter({
    name: `${firstName} ${lastName}`,
    nickname: Math.random() > 0.6 ? `'The Machine'` : '',
    country: country,
    age: Math.floor(Math.random() * 12) + 20,
    styleKey: styleKey,
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
    isChampion: rank === 0
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

    // Match Offers & Rerolls Limit (Max 2 rerolls per fight phase)
    this.rerollsLeft = config.rerollsLeft !== undefined ? config.rerollsLeft : 2;
    this.rankings = config.rankings ? this.generateInitialRankings(config.rankings) : this.generateInitialRankings();
    this.matchOffers = config.matchOffers || this.generateMatchOffers();

    const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';
    // Social Media Posts Feed & Weekly Limit (Max 3 per week)
    this.weeklySocialPostsLeft = config.weeklySocialPostsLeft !== undefined ? config.weeklySocialPostsLeft : 3;
    this.socialFeed = config.socialFeed || [
      {
        author: isEn ? 'Amateur MMA News' : 'Amatör MMA Haber',
        text: isEn 
          ? 'Young prospect ' + this.player.name + ' has started his professional career in the regional league! ' + this.player.socialHandle
          : 'Genç yetenek ' + this.player.name + ' bölgesel ligde profesyonel kariyerine başladı! ' + this.player.socialHandle,
        likes: 35,
        time: '1s'
      }
    ];

    // Ledger
    this.financialHistory = config.financialHistory || [
      { type: 'income', amount: this.player.money, description: isEn ? 'Initial Sponsor Support' : 'Başlangıç Sponsor Desteği' }
    ];
  }

  generateInitialRankings(existingRankings) {
    const ranks = [];
    const maxRank = 30;

    // Build a map of rank -> fighter from existing rankings (to preserve them)
    const existingByRank = {};
    if (existingRankings && existingRankings.length > 0) {
      existingRankings.forEach(f => {
        if (f && f.rank !== undefined && f.id !== this.player.id) {
          existingByRank[f.rank] = f;
        }
      });
    }

    for (let r = 0; r <= maxRank; r++) {
      if (this.player.rank === r) {
        // Player occupies this rank
        ranks.push(this.player);
      } else if (existingByRank[r]) {
        // Preserve existing fighter at this rank
        ranks.push(existingByRank[r]);
      } else {
        // Generate a new AI fighter for this empty slot
        const opp = generateAIOpponent(this.player.weightClass, this.getOrgTier(), r, r === 0);
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
    const currentRank = this.player.rank;

    const offers = [];
    const usedIds = new Set([this.player.id]);

    if (currentRank >= 99) {
      // Unranked Amateur Circuit — Generate 3 dynamic regional amateur prospects!
      for (let i = 0; i < 3; i++) {
        const prospect = generateAIOpponent(this.player.weightClass, orgTier, 99, false);
        // Slightly lower amateur record & OVR
        prospect.record = {
          wins: Math.floor(Math.random() * 2),
          losses: Math.floor(Math.random() * 2),
          draws: 0, koWins: 0, subWins: 0, decWins: 0
        };
        const isEn = (localStorage.getItem('mma_goat_lang') || 'tr') === 'en';
        prospect.name = `${isEn ? '[Amateur]' : '[Amatör]'} ${prospect.name}`;
        usedIds.add(prospect.id);
        offers.push(prospect);
      }
    } else {
      // Professional Ranked Circuit — Pick 3 candidate target ranks near the player's rank
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

      // Fill up to 3 if any duplicate or missing
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

  performCampActivity(activityId) {
    if (!this.inFightCamp || this.currentDayActivitiesLeft <= 0) return false;

    // Block training when energy is too low (rest/sauna is always allowed)
    if (activityId !== 'rest_sauna' && this.player.energy < 5) {
      return 'no_energy';
    }

    let statBoost = 1.2;
    const gymInfo = GYM_UPGRADES.find(g => g.tier === this.player.gymTier);
    if (gymInfo) statBoost *= gymInfo.bonus;

    switch (activityId) {
      case 'sparring':
        this.player.stats.punch = Math.min(100, this.player.stats.punch + Math.round(1.5 * statBoost));
        this.player.stats.kick = Math.min(100, this.player.stats.kick + Math.round(1.2 * statBoost));
        this.player.energy = Math.max(0, this.player.energy - 18);
        break;
      case 'wrestling_drills':
        this.player.stats.wrestling = Math.min(100, this.player.stats.wrestling + Math.round(2 * statBoost));
        this.player.stats.takedownDef = Math.min(100, this.player.stats.takedownDef + Math.round(1.5 * statBoost));
        this.player.energy = Math.max(0, this.player.energy - 20);
        break;
      case 'bjj_rolling':
        this.player.stats.submission = Math.min(100, this.player.stats.submission + Math.round(2.2 * statBoost));
        this.player.stats.clinch = Math.min(100, this.player.stats.clinch + Math.round(1 * statBoost));
        this.player.energy = Math.max(0, this.player.energy - 15);
        break;
      case 'conditioning':
        this.player.stats.cardio = Math.min(100, this.player.stats.cardio + Math.round(2 * statBoost));
        this.player.stats.strength = Math.min(100, this.player.stats.strength + Math.round(1.5 * statBoost));
        this.player.energy = Math.max(0, this.player.energy - 22);
        break;
      case 'video_analysis':
        this.player.stats.fightIq = Math.min(100, this.player.stats.fightIq + Math.round(2.5 * statBoost));
        this.player.stats.mental = Math.min(100, this.player.stats.mental + Math.round(1.5 * statBoost));
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
    
    // Variance (-0.2 to +0.2 kg)
    const variance = (Math.random() * 0.4) - 0.2;
    const cutAchieved = Math.max(0.5, strat.weightCutKg + variance);
    
    // Current weight reduction
    const startingWeight = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const finalWeight = Number((startingWeight - cutAchieved).toFixed(1));
    this.player.currentWeight = finalWeight;

    // Tolerance limit (0.1 kg)
    const passed = finalWeight <= Number((this.player.targetWeightKg + 0.1).toFixed(1));

    if (passed) {
      this.weighInRequired = false;
      this.readyToFight = true;
      this.inFightCamp = false;
      this.campDay = 1;
      
      // Apply physical toll of weight cut
      this.player.energy = Math.max(10, this.player.energy - strat.energyPenalty);
      
      return {
        passed: true,
        finalWeight: finalWeight,
        targetWeight: this.player.targetWeightKg,
        message: `✅ TARTI BAŞARILI! (${finalWeight} kg / Limit: ${this.player.targetWeightKg} kg)\nKilo tutturuldu, kafes dövüşüne izin verildi.`
      };
    } else {
      // MISSED WEIGHT & DISQUALIFIED / FIGHT CANCELLED
      this.weighInRequired = false;
      this.readyToFight = false;
      this.inFightCamp = false;
      this.campDay = 1;

      // Penalties: Fine & Fame Loss
      const fineAmount = 500;
      this.player.money = Math.max(0, this.player.money - fineAmount);
      this.player.fame = Math.max(0, this.player.fame - 15);
      
      this.financialHistory.unshift({
        type: 'expense',
        amount: fineAmount,
        description: 'Tartı Kaçırma & Maç Men Cezası'
      });

      const failedOpponentName = this.currentOpponent ? this.currentOpponent.name : 'Rakip';
      this.currentOpponent = null; // Fight is cancelled!

      return {
        passed: false,
        finalWeight: finalWeight,
        targetWeight: this.player.targetWeightKg,
        message: `❌ TARTI KAÇIRILDI! (${finalWeight} kg / Limit: ${this.player.targetWeightKg} kg)\nSiklet limitini tutturamadınız. ${failedOpponentName} maçı İPTAL EDİLDİ (MAÇTAN MEN)!\n💸 $${fineAmount} para cezası kesildi ve şöhret kaybettiniz.`
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
    if (this.weeklySocialPostsLeft <= 0) {
      return false;
    }

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
      this.player.stats.mental = Math.min(100, this.player.stats.mental + 2);
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

  handlePostFightResults(fightResult, opponent) {
    const org = ORGANIZATIONS.find(o => o.id === this.player.organizationId);
    const purse = org ? org.basePurse : 300;
    const winBonus = org ? org.winBonus : 300;

    let totalEarned = purse;
    let fameGained = Math.floor(2 * (org ? org.fameMultiplier : 1));

    // Reset weekly social media posts counter after fight!
    this.weeklySocialPostsLeft = 3;

    if (fightResult.winner === 'player') {
      totalEarned += winBonus;
      this.player.record.wins++;
      this.player.winStreak++;
      fameGained += 5;

      if (fightResult.method === 'KO') this.player.record.koWins++;
      if (fightResult.method === 'Submission') this.player.record.subWins++;
      if (fightResult.method === 'Decision') this.player.record.decWins++;

      // Ranking improvement
      if (this.player.isChampion) {
        this.player.titleDefenses++;
      } else if (this.player.rank >= 99) {
        // Player is currently Unranked Amateur
        if (this.player.record.wins >= 7) {
          // EARN PRO LICENSE & ENTER PROFESSIONAL RANKINGS AT #30 AFTER 7 WINS!
          this.player.rank = 30;
          this.rankings = this.generateInitialRankings(this.rankings);
          this.activeEvent = {
            id: 'pro_license_earned',
            title: '📜 Profesyonel MMA Lisansı Kazandın!',
            description: 'Tebrikler! Bölgesel amatör ligdeki 7 zaferinden sonra Profesyonel MMA Lisansını aldın ve Profesyonel Lig Sıralamasında #30 numaraya yerleştin!',
            options: [
              { text: '🥊 Profesyonel Lige Adım At! (+$2,000 Bonus)', money: 2000, fame: 15 }
            ]
          };
        }
      } else {
        // Player is in Professional Ranked League
        const oldRank = this.player.rank;
        const oppRank = opponent.rank;

        if (oppRank < oldRank) {
          // Swap ranks between player and opponent!
          this.player.rank = oppRank;
          opponent.rank = oldRank;

          if (this.player.rank === 0) {
            this.player.isChampion = true;
          }
        } else {
          this.player.rank = Math.max(1, this.player.rank - 1);
        }
      }
    } else if (fightResult.winner === 'opponent') {
      this.player.record.losses++;
      this.player.winStreak = 0;
      fameGained = Math.max(1, Math.floor(fameGained * 0.3));

      // Loss penalty: drop 1 rank down for ranked fighters (max 15)
      if (!this.player.isChampion && this.player.rank < 15) {
        const oldRank = this.player.rank;
        this.player.rank += 1;
        const lowerOpp = this.rankings.find(f => f.rank === this.player.rank && f.id !== this.player.id);
        if (lowerOpp) lowerOpp.rank = oldRank;
      }
    }

    // Sort rankings array cleanly
    this.rankings.sort((a, b) => a.rank - b.rank);

    this.player.money += totalEarned;
    this.player.fame = Math.min(100, this.player.fame + fameGained);
    this.player.followers += Math.floor(fameGained * 80);

    this.financialHistory.unshift({
      type: 'income',
      amount: totalEarned,
      description: `${opponent.name} Dövüş Ödülü (Purse + Bonus)`
    });

    // WCF / UFC INVITATION MECHANIC:
    // Trigger WCF (UFC) offer once player reaches TOP 10 in professional regional league!
    if (!this.activeEvent && this.player.organizationId === 'regional' && this.player.rank <= 10) {
      this.activeEvent = {
        id: 'wcf_contract_offer',
        title: '🦅 WCF (UFC) Kontrat & Davet Mektubu!',
        description: 'Tebrikler! Bölgesel ligdeki sıralamada ilk 10\'a girerek dünyanın 1 numaralı ligi WCF (UFC) gözlemcilerinin dikkatini çektin! Sana $5,000 İmza Bonusu teklif ediyorlar.',
        options: [
          { text: '✍️ Kontratı İmzala ve WCF (UFC) Ligi\'ne Katıl (+$5,000)', money: 5000, fame: 20 },
          { text: '🥊 Bölgesel Ligde Kalıp Güçlenmeye Devam Et', fame: 2 }
        ]
      };
    } else if (this.player.isChampion && this.player.titleDefenses >= 2) {
      // Automatic tier progression for higher orgs
      const currentOrgTier = this.getOrgTier();
      const nextOrg = ORGANIZATIONS.find(o => o.tier === currentOrgTier + 1);
      if (nextOrg) {
        this.player.organizationId = nextOrg.id;
        this.player.isChampion = false;
        this.player.rank = 15;
        this.player.titleDefenses = 0;
        this.rankings = this.generateInitialRankings(this.rankings);
      }
    }

    this.player.applyAging();
    
    // AUTOMATIC REHYDRATION AFTER FIGHT: Restore walk-around weight!
    this.player.currentWeight = this.player.walkWeight;
    this.player.energy = 85;
    this.inFightCamp = false;
    this.readyToFight = false;
    this.weighInRequired = false;
    this.currentOpponent = null;

    // RESET REROLL LIMIT TO 2 FOR NEXT FIGHT PHASE & GENERATE 3 FRESH MATCH OFFERS!
    this.rerollsLeft = 2;
    this.generateMatchOffers();
  }

  buyNutrition(item) {
    if (!item || this.player.money < item.cost) return false;

    this.player.money -= item.cost;
    this.player.walkWeight = Number((this.player.walkWeight + item.weightGainKg).toFixed(1));
    this.player.currentWeight = this.player.walkWeight;

    if (item.energyGain) this.player.energy = Math.min(100, this.player.energy + item.energyGain);
    if (item.stressGain) this.player.stress = Math.max(0, Math.min(100, this.player.stress + item.stressGain));
    if (item.strengthBonus) this.player.stats.strength = Math.min(100, this.player.stats.strength + item.strengthBonus);
    if (item.cardioBonus) this.player.stats.cardio = Math.min(100, this.player.stats.cardio + item.cardioBonus);

    this.financialHistory.unshift({
      type: 'expense',
      amount: item.cost,
      description: `Beslenme: ${item.name}`
    });

    return true;
  }

  changeWeightClass(weightClassId) {
    const wc = WEIGHT_CLASSES.find(w => w.id === weightClassId);
    if (!wc) return false;

    this.player.weightClass = wc.id;
    this.player.targetWeightKg = wc.limitKg;
    if (this.player.walkWeight < wc.limitKg) {
      this.player.walkWeight = Number((wc.limitKg + 3.5).toFixed(1));
      this.player.currentWeight = this.player.walkWeight;
    }

    // Weight class changed — generate fresh rankings for new division
    this.rankings = this.generateInitialRankings();
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
    const style = this.opponent.styleKey;
    const hp = this.state.opponent.headHp;

    if (hp < 35) return 'defend';
    if (style === 'boxer') return Math.random() > 0.4 ? 'counter' : 'pressure';
    if (style === 'kickboxer') return Math.random() > 0.4 ? 'kicks' : 'counter';
    if (style === 'wrestler') return Math.random() > 0.3 ? 'takedown' : 'clinch';
    if (style === 'bjj') return Math.random() > 0.3 ? 'submission' : 'takedown';
    if (style === 'muaythai') return Math.random() > 0.4 ? 'clinch' : 'kicks';
    return 'pressure';
  }

  calculateTacticEfficiency(fighter, tacticId, state) {
    const s = fighter.stats;
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

    if (pEff > aiEff * 1.2) {
      // Player clean exchange win
      const dmg = Math.floor((pEff - aiEff * 0.5) * 0.35);
      if (['counter', 'pressure', 'kicks'].includes(pTactic)) {
        this.state.opponent.headHp -= dmg;
        this.addCommentary(isEn ? `🥊 ${this.player.name} landed a clean strike combination on ${this.opponent.name}! (-${dmg} HP)` : `🥊 ${this.player.name} harika bir ${pTactic} kombinasyonuyla ${this.opponent.name}'ın çenesini sarstı! (-${dmg} HP)`, 'player_hit');
      } else if (pTactic === 'takedown') {
        this.state.position = 'ground_mount';
        this.state.positionOwner = 'player';
        this.state.opponent.bodyHp -= Math.floor(dmg * 0.7);
        this.addCommentary(isEn ? `🤼 ${this.player.name} executed a beautiful takedown!` : `🤼 ${this.player.name} mükemmel bir timing ile takedown aldı ve yere serdi!`, 'player_hit');
      } else if (pTactic === 'submission') {
        this.state.opponent.subDanger += Math.floor(dmg * 1.8);
        this.addCommentary(isEn ? `🥋 ${this.player.name} locked in a deep submission hold! Danger!` : `🥋 ${this.player.name} derin bir Guillotine Choke / Armbar kilidi yakaladı! Pes ettirme tehlikesi!`, 'player_hit');
      } else {
        this.addCommentary(isEn ? `✨ ${this.player.name} evaded and controlled the exchange.` : `✨ ${this.player.name} rakipten kaçındı ve kontrolü sağladı.`, 'normal');
      }
      pScore = 10;
      aiScore = 3;
    } else if (aiEff > pEff * 1.2) {
      // AI clean exchange win
      const dmg = Math.floor((aiEff - pEff * 0.5) * 0.35);
      if (['counter', 'pressure', 'kicks'].includes(aiTactic)) {
        this.state.player.headHp -= dmg;
        this.addCommentary(isEn ? `⚠️ ${this.opponent.name} hit you with a heavy strike! (-${dmg} HP)` : `⚠️ ${this.opponent.name} sert bir vuruşla seni geriye püskürttü! (-${dmg} HP)`, 'danger');
      } else if (aiTactic === 'takedown') {
        this.state.position = 'ground_guard';
        this.state.positionOwner = 'opponent';
        this.state.player.bodyHp -= Math.floor(dmg * 0.7);
        this.addCommentary(isEn ? `🤼 ${this.opponent.name} took you down to the canvas!` : `🤼 ${this.opponent.name} seni yakaladı ve yere indirdi!`, 'danger');
      } else if (aiTactic === 'submission') {
        this.state.player.subDanger += Math.floor(dmg * 1.8);
        this.addCommentary(isEn ? `⚠️ ${this.opponent.name} locked in a submission hold! You are in danger!` : `⚠️ ${this.opponent.name} boynuna sarıldı! Pes etme tehlikesindesin!`, 'danger');
      } else {
        this.addCommentary(isEn ? `🛑 ${this.opponent.name} negated your attack.` : `🛑 ${this.opponent.name} hamleni boşa çıkardı.`, 'normal');
      }
      pScore = 3;
      aiScore = 10;
    } else {
      // Even exchange
      this.state.player.headHp -= 4;
      this.state.opponent.headHp -= 4;
      this.addCommentary(isEn ? `⚔️ Both fighters exchanged heavy blows!` : `⚔️ İki dövüşçü de karşılıklı sert yumruklar teati etti!`, 'normal');
      pScore = 5;
      aiScore = 5;
    }

    // Decrease stamina
    this.state.player.stamina = Math.max(10, this.state.player.stamina - 6);
    this.state.opponent.stamina = Math.max(10, this.state.opponent.stamina - 6);

    return { pScore, aiScore };
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
    tabCamp: '🏋️ Kamp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 Lig',
    tabSocial: '📱 Sosyal',
    tabShop: '🏬 Salon',
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
    totalWealth: 'Toplam Servet:'
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
    totalWealth: 'Total Wealth:'
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

        // Reconstruct ranking Fighter objects safely
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
    if (screenId === 'screen-legacy') this.renderLegacyView();
    if (screenId === 'screen-stats') this.renderStatsView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderAndDashboard() {
    if (!this.player) return;

    const isEn = this.lang === 'en';

    // Header updates
    const rankText = this.player.rank >= 99 ? (isEn ? 'Amateur' : 'Amatör') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    document.getElementById('hdr-org').innerText = this.player.organizationId.toUpperCase();
    document.getElementById('hdr-weight').innerText = `${this.player.weightClass} (${rankText})`;
    document.getElementById('hdr-record').innerText = `${this.player.record.wins}-${this.player.record.losses}-${this.player.record.draws}`;
    document.getElementById('hdr-money').innerText = `$${this.player.money.toLocaleString()}`;
    document.getElementById('hdr-fame').innerText = isEn ? `Fame: ${this.player.fame}` : `Şöhret: ${this.player.fame}`;
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
                  ${isEn ? 'Rank:' : 'Sıra:'} <strong style="color:var(--accent-gold);">#${opp.rank}</strong> | ${styleName} | OVR: ${opp.getOverallRating()} | (${opp.record.wins}-${opp.record.losses})
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

  updateCampView() {
    if (!this.career) return;

    const wrapper = document.getElementById('camp-card-wrapper');
    if (!wrapper) return;

    // Case 1: Weigh-in modal is required right now
    if (this.career.weighInRequired) {
      this.switchScreen('screen-dashboard');
      this.showWeighInModal();
      return;
    }

    // Case 2: No active fight camp
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

    // Case 3: Active fight camp! Render the 6 training activities
    const energyColor = this.player.energy < 5 ? 'var(--accent-red)' : 'var(--accent-cyan)';

    wrapper.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <h2 style="font-size: 1rem;">🏋️ Kamp (${this.career.currentOpponent?.name || 'Rakip'})</h2>
        <div style="display: flex; gap: 0.4rem;">
          <div class="stat-pill">📅 <strong>${this.career.campDay} / ${this.career.maxCampDays}</strong></div>
          <div class="stat-pill">⚡ <strong style="color: ${energyColor};">${this.player.energy}%</strong></div>
          <div class="stat-pill">🎯 <strong>${this.career.currentDayActivitiesLeft}</strong></div>
        </div>
      </div>

      <div class="tactics-grid">
        <div class="tactic-btn" onclick="window.app.doCampActivity('sparring')">
          <h4>🥊 Ağır Sparring</h4>
          <p>Punch & Kick (+) | -18 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('wrestling_drills')">
          <h4>🤼 Güreş & TDD</h4>
          <p>Wrestling (+) | -20 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('bjj_rolling')">
          <h4>🥋 BJJ Rolling</h4>
          <p>Submission (+) | -15 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('conditioning')">
          <h4>🏃 Kondisyon</h4>
          <p>Cardio & Güç (+) | -22 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('video_analysis')">
          <h4>📹 Rakip Analiz</h4>
          <p>Fight IQ (+) | -5 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('rest_sauna')">
          <h4>🧘 Sauna & Dinlen</h4>
          <p>+35 ⚡ | Stres (-)</p>
        </div>
      </div>
    `;
  }

  showWeighInModal() {
    const modal = document.getElementById('weighin-modal');
    if (!modal) return;

    const currentKg = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const targetKg = this.player.targetWeightKg;
    const diffKg = Number((currentKg - targetKg).toFixed(1));

    document.getElementById('weighin-current-kg').innerText = `${currentKg} kg`;
    document.getElementById('weighin-target-kg').innerText = `${targetKg} kg`;
    document.getElementById('weighin-diff-kg').innerText = diffKg > 0 ? `+${diffKg} kg` : `${diffKg} kg`;

    document.getElementById('weighin-strategy-section').style.display = 'block';
    document.getElementById('weighin-result-section').style.display = 'none';

    const stratList = document.getElementById('weighin-strategies-list');
    stratList.innerHTML = Object.keys(WEIGHT_CUT_STRATEGIES).map(key => {
      const s = WEIGHT_CUT_STRATEGIES[key];
      return `
        <div class="glass-card" style="cursor: pointer; transition: transform 0.2s; border-color: var(--accent-gold); margin-bottom: 0.5rem;" onclick="window.app.handleWeighInChoice('${key}')">
          <h4 style="color: var(--accent-gold); margin-bottom: 0.3rem;">${s.name}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${s.desc}</p>
          <div style="font-size: 0.75rem; color: var(--accent-cyan);">⚡ Enerji Düşüşü: -${s.energyPenalty} | Tahmini Kilo Kaybı: ~${s.weightCutKg} kg</div>
        </div>
      `;
    }).join('');

    modal.classList.add('active');
  }

  handleWeighInChoice(strategyKey) {
    sfx.playClick();
    if (!this.career) return;

    const res = this.career.processWeighIn(strategyKey);
    this.saveGame();

    document.getElementById('weighin-strategy-section').style.display = 'none';
    const resultSec = document.getElementById('weighin-result-section');
    resultSec.style.display = 'block';

    const badge = document.getElementById('weighin-status-badge');
    if (res.passed) {
      badge.style.background = 'rgba(34, 197, 94, 0.2)';
      badge.style.border = '2px solid #22c55e';
      badge.style.color = '#22c55e';
      badge.innerText = '✅ TARTI PASSED (KİLO TUTTU)';
    } else {
      badge.style.background = 'rgba(239, 68, 68, 0.2)';
      badge.style.border = '2px solid #ef4444';
      badge.style.color = '#ef4444';
      badge.innerText = '❌ TARTI KAÇIRILDI (MAÇTAN MEN)';
    }

    document.getElementById('weighin-result-text').innerText = res.message;

    const confirmBtn = document.getElementById('btn-weighin-confirm');
    confirmBtn.onclick = () => {
      sfx.playClick();
      document.getElementById('weighin-modal').classList.remove('active');
      this.updateHeaderAndDashboard();
      if (res.passed) {
        this.prepareOctagonView();
        this.switchScreen('screen-octagon');
      } else {
        this.switchScreen('screen-dashboard');
      }
    };
  }

  doCampActivity(activityId) {
    if (!this.career) return;
    sfx.playClick();
    const result = this.career.performCampActivity(activityId);
    if (result === 'no_energy') {
      alert('⚡ Enerjin çok düşük! Antrenman yapabilmek için dinlenmen gerekiyor. Sauna & Dinlenme seçeneğini dene.');
      return;
    }
    if (result) {
      this.saveGame();
      this.updateHeaderAndDashboard();
      this.updateCampView();

      // Check event
      if (this.career.activeEvent) {
        this.showEventModal(this.career.activeEvent);
      }
    }
  }

  showEventModal(evt) {
    const modal = document.getElementById('event-modal');
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-desc').innerText = evt.description;

    const optContainer = document.getElementById('modal-options');
    optContainer.innerHTML = evt.options.map((opt, idx) => `
      <button class="btn btn-secondary" onclick="window.app.resolveEventOption(${idx})">${opt.text}</button>
    `).join('');

    modal.classList.add('active');
  }

  resolveEventOption(index) {
    if (this.career) {
      sfx.playClick();

      // Check WCF Contract Offer Event
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
      document.getElementById('event-modal').classList.remove('active');
      this.updateHeaderAndDashboard();
    }
  }

  prepareOctagonView() {
    if (!this.career) return;
    const opponent = this.career.currentOpponent || this.career.findNextOpponent();
    this.fightEngine = new FightEngine(this.player, opponent, 3, this.player.rank === 0);

    document.getElementById('fight-player-name').innerText = this.player.name;
    document.getElementById('fight-player-style').innerText = FIGHT_STYLES[this.player.styleKey]?.name;
    document.getElementById('fight-opp-name').innerText = opponent.name;
    document.getElementById('fight-opp-style').innerText = FIGHT_STYLES[opponent.styleKey]?.name;

    this.renderTacticsButtons();
    this.updateFightUI();
  }

  renderTacticsButtons() {
    const container = document.getElementById('tactics-buttons-container');
    if (!this.fightEngine) return;

    const tactics = this.fightEngine.getAvailableTactics();
    container.innerHTML = tactics.map(t => `
      <div class="tactic-btn" onclick="window.app.playRoundChoice('${t.id}')">
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
      </div>
    `).join('');
  }

  playRoundChoice(tacticId) {
    if (!this.fightEngine || this.fightEngine.isFinished) return;

    sfx.playPunch();
    const outcome = this.fightEngine.playRound(tacticId);

    this.updateFightUI();

    if (outcome && outcome.winner) {
      sfx.playBell();
      if (outcome.winner === 'player') sfx.playCrowdCheer();

      this.career.handlePostFightResults(outcome, this.fightEngine.opponent);
      this.saveGame();
      setTimeout(() => {
        alert(`Dövüş Sona Erdi!\nKazanan: ${outcome.winner === 'player' ? this.player.name : this.fightEngine.opponent.name}\nYöntem: ${outcome.method}`);
        this.switchScreen('screen-dashboard');
      }, 1500);
    }
  }

  updateFightUI() {
    if (!this.fightEngine) return;

    const st = this.fightEngine.state;
    document.getElementById('fight-p-head').style.width = `${Math.max(0, st.player.headHp)}%`;
    document.getElementById('fight-p-stam').style.width = `${Math.max(0, st.player.stamina)}%`;
    document.getElementById('fight-opp-head').style.width = `${Math.max(0, st.opponent.headHp)}%`;
    document.getElementById('fight-opp-stam').style.width = `${Math.max(0, st.opponent.stamina)}%`;

    // Commentary feed
    const box = document.getElementById('fight-commentary-box');
    box.innerHTML = this.fightEngine.commentary.map(c => `
      <div class="commentary-line ${c.type}">${c.text}</div>
    `).join('');
  }

  renderRankingsView() {
    if (!this.career) return;
    const tbody = document.getElementById('rankings-tbody');
    const isEn = this.lang === 'en';

    // Ensure rankings has all 31 slots (rank 0 = champion, rank 1-30 = ranked)
    // Filter out any unranked/amateur fighters (rank >= 99) that may have leaked in
    const cleanedRankings = this.career.rankings.filter(f => f && f.rank !== undefined && f.rank < 99);

    // Build a rank -> fighter lookup map
    const byRank = {};
    cleanedRankings.forEach(f => {
      if (f.id === this.player.id) return; // Skip player — we'll insert them separately
      const r = f.rank;
      // If multiple fighters share a rank (shouldn't happen but just in case), keep highest OVR
      if (!byRank[r] || (f.getOverallRating ? f.getOverallRating() : 0) > (byRank[r].getOverallRating ? byRank[r].getOverallRating() : 0)) {
        byRank[r] = f;
      }
    });

    // Fill any completely missing rank slots with new AI fighters (lazy-fill)
    for (let r = 0; r <= 30; r++) {
      if (r === this.player.rank) continue; // Player occupies this slot
      if (!byRank[r]) {
        const filler = generateAIOpponent ? generateAIOpponent(this.player.weightClass, this.career.getOrgTier(), r, r === 0) : null;
        if (filler) {
          byRank[r] = filler;
          this.career.rankings.push(filler); // Add to persistent rankings
        }
      }
    }

    const champTitle = isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON';
    const youTag = isEn ? '(YOU)' : '(SEN)';
    const isAmateur = this.player.rank >= 99;
    const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');

    let html = '';

    // Show professional rankings (rank 0 to 30)
    for (let r = 0; r <= 30; r++) {
      const rankDisplay = r === 0 ? champTitle : `#${r}`;

      if (r === this.player.rank && !isAmateur) {
        // Insert player row
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
        const ovr = f.getOverallRating ? f.getOverallRating() : (f.stats ? Math.round(Object.values(f.stats).reduce((a, b) => a + b, 0) / 11) : 60);
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
      } else {
        // Empty slot fallback (shouldn't happen after fill)
        html += `<tr><td>${rankDisplay}</td><td colspan="4" style="color:var(--text-muted)">—</td></tr>`;
      }
    }

    // Show amateur player below the pro rankings (if still unranked)
    if (isAmateur) {
      html += `
        <tr class="highlight" style="border-top: 2px dashed var(--accent-gold);">
          <td><span style="color: var(--accent-gold); font-weight: 700;">${isEn ? 'Amateur (NR)' : 'Amatör (NR)'}</span></td>
          <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
          <td>${pStyle}</td>
          <td>${this.player.record.wins}-${this.player.record.losses}</td>
          <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:center; font-size:0.75rem; color:var(--text-muted); padding:0.4rem;">
            ${isEn ? '💡 To enter the pro rankings (#30), win 7 amateur fights in the regional promotion.' : '💡 Profesyonel lig sıralamasına (#30) girmek için bölgesel ligde 7 amatör galibiyet almanız gerekir.'}
          </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;
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

    // Fighter header
    document.getElementById('stats-fighter-name').innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    document.getElementById('stats-ovr').innerText = this.player.getOverallRating();
    const ageStrStats = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('stats-age').innerText = ageStrStats;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('stats-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'MMA');

    // Stat bars
    const container = document.getElementById('stats-bars-container');
    container.innerHTML = Object.keys(this.player.stats).map(key => {
      const val = this.player.stats[key];
      const info = statLabels[key] || { name: key, icon: '📊', color: '#90caf9' };
      const pct = Math.min(100, val);
      return `
        <div style="margin-bottom: 0.7rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <span style="font-size: 0.85rem; color: var(--text-main);">${info.icon} ${info.name}</span>
            <strong style="font-family: var(--font-heading); font-size: 1.05rem; color: ${info.color};">${val}</strong>
          </div>
          <div class="bar-container" style="height: 10px;">
            <div class="bar-fill" style="width: ${pct}%; background: ${info.color}; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Career summary
    const summaryDiv = document.getElementById('stats-career-summary');
    const rankText = this.player.rank >= 99 ? (isEn ? 'Unranked' : 'Sıralama Dışı') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    summaryDiv.innerHTML = `
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Record' : 'Rekor'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.record.wins}W - ${this.player.record.losses}L - ${this.player.record.draws}D</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Ranking' : 'Sıralama'}</div>
        <strong style="color:var(--accent-gold);">${rankText}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'KO Wins' : 'KO Galibiyeti'}</div>
        <strong style="color:var(--accent-red);">${this.player.record.koWins}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Sub Wins' : 'Sub Galibiyeti'}</div>
        <strong style="color:#ab47bc;">${this.player.record.subWins}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Money' : 'Bakiye'}</div>
        <strong style="color:var(--accent-gold);">$${this.player.money.toLocaleString()}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Fame' : 'Şöhret'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.fame}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Win Streak' : 'Galibiyet Serisi'}</div>
        <strong style="color:var(--accent-gold);">${this.player.winStreak}🔥</strong>
      </div>
    `;
  }

  renderSocialFeedView() {
    if (!this.career) return;

    // Display player's social handle
    const handleEl = document.getElementById('social-player-handle');
    if (handleEl && this.player) {
      handleEl.innerText = this.player.socialHandle;
    }

    // Update weekly post counter
    const limitText = document.getElementById('social-post-limit-text');
    if (limitText) {
      limitText.innerText = `${this.career.weeklySocialPostsLeft} / 3`;
    }

    // Toggle post buttons based on limit
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
    this.renderShopView();
    this.updateHeaderAndDashboard();
    const itemName = isEn && item.nameEn ? item.nameEn : item.name;
    alert(isEn ? `😋 Consumed ${itemName}.\nCurrent Weight: ${this.player.walkWeight} kg` : `😋 Afiyet olsun! ${item.name} tüketildi.\nMevcut Kilonuz: ${this.player.walkWeight} kg`);
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


