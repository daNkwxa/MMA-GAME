// MMA GOAT - 60 FPS Canvas Visual Fighter Renderer with Fight Animations

export class VisualFightRenderer {
  constructor(canvas, arenaManager, animController) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.arena = arenaManager;
    this.anim = animController;
    this.frameCount = 0;
  }

  render(playerMove, oppMove, playerState, oppState, isFightActive = true) {
    if (!this.ctx || !this.arena) return;
    this.frameCount++;

    // 1. Draw Arena Octagon
    this.arena.draw(this.ctx);

    const c = this.ctx;

    // 2. Draw Fighter Characters with Animations
    if (playerMove) {
      this.drawAnimatedFighter(c, playerMove, playerState, true);
    }
    if (oppMove) {
      this.drawAnimatedFighter(c, oppMove, oppState, false);
    }

    // 3. Draw Clinch/Takedown connector lines between fighters
    if (playerMove && oppMove) {
      this.drawEngagementLink(c, playerMove, oppMove);
    }

    // 4. Render Active Particle Animations & Effects
    if (this.anim) {
      this.anim.updateAndDraw(c);
    }
  }

  drawAnimatedFighter(ctx, move, state, isPlayer) {
    ctx.save();

    const px = move.x;
    const py = move.y;
    ctx.translate(px, py);

    const mainColor = isPlayer ? '#06b6d4' : '#ef4444';
    const skinColor = isPlayer ? '#f0d0a0' : '#d4a574';
    const shortsColor = isPlayer ? '#1e40af' : '#991b1b';
    const gloveColor = '#eab308';
    const accentColor = isPlayer ? '#38bdf8' : '#f87171';
    const radius = move.radius || 16;
    const animState = move.animState || 'idle';
    const animProgress = move.getAnimProgress ? move.getAnimProgress() : 1;
    const idlePhase = move.idlePhase || 0;
    const facing = move.angle || 0;

    // === Hit React Shake ===
    let shakeX = 0, shakeY = 0;
    if (animState === 'hit_react') {
      const intensity = (1 - animProgress) * 6;
      shakeX = Math.sin(animProgress * 30) * intensity;
      shakeY = Math.cos(animProgress * 25) * intensity * 0.5;
    }

    ctx.translate(shakeX, shakeY);

    // === Idle Breathing Bob ===
    let bodyBob = 0;
    if (animState === 'idle') {
      bodyBob = Math.sin(idlePhase) * 2.5;
    }

    // === Shadow on Ground ===
    ctx.beginPath();
    ctx.ellipse(0, radius + 8 + bodyBob * 0.3, radius * 1.3, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();

    // Determine facing direction multiplier (left=-1, right=1)
    const facingRight = Math.cos(facing) >= 0 ? 1 : -1;

    // Scale X based on facing direction
    ctx.scale(facingRight, 1);

    // === LEGS ===
    this.drawLegs(ctx, move, radius, skinColor, shortsColor, animState, animProgress, idlePhase, bodyBob);

    // === BODY / TORSO ===
    this.drawTorso(ctx, move, radius, mainColor, skinColor, animState, animProgress, bodyBob);

    // === HEAD ===
    this.drawHead(ctx, move, radius, skinColor, mainColor, animState, animProgress, bodyBob);

    // === ARMS & GLOVES ===
    this.drawArms(ctx, move, radius, gloveColor, skinColor, accentColor, animState, animProgress, bodyBob, idlePhase);

    // Undo facing scale
    ctx.scale(facingRight, 1);

    // === Mini HP / Stamina bar ===
    if (state) {
      this.drawHealthBar(ctx, state, radius);
    }

    // === Fighter Label ===
    this.drawNameTag(ctx, isPlayer, radius);

    // === Hit flash overlay ===
    if (animState === 'hit_react' && animProgress < 0.3) {
      ctx.beginPath();
      ctx.arc(0, bodyBob - 2, radius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.4 * (1 - animProgress / 0.3)) + ')';
      ctx.fill();
    }

    ctx.restore();
  }

  drawHead(ctx, move, radius, skinColor, mainColor, animState, animProgress, bodyBob) {
    const headX = 0;
    let headY = -radius * 1.5 + bodyBob;
    const headR = radius * 0.42;

    // Head duck during block
    if (animState === 'block') {
      headY += 5 * (1 - animProgress);
    }
    // Head lean back during hit react
    if (animState === 'hit_react') {
      headY -= 3 * (1 - animProgress);
    }

    // Head circle
    ctx.beginPath();
    ctx.arc(headX, headY, headR, 0, Math.PI * 2);
    ctx.fillStyle = skinColor;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = mainColor;
    ctx.stroke();

    // Hair / headband
    ctx.beginPath();
    ctx.arc(headX, headY - headR * 0.3, headR * 0.95, -Math.PI, 0);
    ctx.fillStyle = mainColor;
    ctx.fill();
  }

  drawTorso(ctx, move, radius, mainColor, skinColor, animState, animProgress, bodyBob) {
    const torsoW = radius * 0.7;
    const torsoH = radius * 1.0;
    const torsoY = -radius * 0.5 + bodyBob;

    // Torso lean on attacks
    let torsoLean = 0;
    if (animState === 'punch_r' || animState === 'punch_combo') {
      torsoLean = 3 * Math.sin(animProgress * Math.PI);
    }
    if (animState === 'kick') {
      torsoLean = -4 * Math.sin(animProgress * Math.PI);
    }

    ctx.save();
    ctx.translate(torsoLean, 0);

    // Main torso (trapezoid shape)
    ctx.beginPath();
    ctx.moveTo(-torsoW * 0.8, torsoY - torsoH * 0.4);  // left shoulder
    ctx.lineTo(torsoW * 0.8, torsoY - torsoH * 0.4);   // right shoulder
    ctx.lineTo(torsoW * 0.6, torsoY + torsoH * 0.6);    // right hip
    ctx.lineTo(-torsoW * 0.6, torsoY + torsoH * 0.6);   // left hip
    ctx.closePath();
    ctx.fillStyle = mainColor;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();

    ctx.restore();
  }

  drawArms(ctx, move, radius, gloveColor, skinColor, accentColor, animState, animProgress, bodyBob, idlePhase) {
    const shoulderY = -radius * 0.9 + bodyBob;
    const shoulderX = radius * 0.55;
    const armLen = radius * 0.7;
    const forearmLen = radius * 0.65;
    const gloveR = radius * 0.32;

    // Default guard position
    let leftElbowX = -shoulderX - 2;
    let leftElbowY = shoulderY + armLen * 0.7;
    let leftGloveX = -shoulderX + 4;
    let leftGloveY = shoulderY + armLen * 0.15;

    let rightElbowX = shoulderX + 2;
    let rightElbowY = shoulderY + armLen * 0.7;
    let rightGloveX = shoulderX - 4;
    let rightGloveY = shoulderY + armLen * 0.15;

    // === IDLE GUARD STANCE ===
    if (animState === 'idle') {
      // Subtle guard bob
      const bob = Math.sin(idlePhase * 1.3) * 2;
      const bob2 = Math.cos(idlePhase * 1.1) * 2;
      leftGloveX = -shoulderX + 6 + bob * 0.5;
      leftGloveY = shoulderY - 2 + bob;
      rightGloveX = shoulderX - 6 + bob2 * 0.5;
      rightGloveY = shoulderY + 2 + bob2;
      leftElbowX = -shoulderX - 3;
      leftElbowY = shoulderY + armLen * 0.5 + bob * 0.3;
      rightElbowX = shoulderX + 3;
      rightElbowY = shoulderY + armLen * 0.5 + bob2 * 0.3;
    }

    // === LEFT JAB ===
    if (animState === 'punch_l') {
      const t = animProgress;
      // Quick snap out and back
      const extend = t < 0.3 ? (t / 0.3) : (t < 0.5 ? 1 : 1 - ((t - 0.5) / 0.5));
      leftGloveX = -shoulderX + 6 + extend * (radius * 1.8);
      leftGloveY = shoulderY - 4;
      leftElbowX = -shoulderX + extend * radius * 0.6;
      leftElbowY = shoulderY + armLen * 0.3;
    }

    // === RIGHT CROSS ===
    if (animState === 'punch_r') {
      const t = animProgress;
      const windUp = t < 0.2 ? (t / 0.2) : 0;
      const extend = t < 0.2 ? 0 : (t < 0.45 ? ((t - 0.2) / 0.25) : 1 - ((t - 0.45) / 0.55));
      rightGloveX = shoulderX - 6 - windUp * 8 + extend * (radius * 2.0);
      rightGloveY = shoulderY - 2;
      rightElbowX = shoulderX + extend * radius * 0.8;
      rightElbowY = shoulderY + armLen * 0.2;
    }

    // === 1-2 COMBO ===
    if (animState === 'punch_combo') {
      const t = animProgress;
      if (t < 0.45) {
        // Jab phase
        const phase = t / 0.45;
        const ext = phase < 0.4 ? (phase / 0.4) : 1 - ((phase - 0.4) / 0.6);
        leftGloveX = -shoulderX + 6 + ext * radius * 1.8;
        leftGloveY = shoulderY - 4;
        leftElbowX = -shoulderX + ext * radius * 0.5;
      } else {
        // Cross phase
        const phase = (t - 0.45) / 0.55;
        const ext = phase < 0.4 ? (phase / 0.4) : 1 - ((phase - 0.4) / 0.6);
        rightGloveX = shoulderX - 4 + ext * radius * 2.0;
        rightGloveY = shoulderY - 2;
        rightElbowX = shoulderX + ext * radius * 0.7;
      }
    }

    // === BLOCK ===
    if (animState === 'block') {
      const guard = 1 - animProgress * 0.7;
      leftGloveX = -shoulderX + 3;
      leftGloveY = shoulderY - 8 * guard;
      rightGloveX = shoulderX - 3;
      rightGloveY = shoulderY - 6 * guard;
      leftElbowX = -shoulderX - 5;
      leftElbowY = shoulderY + 4;
      rightElbowX = shoulderX + 5;
      rightElbowY = shoulderY + 4;
    }

    // === CLINCH ===
    if (animState === 'clinch') {
      const reach = animProgress < 0.3 ? (animProgress / 0.3) : 1;
      leftGloveX = -shoulderX + 8 + reach * radius * 1.4;
      leftGloveY = shoulderY - 6;
      rightGloveX = shoulderX - 8 + reach * radius * 1.4;
      rightGloveY = shoulderY + 2;
      leftElbowX = -shoulderX + reach * radius * 0.5;
      leftElbowY = shoulderY + 6;
      rightElbowX = shoulderX + reach * radius * 0.5;
      rightElbowY = shoulderY + 8;
    }

    // === TAKEDOWN ===
    if (animState === 'takedown') {
      const t = animProgress;
      const lunge = t < 0.35 ? (t / 0.35) : 1;
      leftGloveX = -shoulderX + 4 + lunge * radius * 1.2;
      leftGloveY = shoulderY + armLen * 0.5 + lunge * 8;
      rightGloveX = shoulderX - 4 + lunge * radius * 1.2;
      rightGloveY = shoulderY + armLen * 0.5 + lunge * 8;
      leftElbowX = -shoulderX + lunge * radius * 0.4;
      leftElbowY = shoulderY + armLen * 0.7;
      rightElbowX = shoulderX + lunge * radius * 0.4;
      rightElbowY = shoulderY + armLen * 0.7;
    }

    // === KICK (arms pull back for balance) ===
    if (animState === 'kick') {
      const ext = Math.sin(animProgress * Math.PI);
      leftGloveX = -shoulderX - ext * 6;
      leftGloveY = shoulderY + ext * 4;
      rightGloveX = shoulderX - ext * 4;
      rightGloveY = shoulderY - ext * 2;
    }

    // === SUBMISSION ===
    if (animState === 'submission') {
      const wrap = Math.sin(animProgress * Math.PI);
      leftGloveX = -shoulderX + 10 + wrap * radius * 1.3;
      leftGloveY = shoulderY + wrap * 4;
      rightGloveX = shoulderX - 10 + wrap * radius * 1.3;
      rightGloveY = shoulderY - wrap * 4;
    }

    // === HIT REACT (arms fly back) ===
    if (animState === 'hit_react') {
      const fling = (1 - animProgress);
      leftGloveX = -shoulderX - fling * 10;
      leftGloveY = shoulderY - 5 + fling * 8;
      rightGloveX = shoulderX + fling * 6;
      rightGloveY = shoulderY + fling * 10;
    }

    // --- Draw LEFT arm ---
    // Upper arm
    ctx.beginPath();
    ctx.moveTo(-shoulderX, shoulderY);
    ctx.lineTo(leftElbowX, leftElbowY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Forearm
    ctx.beginPath();
    ctx.moveTo(leftElbowX, leftElbowY);
    ctx.lineTo(leftGloveX, leftGloveY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    // Glove
    ctx.beginPath();
    ctx.arc(leftGloveX, leftGloveY, gloveR, 0, Math.PI * 2);
    ctx.fillStyle = gloveColor;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();

    // --- Draw RIGHT arm ---
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.lineTo(rightElbowX, rightElbowY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightElbowX, rightElbowY);
    ctx.lineTo(rightGloveX, rightGloveY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rightGloveX, rightGloveY, gloveR, 0, Math.PI * 2);
    ctx.fillStyle = gloveColor;
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#b45309';
    ctx.stroke();
  }

  drawLegs(ctx, move, radius, skinColor, shortsColor, animState, animProgress, idlePhase, bodyBob) {
    const hipY = radius * 0.1 + bodyBob;
    const thighLen = radius * 0.65;
    const shinLen = radius * 0.6;
    const hipSpread = radius * 0.35;

    // Default stance
    let leftKneeX = -hipSpread - 2;
    let leftKneeY = hipY + thighLen;
    let leftFootX = -hipSpread - 4;
    let leftFootY = hipY + thighLen + shinLen;

    let rightKneeX = hipSpread + 2;
    let rightKneeY = hipY + thighLen;
    let rightFootX = hipSpread + 4;
    let rightFootY = hipY + thighLen + shinLen;

    // === IDLE STANCE ===
    if (animState === 'idle') {
      const shift = Math.sin(idlePhase * 0.8) * 2;
      leftKneeX += shift * 0.5;
      rightKneeX -= shift * 0.5;
      leftFootX += shift;
      rightFootX -= shift;
    }

    // === KICK ===
    if (animState === 'kick') {
      const side = (move.animData && move.animData.side === 'left') ? -1 : 1;
      const t = animProgress;
      const chamber = t < 0.25 ? (t / 0.25) : 1;
      const extend = t < 0.25 ? 0 : (t < 0.55 ? ((t - 0.25) / 0.3) : 1 - ((t - 0.55) / 0.45));

      if (side === 1) {
        // Right leg kick
        rightKneeY = hipY + thighLen * (1 - chamber * 0.4);
        rightKneeX = hipSpread + chamber * 6;
        rightFootX = hipSpread + 4 + extend * radius * 2.2;
        rightFootY = hipY + thighLen * (1 - extend * 0.5);
      } else {
        leftKneeY = hipY + thighLen * (1 - chamber * 0.4);
        leftKneeX = -hipSpread - chamber * 6;
        leftFootX = -hipSpread - 4 + extend * radius * 2.2;
        leftFootY = hipY + thighLen * (1 - extend * 0.5);
      }
    }

    // === TAKEDOWN (lunge forward) ===
    if (animState === 'takedown') {
      const t = animProgress;
      const lunge = t < 0.4 ? (t / 0.4) : 1;
      rightFootX = hipSpread + 4 + lunge * radius * 1.2;
      rightKneeX = hipSpread + 2 + lunge * radius * 0.5;
      leftFootX = -hipSpread - 4 - lunge * 4;
      rightFootY += lunge * 4;
    }

    // === HIT REACT ===
    if (animState === 'hit_react') {
      const stumble = (1 - animProgress);
      leftFootX -= stumble * 6;
      rightFootX += stumble * 4;
    }

    // --- Draw shorts/trunks area ---
    ctx.beginPath();
    ctx.moveTo(-hipSpread, hipY);
    ctx.lineTo(hipSpread, hipY);
    ctx.lineTo(hipSpread + 2, hipY + thighLen * 0.35);
    ctx.lineTo(-hipSpread - 2, hipY + thighLen * 0.35);
    ctx.closePath();
    ctx.fillStyle = shortsColor;
    ctx.fill();

    // --- Draw LEFT leg ---
    ctx.beginPath();
    ctx.moveTo(-hipSpread, hipY + thighLen * 0.2);
    ctx.lineTo(leftKneeX, leftKneeY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(leftKneeX, leftKneeY);
    ctx.lineTo(leftFootX, leftFootY);
    ctx.lineWidth = 3.5;
    ctx.stroke();
    // Foot
    ctx.beginPath();
    ctx.ellipse(leftFootX, leftFootY, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = skinColor;
    ctx.fill();

    // --- Draw RIGHT leg ---
    ctx.beginPath();
    ctx.moveTo(hipSpread, hipY + thighLen * 0.2);
    ctx.lineTo(rightKneeX, rightKneeY);
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(rightKneeX, rightKneeY);
    ctx.lineTo(rightFootX, rightFootY);
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(rightFootX, rightFootY, 4, 2.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = skinColor;
    ctx.fill();
  }

  drawHealthBar(ctx, state, radius) {
    const barWidth = 38;
    const barHeight = 5;
    const startX = -barWidth / 2;
    const startY = -radius * 2.2;

    // HP Bar background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(startX - 1, startY - 1, barWidth + 2, barHeight + 2);

    const headHp = Math.max(0, Math.min(100, state.headHp !== undefined ? state.headHp : 100));
    const hpColor = headHp > 50 ? '#10b981' : (headHp > 25 ? '#eab308' : '#ef4444');
    ctx.fillStyle = hpColor;
    ctx.fillRect(startX, startY, (headHp / 100) * barWidth, barHeight);

    // Stamina bar
    if (state.stamina !== undefined) {
      const stamY = startY + barHeight + 2;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      ctx.fillRect(startX - 1, stamY, barWidth + 2, 3);
      const stamina = Math.max(0, Math.min(100, state.stamina));
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(startX, stamY, (stamina / 100) * barWidth, 2);
    }
  }

  drawNameTag(ctx, isPlayer, radius) {
    ctx.font = 'bold 9px sans-serif';
    ctx.fillStyle = isPlayer ? 'rgba(6, 182, 212, 0.95)' : 'rgba(239, 68, 68, 0.95)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(isPlayer ? '🔵 SEN' : '🔴 RAKİP', 0, radius + 14);
  }

  drawEngagementLink(ctx, playerMove, oppMove) {
    const p = playerMove;
    const o = oppMove;
    const bothClinch = p.animState === 'clinch' || o.animState === 'clinch';
    const bothTakedown = p.animState === 'takedown' || o.animState === 'takedown';
    const bothSub = p.animState === 'submission' || o.animState === 'submission';

    if (!bothClinch && !bothTakedown && !bothSub) return;

    const dx = o.x - p.x;
    const dy = o.y - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 90) return;

    ctx.save();
    ctx.globalAlpha = 0.6;

    if (bothTakedown) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
    } else if (bothSub) {
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
    } else {
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 3]);
    }

    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(o.x, o.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const mx = (p.x + o.x) / 2;
    const my = (p.y + o.y) / 2;
    ctx.beginPath();
    ctx.arc(mx, my, 10, 0, Math.PI * 2);
    ctx.strokeStyle = bothTakedown ? '#a855f7' : (bothSub ? '#ec4899' : '#f97316');
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}
