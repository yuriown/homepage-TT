// função para alternar o campo de largura extra
function toggleLarguraExtra() {
    const larguraExtraInput = document.getElementById("larguraExtra");
    larguraExtraInput.classList.toggle("show");
}

// função para alternar o campo de altura extra
function toggleAlturaExtra() {
    const alturaExtraInput = document.getElementById("alturaExtra");
    alturaExtraInput.classList.toggle("show");
}

// função para calcular o diâmetro do termoretrátil para Barramento
function calcularBarramento() {
    const largura = parseFloat(document.getElementById("largura").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const curva90 = document.getElementById("curva90").checked;

    // verificar se largura ou altura extra foram fornecidos
    const larguraExtra = document.getElementById("larguraDiferente").checked ? parseFloat(document.getElementById("larguraExtra").value) : largura;
    const alturaExtra = document.getElementById("alturaDiferente").checked ? parseFloat(document.getElementById("alturaExtra").value) : altura;

    if (!largura || !altura || (document.getElementById("larguraDiferente").checked && !larguraExtra) || (document.getElementById("alturaDiferente").checked && !alturaExtra)) {
        alert("Por favor, insira valores válidos para largura e altura.");
        return;
    }

    // cálculo do diâmetro usando divisão
    let diametro = (largura + larguraExtra + altura + alturaExtra) / 3.14;

    // se o barramento tiver curva de 90 graus, divide o diâmetro por 1.57
    if (curva90) {
        diametro *= 1.57;
    }

    document.getElementById("resultadoBarramento").innerText = "Diâmetro do Termoretrátil: " + diametro.toFixed(2) + " mm";
}

// função para calcular o diâmetro do termoretrátil para Valor Achatado
function calcularValorAchatado() {
    const valorAchatado = parseFloat(document.getElementById("valorAchatado").value);

    if (!valorAchatado) {
        alert("Por favor, insira um valor válido para o valor achatado.");
        return;
    }

    // cálculo do diâmetro usando divisão
    const diametro = valorAchatado / 1.57;
    document.getElementById("resultadoValorAchatado").innerText = "Diâmetro do Termoretrátil: " + diametro.toFixed(2) + " mm";
}
