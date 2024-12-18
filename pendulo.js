const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define as dimensões do canvas
canvas.width = 400; 
canvas.height = 300; 

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial (45 graus)
let angleVelocity = 0.05; // velocidade angular constante
const maxAngle = Math.PI / 4; // ângulo máximo permitido

// Centraliza o pêndulo
const pivotX = canvas.width / 2;
const pivotY = 50; // Altura do ponto de suspensão

function update() {
    angle += angleVelocity;

    // Inverter a direção se atingir os limites
    if (angle > maxAngle || angle < -maxAngle) {
        angleVelocity = -angleVelocity; // inverte a direção
    }

    draw();
    updateMeasurements();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';

    const x = length * Math.sin(angle) + pivotX; // posição x do pêndulo
    const y = length * Math.cos(angle) + pivotY; // posição y do pêndulo

    // Desenhar o ponto de suspensão
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2); // ponto fixo
    ctx.fill();

    // Desenhar a linha do pêndulo
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Desenhar a massa do pêndulo
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

function updateMeasurements() {
    document.getElementById('amplitude').textContent = (maxAngle * 180 / Math.PI).toFixed(2) + '°';
    document.getElementById('frequencia').textContent = (1 / (2 * Math.PI) * Math.sqrt(9.81 / length)).toFixed(2) + ' Hz';
    document.getElementById('periodo').textContent = (2 * Math.PI * Math.sqrt(length / 9.81)).toFixed(2) + ' s';
}

function animate() {
    update();
    requestAnimationFrame(animate);
}

window.onload = animate;
