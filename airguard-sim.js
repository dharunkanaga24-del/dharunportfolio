/**
 * AirGuard — Real-Time Sensor Simulation & Live Visualizer
 * Simulates real-time telemetry from MQ135, DHT11, and optical dust sensors
 * Plots dynamic canvas waveform with glowing gradients
 */

(function initAirGuardSimulator() {
  const canvas = document.getElementById('airguard-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Data history buffer (60 points)
  const maxPoints = 50;
  const history = [];
  let baseAQI = 42;
  let targetAQI = 42;
  let currentAQI = 42;

  // Initialize history
  for (let i = 0; i < maxPoints; i++) {
    history.push(baseAQI + (Math.random() * 4 - 2));
  }

  // DOM Elements
  const aqiValEl = document.getElementById('sim-aqi-val');
  const aqiStatusEl = document.getElementById('sim-aqi-status');
  const pm25El = document.getElementById('sim-pm25-val');
  const pm10El = document.getElementById('sim-pm10-val');
  const co2El = document.getElementById('sim-co2-val');
  const tempEl = document.getElementById('sim-temp-val');
  const testSpikeBtn = document.getElementById('sim-test-spike');

  let isSpike = false;
  let spikeTimeout = null;

  if (testSpikeBtn) {
    testSpikeBtn.addEventListener('click', () => {
      if (isSpike) return;
      isSpike = true;
      targetAQI = 112; // Spike to moderate / alert
      testSpikeBtn.textContent = 'Spike Triggered...';
      testSpikeBtn.style.background = '#BC0202';

      clearTimeout(spikeTimeout);
      spikeTimeout = setTimeout(() => {
        targetAQI = 42;
        isSpike = false;
        testSpikeBtn.textContent = 'Simulate Spike';
        testSpikeBtn.style.background = '';
      }, 5000);
    });
  }

  // Telemetry loop every 1.2s
  setInterval(() => {
    // Smooth step toward target AQI
    if (Math.abs(currentAQI - targetAQI) > 1) {
      currentAQI += (targetAQI - currentAQI) * 0.25;
    } else {
      currentAQI = targetAQI + (Math.random() * 5 - 2.5);
    }

    const roundedAQI = Math.round(currentAQI);
    history.push(currentAQI);
    if (history.length > maxPoints) history.shift();

    // Update UI Metrics
    if (aqiValEl) aqiValEl.textContent = roundedAQI;
    if (pm25El) pm25El.textContent = (roundedAQI * 0.28).toFixed(1);
    if (pm10El) pm10El.textContent = (roundedAQI * 0.54).toFixed(1);
    if (co2El) co2El.textContent = Math.round(390 + roundedAQI * 1.8);
    if (tempEl) tempEl.textContent = (26.2 + (Math.random() * 0.4 - 0.2)).toFixed(1) + '°C';

    if (aqiStatusEl) {
      if (roundedAQI <= 50) {
        aqiStatusEl.textContent = 'Good (Safe)';
        aqiStatusEl.style.color = '#4EFA94';
      } else if (roundedAQI <= 100) {
        aqiStatusEl.textContent = 'Moderate';
        aqiStatusEl.style.color = '#FFCC00';
      } else {
        aqiStatusEl.textContent = 'Unhealthy Alert';
        aqiStatusEl.style.color = '#FF0000';
      }
    }
  }, 1200);

  // Render waveform loop
  let animationFrame;
  function draw() {
    animationFrame = requestAnimationFrame(draw);
    if (!width || !height) return;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(188, 2, 2, 0.12)';
    ctx.lineWidth = 1;
    const gridStepY = height / 4;
    for (let y = gridStepY; y < height; y += gridStepY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Chart curve
    if (history.length < 2) return;

    const stepX = width / (maxPoints - 1);
    const minVal = 20;
    const maxVal = 140;

    ctx.beginPath();
    history.forEach((val, i) => {
      const x = i * stepX;
      const normalized = (val - minVal) / (maxVal - minVal);
      const y = height - (normalized * (height - 24) + 12);
      if (i === 0) ctx.moveTo(x, y);
      else {
        const prevX = (i - 1) * stepX;
        const prevNorm = (history[i - 1] - minVal) / (maxVal - minVal);
        const prevY = height - (prevNorm * (height - 24) + 12);
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });

    // Stroke line
    ctx.strokeStyle = isSpike ? '#FF0000' : '#BC0202';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = isSpike ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 0, 0, 0.45)';
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Gradient fill beneath line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, isSpike ? 'rgba(255, 0, 0, 0.35)' : 'rgba(188, 2, 2, 0.22)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Pulse dot at the latest point
    const lastX = (history.length - 1) * stepX;
    const lastNorm = (history[history.length - 1] - minVal) / (maxVal - minVal);
    const lastY = height - (lastNorm * (height - 24) + 12);

    ctx.beginPath();
    ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  draw();
})();

