const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let angleVelocity = 0.02; // velocidade angular
const maxAngle = Math.PI / 4; // ângulo máximo permitido

// Centraliza o pêndulo
const pivotX = canvas.width / 2;
const pivotY = 50; // Altura do ponto de suspensão

// Calcula a frequência e o período
function calculateFrequencyAndPeriod() {
    const gravity = 9.81;
    const frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length);
    const period = 2 * Math.PI * Math.sqrt(length / gravity);
    return { frequency, period };
}

// Função de animação
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
    document.getElementById('amplitude').textContent = (angle * 180 / Math.PI).toFixed(2) + '°';
    const { frequency, period } = calculateFrequencyAndPeriod();
    document.getElementById('frequencia').textContent = frequency.toFixed(2) + ' Hz';
    document.getElementById('periodo').textContent = period.toFixed(2) + ' s';
}

// Animação contínua
function animate() {
    update();
    requestAnimationFrame(animate);
}

animate();
