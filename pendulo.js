const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let angleVelocity = 0; // velocidade angular inicial
let isDragging = false; // Controle se o pêndulo está sendo arrastado
let maxAngle = angle; // Armazena a amplitude máxima ao soltar

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
    if (!isDragging) {
        // Movimento Harmônico Simples
        angle += angleVelocity;

        // Se o pêndulo atingir o limite máximo, inverte a direção
        if (angle > maxAngle || angle < -maxAngle) {
            angleVelocity = -angleVelocity; // inverte a direção
        }
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
    const { frequency, period } = calculateFrequencyAndPeriod();
    document.getElementById('frequencia').textContent = frequency.toFixed(2) + ' Hz';
    document.getElementById('periodo').textContent = period.toFixed(2) + ' s';
}

// Eventos de mouse
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const x = length * Math.sin(angle) + pivotX;
    const y = length * Math.cos(angle) + pivotY;

    // Verifica se o clique foi na massa do pêndulo
    if (Math.hypot(mouseX - x, mouseY - y) < 10) {
        isDragging = true;
        angleVelocity = 0; // Para a oscilação ao arrastar
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calcula a nova posição do pêndulo com base no mouse
        const dx = mouseX - pivotX;
        const dy = mouseY - pivotY;

        // Define o ângulo baseado na posição do mouse
        angle = Math.atan2(dy, dx); // Define o ângulo baseado na posição do mouse

        // Atualiza a amplitude máxima
        maxAngle = Math.abs(angle);
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false; // Solta o pêndulo

    // Inicia o movimento com uma velocidade constante
    angleVelocity = 0.05; // Define uma velocidade constante para o MHS
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false; // Para garantir que o arraste pare ao sair do canvas
});

function animate() {
    update();
    requestAnimationFrame(animate);
}

animate();
