const barra = 1220; // Tamanho da barra

function qtdDePecaPorBarra(barra, peca) {
    let resultado = barra / peca;
    let resultadoDivisao = 1 / Math.floor(resultado);
    return resultadoDivisao.toFixed(4);
}

document.querySelector('.send-btn').addEventListener('click', function() {
    const inputPeca = document.getElementById('input').value;
    
    if (inputPeca && !isNaN(inputPeca)) {
        const peca = parseFloat(inputPeca);
        const resultado = qtdDePecaPorBarra(barra, peca);
        document.querySelector('.result-data').textContent = `Resultado: ${resultado}m`;
    } else {
        document.querySelector('.result-data').textContent = 'Por favor, insira um número válido.';
    }
});