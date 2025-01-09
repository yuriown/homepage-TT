document.getElementById('tagForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Função para calcular o dia anterior, levando em conta a segunda-feira
    function getPreviousDay() {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 é domingo, 1 é segunda, ..., 6 é sábado
        let previousDay;

        if (dayOfWeek === 1) {
            // Se for segunda-feira, subtrai 3 dias (sexta-feira anterior)
            previousDay = new Date(today.setDate(today.getDate() - 3));
        } else {
            // Caso contrário, subtrai 1 dia
            previousDay = new Date(today.setDate(today.getDate() - 1));
        }

        // Formatar a data no formato dd/mm/yyyy
        const day = String(previousDay.getDate()).padStart(2, '0');
        const month = String(previousDay.getMonth() + 1).padStart(2, '0'); // Os meses começam em 0
        const year = previousDay.getFullYear();

        return `${day}/${month}/${year}`;
    }

    // Obtendo os valores dos inputs
    const malha = document.getElementById('malha').value;
    const malhaCadastros = document.getElementById('malhaCadastros').value;
    
    const campanha = document.getElementById('campanha').value;
    const campanhaCadastros = document.getElementById('campanhaCadastros').value;

    const termo = document.getElementById('termo').value;
    const termoCadastros = document.getElementById('termoCadastros').value;

    const abracadeiras = document.getElementById('abracadeiras').value;
    const abracadeirasCadastros = document.getElementById('abracadeirasCadastros').value;

    const gads = document.getElementById('gads').value;
    const gadsCadastros = document.getElementById('gadsCadastros').value;

    // Calculando o dia anterior
    const previousDay = getPreviousDay();

    // Gerando o texto formatado com emojis
    let outputText = `📊 Aqui estão os números de leads do dia ${previousDay}:
    - Malha: ${malha}  (Cadastros: ${malhaCadastros} 📝)
    - Campanha: ${campanha}  (Cadastros: ${campanhaCadastros} 📝)
    - Termo: ${termo}  (Cadastros: ${termoCadastros} 📝)
    - Abraçadeiras: ${abracadeiras}  (Cadastros: ${abracadeirasCadastros} 📝)
    - Click do Gads: ${gads}  (Cadastros: ${gadsCadastros} 📝)`;

    // Exibindo o resultado no div 'output'
    let output = document.getElementById('output')
    
    output.style.display = 'block';
    output.innerText = outputText;

    // Copiando o texto para a área de transferência
    navigator.clipboard.writeText(outputText)
        .then(() => {
            // Exibindo a mensagem de que o texto foi copiado
            const feedback = document.getElementById('feedback');
            feedback.style.display = 'block';
            feedback.innerText = 'Texto copiado para a área de transferência!';

            // Ocultar a mensagem após 3 segundos
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 3000);
        })
        .catch(err => {
            console.error('Erro ao copiar texto: ', err);
        });
});
