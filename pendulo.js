const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let angleVelocity = 0.5; // velocidade angular inicial (ajuste conforme necessário)
const gravity = 0.4; // força da gravidade
const maxAngle = Math.PI / 4; // ângulo máximo permitido

function update() {
    // Calcular a aceleração
    let angleAcceleration = (-1 * gravity / length) * Math.sin(angle);
    
    // Atualizar a velocidade angular
    angleVelocity += angleAcceleration;

    // Atualizar o ângulo
    angle += angleVelocity;

    // Restringir o movimento do ângulo
    if (angle > maxAngle) {
        angle = maxAngle;
        angleVelocity *= -1; // inverte a velocidade
    } else if (angle < -maxAngle) {
        angle = -maxAngle;
        angleVelocity *= -1; // inverte a velocidade
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
