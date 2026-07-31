// MMA GOAT - Fighter & AI Models

import { FIGHT_STYLES, WEIGHT_CLASSES, COUNTRIES, FIRST_NAMES, LAST_NAMES } from './data.js';

export class Fighter {
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

export function generateAIOpponent(weightClass, orgTier = 1, rank = 10, isTitleFight = false) {
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
