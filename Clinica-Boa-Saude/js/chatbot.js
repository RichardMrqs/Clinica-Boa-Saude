document.addEventListener('DOMContentLoaded', () => {
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotModal = document.getElementById('chatbotModal');

    // Mapeamento de perguntas e respostas simples
    const responses = {
        "ola": "Olá! Como posso te ajudar hoje?",
        "oi": "Oi! No que posso ser útil?",
        "agendamento": "Para agendar uma consulta, você pode clicar no botão 'Agendar Consulta' no menu superior ou ir diretamente na seção de agendamento. Precisa de ajuda com as datas?",
        "serviços": "Oferecemos Clínica Geral, Pediatria, Dermatologia, Cardiologia, Odontologia e Exames Laboratoriais. Qual serviço te interessa mais?",
        "contato": "Você pode nos ligar no (34) 99999-9999 ou enviar um e-mail para contato@clinicaboasaude.com.br. Nossa clínica fica na Rua Exemplo, 123 - Centro, Araguari - MG.",
        "medicos": "Nossa equipe inclui o Dr. João Silva (Clínico Geral), Dra. Ana Costa (Pediatra) e Dr. Carlos Mendes (Dermatologista). Gostaria de saber mais sobre algum deles?",
        "horario": "Nosso horário de funcionamento é de Segunda a Sexta, das 8h às 18h. Para agendamentos específicos, por favor, utilize o formulário de agendamento.",
        "localizacao": "Estamos localizados na Rua Exemplo, 123 - Centro, Araguari - MG. Você pode ver o mapa na seção de Contato.",
        "obrigado": "De nada! Se precisar de algo mais, é só chamar.",
        "tchau": "Até logo! Tenha um ótimo dia.",
        "default": "Desculpe, não entendi sua pergunta. Poderia reformular ou tentar algo como 'agendamento', 'serviços' ou 'contato'?"
    };

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', ${sender}-message);
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        // Rola para a última mensagem
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();
        for (const key in responses) {
            if (lowerCaseMessage.includes(key)) {
                return responses[key];
            }
        }
        return responses["default"];
    }

    function handleUserInput() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        addMessage(userMessage, 'user');
        chatbotInput.value = '';

        // Simula um pequeno atraso para a resposta do bot
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse, 'bot');
        }, 500); // 0.5 segundos de atraso
    }

    // Evento de clique no botão de enviar
    chatbotSendBtn.addEventListener('click', handleUserInput);

    // Evento de tecla Enter no input
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    // Ajusta a altura das mensagens do chatbot ao abrir o modal
    if (chatbotModal) {
        chatbotModal.addEventListener('shown.bs.modal', () => {
            const modalBody = chatbotModal.querySelector('.modal-body');
            const inputGroupHeight = chatbotInput.parentElement.offsetHeight; // Altura do input e botão
            // Altura total do body - altura do input group - algum padding extra
            chatbotMessages.style.maxHeight = ${modalBody.offsetHeight - inputGroupHeight - 30}px;
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Rola para baixo ao abrir
        });
    }
});