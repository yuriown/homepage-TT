function mostrarOpcoes() {
    const setores = Array.from(document.getElementById("setor").selectedOptions).map(option => option.value);
    const opcoes = document.getElementById("opcoes");
    const opcoesAdicionais = document.getElementById("opcoesAdicionais");
    const inputEmails = document.getElementById("inputEmails");
    const inputEntrega = document.getElementById("inputEntrega");
    const inputHorario = document.getElementById("inputHorario");

    opcoes.innerHTML = ""; // Limpa as opções anteriores
    inputEmails.innerHTML = ""; // Limpa os campos de e-mails anteriores
    inputEmails.classList.add("hidden"); // Esconde os campos de e-mails adicionais
    inputEntrega.innerHTML = ""; // Limpa os campos de entregas anteriores
    inputEntrega.classList.add("hidden"); // Esconde os campos de entregas adicionais
    inputHorario.innerHTML = ""; // Limpa os campos de horários anteriores
    inputHorario.classList.add("hidden"); // Esconde os campos de horários adicionais

    const frases = {
        COMERCIAL: [
            "Cliente isento",
            "de ICMS - Pró emprego",
            "Entrega da mercadoria:",
            "Horário de recebimento",
            "Informar nas OBS da NF - Nº do pedido",
            "Informar nas OBS da NF - Nº do item",
            "Informar nas OBS interna do pedido",
            "Natureza Operação"
        ],
        FISCAL: [
            "Ao faturar a NF solicitar que o setor de transporte agende a entrega",
            "Após a emissão da NF pedir o código PIN do site da Suframa e solicitar o cliente por e-mail a liberação do PIN",
            "Após a emissão da NF, solicitar ao financeiro o boleto e NF para anexar junto da mercadoria",
            "Após a emissão da NF, solicitar ao financeiro IMEDIATAMENTE o pagamento da guia do DIFAL",
            "Emitir carta de correção informando o número do PIN",
            "Entregar para logística o formulário do PIN e Carta de correção para anexar a NF e seguir com o despacho",
            "Enviar NF e XML em ambos e-mails: ",
            "Enviar BOLETOS em ambos e-mails: ",
            "Enviar BOLETOS no WhatsApp",
            "Considerar o calculo do IPI sem desconto",
            "Inserir o código nos dados ADC na NF (com exceção de amostra grátis)",
            "Inserir o código no XML; (com exceção de amostra grátis)",
            "Inserir o número do Item no XML (com exceção de amostra grátis)",
            "Inserir o número da Ordem de Compra no XML (com exceção de amostra grátis)"
        ],
        COMERCIAL_FISCAL: [
            "Após a emissão da NF, solicitar para qualidade emitir o certificado dos produtos",
            "Após a emissão da NF, solicitar para qualidade emitir o certificado dos produtos e enviar para os seguintes EMAIL's",
            "Cliente possui isenção de IPI",
            "Cliente possui REIDI (Pis/Cofins)",
            "Cliente possui isenção de ICMS",
            "Declaração Isenção IPI - (Vencimento)",
            "Informar nas OBS da NF o nº do item + SKU interno"
        ]
    };

    setores.forEach(setor => {
        if (frases[setor]) {
            frases[setor].forEach(frase => {
                opcoes.innerHTML += `<option value="${frase}">${frase}</option>`;
            });
        }
    });

    opcoesAdicionais.classList.remove("hidden");
}

document.getElementById("opcoes").addEventListener("change", function () {
    const selectElement = this;
    const scrollTop = selectElement.scrollTop; // Salvar a posição atual da rolagem

    const selectedOptions = Array.from(this.selectedOptions).map(option => option.value);
    const inputEmails = document.getElementById("inputEmails");
    const inputEntrega = document.getElementById("inputEntrega");
    const inputHorario = document.getElementById("inputHorario");

    inputEmails.innerHTML = ""; // Limpa os campos de e-mails anteriores
    inputEntrega.innerHTML = ""; // Limpa os campos de entrega anteriores
    inputHorario.innerHTML = ""; // Limpa os campos de horário anteriores
    let countEmails = 0;
    let countEntrega = 0;
    let countHorario = 0;

    selectedOptions.forEach((option, index) => {
        if (option.includes("e-mails")) {
            countEmails++;
            inputEmails.innerHTML += `<label for="emailExtra${countEmails}">Insira os e-mails adicionais (${countEmails}):</label><input type="text" id="emailExtra${countEmails}" placeholder="Digite os e-mails separados por um +"><br>`;
        }
        if (option.includes("Entrega")) {
            countEntrega++;
            inputEntrega.innerHTML += `<label for="entregaExtra${countEntrega}">Insira o endereço de entrega (${countEntrega}):</label><input type="text" id="entregaExtra${countEntrega}" placeholder="Digite o endereço de entrega"><br>`;
        }
        if (option.includes("Horário")) {
            countHorario++;
            inputHorario.innerHTML += `<label for="horárioExtra${countHorario}">Insira o horário de entrega (${countHorario}):</label><input type="text" id="horarioExtra${countHorario}" placeholder="Digite o horário de entrega"><br>`;
        }
    });

    inputEmails.classList.toggle("hidden", countEmails === 0);
    inputEntrega.classList.toggle("hidden", countEntrega === 0);
    inputHorario.classList.toggle("hidden", countHorario === 0);

    // Adicionar atraso para ajuste de rolagem
    setTimeout(() => {
        selectElement.scrollTop = scrollTop;
    }, 0);
});

