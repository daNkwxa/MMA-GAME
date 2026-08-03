// MMA GOAT - Combat Action Visual Animation Controller

export class CombatAnimationController {
  constructor() {
    this.activeEffects = [];
    this.groundFightActive = false;
    this.groundPosition = null;
  }

  triggerPunchEffect(attacker, defender, isCritical = false) {
    const dx = defender.x - attacker.x;
    const dy = defender.y - attacker.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // === Fighter Body Animations (LONG durations so they're visible) ===
    const punchType = isCritical ? 'punch_combo' : (Math.random() > 0.5 ? 'punch_l' : 'punch_r');
    const duration = isCritical ? 50 : 32;

    if (attacker.playAnimation) {
      attacker.playAnimation(punchType, duration);
    }
    if (defender.playAnimation) {
      defender.playAnimation('hit_react', 28);
      if (defender.applyRecoil) {
        defender.applyRecoil(attacker.x, attacker.y, isCritical ? 10 : 5);
      }
    }

    // Impact spark
    const hitX = defender.x - (dx / dist) * 8;
    const hitY = defender.y - (dy / dist) * 8;
    this.activeEffects.push({
      type: 'strike_spark',
      x: hitX, y: hitY,
      radius: isCritical ? 30 : 18,
      color: isCritical ? '#ef4444' : '#eab308',
      life: 1.0, decay: 0.045
    });

    // Punch trail line
    this.activeEffects.push({
      type: 'punch_trail',
      x1: attacker.x + (dx / dist) * 16,
      y1: attacker.y + (dy / dist) * 16,
      x2: hitX, y2: hitY,
      color: attacker.isPlayer ? '#38bdf8' : '#f43f5e',
      life: 1.0, decay: 0.07
    });

    // Burst particles
    const pCount = isCritical ? 10 : 5;
    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      this.activeEffects.push({
        type: 'burst_particle',
        x: hitX, y: hitY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.5 + Math.random() * 2.5,
        color: isCritical ? '#fbbf24' : '#fde68a',
        life: 1.0, decay: 0.03 + Math.random() * 0.02
      });
    }

