const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const length = 150; // comprimento do pêndulo
let angle = Math.PI / 4; // ângulo inicial
let isDragging = false; // Controle se o pêndulo está sendo arrastado
const maxAngle = Math.PI / 4; // ângulo máximo permitido

// Centraliza o pêndulo
const pivotX = canvas.width / 2;
const pivotY = 50; // Altura do ponto de suspensão

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Verifica se o clique foi na massa do pêndulo
    const x = length * Math.sin(angle) + pivotX;
    const y = length * Math.cos(angle) + pivotY;
    if (Math.hypot(mouseX - x, mouseY - y) < 10) {
        isDragging = true;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calcula o novo ângulo baseado na posição do mouse
        angle = Math.atan2(mouseY - pivotY, mouseX - pivotX);

        // Limita o ângulo à amplitude máxima
        if (angle > maxAngle) angle = maxAngle;
        if (angle < -maxAngle) angle = -maxAngle;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false; // Para garantir que o arraste pare ao sair do canvas
});

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

    // Atualiza a amplitude
    document.getElementById('amplitude').textContent = (angle * 180 / Math.PI).toFixed(2) + '°';
}

// Animação contínua
function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();
