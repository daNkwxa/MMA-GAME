// MMA GOAT - Fighter Physics & Movement Vector Controller

export class FighterMovementController {
  constructor(initialX, initialY, isPlayer = true) {
    this.x = initialX;
    this.y = initialY;
    this.vx = 0;
    this.vy = 0;
    this.targetX = initialX;
    this.targetY = initialY;
    this.angle = isPlayer ? 0 : Math.PI; // Face towards each other
    this.isPlayer = isPlayer;
    this.baseSpeed = 2.2;
    this.radius = 16; // Visual hit circle radius
    this.circlingAngle = Math.random() * Math.PI * 2;

    // === Animation State ===
    this.animState = 'idle'; // 'idle','punch_l','punch_r','kick','hit_react','clinch','takedown','block','submission'
    this.animTimer = 0;       // countdown frames for current anim
    this.animDuration = 0;    // total frames for current anim
    this.animData = {};       // extra data per anim (e.g. which hand)

    // Idle breathing cycle
    this.idlePhase = Math.random() * Math.PI * 2;
    this.idleSpeed = 0.04 + Math.random() * 0.02;

    // Hit react recoil
    this.recoilX = 0;
    this.recoilY = 0;
  }

  resetPosition(x, y, isPlayer = true) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.targetX = x;
    this.targetY = y;
    this.angle = isPlayer ? 0 : Math.PI;
    this.animState = 'idle';
    this.animTimer = 0;
    this.recoilX = 0;
    this.recoilY = 0;
  }

  setTarget(tx, ty) {
    this.targetX = tx;
    this.targetY = ty;
  }

  // Trigger an animation state
  playAnimation(state, durationFrames, data = {}) {
    this.animState = state;
    this.animDuration = durationFrames;
    this.animTimer = durationFrames;
    this.animData = data;
  }

  // Apply a directional recoil impulse (for getting hit)
  applyRecoil(fromX, fromY, force = 6) {
    const dx = this.x - fromX;
    const dy = this.y - fromY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    this.recoilX = (dx / dist) * force;
    this.recoilY = (dy / dist) * force;
  }

  // Get normalized animation progress (0 = start, 1 = end)
  getAnimProgress() {
    if (this.animDuration <= 0) return 1;
    return 1 - (this.animTimer / this.animDuration);
  }

  update(arenaManager, dt = 1) {
    // Velocity vector towards target
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 2) {
      const speed = Math.min(dist * 0.1, this.baseSpeed);
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
    } else {
      this.vx *= 0.6;
      this.vy *= 0.6;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Recoil decay
    if (Math.abs(this.recoilX) > 0.1 || Math.abs(this.recoilY) > 0.1) {
      this.x += this.recoilX * dt;
      this.y += this.recoilY * dt;
      this.recoilX *= 0.82;
      this.recoilY *= 0.82;
    } else {
      this.recoilX = 0;
      this.recoilY = 0;
    }

    // Boundary constraint inside Octagon
    if (arenaManager) {
      const clamped = arenaManager.clampToOctagon(this.x, this.y, this.radius + 4);
      this.x = clamped.x;
      this.y = clamped.y;
    }

    // Animation timer countdown
    if (this.animTimer > 0) {
      this.animTimer -= dt;
      if (this.animTimer <= 0) {
        this.animTimer = 0;
        this.animState = 'idle';
        this.animData = {};
      }
    }

    // Idle breathing phase
    this.idlePhase += this.idleSpeed * dt;
  }

  lookAt(targetX, targetY) {
    this.angle = Math.atan2(targetY - this.y, targetX - this.x);
  }

  // Tactical Movement Behaviors
  approachOpponent(oppX, oppY, minDistance = 35) {
    const dx = oppX - this.x;
    const dy = oppY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > minDistance) {
      const targetDist = dist - minDistance;
      const tx = this.x + (dx / dist) * targetDist;
      const ty = this.y + (dy / dist) * targetDist;
      this.setTarget(tx, ty);
    } else {
      this.setTarget(this.x, this.y);
    }
    this.lookAt(oppX, oppY);
  }

  retreatFromOpponent(oppX, oppY, desiredDistance = 110) {
    const dx = this.x - oppX;
    const dy = this.y - oppY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0 && dist < desiredDistance) {
      const pushDist = desiredDistance - dist;
      const tx = this.x + (dx / dist) * pushDist;
      const ty = this.y + (dy / dist) * pushDist;
      this.setTarget(tx, ty);
    }
    this.lookAt(oppX, oppY);
  }

  circleAroundOpponent(oppX, oppY, orbitRadius = 75, clockwise = true) {
    this.circlingAngle += (clockwise ? 0.03 : -0.03);
    const tx = oppX + Math.cos(this.circlingAngle) * orbitRadius;
    const ty = oppY + Math.sin(this.circlingAngle) * orbitRadius;
    this.setTarget(tx, ty);
    this.lookAt(oppX, oppY);
  }

  applyImpulse(dirX, dirY, force = 8) {
    this.x += dirX * force;
    this.y += dirY * force;
  }
}
