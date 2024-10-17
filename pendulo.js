const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let angleVelocity = 0.1; // velocidade angular inicial (pequeno valor para movimento contínuo)
const damping = 0.99; // fator de amortecimento
const gravity = 0.4; // força da gravidade
const maxAngle = Math.PI / 4; // ângulo máximo permitido

function update() {
    // Restringir o movimento do ângulo
    if (angle > maxAngle) angle = maxAngle;
    if (angle < -maxAngle) angle = -maxAngle;

    let angleAcceleration = (-1 * gravity / length) * Math.sin(angle);
    angleVelocity += angleAcceleration;
    angleVelocity *= damping; 

    angle += angleVelocity;

    // Garantir que o pêndulo não pare completamente
    if (Math.abs(angleVelocity) < 0.01) {
        angleVelocity *= 1.1; // Aumenta a velocidade um pouco para manter o movimento
    }

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
    document.getElementById('amplitude').textContent = (angle * 180 / Math.PI).toFixed(2) + '°';
    document.getElementById('frequencia').textContent = (1 / (2 * Math.PI) * Math.sqrt(gravity / length)).toFixed(2) + ' Hz';
    document.getElementById('periodo').textContent = (2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2) + ' s';
}

function animate() {
    update();
    requestAnimationFrame(animate);
}

window.onload = animate;
