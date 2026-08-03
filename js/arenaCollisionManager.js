// MMA GOAT - Arena Collision & Engagement Range Detector

export class ArenaCollisionManager {
  constructor() {
    this.strikeRange = 42;
    this.clinchRange = 26;
    this.takedownRange = 24;
    this.lastCollisionTime = 0;
    this.cooldownMs = 1200; // Cooldown between exchange engagements
  }

  getDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  isContact(p1, p2, rangeThreshold = 40) {
    return this.getDistance(p1, p2) <= rangeThreshold;
  }

  checkEngagement(p1, p2, p1Tactic, p2Tactic, now = Date.now()) {
    if (now - this.lastCollisionTime < this.cooldownMs) {
      return null;
    }

    const dist = this.getDistance(p1, p2);
    let rangeLimit = this.strikeRange;

    if (p1Tactic === 'clinch' || p2Tactic === 'clinch') {
      rangeLimit = this.clinchRange;
    } else if (p1Tactic === 'takedown' || p1Tactic === 'submission' || p2Tactic === 'takedown') {
      rangeLimit = this.takedownRange;
    }

    if (dist <= rangeLimit) {
      this.lastCollisionTime = now;
      return {
        type: 'contact',
        distance: dist,
        timestamp: now
      };
    }

    return null;
  }
}
