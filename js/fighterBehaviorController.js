// MMA GOAT - Tactical Behavior Controller & AI Steering System

export class FighterBehaviorController {
  constructor(movementController, isPlayer = true) {
    this.movement = movementController;
    this.isPlayer = isPlayer;
    this.currentTactic = 'counter';
    this.state = 'neutral'; // 'neutral', 'advancing', 'retreating', 'circling', 'striking', 'grappling'
    this.lastAiDecisionTime = 0;
    this.aiDirectionClockwise = Math.random() > 0.5;
  }

  setTactic(tacticId) {
    this.currentTactic = tacticId || 'counter';
  }

  // Steering step invoked in each animation tick
  steer(arenaManager, oppMovement, fightEngineState, now = Date.now()) {
    if (!this.movement || !oppMovement) return;

    const myPos = { x: this.movement.x, y: this.movement.y };
    const oppPos = { x: oppMovement.x, y: oppMovement.y };

    const dx = oppPos.x - myPos.x;
    const dy = oppPos.y - myPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // AI periodic tactic & steering evaluation (every ~1000ms)
    if (!this.isPlayer && now - this.lastAiDecisionTime > 1000) {
      this.lastAiDecisionTime = now;
      if (Math.random() > 0.6) {
        this.aiDirectionClockwise = !this.aiDirectionClockwise;
      }
    }

    // Execute movement logic per tactic profile
    switch (this.currentTactic) {
      case 'counter':
        // Maintain distance (~85-110px). If opponent comes closer than 60px, retreat & counter.
        if (dist < 65) {
          this.movement.retreatFromOpponent(oppPos.x, oppPos.y, 95);
        } else if (dist > 115) {
          this.movement.approachOpponent(oppPos.x, oppPos.y, 85);
        } else {
          this.movement.circleAroundOpponent(oppPos.x, oppPos.y, 85, this.aiDirectionClockwise);
        }
        break;

      case 'pressure':
        // Constantly walk down opponent, push them towards cage boundary.
        this.movement.approachOpponent(oppPos.x, oppPos.y, 28);
        break;

      case 'kicks':
        // Outer ring circling, maintain kicking range (~70-90px).
        if (dist < 60) {
          this.movement.retreatFromOpponent(oppPos.x, oppPos.y, 80);
        } else if (dist > 100) {
          this.movement.approachOpponent(oppPos.x, oppPos.y, 75);
        } else {
          this.movement.circleAroundOpponent(oppPos.x, oppPos.y, 75, !this.aiDirectionClockwise);
        }
        break;

      case 'takedown':
        // Zigzag approach, close distance fast to shoot double-leg takedown (< 25px).
        if (dist > 30) {
          const zigzagOffset = Math.sin(now * 0.005) * 20;
          const perpX = -dy / (dist || 1);
          const perpY = dx / (dist || 1);
          const targetX = oppPos.x - (dx / (dist || 1)) * 25 + perpX * zigzagOffset;
          const targetY = oppPos.y - (dy / (dist || 1)) * 25 + perpY * zigzagOffset;
          this.movement.setTarget(targetX, targetY);
          this.movement.lookAt(oppPos.x, oppPos.y);
        } else {
          this.movement.approachOpponent(oppPos.x, oppPos.y, 18);
        }
        break;

      case 'clinch':
        // Drive straight into opponent to lock collar tie (< 22px).
        this.movement.approachOpponent(oppPos.x, oppPos.y, 18);
        break;

      case 'submission':
        // Close distance for ground transition / grapple.
        this.movement.approachOpponent(oppPos.x, oppPos.y, 22);
        break;

      case 'defend':
      default:
        // Shell up & active retreat towards cage margin, stay away from center.
        if (dist < 100) {
          this.movement.retreatFromOpponent(oppPos.x, oppPos.y, 120);
        } else {
          this.movement.circleAroundOpponent(arenaManager.centerX, arenaManager.centerY, arenaManager.radius * 0.7, this.aiDirectionClockwise);
        }
        break;
    }
  }
}
