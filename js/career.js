// MMA GOAT - Career & Management Module

import { ORGANIZATIONS, RANDOM_EVENTS, GYM_UPGRADES, COACH_STAFF, WEIGHT_CUT_STRATEGIES, WEIGHT_CLASSES } from './data.js';
import { generateAIOpponent } from './fighter.js';

export class CareerManager {
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
