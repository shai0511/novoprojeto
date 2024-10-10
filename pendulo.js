const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 5; // ângulo inicial
let angleVelocity = 1.0; // velocidade angular
let angleAcceleration = 0.5; // aceleração angular
const damping = 1.0; // fator de amortecimento
const gravity = 0.9; // força da gravidade

// Variáveis para frequência e período
let amplitude = Math.sin(angle);
let frequency = 0;
let period = 0;

function update() {
    angleAcceleration = (-1 * gravity / length) * Math.sin(angle);
    angleVelocity += angleAcceleration;
    angleVelocity *= damping; 
    angle += angleVelocity;

    // Atualizar amplitude, frequência e período
    amplitude = Math.sin(angle);
    frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length);
    period = 1 / frequency;

    draw();
    updateMeasurements();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    const x = length * Math.sin(angle) + canvas.width / 2;
    const y = length * Math.cos(angle) + 50;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, 50, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 50);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function updateMeasurements() {
    document.getElementById('amplitude').textContent = amplitude.toFixed(2) + ' rad';
    document.getElementById('frequencia').textContent = frequency.toFixed(2) + ' Hz';
    document.getElementById('periodo').textContent = period.toFixed(2) + ' s';
}

function animate() {
    update();
    requestAnimationFrame(animate);
}

window.onload = animate;