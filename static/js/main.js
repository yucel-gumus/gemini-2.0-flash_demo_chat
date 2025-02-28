document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt');
    const responseContainer = document.getElementById('response-container');
    const responseContent = document.getElementById('response-content');
    const loadingIndicator = document.getElementById('loading');

    generateBtn.addEventListener('click', async function() {
        const prompt = promptInput.value.trim();
        
        if (!prompt) {
            alert('Lütfen bir soru veya konu girin');
            return;
        }

        // Yükleme göstergesini göster
        loadingIndicator.style.display = 'block';
        responseContainer.style.display = 'none';
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const data = await response.json();
            
            // Yükleme göstergesini gizle
            loadingIndicator.style.display = 'none';
            
            if (data.error) {
                responseContent.textContent = `Hata: ${data.error}`;
            } else {
                // Markdown formatını HTML'e dönüştür (basit bir yaklaşım)
                const formattedResponse = formatResponse(data.response);
                responseContent.innerHTML = formattedResponse;
            }
            
            // Yanıt konteynerini göster
            responseContainer.style.display = 'block';
            
        } catch (error) {
            // Yükleme göstergesini gizle
            loadingIndicator.style.display = 'none';
            
            // Hatayı göster
            responseContent.textContent = `Bir hata oluştu: ${error.message}`;
            responseContainer.style.display = 'block';
        }
    });

    // Shift+Enter tuşu ile göndermeyi etkinleştir
    promptInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            generateBtn.click();
        }
    });
    
    // Basit markdown formatını HTML'e dönüştüren fonksiyon
    function formatResponse(text) {
        if (!text) return '';
        
        // Kod bloklarını işle
        text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Başlıkları işle
        text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Kalın ve italik metinleri işle
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Listeleri işle
        text = text.replace(/^\s*\*\s(.*$)/gm, '<li>$1</li>');
        
        // Paragrafları işle
        text = text.replace(/\n\n/g, '</p><p>');
        
        // Satır sonlarını işle
        text = text.replace(/\n/g, '<br>');
        
        return '<p>' + text + '</p>';
    }
});
