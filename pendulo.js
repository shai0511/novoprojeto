const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let angleVelocity = 0; // velocidade angular
let angleAcceleration = 0; // aceleração angular
const damping = 0.99; // fator de amortecimento
const gravity = 0.4; // força da gravidade

function update() {
    // Cálculo da aceleração angular
    angleAcceleration = (-1 * gravity / length) * Math.sin(angle);
    angleVelocity += angleAcceleration;
    angleVelocity *= damping; // aplicar o fator de amortecimento
    angle += angleVelocity;
    // Atualizar amplitude, frequência e período
    amplitude = Math.abs(angle);
    frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length);
    period = 1 / frequency;

    draw();
    updateMeasurements();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpar o canvas
    ctx.fillStyle = 'black';

    // Calcular a posição do pêndulo
    const x = length * Math.sin(angle) + canvas.width / 2;
    const y = length * Math.cos(angle) + 50; // +50 para não sair do canvas

    // Desenhar o ponto de suspensão
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 50, 5, 0, Math.PI * 2);
    ctx.fill();

    // Desenhar o pêndulo
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 50);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Desenhar a bolinha do pêndulo
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Iniciar a animação
function animate() {
    update();
    requestAnimationFrame(animate);
}

// Iniciar a simulação quando a página carregar
window.onload = animate;