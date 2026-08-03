// MMA GOAT - Octagon Arena Geometry & Canvas Bounds Manager

export class ArenaManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.width = canvas ? canvas.width : 600;
    this.height = canvas ? canvas.height : 400;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = Math.min(this.width, this.height) * 0.42;

    this.vertices = [];
    this.calculateVertices();
  }

  resize(width, height) {
    if (!this.canvas) return;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;

    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = Math.min(this.width, this.height) * 0.42;
    this.calculateVertices();
  }

  calculateVertices() {
    this.vertices = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i - Math.PI / 8;
      const vx = this.centerX + Math.cos(angle) * this.radius;
      const vy = this.centerY + Math.sin(angle) * this.radius;
      this.vertices.push({ x: vx, y: vy });
    }
  }

  // Constrain position to stay strictly inside the Octagon boundary with padding
  clampToOctagon(x, y, padding = 18) {
    const effectiveRadius = this.radius - padding;

    // Check 8 outer segment planes
    let clampedX = x;
    let clampedY = y;

    const dx = clampedX - this.centerX;
    const dy = clampedY - this.centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > effectiveRadius && dist > 0) {
      const ratio = effectiveRadius / dist;
      clampedX = this.centerX + dx * ratio;
      clampedY = this.centerY + dy * ratio;
    }

    return { x: clampedX, y: clampedY };
  }

  draw(ctx) {
    const c = ctx || this.ctx;
    if (!c) return;

    // 1. Arena Background Shadow
    c.save();
    c.fillStyle = '#0f172a';
    c.fillRect(0, 0, this.width, this.height);

    // Outer Octagon Glow
    c.shadowColor = '#06b6d4';
    c.shadowBlur = 15;

    // 2. Draw Octagon Canvas Mat Floor
    c.beginPath();
    this.vertices.forEach((v, i) => {
      if (i === 0) c.moveTo(v.x, v.y);
      else c.lineTo(v.x, v.y);
    });
    c.closePath();
    
    // Mat gradient
    const matGrad = c.createRadialGradient(this.centerX, this.centerY, 10, this.centerX, this.centerY, this.radius);
    matGrad.addColorStop(0, '#1e293b');
    matGrad.addColorStop(1, '#0f172a');
    c.fillStyle = matGrad;
    c.fill();

    // 3. Octagon Boundary Cage Line
    c.shadowBlur = 0;
    c.strokeStyle = '#38bdf8';
    c.lineWidth = 4;
    c.stroke();

    // 4. Inner Octagon Line (Safety Zone)
    c.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 4) * i - Math.PI / 8;
      const vx = this.centerX + Math.cos(angle) * (this.radius * 0.88);
      const vy = this.centerY + Math.sin(angle) * (this.radius * 0.88);
      if (i === 0) c.moveTo(vx, vy);
      else c.lineTo(vx, vy);
    }
    c.closePath();
    c.strokeStyle = 'rgba(234, 179, 8, 0.3)';
    c.lineWidth = 1.5;
    c.stroke();

    // 5. Center Circle
    c.beginPath();
    c.arc(this.centerX, this.centerY, this.radius * 0.28, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    c.lineWidth = 2;
    c.stroke();

    // Center Logo Text
    c.font = '900 12px sans-serif';
    c.fillStyle = 'rgba(255, 255, 255, 0.12)';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('MMA GOAT', this.centerX, this.centerY);

    // 6. Cage Posts at Octagon Vertices
    this.vertices.forEach(v => {
      c.beginPath();
      c.arc(v.x, v.y, 5, 0, Math.PI * 2);
      c.fillStyle = '#64748b';
      c.fill();
      c.strokeStyle = '#38bdf8';
      c.lineWidth = 1.5;
      c.stroke();
    });

    c.restore();
  }
}
