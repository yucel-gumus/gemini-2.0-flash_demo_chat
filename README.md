# Gemini AI Flask Uygulaması

Bu proje, Google'ın Gemini 2.0 Flash yapay zeka modelini kullanarak soruları yanıtlayan bir Flask web uygulamasıdır.

## Özellikler

- Modern ve kullanıcı dostu arayüz
- Gemini 2.0 Flash AI modeli entegrasyonu
- Markdown formatında yanıtlar
- Tamamen Türkçe içerik desteği
- Mobil uyumlu tasarım

## Kurulum

1. Bu depoyu klonlayın
2. Gerekli paketleri yükleyin:
   ```
   pip install -r requirements.txt
   ```
3. [Google AI Studio](https://makersuite.google.com/app/apikey) üzerinden bir Gemini API anahtarı alın
4. API anahtarınızı `.env` dosyasına ekleyin:
   ```
   GEMINI_API_KEY=api_anahtarınız
   ```

## Uygulamayı Çalıştırma

Flask uygulamasını başlatmak için:
```
python app.py
```

Uygulama `http://127.0.0.1:5000/` adresinde çalışacaktır.

## Kullanım

1. Ana sayfaya gidin
2. Metin alanına sorunuzu veya konunuzu yazın
3. "Yanıt Oluştur" düğmesine tıklayın veya Shift+Enter tuşlarına basın
4. Gemini AI'dan gelen yanıtı görüntüleyin

## Teknolojiler

- Flask: Web uygulaması çerçevesi
- Google Generative AI: Gemini 2.0 Flash modeli
- Bootstrap: Ön yüz tasarımı
- JavaScript: Etkileşimli kullanıcı deneyimi
