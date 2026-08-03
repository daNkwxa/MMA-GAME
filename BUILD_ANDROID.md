# 📱 MMA GOAT - Android APK ve Google Play Derleme Rehberi

Bu belge, **MMA GOAT** oyununu Android platformuna entegre etmek, **APK çıkarmak** ve Android Studio veya komut satırı kullanarak cihazınızda çalıştırmak için izlenecek tüm adımları içerir.

---

## ⚡ 1. Hızlı Komutlar (Cheat Sheet)

| Amaç | Komut |
| :--- | :--- |
| **Kodu Derle ve Android Projesine Aktar (Sync)** | `npm run build:android` |
| **Android Studio'yu Otomatik Aç** | `npm run open:android` |
| **Özel Capacitor Senkronizasyonu** | `npx cap sync android` |

---

## 🛠️ 2. Gereksinimler

1. **Android Studio** (Ücretsiz — [developer.android.com/studio](https://developer.android.com/studio) adresinden indirebilirsiniz).
2. **Java Development Kit (JDK 17+)** (Android Studio ile birlikte otomatik gelir).

---

## 📦 3. APK Çıkarma Adımları

### 🚀 Yöntem A: Android Studio İle APK Çıkarma (En Kolay)

1. Terminalde aşağıdaki komutla projenizi hazırlayın ve Android Studio'yu açın:
   ```bash
   npm run build:android
   npx cap open android
   ```
2. Android Studio açıldığında sağ altta Gradle senkronizasyonunun bitmesini bekleyin (1-2 dakika sürer).
3. Üst menüden:
   👉 **Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)** yolunu izleyin.
4. Derleme bittiğinde sağ altta **"APK(s) generated successfully"** bildirimi çıkacaktır. **"locate"** butonuna tıklayarak ürettiğiniz `.apk` dosyasını alıp telefonunuza yükleyebilirsiniz!

---

### 💻 Yöntem B: Komut Satırıyla (CLI) Doğrudan APK Çıkarma

Android Studio açmadan doğrudan terminalden APK üretmek için:

```bash
# 1. Projeyi güncelleyin
npm run build:android

# 2. Android klasörüne geçip Gradle ile Debug APK derleyin
cd android
./gradlew assembleDebug
```

> **Üretilen APK Konumu:**  
> `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🎬 4. Google AdMob Android Entegrasyonu

AdMob reklamlarının Android'de aktif olması için `android/app/src/main/AndroidManifest.xml` dosyasındaki AdMob App ID alanını güncelleyin:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true">
        
        <!-- 🎯 GOOGLE ADMOB APP ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-3940256099942544~3347511713"/>

    </application>
</manifest>
```
*(Test aşamasında yukarıdaki Google resmi test App ID'si varsayılan olarak kullanılır).*

---

## 🔐 5. Google Play Store İçin İmzalı Release APK / AAB Çıkarma

Google Play Store'a yüklemek istediğinizde:
1. Android Studio'da **Build ➔ Generate Signed Bundle / APK** seçin.
2. **Android App Bundle (.aab)** seçeneğini seçin.
3. Kendi Keystore imza anahtarınızı oluşturup derleyin.
