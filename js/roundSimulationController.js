// MMA GOAT - Live Round Simulation Controller & Octagon Loop Orchestrator

import { ArenaManager } from './arenaManager.js';
import { FighterMovementController } from './fighterMovementController.js';
import { FighterBehaviorController } from './fighterBehaviorController.js';
import { ArenaCollisionManager } from './arenaCollisionManager.js';
import { CombatAnimationController } from './combatAnimationController.js';
import { VisualFightRenderer } from './visualFightRenderer.js';

export class RoundSimulationController {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.arena = new ArenaManager(canvasElement);
    this.anim = new CombatAnimationController();
    this.renderer = new VisualFightRenderer(canvasElement, this.arena, this.anim);
    this.collision = new ArenaCollisionManager();

    this.playerMove = new FighterMovementController(this.arena.centerX - 100, this.arena.centerY, true);
    this.oppMove = new FighterMovementController(this.arena.centerX + 100, this.arena.centerY, false);

    this.playerBehavior = new FighterBehaviorController(this.playerMove, true);
    this.oppBehavior = new FighterBehaviorController(this.oppMove, false);

    this.isRunning = false;
    this.animFrameId = null;
    this.currentFightEngine = null;
    this.exchangesRemainingInRound = 0;
    this.lastExchangeTime = 0;
    this.onRoundFinishedCallback = null;

