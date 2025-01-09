document.getElementById('excelForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o envio do formulário

    const rawExcelInput = document.getElementById('raw-excel');
    const outputFileName = document.getElementById('modified-excel').value;

    if (rawExcelInput.files.length === 0) {
        alert('Por favor, selecione um arquivo Excel.');
        return;
    }

    const inputFile = rawExcelInput.files[0];

    const hierarchy = [
        '1.2 - Cliente não atende/não retorna',
        '1.2 - Adiou Compra/Licitação/Projeto',
        '1.2 - CNPJ Baixado',
        '1.2 - Pedido duplicado ou erro interno',
        '1.2 - Revenda não fechou',
        '1.2 - Fechou com concorrente',
        '1.2 - Amostra não aprovada',
        '1.2 - Direcionado ao ecommerce',
        '1.2 - Fechado em outra proposta',
        '1.2 - Golpe',
        '1.2 - Marca do produto',
        '1.2 - Licitação perdida',
        '1.2 - Projeto Cancelado',
        '1.2 - Registro de Tabela de preço para cliente',
        '1.2 - Tentativa de venda',
        '1.2 - Forma de pagamento',
        '1.2 - Valor do frete',
        '1.2 - Prazo de pagamento',
        '1.2 - Prazo de entrega (transportadora)',
        '1.2 - Prazo de entrega (importação)',
        '1.2 - Pendência Financeira',
        '1.2 - Imposto (ICMS)',
        '1.2 - Preço',
        '1.2 - Sem estoque'
    ];

    async function processExcel(inputFile, outputFileName) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(await inputFile.arrayBuffer());

        const worksheet = workbook.worksheets[0];

        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                if (cell.value && cell.value.toString().toLowerCase() === 'cobrado') {
                    cell.value = null; // Remove o conteúdo da célula
                }
            });
        });

        function getHighestPriorityPhrase(text) {
            let highestPriorityPhrase = null;
            for (const phrase of hierarchy) {
                if (text.includes(phrase)) {
                    highestPriorityPhrase = phrase; // Atualiza para a frase com maior prioridade encontrada
                }
            }
            return highestPriorityPhrase;
        }

        worksheet.eachRow({ includeEmpty: true }, (row) => {
            row.eachCell({ includeEmpty: true }, (cell) => {
                if (cell.value && typeof cell.value === 'string') {
                    const highestPriorityPhrase = getHighestPriorityPhrase(cell.value);
                    if (highestPriorityPhrase) {
                        cell.value = highestPriorityPhrase;
                    }
                }
            });
        });

        const modifiedExcelBuffer = await workbook.xlsx.writeBuffer();

        const blob = new Blob([modifiedExcelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = outputFileName;
        link.click();
    }

    processExcel(inputFile, outputFileName)
        .catch(err => console.error(err));
});
