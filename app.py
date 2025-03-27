from flask import Flask, render_template, request, jsonify, session
import google.generativeai as genai
import os
from dotenv import load_dotenv
import uuid

# Çevre değişkenlerini yükle
load_dotenv()

# Gemini API'yi yapılandır
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Modeli başlat
model = genai.GenerativeModel('gemini-2.0-flash')

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", os.urandom(24).hex())

@app.route('/')
def index():
    # Her yeni ziyaretçi için benzersiz bir session_id oluştur
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())
        session['chat_history'] = []
    
    return render_template('index.html', chat_history=session.get('chat_history', []))

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '')
    
    if not prompt:
        return jsonify({'error': 'Prompt gereklidir'}), 400
    
    try:
        # Türkçe yanıt için sistem talimatı ekle
        system_instruction = "Sen yardımcı bir asistansın. Türkçe yanıt ver. Yanıtların doğru, bilgilendirici ve yararlı olsun."
        
        # Gemini modelini yapılandır
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 2048,
        }
        
        # Kullanıcı mesajını sohbet geçmişine ekle
        chat_history = session.get('chat_history', [])
        chat_history.append({"role": "user", "content": prompt})
        
        # Mevcut konuşma geçmişini kullanarak bir sohbet başlatın
        conversation_history = [system_instruction]
        for message in chat_history:
            if message["role"] == "user":
                conversation_history.append(message["content"])
            else:  # assistant
                conversation_history.append(message["content"])
        
        # Yanıt oluştur
        response = model.generate_content(
            conversation_history,
            generation_config=generation_config
        )
        
        # Asistan yanıtını sohbet geçmişine ekle
        chat_history.append({"role": "assistant", "content": response.text})
        
        # Son 20 mesajı saklayın (sohbeti çok uzun tutmamak için)
        if len(chat_history) > 20:
            chat_history = chat_history[-20:]
            
        # Oturumu güncelleyin
        session['chat_history'] = chat_history
        
        return jsonify({
            'response': response.text,
            'chat_history': chat_history
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/clear_chat', methods=['POST'])
def clear_chat():
    if 'chat_history' in session:
        session['chat_history'] = []
    return jsonify({'success': True})

if __name__ == "__main__":
    # Render'da çalışırken otomatik port seçimi yapılır
    port = int(os.environ.get('PORT', 5001))
    app.run(host="0.0.0.0", port=port) 