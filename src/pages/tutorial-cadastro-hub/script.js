let currentStep = 1;

document.getElementById("animate_confetti").addEventListener("click", () => {

	let params = {
		particleCount: 500, // Quantidade de confetes
		spread: 90, // O quanto eles se espalham
		startVelocity: 70, // Velocidade inicial
		origin: { x: 0, y: 0.5 }, // Posição inicial na tela
		angle: 45 // Ângulo em que os confetes serão lançados
	};

	// Joga confetes da esquerda pra direita
	confetti(params);

	// Joga confetes da direita para a esquerda
	params.origin.x = 1;
	params.angle = 135;
	confetti(params);

});

function nextStep() {
    const current = document.getElementById(`step${currentStep}`);
    const next = document.getElementById(`step${currentStep + 1}`);

    if (next) {
        current.style.display = 'none';
        next.style.display = 'block';
        currentStep++;
    }
}

function backStep() {
    const current = document.getElementById(`step${currentStep}`);
    const back = document.getElementById(`step${currentStep - 1}`);

    if (back) {
        current.style.display = 'none';
        back.style.display = 'block';
        currentStep--;
    }
}

function finishTutorial() {
    alert('Parabéns! Você concluiu o tutorial de cadastro na HubSpot.');
    location.reload(); // Reinicia o tutorial
}

document.getElementById('backButton').addEventListener('click', () => {
    if (currentStep > 1) {
        const current = document.getElementById(`step${currentStep}`);
        const previous = document.getElementById(`step${currentStep - 1}`);

        if (previous) {
            current.style.display = 'none';
            previous.style.display = 'block';
            currentStep--;
        }
    } else {
        alert('Você está na primeira etapa!');
    }
});