// MMA GOAT - Tactical Fight Engine & Round Simulator

export class FightEngine {
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
