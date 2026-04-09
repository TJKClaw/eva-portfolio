/* ============================================
   EVA PORTFOLIO - Particle Effects
   ============================================ */
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 50;
    this.colors = ['#ff6b35', '#ff3366', '#ffcc00', '#ff8c42', '#ff4757'];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }
  resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
  init() { for (let i = 0; i < this.maxParticles; i++) this.particles.push(this.createParticle(true)); }
  createParticle(randomY = false) {
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : this.canvas.height + 10,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.8 + 0.2),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    };
  }
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.3;
      p.y += p.speedY;
      p.opacity -= 0.001;
      if (p.y < -10 || p.opacity <= 0) this.particles[i] = this.createParticle();
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }
  animate() { this.update(); this.draw(); requestAnimationFrame(() => this.animate()); }
}
document.addEventListener('DOMContentLoaded', () => { new ParticleSystem('particles-canvas'); });
