document.getElementById("showMessageBtn").addEventListener("click", function() {
    const message = document.getElementById("message");
    message.classList.remove("hidden");
    setTimeout(() => {
        message.classList.add("visible");
    }, 100); // Delay para ativar o efeito de fade-in
});