function gerarTexto() {
    const nome = document.getElementById("nome").value || "Yuri";
    const setoresSelecionados = Array.from(document.getElementById("setor").selectedOptions).map(option => option.value);
    const frasesSelecionadas = Array.from(document.getElementById("opcoes").selectedOptions).map(option => option.value);
    const resultado = document.getElementById("resultado");
    const mensagemCopia = document.getElementById("mensagemCopia");

    let textoGerado = `<div style="display:block;padding:20px;background:red; color:white;font-weight:bold;">
<span style="color:yellow;">**** ATENÇÃO ****</span>
<br><br>
ATUALIZADO EM: ${new Date().toLocaleDateString('pt-BR')} por: ${nome}
<br><br>`;

    // Armazenar frases por setor
    const frasesPorSetor = {
        COMERCIAL: [],
        FISCAL: [],
        COMERCIAL_FISCAL: []
    };

    frasesSelecionadas.forEach((frase, index) => {
        let emailExtra = "";
        let entregaExtra = "";
        let horarioExtra = "";

        if (frase.includes("e-mails")) {
            const emailInput = document.getElementById(`emailExtra${index + 1}`);
            emailExtra = emailInput ? emailInput.value : "";
        }
        if (frase.includes("Entrega")) {
            const entregaInput = document.getElementById(`entregaExtra${index + 1}`);
            entregaExtra = entregaInput ? entregaInput.value : "";
        }
        if (frase.includes("Horário")) {
            const horarioInput = document.getElementById(`horarioExtra${index + 1}`);
            horarioExtra = horarioInput ? horarioInput.value : "";
        }

        // Adiciona ao setor correto
        if (setoresSelecionados.includes("COMERCIAL") && frase.includes("Entrega")) {
            frasesPorSetor.COMERCIAL.push(`- ${frase} ${entregaExtra}<br>\n`);
        } else if (setoresSelecionados.includes("COMERCIAL") && frase.includes("Horário")) {
            frasesPorSetor.COMERCIAL.push(`- ${frase} ${horarioExtra}<br>\n`);
        } else if (setoresSelecionados.includes("FISCAL") && frase.includes("e-mails")) {
            frasesPorSetor.FISCAL.push(`- ${frase} ${emailExtra}<br>\n`);
        } else if (setoresSelecionados.includes("COMERCIAL_FISCAL")) {
            frasesPorSetor.COMERCIAL_FISCAL.push(`- ${frase}<br>\n`);
        } else {
            // Frases gerais sem necessidade de campos adicionais
            if (setoresSelecionados.includes("COMERCIAL")) {
                frasesPorSetor.COMERCIAL.push(`- ${frase}<br>\n`);
            }
            if (setoresSelecionados.includes("FISCAL")) {
                frasesPorSetor.FISCAL.push(`- ${frase}<br>\n`);
            }
            if (setoresSelecionados.includes("COMERCIAL_FISCAL")) {
                frasesPorSetor.COMERCIAL_FISCAL.push(`- ${frase}<br>\n`);
            }
        }
    });

    // Gerar texto para cada setor
    if (frasesPorSetor.COMERCIAL.length > 0) {
        textoGerado += `\n**SETOR COMERCIAL**\n<br>\n`;
        frasesPorSetor.COMERCIAL.forEach(frase => {
            textoGerado += frase;
        });
        textoGerado += `<br>`;
    }

    if (frasesPorSetor.FISCAL.length > 0) {
        textoGerado += `\n**SETOR FISCAL**\n<br>\n`;
        frasesPorSetor.FISCAL.forEach(frase => {
            textoGerado += frase;
        });
        textoGerado += `<br>`;
    }

    if (frasesPorSetor.COMERCIAL_FISCAL.length > 0) {
        textoGerado += `\n**SETOR COMERCIAL + FISCAL**\n<br>\n`;
        frasesPorSetor.COMERCIAL_FISCAL.forEach(frase => {
            textoGerado += frase;
        });
        textoGerado += `<br>\n`;
    }

    textoGerado += `\n</div>`.trim();

    // Exibe o texto gerado
    resultado.innerHTML = textoGerado;
    resultado.classList.remove("hidden");

    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(textoGerado).then(() => {
        mensagemCopia.textContent = "Texto copiado para a área de transferência!";
        mensagemCopia.classList.remove("hidden");
    }).catch(err => {
        console.error("Falha ao copiar o texto: ", err);
    });
}

// Adicione os manipuladores de eventos para permitir múltiplas seleções com cliques
document.addEventListener('DOMContentLoaded', function () {
    const multiSelectElements = document.querySelectorAll('select[multiple]');

    multiSelectElements.forEach(function(select) {
        select.addEventListener('mousedown', function(e) {
            e.preventDefault(); // Evita o comportamento padrão de seleção
            const option = e.target;
            if (option.tagName === 'OPTION') {
                option.selected = !option.selected; // Alterna a seleção
                // Dispara o evento 'change' para que os listeners sejam acionados
                const event = new Event('change');
                select.dispatchEvent(event);
            }
        });
    });
});
