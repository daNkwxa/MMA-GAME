// MMA GOAT - Career & Management Module

import { ORGANIZATIONS, RANDOM_EVENTS, GYM_UPGRADES, COACH_STAFF, WEIGHT_CUT_STRATEGIES, WEIGHT_CLASSES, SPONSORS_CATALOG, AI_ARCHETYPES } from './data.js';
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