    // Critical flash ring
    if (isCritical) {
      this.activeEffects.push({
        type: 'flash_ring',
        x: hitX, y: hitY,
        radius: 5, maxRadius: 40,
        color: '#ffffff',
        life: 1.0, decay: 0.06
      });
    }
  }

  triggerKickEffect(attacker, defender) {
    const angle = Math.atan2(defender.y - attacker.y, defender.x - attacker.x);
    const dx = defender.x - attacker.x;
    const dy = defender.y - attacker.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    // Fighter body animations
    if (attacker.playAnimation) {
      attacker.playAnimation('kick', 40, { side: Math.random() > 0.5 ? 'left' : 'right' });
    }
    if (defender.playAnimation) {
      defender.playAnimation('hit_react', 30);
      if (defender.applyRecoil) {
        defender.applyRecoil(attacker.x, attacker.y, 8);
      }
    }

    // Kick arc trail
    this.activeEffects.push({
      type: 'kick_arc',
      x: attacker.x, y: attacker.y,
      angle: angle, radius: 45,
      color: '#06b6d4',
      life: 1.0, decay: 0.04
    });

    // Impact
    this.activeEffects.push({
      type: 'strike_spark',
      x: defender.x, y: defender.y,
      radius: 24, color: '#f97316',
      life: 1.0, decay: 0.05
    });

    // Burst particles
    for (let i = 0; i < 7; i++) {
      const a = angle + (Math.random() - 0.5) * 1.5;
      const speed = 2 + Math.random() * 3;
      this.activeEffects.push({
        type: 'burst_particle',
        x: defender.x - (dx / dist) * 5,
        y: defender.y - (dy / dist) * 5,
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        radius: 2 + Math.random() * 2,
        color: '#fb923c',
        life: 1.0, decay: 0.03 + Math.random() * 0.02
      });
    }
  }

  triggerTakedownEffect(attacker, defender) {
    this.groundFightActive = true;
    this.groundPosition = 'mount';

    if (attacker.playAnimation) {
      attacker.playAnimation('takedown', 55);
    }
    if (defender.playAnimation) {
      defender.playAnimation('hit_react', 45);
      if (defender.applyRecoil) {
        defender.applyRecoil(attacker.x, attacker.y, -6);
      }
    }

    const mx = (attacker.x + defender.x) / 2;
    const my = (attacker.y + defender.y) / 2;

    this.activeEffects.push({
      type: 'takedown_ring',
      x: mx, y: my,
      radius: 6, maxRadius: 55,
      color: '#a855f7',
      life: 1.0, decay: 0.025
    });

    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2.5;
      this.activeEffects.push({
        type: 'burst_particle',
        x: mx, y: my,
        vx: Math.cos(a) * speed, vy: Math.sin(a) * speed,
        radius: 2 + Math.random() * 3,
        color: '#c084fc',
        life: 1.0, decay: 0.025
      });
    }
  }

  triggerClinchEffect(p1, p2) {
    if (p1.playAnimation) p1.playAnimation('clinch', 50);
    if (p2.playAnimation) p2.playAnimation('clinch', 50);

    const mx = (p1.x + p2.x) / 2;
    const my = (p1.y + p2.y) / 2;

    this.activeEffects.push({
      type: 'clinch_spark',
      x: mx, y: my,
      radius: 26, color: '#f97316',
      life: 1.0, decay: 0.03
    });

    this.activeEffects.push({
      type: 'flash_ring',
      x: mx, y: my,
      radius: 4, maxRadius: 32,
      color: '#f97316',
      life: 1.0, decay: 0.045
    });
  }

  triggerSubmissionEffect(attacker, defender) {
    if (attacker.playAnimation) attacker.playAnimation('submission', 60);
    if (defender.playAnimation) defender.playAnimation('submission', 60);

    this.activeEffects.push({
      type: 'submission_lock',
      x: defender.x, y: defender.y,
      radius: 32, color: '#ec4899',
      life: 1.0, decay: 0.02
    });

    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 / 6) * i;
      this.activeEffects.push({
        type: 'orbit_particle',
        cx: defender.x, cy: defender.y,
        angle: a, orbitRadius: 22,
        angularSpeed: 0.1,
        radius: 2.5, color: '#ec4899',
        life: 1.0, decay: 0.018
      });
    }
  }

  triggerBlockEffect(defender) {
    if (defender.playAnimation) {
      defender.playAnimation('block', 25);
    }
    this.activeEffects.push({
      type: 'strike_spark',
      x: defender.x + (defender.isPlayer ? 12 : -12),
      y: defender.y - 8,
      radius: 12, color: '#94a3b8',
      life: 1.0, decay: 0.07
    });
  }

  resetGroundState() {
    this.groundFightActive = false;
    this.groundPosition = null;
  }

  updateAndDraw(ctx) {
    if (!ctx) return;

    ctx.save();
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
      const fx = this.activeEffects[i];
      fx.life -= fx.decay;

      if (fx.life <= 0) {
        this.activeEffects.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = Math.max(0, fx.life);

      if (fx.type === 'strike_spark') {
        const sparkR = fx.radius * (1.3 - fx.life * 0.3);
        const gradient = ctx.createRadialGradient(fx.x, fx.y, 0, fx.x, fx.y, sparkR);
        gradient.addColorStop(0, fx.color);
        gradient.addColorStop(0.5, fx.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, sparkR, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

      } else if (fx.type === 'punch_trail') {
        ctx.beginPath();
        ctx.moveTo(fx.x1, fx.y1);
        ctx.lineTo(fx.x2, fx.y2);
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = 5 * fx.life;
        ctx.lineCap = 'round';
        ctx.stroke();

      } else if (fx.type === 'kick_arc') {
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, fx.radius, fx.angle - 0.8, fx.angle + 0.8);
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = 6 * fx.life;
        ctx.lineCap = 'round';
        ctx.stroke();

      } else if (fx.type === 'takedown_ring' || fx.type === 'flash_ring') {
        fx.radius += (fx.maxRadius - fx.radius) * 0.12;
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, fx.radius, 0, Math.PI * 2);
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = fx.type === 'flash_ring' ? 2.5 : 3.5;
        ctx.stroke();

      } else if (fx.type === 'clinch_spark' || fx.type === 'submission_lock') {
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, fx.radius, 0, Math.PI * 2);
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const rot = (1 - fx.life) * Math.PI * 4;
        ctx.save();
        ctx.translate(fx.x, fx.y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.arc(0, 0, fx.radius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

      } else if (fx.type === 'burst_particle') {
        fx.x += fx.vx;
        fx.y += fx.vy;
        fx.vx *= 0.94;
        fx.vy *= 0.94;
        ctx.beginPath();
        ctx.arc(fx.x, fx.y, fx.radius * fx.life, 0, Math.PI * 2);
        ctx.fillStyle = fx.color;
        ctx.fill();

      } else if (fx.type === 'orbit_particle') {
        fx.angle += fx.angularSpeed;
        const px = fx.cx + Math.cos(fx.angle) * fx.orbitRadius;
        const py = fx.cy + Math.sin(fx.angle) * fx.orbitRadius;
        ctx.beginPath();
        ctx.arc(px, py, fx.radius, 0, Math.PI * 2);
        ctx.fillStyle = fx.color;
        ctx.fill();
      }
    }
    ctx.restore();
  }
}
