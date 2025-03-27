# Gemini 2.0 Flash Sohbet Uygulaması

Bu proje, Google'ın Gemini 2.0 Flash API'sini kullanarak geliştirilmiş interaktif bir sohbet uygulamasıdır. Uygulama, Flask web framework'ü üzerine kurulmuştur ve kullanıcıların AI ile sohbet etmesine olanak tanır.

## Özellikler

- 💬 Gerçek zamanlı AI sohbet deneyimi
- 🧠 Gemini 2.0 Flash AI modeli entegrasyonu
- 🔄 Sohbet bağlamını koruma (önceki mesajları hatırlama)
- 📱 Duyarlı ve modern kullanıcı arayüzü
- 🧹 Sohbet geçmişini temizleme özelliği
- 🌐 Türkçe dil desteği

## Kurulum

### Gereksinimler

- Python 3.8+
- Google Gemini API anahtarı

### Yerel Geliştirme Ortamında Çalıştırma

1. Bu depoyu klonlayın:

```bash
git clone https://github.com/YourUsername/gemini-2.0-flash_demo_chat.git
cd gemini-2.0-flash_demo_chat
```

2. Sanal ortam oluşturun ve etkinleştirin:

```bash
python -m venv gemini-env
source gemini-env/bin/activate  # Linux/Mac
# Windows için: gemini-env\Scripts\activate
```

3. Gerekli paketleri yükleyin:

```bash
pip install -r requirements.txt
```

4. `.env` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:

```
GEMINI_API_KEY=your_api_key_here
```

5. Uygulamayı çalıştırın:

```bash
python app.py
```

6. Tarayıcınızda `http://localhost:5001` adresine gidin.

## Render Üzerinde Canlıya Alma

Bu uygulamayı [Render](https://render.com/) üzerinde hızlıca canlıya alabilirsiniz:

1. [Render Dashboard](https://dashboard.render.com/)'a giriş yapın.

2. "New +" butonuna tıklayın ve "Web Service" seçeneğini seçin.

3. GitHub reponuzu bağlayın veya public repo URL'sini girin.

4. Aşağıdaki ayarları yapılandırın:
   - **Name**: `gemini-chat` (veya istediğiniz bir isim)
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

5. "Advanced" sekmesini açın ve şu çevre değişkenlerini ekleyin:
   - `GEMINI_API_KEY`: Google Gemini API anahtarınız
   - `SECRET_KEY`: Güvenli rastgele bir dize (veya Render'ın otomatik oluşturmasına izin verin)

6. "Create Web Service" butonuna tıklayın.

Render, uygulamanızı otomatik olarak dağıtacak ve bir URL sağlayacaktır.

Alternatif olarak, repo'da bulunan `render.yaml` dosyasını kullanarak "Blueprint" yöntemiyle de deploy edebilirsiniz.

## Kullanım

- Metin alanına sorunuzu yazın ve "Gönder" butonuna tıklayın veya Shift+Enter tuş kombinasyonunu kullanın.
- Sohbet geçmişini temizlemek için sağ üst köşedeki "Sohbeti Temizle" butonunu kullanın.
- Uygulama önceki mesajları hatırlayacak ve bağlam içinde yanıt verecektir.

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Daha fazla bilgi için lisans dosyasına bakın.

## Katkıda Bulunma

Katkıda bulunmak istiyorsanız, lütfen bir pull request gönderin veya bir issue açın.

---

© 2025 Yucel Gumus - Modern yapay zeka uygulamaları 