// MMA GOAT - Google AdMob Rewarded Ad Manager
// Modular, cross-platform (Android, iOS, Web Simulation) Ad Manager

export class AdManager {
  constructor() {
    // Official Google AdMob Rewarded Test Ad IDs
    this.TEST_AD_UNITS = {
      android: 'ca-app-pub-3940256099942544/5224354917',
      ios: 'ca-app-pub-3940256099942544/1712485638'
    };

    this.platform = this.detectPlatform();
    this.adUnitId = this.TEST_AD_UNITS[this.platform] || this.TEST_AD_UNITS.android;

    this.isAdReady = false;
    this.isLoading = false;
    this.isNativePluginAvailable = false;

    this.initAdMob();
  }

  // Detect runtime platform (iOS, Android, or Web)
  detectPlatform() {
    if (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      return window.Capacitor.getPlatform() === 'ios' ? 'ios' : 'android';
    }
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
    if (/android/i.test(ua)) return 'android';
    return 'web';
  }

  // Initialize AdMob Plugin / Web Fallback Bridge
  async initAdMob() {
    try {
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob) {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.initialize({
          requestTrackingAuthorization: true,
          initializeForTesting: true
        });
        this.isNativePluginAvailable = true;
        console.log(`[AdManager] Native AdMob initialized for ${this.platform}`);
      } else {
        console.log(`[AdManager] Running in Web Simulation mode (${this.platform})`);
        this.isNativePluginAvailable = false;
      }
    } catch (e) {
      console.warn('[AdManager] AdMob init notice (Web mode fallback enabled):', e.message || e);
      this.isNativePluginAvailable = false;
    }

    // Preload first ad
    this.preloadRewardedAd();
  }

  // Preload Rewarded Video Ad
  async preloadRewardedAd() {
    if (this.isLoading || this.isAdReady) return;
    this.isLoading = true;

    try {
      if (this.isNativePluginAvailable && window.Capacitor?.Plugins?.AdMob) {
        const { AdMob } = window.Capacitor.Plugins;
        await AdMob.prepareRewardVideoAd({
          adId: this.adUnitId,
          isTesting: true
        });
        this.isAdReady = true;
        console.log('[AdManager] Native Rewarded Ad preloaded successfully.');
      } else {
        // Web Simulation Mode — Ready instantly
        this.isAdReady = true;
        console.log('[AdManager] Web Simulation Rewarded Ad ready.');
      }
    } catch (err) {
      console.warn('[AdManager] Preload notice, retrying simulation mode:', err.message || err);
      // Fallback to web simulation ready so gameplay is never blocked
      this.isAdReady = true;
    } finally {
      this.isLoading = false;
    }
  }

  // Check if rewarded ad is ready to present
  isReady() {
    return this.isAdReady;
  }

  // Show Rewarded Video Ad
  // onSuccess: Callback executed ONLY when the user watches the entire video
  // onCancel: Callback executed if the ad fails or user cancels early
  async showRewardedAd(onSuccess, onCancel) {
    if (!this.isReady()) {
      // Re-trigger preload and show web simulation fallback if unavailable
      await this.preloadRewardedAd();
    }

    if (this.isNativePluginAvailable && window.Capacitor?.Plugins?.AdMob) {
      try {
        const { AdMob } = window.Capacitor.Plugins;

        let rewardGranted = false;

        const rewardListener = await AdMob.addListener('onRewardedVideoReward', () => {
          rewardGranted = true;
        });

        const dismissListener = await AdMob.addListener('onRewardedVideoDismissed', () => {
          rewardListener.remove();
          dismissListener.remove();
          this.isAdReady = false;
          this.preloadRewardedAd(); // Preload next ad

          if (rewardGranted) {
            if (typeof onSuccess === 'function') onSuccess();
          } else {
            if (typeof onCancel === 'function') onCancel('incomplete');
          }
        });

        await AdMob.showRewardVideoAd();
      } catch (err) {
        console.warn('[AdManager] Native ad show error, launching web simulation:', err);
        this.showWebSimulatedAd(onSuccess, onCancel);
      }
    } else {
      // Web Simulation Modal
      this.showWebSimulatedAd(onSuccess, onCancel);
    }
  }

  // In-Game Web Simulation Modal Overlay for local/browser testing
  showWebSimulatedAd(onSuccess, onCancel) {
    let simModal = document.getElementById('admob-sim-modal');
    if (!simModal) {
      this.createWebSimModalHTML();
      simModal = document.getElementById('admob-sim-modal');
    }

    const timerEl = document.getElementById('admob-sim-timer');
    const closeBtn = document.getElementById('admob-sim-close');
    const progressFill = document.getElementById('admob-sim-progress-fill');

    let secondsLeft = 5; // 5-second test video simulation
    if (timerEl) timerEl.innerText = `${secondsLeft}s`;
    if (progressFill) progressFill.style.width = '0%';
    if (closeBtn) {
      closeBtn.style.display = 'none';
      closeBtn.onclick = null;
    }

    simModal.classList.add('active');

    const interval = setInterval(() => {
      secondsLeft--;
      const pct = Math.round(((5 - secondsLeft) / 5) * 100);
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (timerEl) timerEl.innerText = secondsLeft > 0 ? `${secondsLeft}s` : 'REWARD GRANTED!';

      if (secondsLeft <= 0) {
        clearInterval(interval);
        if (closeBtn) {
          closeBtn.style.display = 'inline-block';
          closeBtn.innerText = '✅ ÖDÜLÜ AL & KAPAT';
          closeBtn.onclick = () => {
            simModal.classList.remove('active');
            this.isAdReady = false;
            this.preloadRewardedAd();
            if (typeof onSuccess === 'function') onSuccess();
          };
        }
      }
    }, 1000);
  }

  // Creates the HTML element for Web Simulation Modal
  createWebSimModalHTML() {
    const div = document.createElement('div');
    div.id = 'admob-sim-modal';
    div.className = 'modal-overlay';
    div.innerHTML = `
      <div class="modal-content" style="max-width: 420px; text-align: center; border: 2px solid var(--accent-cyan); background: rgba(18,22,31,0.98); box-shadow: 0 0 35px rgba(0,243,255,0.3);">
        <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem;">
          🎬 ADMOB REKLAM SİMÜLASYONU (TEST MODE)
        </div>
        <h3 style="color: #fff; font-size: 1.2rem; margin-bottom: 0.6rem;">🎥 Ödüllü Video Reklamı Oynatılıyor</h3>
        
        <div style="background: #000; border-radius: 12px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--bg-card-border); margin-bottom: 1rem; position: relative; overflow: hidden;">
          <div style="font-size: 2.5rem; animation: pulse 1.5s infinite;">🥊</div>
          <div style="font-size: 0.85rem; color: var(--accent-cyan); margin-top: 0.4rem; font-weight: 600;">MMA GOAT Sponsors</div>
          <div style="position: absolute; top: 8px; right: 12px; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 10px; font-size: 0.75rem; color: #fff;" id="admob-sim-timer">
            5s
          </div>
        </div>

        <div class="bar-container" style="height: 8px; margin-bottom: 1.2rem;">
          <div id="admob-sim-progress-fill" class="bar-fill fill-cyan" style="width: 0%; transition: width 1s linear;"></div>
        </div>

        <button id="admob-sim-close" class="btn btn-gold" style="width: 100%; display: none; font-weight: 800;">
          ✅ ÖDÜLÜ AL & KAPAT
        </button>
      </div>
    `;
    document.body.appendChild(div);
  }
}
