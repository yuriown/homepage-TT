// Função para processar o texto
function processText() {
    // Obtém o valor do textarea de entrada
    const inputText = document.getElementById('inputText').value;
    
    // Obtém o valor do campo de nome
    const userName = document.getElementById('userName').value.trim() || 'Yuri'; // Usa 'Yuri' se o campo estiver vazio
    
    // Obtém a data atual
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    // Formata a data no formato DD/MM/AAAA
    const formattedDate = `${day}/${month}/${year}`;
    
    // Cria o texto inicial com uma linha em branco após o headerText 
    const headerText = `<br><b>Data última Atualização: </b>${formattedDate}<br>\n<b> Cadastrado por:</b> ${userName}<b><br>\n\n`;
    
    // Divide o texto em linhas
    const lines = inputText.split('\n');
    
    // Remove linhas em branco e adiciona uma quebra de linha ao final de cada linha
    const processedLines = lines
        .filter(line => line.trim() !== '')
        .map(line => line.trim())
        .map(line => line.trim() + '<br>')
        .join('\n');
    
    // Junta as linhas processadas com o headerText
    const outputText = headerText + processedLines;
    
    // Define o conteúdo do textarea de saída
    const outputTextarea = document.getElementById('outputText');
    outputTextarea.value = outputText; // Define o valor do textarea
    
    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(outputText).then(() => {
        // Atualiza a mensagem de status
        document.getElementById('statusMessage').innerText = 'Texto copiado para a área de transferência!';
    }).catch(err => {
        console.error('Erro ao copiar o texto: ', err);
        // Atualiza a mensagem de status em caso de erro
        document.getElementById('statusMessage').innerText = 'Erro ao copiar o texto.';
    });
}

// Adiciona um ouvinte para o pressionamento de tecla
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita comportamento padrão do Enter
        processText(); // Chama a função de processamento
    }
});