    // Ambient combat timing
    this.lastAmbientTime = 0;
    this.nextAmbientDelay = 800;
  }

  initArena(fightEngine) {
    this.currentFightEngine = fightEngine;
    if (this.canvas) {
      const parentW = (this.canvas.parentElement && this.canvas.parentElement.clientWidth > 100)
        ? this.canvas.parentElement.clientWidth
        : 580;
      const containerWidth = Math.min(600, parentW);
      const canvasHeight = Math.round(containerWidth * 0.50);
      this.arena.resize(containerWidth, canvasHeight);
    }

    this.playerMove.resetPosition(this.arena.centerX - 95, this.arena.centerY, true);
    this.oppMove.resetPosition(this.arena.centerX + 95, this.arena.centerY, false);

    this.playerBehavior.setTactic('counter');
    this.oppBehavior.setTactic('counter');

    this.anim.resetGroundState();
    this.startLoop();
  }

  startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    let lastTime = performance.now();

    const loop = (now) => {
      if (!this.isRunning) return;
      const dt = Math.min((now - lastTime) / 16.6, 2.0);
      lastTime = now;

      this.update(dt, now);
      this.render();

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  stopLoop() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  update(dt, now) {
    if (!this.currentFightEngine) return;

    // Dynamic canvas resize
    if (this.canvas && this.canvas.parentElement) {
      const pW = this.canvas.parentElement.clientWidth;
      if (pW > 100 && (this.canvas.width < 100 || Math.abs(this.canvas.width - pW) > 20)) {
        const targetW = Math.min(600, pW);
        this.arena.resize(targetW, Math.round(targetW * 0.62));
        this.playerMove.resetPosition(this.arena.centerX - 95, this.arena.centerY, true);
        this.oppMove.resetPosition(this.arena.centerX + 95, this.arena.centerY, false);
      }
    }

    const pState = this.currentFightEngine.state.player;
    const oppState = this.currentFightEngine.state.opponent;

    // Steering & movement
    this.playerBehavior.steer(this.arena, this.oppMove, pState, now);
    this.oppBehavior.steer(this.arena, this.playerMove, oppState, now);

    this.playerMove.update(this.arena, dt);
    this.oppMove.update(this.arena, dt);

    // Engine exchanges
    if (this.exchangesRemainingInRound > 0 && now - this.lastExchangeTime > 1200) {
      this.lastExchangeTime = now;
      this.executeNextExchangeInRound();
    }

    // === Ambient visual combat (always active, not just during rounds) ===
    if (now - this.lastAmbientTime > this.nextAmbientDelay) {
      this.lastAmbientTime = now;
      this.triggerAmbientCombat(now);
    }
  }

  render() {
    const pState = this.currentFightEngine ? this.currentFightEngine.state.player : null;
    const oppState = this.currentFightEngine ? this.currentFightEngine.state.opponent : null;
    this.renderer.render(this.playerMove, this.oppMove, pState, oppState, this.isRunning);
  }

  // === Ambient visual-only combat (no engine damage) - fires constantly ===
  triggerAmbientCombat(now) {
    const dx = this.oppMove.x - this.playerMove.x;
    const dy = this.oppMove.y - this.playerMove.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Set next delay (random, frequent)
    this.nextAmbientDelay = 500 + Math.random() * 1200;

    // Only fire when fighters are close enough
    if (dist > 120) {
      // When far apart, just do guard stance adjustments
      if (this.playerMove.animState === 'idle' && Math.random() > 0.6) {
        this.playerMove.playAnimation('block', 20);
      }
      if (this.oppMove.animState === 'idle' && Math.random() > 0.6) {
        this.oppMove.playAnimation('block', 20);
      }
      return;
    }

    // Skip if either fighter is already animating a big move
    const pBusy = this.playerMove.animState !== 'idle' && this.playerMove.animState !== 'block';
    const oBusy = this.oppMove.animState !== 'idle' && this.oppMove.animState !== 'block';
    if (pBusy && oBusy) return;

    const roll = Math.random();
    const tactic = this.playerBehavior.currentTactic;
    const aiTactic = this.oppBehavior.currentTactic;

    // Determine who attacks (player slightly more often)
    const attackerIsPlayer = Math.random() > 0.4;
    const attacker = attackerIsPlayer ? this.playerMove : this.oppMove;
    const defender = attackerIsPlayer ? this.oppMove : this.playerMove;
    const attackTactic = attackerIsPlayer ? tactic : aiTactic;

    if (attacker.animState !== 'idle') return;

    if (roll < 0.25) {
      // === Quick jab ===
      attacker.playAnimation(Math.random() > 0.5 ? 'punch_l' : 'punch_r', 28);
      // Defender sometimes blocks
      if (defender.animState === 'idle' && Math.random() > 0.4) {
        defender.playAnimation('block', 22);
      } else if (defender.animState === 'idle' && Math.random() > 0.6) {
        defender.playAnimation('hit_react', 18);
        if (defender.applyRecoil) defender.applyRecoil(attacker.x, attacker.y, 2);
        // Small spark
        this.anim.activeEffects.push({
          type: 'strike_spark',
          x: defender.x, y: defender.y - 5,
          radius: 10, color: '#fde68a',
          life: 1.0, decay: 0.08
        });
      }

    } else if (roll < 0.4) {
      // === 1-2 Combo ===
      attacker.playAnimation('punch_combo', 42);
      if (defender.animState === 'idle') {
        if (Math.random() > 0.5) {
          defender.playAnimation('block', 30);
        } else {
          defender.playAnimation('hit_react', 24);
          if (defender.applyRecoil) defender.applyRecoil(attacker.x, attacker.y, 4);
          this.anim.activeEffects.push({
            type: 'strike_spark',
            x: defender.x, y: defender.y - 3,
            radius: 14, color: '#eab308',
            life: 1.0, decay: 0.06
          });
        }
      }

    } else if (roll < 0.55 && dist < 90) {
      // === Kick ===
      attacker.playAnimation('kick', 35, { side: Math.random() > 0.5 ? 'left' : 'right' });
      if (defender.animState === 'idle') {
        if (Math.random() > 0.45) {
          defender.playAnimation('hit_react', 22);
          if (defender.applyRecoil) defender.applyRecoil(attacker.x, attacker.y, 5);
          this.anim.activeEffects.push({
            type: 'strike_spark',
            x: defender.x, y: defender.y,
            radius: 16, color: '#f97316',
            life: 1.0, decay: 0.06
          });
        } else {
          defender.playAnimation('block', 25);
        }
      }

    } else if (roll < 0.65) {
      // === Both exchange (simultaneous) ===
      attacker.playAnimation('punch_l', 24);
      if (defender.animState === 'idle') {
        defender.playAnimation(Math.random() > 0.5 ? 'punch_r' : 'punch_l', 24);
      }
      // Small sparks at midpoint
      const mx = (attacker.x + defender.x) / 2;
      const my = (attacker.y + defender.y) / 2;
      this.anim.activeEffects.push({
        type: 'strike_spark',
        x: mx, y: my,
        radius: 8, color: '#fbbf24',
        life: 1.0, decay: 0.1
      });

    } else if (roll < 0.75) {
      // === Feint (just the animation, no contact) ===
      attacker.playAnimation(Math.random() > 0.5 ? 'punch_l' : 'kick', 
        Math.random() > 0.5 ? 20 : 30,
        { side: 'right' });

    } else if (roll < 0.85) {
      // === Guard adjustment / head movement ===
      if (attacker.animState === 'idle') attacker.playAnimation('block', 18);
      if (defender.animState === 'idle' && Math.random() > 0.5) defender.playAnimation('block', 18);

    } else {
      // === Body shot jab ===
      attacker.playAnimation('punch_r', 26);
      if (defender.animState === 'idle' && Math.random() > 0.3) {
        defender.playAnimation('block', 20);
      }
    }
  }

  // Triggered when Player selects a tactic button
  startRoundSimulation(playerTacticId, onRoundFinished) {
    if (!this.currentFightEngine || this.currentFightEngine.isFinished) return;

    this.onRoundFinishedCallback = onRoundFinished;
    this.playerBehavior.setTactic(playerTacticId);

    const aiTacticId = this.currentFightEngine.chooseAITactic();
    this.oppBehavior.setTactic(aiTacticId);

    const isEn = window.app && window.app.lang === 'en';
    const roundNum = this.currentFightEngine.currentRound;
    this.currentFightEngine.addCommentary(isEn ? `--- ROUND ${roundNum} STARTED ---` : `--- ROUND ${roundNum} BAŞLADI ---`, 'header');

    // 3 exchanges per round (matching original engine)
    this.exchangesRemainingInRound = 3;
    this.roundPlayerPoints = 0;
    this.roundAIPoints = 0;
    this.currentPlayerTactic = playerTacticId;
    this.currentAiTactic = aiTacticId;
    this.lastExchangeTime = performance.now();
    this.lastAmbientTime = performance.now();

    // Move fighters towards center
    this.playerMove.setTarget(this.arena.centerX - 40, this.arena.centerY);
    this.oppMove.setTarget(this.arena.centerX + 40, this.arena.centerY);
  }

  executeNextExchangeInRound() {
    if (!this.currentFightEngine || this.exchangesRemainingInRound <= 0) return;

    this.exchangesRemainingInRound--;

    const engine = this.currentFightEngine;
    const pEff = engine.calculateTacticEfficiency(engine.player, this.currentPlayerTactic, engine.state.player) * (0.85 + Math.random() * 0.3);
    const aiEff = engine.calculateTacticEfficiency(engine.opponent, this.currentAiTactic, engine.state.opponent) * (0.85 + Math.random() * 0.3);

    const result = engine.simulateExchange(this.currentPlayerTactic, this.currentAiTactic, pEff, aiEff);

    // === Accumulate exchange scores for proper round scoring ===
    this.roundPlayerPoints += result.pScore;
    this.roundAIPoints += result.aiScore;

    // Visual strike / grapple effect triggers
    if (this.currentPlayerTactic === 'takedown' || this.currentAiTactic === 'takedown') {
      this.anim.triggerTakedownEffect(this.playerMove, this.oppMove);
    } else if (this.currentPlayerTactic === 'clinch' || this.currentAiTactic === 'clinch') {
      this.anim.triggerClinchEffect(this.playerMove, this.oppMove);
    } else if (this.currentPlayerTactic === 'submission' || this.currentAiTactic === 'submission') {
      this.anim.triggerSubmissionEffect(this.playerMove, this.oppMove);
    } else if (this.currentPlayerTactic === 'kicks' || this.currentAiTactic === 'kicks') {
      if (this.currentPlayerTactic === 'kicks') {
        this.anim.triggerKickEffect(this.playerMove, this.oppMove);
      } else {
        this.anim.triggerKickEffect(this.oppMove, this.playerMove);
      }
    } else {
      const isCrit = pEff > aiEff * 1.3 || aiEff > pEff * 1.3;
      if (pEff >= aiEff) {
        this.anim.triggerPunchEffect(this.playerMove, this.oppMove, isCrit);
      } else {
        this.anim.triggerPunchEffect(this.oppMove, this.playerMove, isCrit);
      }
    }

    // Check finish conditions (KO / Submission)
    const roundNum = engine.currentRound;
    const isEn = window.app && window.app.lang === 'en';

    if (engine.state.opponent.headHp <= 0 || engine.state.opponent.bodyHp <= 0) {
      engine.addCommentary(isEn ? `💥 INCREDIBLE KO! ${engine.player.name} KNOCKED OUT ${engine.opponent.name}!` : `💥 İNANILMAZ KO! ${engine.player.name} RAKİBİNİ YERE SERDİ VE DÖVÜŞÜ BİTİRDİ!`, 'finish');
      engine.isFinished = true;
      this.finishRound({ winner: 'player', method: 'KO', round: roundNum });
      return;
    }
    if (engine.state.player.headHp <= 0 || engine.state.player.bodyHp <= 0) {
      engine.addCommentary(isEn ? `💥 KNOCKOUT! ${engine.opponent.name} KNOCKED YOU OUT!` : `💥 NAKAVT! ${engine.opponent.name} MÜTHİŞ BİR VURUŞLA SENİ NAKAVT ETTİ!`, 'danger');
      engine.isFinished = true;
      this.finishRound({ winner: 'opponent', method: 'KO', round: roundNum });
      return;
    }
    if (engine.state.opponent.subDanger >= 100) {
      engine.addCommentary(isEn ? `🥋 SUBMISSION! ${engine.player.name} SUBMITTED ${engine.opponent.name}!` : `🥋 PES ETTİRME! ${engine.player.name} RAKİBİNİ PES ETTİRDİ (SUBMISSION)!`, 'finish');
      engine.isFinished = true;
      this.finishRound({ winner: 'player', method: 'Submission', round: roundNum });
      return;
    }
    if (engine.state.player.subDanger >= 100) {
      engine.addCommentary(isEn ? `🥋 SUBMISSION! ${engine.opponent.name} SUBMITTED YOU!` : `🥋 PES ETTİRME! ${engine.opponent.name} SENİ PES ETTİRDİ (SUBMISSION)!`, 'danger');
      engine.isFinished = true;
      this.finishRound({ winner: 'opponent', method: 'Submission', round: roundNum });
      return;
    }

    if (this.exchangesRemainingInRound === 0) {
      // === PROPER ROUND SCORING (matching original fightEngine.playRound logic) ===
      let pScore = 10;
      let aiScore = 10;
      const diff = this.roundPlayerPoints - this.roundAIPoints;
      if (diff > 15) { pScore = 10; aiScore = 8; }
      else if (diff > 0) { pScore = 10; aiScore = 9; }
      else if (diff < -15) { pScore = 8; aiScore = 10; }
      else { pScore = 9; aiScore = 10; }

      engine.state.roundScores.push({ player: pScore, opponent: aiScore });
      engine.addCommentary(isEn ? `🔔 Round ${roundNum} Ended. Judges Score: ${pScore} - ${aiScore}` : `🔔 Round ${roundNum} Sona Erdi. Hakem Puan Eğilimi: ${pScore} - ${aiScore}`, 'info');

      // === Stamina Recovery & SubDanger Reset (matching original engine) ===
      engine.state.player.stamina = Math.min(100, engine.state.player.stamina + 10);
      engine.state.opponent.stamina = Math.min(100, engine.state.opponent.stamina + 10);
      engine.state.player.subDanger = 0;
      engine.state.opponent.subDanger = 0;

      engine.currentRound++;
      if (engine.currentRound > engine.totalRounds) {
        engine.isFinished = true;
        let totalP = 0, totalAI = 0;
        engine.state.roundScores.forEach(r => { totalP += r.player; totalAI += r.opponent; });

        if (totalP > totalAI) {
          engine.addCommentary(isEn ? `🏆 WINNER BY UNANIMOUS DECISION: ${engine.player.name}!` : `🏆 OYBİRLİĞİ İLE KAZANAN (Unanimous Decision): ${engine.player.name}!`, 'finish');
          this.finishRound({ winner: 'player', method: 'Decision', scores: `${totalP}-${totalAI}` });
        } else if (totalAI > totalP) {
          engine.addCommentary(isEn ? `❌ WINNER BY DECISION: ${engine.opponent.name}!` : `❌ HAKEM KARARI İLE KAZANAN: ${engine.opponent.name}!`, 'danger');
          this.finishRound({ winner: 'opponent', method: 'Decision', scores: `${totalP}-${totalAI}` });
        } else {
          engine.addCommentary(isEn ? `⚖️ DRAW (Split Draw)!` : `⚖️ BERABERE (Split Draw)!`, 'info');
          this.finishRound({ winner: 'draw', method: 'Draw', scores: `${totalP}-${totalAI}` });
        }
      } else {
        this.finishRound({ ongoing: true, currentRound: engine.currentRound });
      }
    }
  }

  finishRound(outcome) {
    this.exchangesRemainingInRound = 0;
    if (typeof this.onRoundFinishedCallback === 'function') {
      this.onRoundFinishedCallback(outcome);
    }
  }
}
