# 📱 MMA GOAT - iOS App Derleme Rehberi

Bu rehber MMA GOAT oyununu iOS cihazlar için `.app` ve `.ipa` dosyası olarak derleme adımlarını içerir.

> ⚠️ **Önemli:** iOS uygulaması derlemek için **macOS + Xcode** gereklidir. Windows'ta bu işlem yapılamaz.

---

## 📋 Gereksinimler

| Gereksinim | Minimum Versiyon |
|-----------|-----------------|
| macOS | 13.0 (Ventura) veya üzeri |
| Xcode | 15.0 veya üzeri |
| Node.js | 18.0 veya üzeri |
| CocoaPods | 1.14 veya üzeri |
| Apple Developer Hesabı | Ücretsiz (test) veya Ücretli ($99/yıl - App Store) |

---

## 🚀 Adım Adım Kurulum

### 1. Projeyi macOS'a Kopyalayın

Tüm proje klasörünü macOS bilgisayarınıza kopyalayın (USB, AirDrop, Git, vb.)

```bash
# Eğer Git kullanıyorsanız:
git clone <repo-url> mma-goat
cd mma-goat
```

### 2. Bağımlılıkları Kurun

```bash
# Node.js bağımlılıkları
npm install

# CocoaPods kurulumu (yoksa)
sudo gem install cocoapods
```

### 3. Web Dosyalarını Build Edin

```bash
# Bundle.js oluştur ve www/ dizinine kopyala
npm run build
```

### 4. Capacitor Sync Yapın

```bash
# www/ içeriğini iOS projesine senkronize et
npm run build:ios
# veya ayrı ayrı:
# npm run build
# npx cap sync ios
```

### 5. CocoaPods Yükleyin

```bash
cd ios/App
pod install
cd ../..
```

### 6. Xcode'da Açın

```bash
npm run open:ios
# veya manuel olarak:
# open ios/App/App.xcworkspace
```

> ⚠️ **`App.xcworkspace`** dosyasını açın, `App.xcodeproj` DEĞİL!

---

## 🔧 Xcode Ayarları

### Signing & Capabilities

1. Xcode'da sol panelden **App** target'ını seçin
2. **Signing & Capabilities** sekmesine gidin
3. **Team** alanına Apple Developer hesabınızı seçin
4. **Bundle Identifier**: `com.mmagoat.app` (değiştirmek isterseniz buradan)
5. **Automatically manage signing** kutucuğunu işaretleyin

### General Ayarlar

| Ayar | Değer |
|------|-------|
| Display Name | MMA GOAT |
| Bundle Identifier | com.mmagoat.app |
| Version | 1.0 |
| Build | 1 |
| Deployment Target | iOS 13.0 |
| Devices | iPhone + iPad |

### 🎯 AdMob iOS Reklam Kodları Entegrasyonu

Projede tanımlı resmi iOS AdMob kodları:
- **App ID (Info.plist - GADApplicationIdentifier)**: `ca-app-pub-4672765985243640~8255180913`
- **Ödüllü Reklam (Ad Unit ID)**: `ca-app-pub-4672765985243640/6690852220`

---

## 📱 Simulator'da Test Etme

1. Xcode'un üst kısmındaki cihaz seçiciden bir iPhone simülatörü seçin (örn: iPhone 15 Pro)
2. **⌘ + R** tuşlarına basın veya ▶️ butonuna tıklayın
3. Simulator açılacak ve uygulama çalışacaktır

---

## 📦 .IPA Dosyası Oluşturma (Archive & Export)

### Ücretsiz Developer Hesabıyla (Kişisel Test)

1. Xcode menüsünden: **Product → Archive**
2. Archive tamamlandığında **Organizer** penceresi açılır
3. **Distribute App** butonuna tıklayın
4. **Development** seçin
5. Cihazınızı seçin ve **Export** butonuna tıklayın
6. `.ipa` dosyası belirttiğiniz klasöre kaydedilecektir

### Ücretli Developer Hesabıyla (App Store)

1. **Product → Archive**
2. **Distribute App → App Store Connect**
3. **Upload** veya **Export** seçin
4. Gerekli sertifika ve profilleri seçin
5. Export tamamlandığında `.ipa` dosyası hazır

---

## 📲 Fiziksel Cihaza Yükleme

### Yöntem 1: Xcode ile Doğrudan

1. iPhone'u Mac'e USB ile bağlayın
2. Xcode cihaz seçicisinden iPhone'unuzu seçin
3. **⌘ + R** ile çalıştırın
4. iPhone'da "Güvenilmeyen Geliştirici" uyarısı çıkarsa:
   - **Ayarlar → Genel → VPN ve Cihaz Yönetimi** → Sertifikayı güvenilir olarak işaretleyin

### Yöntem 2: .IPA ile (AltStore, Sideloadly vb.)

1. Yukarıdaki adımlarla `.ipa` dosyasını oluşturun
2. AltStore veya Sideloadly gibi bir araç kullanın
3. `.ipa` dosyasını iPhone'a yükleyin

---

## 🔍 Sorun Giderme

### "No matching provisioning profiles found"
→ Xcode'da **Signing & Capabilities** sekmesinde **Automatically manage signing** seçeneğini etkinleştirin.

### "Pod not found" veya CocoaPods hatası
```bash
cd ios/App
pod deintegrate
pod install --repo-update
```

### Web içeriği güncellenmiyor
```bash
npm run build:ios
# iOS'ta Clean Build:
# Xcode → Product → Clean Build Folder (⇧⌘K)
```

### Beyaz ekran veya yüklenmeme
- `www/` dizininde `index.html`, `styles.css`, `js/bundle.js` dosyalarının mevcut olduğunu kontrol edin
- `capacitor.config.json`'da `webDir: "www"` olduğundan emin olun

---

## 📁 Proje Yapısı

```
mma/
├── capacitor.config.json    ← Capacitor ayarları
├── package.json             ← Node.js bağımlılıkları
├── build.js                 ← JS bundler (bundle.js oluşturur)
├── index.html               ← Ana HTML
├── styles.css               ← Stiller
├── js/                      ← Kaynak JS dosyaları
│   ├── data.js
│   ├── audio.js
│   ├── fighter.js
│   ├── career.js
│   ├── fightEngine.js
│   ├── app.js
│   └── bundle.js            ← Build çıktısı
├── www/                     ← Capacitor web dizini (build çıktısı)
│   ├── index.html
│   ├── styles.css
│   └── js/bundle.js
└── ios/                     ← iOS Xcode projesi
    └── App/
        ├── App.xcworkspace   ← BUNU AÇ!
        ├── App.xcodeproj
        ├── Podfile
        └── App/
            ├── AppDelegate.swift
            ├── Info.plist
            ├── Assets.xcassets/
            │   └── AppIcon.appiconset/
            └── public/       ← Capacitor sync çıktısı
```

---

## ⏩ Hızlı Başlangıç (TL;DR)

```bash
# 1. macOS'ta projeyi açın
cd mma-goat

# 2. Her şeyi kurun
npm install

# 3. Build & Sync
npm run build:ios

# 4. CocoaPods
cd ios/App && pod install && cd ../..

# 5. Xcode'da açın
npm run open:ios

# 6. Xcode'da ▶️ butonuna basın (Simulator)
# 7. Product → Archive (IPA için)
```
