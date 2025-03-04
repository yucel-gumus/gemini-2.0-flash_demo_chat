from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Çevre değişkenlerini yükle
load_dotenv()

# Gemini API'yi yapılandır
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Modeli başlat
model = genai.GenerativeModel('gemini-2.0-flash')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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
        
        # Yanıt oluştur
        response = model.generate_content(
            [system_instruction, prompt],
            generation_config=generation_config
        )
        
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

