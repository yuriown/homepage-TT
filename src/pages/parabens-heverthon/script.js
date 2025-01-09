document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("celebrate-btn");
    const message = document.getElementById("congrats-message");
    const hornSound = document.getElementById("horn-sound");
  
    button.addEventListener("click", () => {
      // Toca o som da corneta
      hornSound.volume = 1.0; // Volume máximo
      hornSound.play().catch((error) => {
        console.error("Erro ao tocar o som:", error);
        alert("Não foi possível reproduzir o som. Verifique se o arquivo horn.mp3 está no local correto.");
      });
  
      // Mostra a mensagem de parabéns
      message.classList.remove("hidden");
      message.style.display = "block";

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
  
      // Oculta a mensagem após 5 segundos
      setTimeout(() => {
        message.style.display = "none";
      }, 5000);
    });
  });
  
  

document.getElementById("animate_confetti").addEventListener("click", () => {

	

});

