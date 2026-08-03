// MMA GOAT - Fighter & AI Models

import { FIGHT_STYLES, WEIGHT_CLASSES, COUNTRIES, FIRST_NAMES, LAST_NAMES, GLOVES_CATALOG, AI_ARCHETYPES } from './data.js';

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

export function generateAIOpponent(weightClass, orgTier = 1, rank = 10, isTitleFight = false, amateurFightNum = 0) {
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

