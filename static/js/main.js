document.addEventListener('DOMContentLoaded', function() {
    const promptTextarea = document.getElementById('prompt');
    const generateBtn = document.getElementById('generate-btn');
    const loadingIndicator = document.getElementById('loading');
    const chatContainer = document.getElementById('chat-container');
    const clearChatBtn = document.getElementById('clear-chat-btn');

    // Function to add a message to the chat container
    function addMessageToChat(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'assistant-message'}`;
        
        const messageHeader = document.createElement('div');
        messageHeader.className = 'message-header';
        messageHeader.innerHTML = `<i class="${isUser ? 'fas fa-user' : 'fas fa-robot'} me-2"></i><strong>${isUser ? 'Siz' : 'Asistan'}</strong>`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = content.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(messageHeader);
        messageDiv.appendChild(messageContent);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to send the request to the API
    async function generateResponse() {
        const prompt = promptTextarea.value.trim();
        
        if (!prompt) {
            alert('Lütfen bir soru yazın');
            return;
        }
        
        // Add user message to chat
        addMessageToChat(prompt, true);
        
        // Clear the textarea
        promptTextarea.value = '';
        
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Add assistant message to chat
                addMessageToChat(data.response);
            } else {
                // Show error
                alert('Hata: ' + (data.error || 'Bilinmeyen bir hata oluştu'));
            }
        } catch (error) {
            alert('Bağlantı hatası: ' + error.message);
        } finally {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
        }
    }
    
    // Function to clear the chat
    async function clearChat() {
        if (confirm('Sohbet geçmişini temizlemek istediğinize emin misiniz?')) {
            try {
                const response = await fetch('/clear_chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Clear the chat container
                    chatContainer.innerHTML = '';
                } else {
                    alert('Sohbet geçmişi temizlenirken bir hata oluştu.');
                }
            } catch (error) {
                alert('Bağlantı hatası: ' + error.message);
            }
        }
    }
    
    // Add event listener to the generate button
    generateBtn.addEventListener('click', generateResponse);
    
    // Add event listener to the clear chat button
    clearChatBtn.addEventListener('click', clearChat);
    
    // Add event listener for Shift+Enter in the textarea
    promptTextarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            generateResponse();
        }
    });
    
    // Auto-focus the textarea
    promptTextarea.focus();
    
    // Auto-resize textarea based on content
    promptTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}); 