// MMA GOAT - Main Application Orchestrator

import { FIGHT_STYLES, WEIGHT_CLASSES, COUNTRIES, ORGANIZATIONS, GYM_UPGRADES, WEIGHT_CUT_STRATEGIES, NUTRITION_ITEMS } from './data.js';
import { Fighter } from './fighter.js';
import { CareerManager } from './career.js';
import { FightEngine } from './fightEngine.js';
import { sfx } from './audio.js';

const SAVE_KEY = 'mma_goat_save_v2';

export const TRANSLATIONS = {
  tr: {
    mainTitle: '🥊 MMA GOAT',
    mainSubtitle: 'Kariyer Menajerlik & RPG Simülasyonu',
    continueSaveTitle: '📂 Devam Eden Kariyer',
    btnContinue: '▶️ Kariyere Devam Et',
    btnNewCareer: '🚀 Yeni Kariyer Başlat',
    btnDeleteSave: '🗑️ Kayıtlı Kariyeri Sil',
    homeMenu: '🏠 Ana Menü',

    newFighter: '🥋 Yeni Dövüşçü',
    labelName: 'İsim',
    placeholderName: 'Dövüşçü Adı & Soyadı...',
    labelSocial: '📱 Sosyal Medya Adı',
    labelCountry: 'Ülke',
    labelWeight: 'Siklet',
    labelStyle: 'Dövüş Stili',
    startingStats: '📊 Başlangıç Statları',
    btnStartCareer: '🚀 Kariyeri Başlat',

    tabDashboard: '🏠 Özeti',
    tabStats: '📊 Statlar',
    tabCamp: '🏋️ Kamp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 Lig',
    tabSocial: '📱 Sosyal',
    tabShop: '🏬 Salon',
    tabLegacy: '👑 GOAT',

    energy: '⚡ Enerji',
    stress: '😤 Stres',
    rest: '🛌 Dinlen',
    attributes: '📊 Nitelikler',
    selectedFight: '🔥 Seçilen Dövüş',
    btnStartCamp: '🥊 KAMP BAŞLAT (7 Gün)',
    btnWeighIn: '⚖️ RESMİ TARTIYA ÇIK (WEIGH-IN)',
    btnEnterOctagon: '🥊 MAÇA GİR (OCTAGON)',
    btnGoToCamp: '🏋️ KAMPA GİT',
    matchOffers: '📜 Dövüş Teklifleri',
    acceptContract: '✍️ Sözleşmeyi İmzala',
    rerollOffers: '🎲 Teklifleri Yenile',
    retireCareer: '👑 Emekli Ol',

    socialTitle: '📱 Sosyal Medya',
    postLimit: 'Haftalık Gönderi Hakkı:',
    btnTrashTalk: '💥 Trash Talk',
    btnRespect: '🤝 Saygı',
    btnFlex: '🏎️ Lüks Yaşam',

    campTitle: '🏋️ Antrenman Kampı',
    dayActivitiesLeft: 'Günün Kalan Aktivite Hakkı:',
    btnNextDay: '🌙 Günü Bitir & Dinlen',
    btnTrainStriking: '🥊 Boks & Kickboks (Punch/Kick +2)',
    btnTrainWrestling: '🤼 Güreş & Takedown (Wrestling/TDD +2)',
    btnTrainBjj: '🥋 BJJ & Pes Ettirme (Submission/Clinch +2)',
    btnTrainCardio: '🏃 Kardiyo & Kondisyon (Cardio +2, Enerji -15)',
    btnPhysio: '💆 Fizyoterapi & Masaj (Stres -20, Enerji +15)',

    nutritionMarket: '🍎 Beslenme & Kütle Marketi',
    fighterWeight: 'Dövüşçü Kilosu:',
    targetLimit: 'Siklet Limiti:',
    weightClassSwitch: '⚖️ Siklet Değiştir / Yükselt',
    gymUpgrades: '🏬 Salon & Tesis Yükseltmeleri',
    btnBuy: 'Satın Al',
    btnSwitchWeight: '⚖️ Siklete Geç',

    fightCenter: '🥊 Dövüş Merkezi',
    chooseTactic: 'Raund Taktiği Seç:',
    btnPlayRound: '⚡ Raundu Başlat',

    goatRanking: '👑 GOAT Derecelendirmesi',
    goatScore: 'GOAT Puanı:',
    totalRecord: 'Toplam Rekor:',
    koWins: 'Nakavt Zaferleri:',
    subWins: 'Pes Ettirme Zaferleri:',
    titleBelts: 'Şampiyonluk Kemer Sayısı:',
    titleDefenses: 'Kemer Savunmaları:',
    totalWealth: 'Toplam Servet:'
  },
  en: {
    mainTitle: '🥊 MMA GOAT',
    mainSubtitle: 'Career Management & RPG Simulation',
    continueSaveTitle: '📂 Saved Career',
    btnContinue: '▶️ Continue Career',
    btnNewCareer: '🚀 Start New Career',
    btnDeleteSave: '🗑️ Delete Saved Career',
    homeMenu: '🏠 Main Menu',

    newFighter: '🥋 New Fighter',
    labelName: 'Name',
    placeholderName: 'Fighter Name & Surname...',
    labelSocial: '📱 Social Media Handle',
    labelCountry: 'Country',
    labelWeight: 'Weight Class',
    labelStyle: 'Fighting Style',
    startingStats: '📊 Starting Stats',
    btnStartCareer: '🚀 Start Career',

    tabDashboard: '🏠 Dashboard',
    tabStats: '📊 Stats',
    tabCamp: '🏋️ Camp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 League',
    tabSocial: '📱 Social',
    tabShop: '🏬 Shop',
    tabLegacy: '👑 GOAT',

    energy: '⚡ Energy',
    stress: '😤 Stress',
    rest: '🛌 Rest',
    attributes: '📊 Attributes',
    selectedFight: '🔥 Selected Fight',
    btnStartCamp: '🥊 START CAMP (7 Days)',
    btnWeighIn: '⚖️ OFFICIAL WEIGH-IN',
    btnEnterOctagon: '🥊 ENTER OCTAGON',
    btnGoToCamp: '🏋️ GO TO CAMP',
    matchOffers: '📜 Match Offers',
    acceptContract: '✍️ Sign Contract',
    rerollOffers: '🎲 Reroll Offers',
    retireCareer: '👑 Retire',

    socialTitle: '📱 Social Media',
    postLimit: 'Weekly Post Limit:',
    btnTrashTalk: '💥 Trash Talk',
    btnRespect: '🤝 Respect',
    btnFlex: '🏎️ Flex Lifestyle',

    campTitle: '🏋️ Training Camp',
    dayActivitiesLeft: 'Activities Left Today:',
    btnNextDay: '🌙 End Day & Rest',
    btnTrainStriking: '🥊 Boxing & Kickboxing (Punch/Kick +2)',
    btnTrainWrestling: '🤼 Wrestling & Takedowns (Wrestling/TDD +2)',
    btnTrainBjj: '🥋 BJJ & Submissions (Submission/Clinch +2)',
    btnTrainCardio: '🏃 Cardio & Conditioning (Cardio +2, Energy -15)',
    btnPhysio: '💆 Physio & Recovery (Stress -20, Energy +15)',

    nutritionMarket: '🍎 Nutrition & Mass Market',
    fighterWeight: 'Fighter Weight:',
    targetLimit: 'Weight Limit:',
    weightClassSwitch: '⚖️ Change / Move Weight Class',
    gymUpgrades: '🏬 Gym & Facility Upgrades',
    btnBuy: 'Buy',
    btnSwitchWeight: '⚖️ Switch Class',

    fightCenter: '🥊 Fight Center',
    chooseTactic: 'Select Round Tactic:',
    btnPlayRound: '⚡ Execute Round',

    goatRanking: '👑 GOAT Ranking',
    goatScore: 'GOAT Score:',
    totalRecord: 'Total Record:',
    koWins: 'KO Victories:',
    subWins: 'Submission Victories:',
    titleBelts: 'Title Belts Held:',
    titleDefenses: 'Title Defenses:',
    totalWealth: 'Total Wealth:'
  }
};

class MMAGoatApp {
  constructor() {
    window.app = this;
    this.player = null;
    this.career = null;
    this.fightEngine = null;
    this.selectedStyleKey = 'boxer';
    this.lang = localStorage.getItem('mma_goat_lang') || 'tr';

    this.initUI();
    this.checkExistingSave();
  }

  t(key) {
    return TRANSLATIONS[this.lang]?.[key] || TRANSLATIONS['tr']?.[key] || key;
  }

  setLanguage(lang) {
    this.lang = lang;
    localStorage.setItem('mma_goat_lang', lang);
    this.updateLanguageUI();
    this.populateCreatorDropdowns();
    this.updateStylePreview();
    if (this.player) {
      this.updateHeaderAndDashboard();
      this.renderSocialFeedView();
      this.renderShopView();
      this.renderStatsView();
      this.renderLegacyView();
      if (this.fightEngine) this.updateFightUI();
    }
  }

  updateLanguageUI() {
    document.querySelectorAll('.btn-lang').forEach(btn => {
      const active = btn.dataset.lang === this.lang;
      btn.style.opacity = active ? '1' : '0.5';
      btn.style.fontWeight = active ? 'bold' : 'normal';
      btn.style.borderColor = active ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)';
      btn.style.background = active ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255,255,255,0.05)';
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = this.t(key);
      if (translation) {
        el.innerText = translation;
      }
    });

    const createNameInput = document.getElementById('create-name');
    if (createNameInput) {
      createNameInput.placeholder = this.t('placeholderName');
    }
  }

  initUI() {
    this.updateLanguageUI();
    this.populateCreatorDropdowns();
    this.bindEvents();
    this.updateStylePreview();
  }

  checkExistingSave() {
    // Clean up old v1 save to force update to new Amatör (NR) & 30-Rankings system
    if (localStorage.getItem('mma_goat_save_v1')) {
      try { localStorage.removeItem('mma_goat_save_v1'); } catch (e) {}
    }

    const rawSave = localStorage.getItem(SAVE_KEY);
    const continueCard = document.getElementById('continue-save-card');
    const deleteBtn = document.getElementById('btn-menu-delete');

    if (rawSave) {
      try {
        const data = JSON.parse(rawSave);
        if (data && data.player) {
          if (continueCard) continueCard.style.display = 'block';
          if (deleteBtn) deleteBtn.style.display = 'block';

          const flag = data.player.country?.flag || '';
          const name = data.player.name || 'Dövüşçü';
          document.getElementById('save-player-name').innerText = `${flag} ${name}`;

          const orgId = data.player.organizationId ? data.player.organizationId.toUpperCase() : 'REGIONAL';
          const wins = (data.player.record && data.player.record.wins !== undefined) ? data.player.record.wins : 0;
          const losses = (data.player.record && data.player.record.losses !== undefined) ? data.player.record.losses : 0;
          const money = data.player.money !== undefined ? data.player.money.toLocaleString() : '0';
          document.getElementById('save-player-details').innerText = `${orgId} | Rekor: ${wins}-${losses} | $${money}`;

          // Calculate OVR from saved stats
          const values = Object.values(data.player.stats || {});
          const ovr = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 65;
          document.getElementById('save-player-ovr').innerText = ovr;
        }
      } catch (e) {
        console.error('Error reading save', e);
      }
    } else {
      if (continueCard) continueCard.style.display = 'none';
      if (deleteBtn) deleteBtn.style.display = 'none';
    }
  }

  saveGame() {
    if (!this.player || !this.career) return;

    const saveData = {
      player: this.player,
      career: {
        inFightCamp: this.career.inFightCamp,
        campDay: this.career.campDay,
        currentDayActivitiesLeft: this.career.currentDayActivitiesLeft,
        weeklySocialPostsLeft: this.career.weeklySocialPostsLeft,
        rerollsLeft: this.career.rerollsLeft,
        socialFeed: this.career.socialFeed,
        financialHistory: this.career.financialHistory,
        rankings: this.career.rankings,
        currentOpponent: this.career.currentOpponent,
        matchOffers: this.career.matchOffers,
        activeEvent: this.career.activeEvent,
        weighInRequired: this.career.weighInRequired,
        readyToFight: this.career.readyToFight
      },
      timestamp: Date.now()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    this.checkExistingSave();
  }

  loadGame() {
    const rawSave = localStorage.getItem(SAVE_KEY);
    if (!rawSave) return false;

    try {
      const data = JSON.parse(rawSave);
      if (!data || !data.player) {
        throw new Error('Kayıt verisi eksik veya bozuk.');
      }

      // Reconstruct Fighter
      this.player = new Fighter(data.player);

      // Reconstruct CareerManager
      this.career = new CareerManager(this.player, data.career);
      if (data.career) {
        this.career.inFightCamp = data.career.inFightCamp || false;
        this.career.campDay = data.career.campDay || 1;
        this.career.currentDayActivitiesLeft = data.career.currentDayActivitiesLeft !== undefined ? data.career.currentDayActivitiesLeft : 2;
        this.career.weeklySocialPostsLeft = data.career.weeklySocialPostsLeft !== undefined ? data.career.weeklySocialPostsLeft : 3;
        this.career.rerollsLeft = data.career.rerollsLeft !== undefined ? data.career.rerollsLeft : 2;
        this.career.socialFeed = data.career.socialFeed || [];
        this.career.financialHistory = data.career.financialHistory || [];

        // Reconstruct ranking Fighter objects safely
        if (data.career.rankings && Array.isArray(data.career.rankings)) {
          this.career.rankings = data.career.rankings
            .filter(rData => rData !== null && rData !== undefined)
            .map(rData => {
              if (rData.id === this.player.id) return this.player;
              return new Fighter(rData);
            });
        }

        // Reconstruct opponent and match offers safely
        if (data.career.currentOpponent) {
          this.career.currentOpponent = new Fighter(data.career.currentOpponent);
        } else {
          this.career.currentOpponent = null;
        }

        if (data.career.matchOffers && Array.isArray(data.career.matchOffers)) {
          this.career.matchOffers = data.career.matchOffers
            .filter(o => o !== null && o !== undefined)
            .map(o => new Fighter(o));
        }

        this.career.activeEvent = data.career.activeEvent || null;
        this.career.weighInRequired = data.career.weighInRequired || false;
        this.career.readyToFight = data.career.readyToFight || false;
      }

      // Show header & nav tabs
      document.getElementById('top-header').style.display = 'flex';
      document.getElementById('main-nav-tabs').style.display = 'flex';
      document.querySelector('main')?.classList.remove('no-header', 'no-nav');

      this.switchScreen('screen-dashboard');
      this.updateHeaderAndDashboard();
      return true;
    } catch (e) {
      console.error('Failed to load save file', e);
      alert('Kayıtlı oyun yüklenirken hata oluştu: ' + e.message);
      return false;
    }
  }

  deleteSave() {
    if (confirm('Kayıtlı kariyeri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
      localStorage.removeItem(SAVE_KEY);
      this.checkExistingSave();
    }
  }

  populateCreatorDropdowns() {
    // Countries
    const countrySelect = document.getElementById('create-country');
    const countryPlaceholder = this.lang === 'en' ? 'Select Country...' : 'Ülke Seçiniz...';
    countrySelect.innerHTML = `<option value="" disabled selected>${countryPlaceholder}</option>` +
      COUNTRIES.map(c => `<option value="${c.code}">${c.flag} ${this.lang === 'en' && c.nameEn ? c.nameEn : c.name}</option>`).join('');

    // Weight Classes
    const weightSelect = document.getElementById('create-weight');
    weightSelect.innerHTML = WEIGHT_CLASSES.map(w => `<option value="${w.id}">${w.name} (${w.limitLbs} lbs / ${w.limitKg} kg)</option>`).join('');

    // Fighting Styles
    const styleContainer = document.getElementById('style-selector-container');
    styleContainer.innerHTML = Object.keys(FIGHT_STYLES).map(key => {
      const s = FIGHT_STYLES[key];
      const sName = this.lang === 'en' && s.nameEn ? s.nameEn : s.name;
      return `
        <div class="style-card ${key === this.selectedStyleKey ? 'selected' : ''}" data-style="${key}">
          <div class="icon">${s.icon}</div>
          <strong style="display:block; font-size:0.8rem;">${sName}</strong>
        </div>
      `;
    }).join('');

    // Style click listener
    styleContainer.querySelectorAll('.style-card').forEach(card => {
      card.addEventListener('click', (e) => {
        styleContainer.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
        const target = e.currentTarget;
        target.classList.add('selected');
        this.selectedStyleKey = target.dataset.style;
        this.updateStylePreview();
        sfx.playClick();
      });
    });
  }

  updateStylePreview() {
    const previewGrid = document.getElementById('style-stats-preview-grid');
    if (!previewGrid) return;
    const styleData = FIGHT_STYLES[this.selectedStyleKey];
    if (!styleData || !styleData.baseStats) return;

    const statLabelsTR = {
      punch: 'Yumruk', kick: 'Tekme', clinch: 'Clinch', wrestling: 'Güreş',
      takedownDef: 'TDD', submission: 'Submission', cardio: 'Kondisyon',
      strength: 'Güç', speed: 'Hız', fightIq: 'Dövüş IQ', mental: 'Mental'
    };
    const statLabelsEN = {
      punch: 'Punch', kick: 'Kick', clinch: 'Clinch', wrestling: 'Wrestling',
      takedownDef: 'TDD', submission: 'Submission', cardio: 'Cardio',
      strength: 'Strength', speed: 'Speed', fightIq: 'Fight IQ', mental: 'Mental'
    };
    const statLabels = this.lang === 'en' ? statLabelsEN : statLabelsTR;

    previewGrid.innerHTML = Object.keys(styleData.baseStats).map(k => `
      <div style="background: rgba(255,255,255,0.05); padding: 0.3rem 0.2rem; border-radius: 6px; text-align: center;">
        <span style="font-size: 0.62rem; color: var(--text-muted); display: block; line-height: 1.2;">${statLabels[k] || k}</span>
        <strong style="color: var(--accent-gold); font-size: 0.82rem;">${styleData.baseStats[k]}</strong>
      </div>
    `).join('');
  }

  bindEvents() {
    // Language Switcher Buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.dataset.lang;
        this.setLanguage(lang);
        sfx.playClick();
      });
    });

    // Main Menu Buttons
    document.getElementById('btn-menu-new')?.addEventListener('click', () => {
      sfx.playClick();
      this.switchScreen('screen-creation');
    });

    document.getElementById('btn-continue-career')?.addEventListener('click', () => {
      sfx.playClick();
      this.loadGame();
    });

    document.getElementById('btn-menu-delete')?.addEventListener('click', () => {
      sfx.playClick();
      this.deleteSave();
    });

    // Return to Main Menu Header Button
    document.getElementById('btn-return-menu')?.addEventListener('click', () => {
      sfx.playClick();
      this.saveGame();
      document.getElementById('top-header').style.display = 'none';
      document.getElementById('main-nav-tabs').style.display = 'none';
      document.querySelector('main')?.classList.add('no-header', 'no-nav');
      this.switchScreen('screen-main-menu');
    });

    // Start Career Button
    document.getElementById('btn-start-career')?.addEventListener('click', () => {
      sfx.playClick();
      this.startNewCareer();
    });

    // Tab buttons navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sfx.playClick();
        const targetScreenId = e.currentTarget.dataset.target;
        this.switchScreen(targetScreenId);
      });
    });

    // Dashboard Quick Actions
    document.getElementById('btn-quick-rest')?.addEventListener('click', () => {
      if (this.player) {
        sfx.playClick();
        this.player.rest(1);
        this.saveGame();
        this.updateHeaderAndDashboard();
      }
    });

    document.getElementById('btn-retire-career')?.addEventListener('click', () => {
      sfx.playClick();
      if (confirm('Kariyerinizi tamamlayıp emekli olmak istediğinize emin misiniz?')) {
        this.deleteSave();
        location.reload();
      }
    });
  }

  startNewCareer() {
    const name = document.getElementById('create-name').value.trim();
    if (!name) {
      alert('Lütfen dövüşçünüz için bir isim giriniz!');
      return;
    }

    const countryCode = document.getElementById('create-country').value;
    if (!countryCode) {
      alert('Lütfen dövüşçünüz için bir ülke seçiniz!');
      return;
    }

    const countryObj = COUNTRIES.find(c => c.code === countryCode) || COUNTRIES[0];
    const weightClass = document.getElementById('create-weight').value;

    // Social Handle — auto-prefix @ if missing and remove spaces
    let socialRaw = document.getElementById('create-social')?.value.trim() || '';
    if (socialRaw) {
      socialRaw = socialRaw.replace(/\s+/g, '');
      if (!socialRaw.startsWith('@')) socialRaw = '@' + socialRaw;
    }
    const socialHandle = socialRaw || '@' + name.toLowerCase().replace(/\s+/g, '');

    this.player = new Fighter({
      name: name,
      age: 18,
      country: countryObj,
      weightClass: weightClass,
      styleKey: this.selectedStyleKey,
      socialHandle: socialHandle
    });

    this.career = new CareerManager(this.player);

    // Save initial game state
    this.saveGame();

    // Show Header & Main Nav Tabs
    document.getElementById('top-header').style.display = 'flex';
    document.getElementById('main-nav-tabs').style.display = 'flex';
    document.querySelector('main')?.classList.remove('no-header', 'no-nav');

    this.switchScreen('screen-dashboard');
    this.updateHeaderAndDashboard();
  }

  switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');

    // Update active tab button style
    document.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.target === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update screen specific content
    if (screenId === 'screen-dashboard') this.updateHeaderAndDashboard();
    if (screenId === 'screen-camp') this.updateCampView();
    if (screenId === 'screen-octagon') {
      // Only allow Octagon if there's an active (non-finished) fight
      if (this.fightEngine && !this.fightEngine.isFinished) {
        this.updateFightUI();
      } else {
        // No active fight — redirect to dashboard
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-dashboard').classList.add('active');
        this.updateHeaderAndDashboard();
        return;
      }
    }
    if (screenId === 'screen-rankings') this.renderRankingsView();
    if (screenId === 'screen-social') this.renderSocialFeedView();
    if (screenId === 'screen-shop') this.renderShopView();
    if (screenId === 'screen-legacy') this.renderLegacyView();
    if (screenId === 'screen-stats') this.renderStatsView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderAndDashboard() {
    if (!this.player) return;

    const isEn = this.lang === 'en';

    // Header updates
    const rankText = this.player.rank >= 99 ? (isEn ? 'Amateur' : 'Amatör') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    document.getElementById('hdr-org').innerText = this.player.organizationId.toUpperCase();
    document.getElementById('hdr-weight').innerText = `${this.player.weightClass} (${rankText})`;
    document.getElementById('hdr-record').innerText = `${this.player.record.wins}-${this.player.record.losses}-${this.player.record.draws}`;
    document.getElementById('hdr-money').innerText = `$${this.player.money.toLocaleString()}`;
    document.getElementById('hdr-fame').innerText = isEn ? `Fame: ${this.player.fame}` : `Şöhret: ${this.player.fame}`;
    document.getElementById('hdr-energy').innerText = `${this.player.energy}%`;

    // Profile Card
    const ageStr = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('dash-name').innerText = `${this.player.country.flag} ${this.player.name} (${ageStr})`;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('dash-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'Fighter');
    document.getElementById('dash-ovr').innerText = this.player.getOverallRating();

    document.getElementById('dash-energy-bar').style.width = `${this.player.energy}%`;
    document.getElementById('dash-stress-bar').style.width = `${this.player.stress}%`;

    // Render Next Fight OR 3 Match Offers
    const fightContainer = document.getElementById('dash-fight-container');
    if (fightContainer) {
      if (this.career.currentOpponent) {
        const opp = this.career.currentOpponent;
        let btnText = isEn ? '🥊 START CAMP (7 Days)' : '🥊 KAMP BAŞLAT (7 Gün)';
        let btnClass = 'btn btn-gold';

        if (this.career.weighInRequired) {
          btnText = isEn ? '⚖️ OFFICIAL WEIGH-IN' : '⚖️ RESMİ TARTIYA ÇIK (WEIGH-IN)';
          btnClass = 'btn btn-gold';
        } else if (this.career.readyToFight) {
          btnText = isEn ? '🥊 ENTER OCTAGON' : '🥊 MAÇA GİR (OCTAGON)';
          btnClass = 'btn btn-cyan';
        } else if (this.career.inFightCamp) {
          btnText = isEn ? `🏋️ GO TO CAMP (Day ${this.career.campDay}/7)` : `🏋️ KAMPA GİT (Gün ${this.career.campDay}/7)`;
          btnClass = 'btn btn-cyan';
        }

        const oppStyleName = isEn && FIGHT_STYLES[opp.styleKey]?.nameEn ? FIGHT_STYLES[opp.styleKey].nameEn : (FIGHT_STYLES[opp.styleKey]?.name || opp.styleKey);

        fightContainer.innerHTML = `
          <h3 style="font-size: 1rem; margin-bottom: 0.4rem;">${isEn ? '🔥 Selected Fight' : '🔥 Seçilen Dövüş'}</h3>
          <h2 style="color: var(--accent-gold); font-size: 1.2rem; margin-bottom: 0.1rem;">${opp.country.flag} ${opp.name}</h2>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.6rem;">
            ${isEn ? `Rank #${opp.rank} | ${oppStyleName} | Record: ${opp.record.wins}-${opp.record.losses} | OVR: ${opp.getOverallRating()}` : `Sıralama #${opp.rank} | ${oppStyleName} | Rekor: ${opp.record.wins}-${opp.record.losses} | OVR: ${opp.getOverallRating()}`}
          </p>
          <button id="btn-start-camp" class="${btnClass}" style="width: 100%;">
            ${btnText}
          </button>
        `;

        const campBtn = document.getElementById('btn-start-camp');
        if (campBtn) {
          campBtn.onclick = () => {
            sfx.playClick();
            if (this.career.weighInRequired) {
              this.showWeighInModal();
            } else if (this.career.readyToFight) {
              this.prepareOctagonView();
              this.switchScreen('screen-octagon');
            } else if (this.career.inFightCamp) {
              this.switchScreen('screen-camp');
              this.updateCampView();
            } else {
              this.career.startFightCamp(this.career.currentOpponent);
              this.saveGame();
              this.switchScreen('screen-camp');
              this.updateCampView();
            }
          };
        }
      } else {
        // No opponent selected yet -> Render 3 Match Offers!
        if (!this.career.matchOffers || this.career.matchOffers.length === 0) {
          this.career.generateMatchOffers();
        }

        const rerollsLeft = this.career.rerollsLeft !== undefined ? this.career.rerollsLeft : 2;
        const rerollLabel = isEn ? 'Reroll' : 'Yenile';
        const rerollBtnHtml = rerollsLeft > 0
          ? `<button class="btn btn-secondary btn-sm" onclick="window.app.refreshMatchOffers()" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">🔄 ${rerollLabel} (${rerollsLeft}/2)</button>`
          : `<button class="btn btn-secondary btn-sm" disabled style="padding: 0.2rem 0.5rem; font-size: 0.75rem; opacity: 0.4; cursor: not-allowed;">🔄 ${rerollLabel} (0/2)</button>`;

        let offersHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h3 style="font-size: 0.95rem; margin: 0;">${isEn ? '🔥 Fight Offers (Select Match)' : '🔥 Dövüş Teklifleri (Maçını Seç)'}</h3>
            ${rerollBtnHtml}
          </div>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.6rem;">${isEn ? 'Accept one of the 3 offers below to advance in rankings:' : 'Sıralamada yükselmek için aşağıdaki 3 tekliften birini kabul et:'}</p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        `;

        this.career.matchOffers.forEach((opp, idx) => {
          const styleName = isEn && FIGHT_STYLES[opp.styleKey]?.nameEn ? FIGHT_STYLES[opp.styleKey].nameEn : FIGHT_STYLES[opp.styleKey]?.name;
          offersHtml += `
            <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${opp.country.flag} ${opp.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">
                  ${isEn ? 'Rank:' : 'Sıra:'} <strong style="color:var(--accent-gold);">#${opp.rank}</strong> | ${styleName} | OVR: ${opp.getOverallRating()} | (${opp.record.wins}-${opp.record.losses})
                </div>
              </div>
              <button class="btn btn-gold btn-sm" onclick="window.app.acceptMatchOffer(${idx})">${isEn ? '🎯 Accept' : '🎯 Seç'}</button>
            </div>
          `;
        });

        offersHtml += `</div>`;
        fightContainer.innerHTML = offersHtml;
      }
    }

    // Stats Grid Rendering
    const statsGrid = document.getElementById('dash-stats-grid');
    if (statsGrid) {
      statsGrid.innerHTML = Object.keys(this.player.stats).map(st => `
        <div style="background: rgba(0,0,0,0.3); padding: 0.4rem; border-radius: 8px; border: 1px solid var(--bg-card-border); text-align: center;">
          <span style="font-size:0.65rem; color:var(--text-muted); display:block;">${st.toUpperCase()}</span>
          <strong style="font-family:var(--font-heading); font-size:0.9rem; color:var(--accent-cyan);">${this.player.stats[st]}</strong>
        </div>
      `).join('');
    }
  }

  acceptMatchOffer(index) {
    if (!this.career) return;
    sfx.playClick();
    const selected = this.career.selectMatchOffer(index);
    if (selected) {
      this.saveGame();
      this.updateHeaderAndDashboard();
    }
  }

  refreshMatchOffers() {
    if (!this.career) return;

    if (this.career.rerollsLeft <= 0) {
      alert('Bu dövüş seçimi için yenileme hakkınız kalmadı! (Maksimum 2 yenileme yapabilirsiniz).');
      return;
    }

    sfx.playClick();
    this.career.generateMatchOffers(true);
    this.saveGame();
    this.updateHeaderAndDashboard();
  }

  updateCampView() {
    if (!this.career) return;

    const wrapper = document.getElementById('camp-card-wrapper');
    if (!wrapper) return;

    // Case 1: Weigh-in modal is required right now
    if (this.career.weighInRequired) {
      this.switchScreen('screen-dashboard');
      this.showWeighInModal();
      return;
    }

    // Case 2: No active fight camp
    if (!this.career.inFightCamp) {
      wrapper.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0.8rem;">
          <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem; font-size: 1.1rem;">🥊 Aktif Dövüş Kampı Yok</h3>
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 1rem;">
            Henüz bir dövüş teklifi kabul etmediniz. Antrenman yapmak ve maça hazırlanmak için önce ana sayfadan bir rakip teklifini seçin.
          </p>
          <button class="btn btn-gold" onclick="window.app.switchScreen('screen-dashboard')">
            🔥 Ana Sayfaya Git & Rakip Seç
          </button>
        </div>
      `;
      return;
    }

    // Case 3: Active fight camp! Render the 6 training activities
    const energyColor = this.player.energy < 5 ? 'var(--accent-red)' : 'var(--accent-cyan)';

    wrapper.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <h2 style="font-size: 1rem;">🏋️ Kamp (${this.career.currentOpponent?.name || 'Rakip'})</h2>
        <div style="display: flex; gap: 0.4rem;">
          <div class="stat-pill">📅 <strong>${this.career.campDay} / ${this.career.maxCampDays}</strong></div>
          <div class="stat-pill">⚡ <strong style="color: ${energyColor};">${this.player.energy}%</strong></div>
          <div class="stat-pill">🎯 <strong>${this.career.currentDayActivitiesLeft}</strong></div>
        </div>
      </div>

      <div class="tactics-grid">
        <div class="tactic-btn" onclick="window.app.doCampActivity('sparring')">
          <h4>🥊 Ağır Sparring</h4>
          <p>Punch & Kick (+) | -18 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('wrestling_drills')">
          <h4>🤼 Güreş & TDD</h4>
          <p>Wrestling (+) | -20 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('bjj_rolling')">
          <h4>🥋 BJJ Rolling</h4>
          <p>Submission (+) | -15 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('conditioning')">
          <h4>🏃 Kondisyon</h4>
          <p>Cardio & Güç (+) | -22 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('video_analysis')">
          <h4>📹 Rakip Analiz</h4>
          <p>Fight IQ (+) | -5 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('rest_sauna')">
          <h4>🧘 Sauna & Dinlen</h4>
          <p>+35 ⚡ | Stres (-)</p>
        </div>
      </div>
    `;
  }

  showWeighInModal() {
    const modal = document.getElementById('weighin-modal');
    if (!modal) return;

    const currentKg = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const targetKg = this.player.targetWeightKg;
    const diffKg = Number((currentKg - targetKg).toFixed(1));

    document.getElementById('weighin-current-kg').innerText = `${currentKg} kg`;
    document.getElementById('weighin-target-kg').innerText = `${targetKg} kg`;
    document.getElementById('weighin-diff-kg').innerText = diffKg > 0 ? `+${diffKg} kg` : `${diffKg} kg`;

    document.getElementById('weighin-strategy-section').style.display = 'block';
    document.getElementById('weighin-result-section').style.display = 'none';

    const stratList = document.getElementById('weighin-strategies-list');
    stratList.innerHTML = Object.keys(WEIGHT_CUT_STRATEGIES).map(key => {
      const s = WEIGHT_CUT_STRATEGIES[key];
      return `
        <div class="glass-card" style="cursor: pointer; transition: transform 0.2s; border-color: var(--accent-gold); margin-bottom: 0.5rem;" onclick="window.app.handleWeighInChoice('${key}')">
          <h4 style="color: var(--accent-gold); margin-bottom: 0.3rem;">${s.name}</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${s.desc}</p>
          <div style="font-size: 0.75rem; color: var(--accent-cyan);">⚡ Enerji Düşüşü: -${s.energyPenalty} | Tahmini Kilo Kaybı: ~${s.weightCutKg} kg</div>
        </div>
      `;
    }).join('');

    modal.classList.add('active');
  }

  handleWeighInChoice(strategyKey) {
    sfx.playClick();
    if (!this.career) return;

    const res = this.career.processWeighIn(strategyKey);
    this.saveGame();

    document.getElementById('weighin-strategy-section').style.display = 'none';
    const resultSec = document.getElementById('weighin-result-section');
    resultSec.style.display = 'block';

    const badge = document.getElementById('weighin-status-badge');
    if (res.passed) {
      badge.style.background = 'rgba(34, 197, 94, 0.2)';
      badge.style.border = '2px solid #22c55e';
      badge.style.color = '#22c55e';
      badge.innerText = '✅ TARTI PASSED (KİLO TUTTU)';
    } else {
      badge.style.background = 'rgba(239, 68, 68, 0.2)';
      badge.style.border = '2px solid #ef4444';
      badge.style.color = '#ef4444';
      badge.innerText = '❌ TARTI KAÇIRILDI (MAÇTAN MEN)';
    }

    document.getElementById('weighin-result-text').innerText = res.message;

    const confirmBtn = document.getElementById('btn-weighin-confirm');
    confirmBtn.onclick = () => {
      sfx.playClick();
      document.getElementById('weighin-modal').classList.remove('active');
      this.updateHeaderAndDashboard();
      if (res.passed) {
        this.prepareOctagonView();
        this.switchScreen('screen-octagon');
      } else {
        this.switchScreen('screen-dashboard');
      }
    };
  }

  doCampActivity(activityId) {
    if (!this.career) return;
    sfx.playClick();
    const result = this.career.performCampActivity(activityId);
    if (result === 'no_energy') {
      alert('⚡ Enerjin çok düşük! Antrenman yapabilmek için dinlenmen gerekiyor. Sauna & Dinlenme seçeneğini dene.');
      return;
    }
    if (result) {
      this.saveGame();
      this.updateHeaderAndDashboard();
      this.updateCampView();

      // Check event
      if (this.career.activeEvent) {
        this.showEventModal(this.career.activeEvent);
      }
    }
  }

  showEventModal(evt) {
    const modal = document.getElementById('event-modal');
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-desc').innerText = evt.description;

    const optContainer = document.getElementById('modal-options');
    optContainer.innerHTML = evt.options.map((opt, idx) => `
      <button class="btn btn-secondary" onclick="window.app.resolveEventOption(${idx})">${opt.text}</button>
    `).join('');

    modal.classList.add('active');
  }

  resolveEventOption(index) {
    if (this.career) {
      sfx.playClick();

      // Check WCF Contract Offer Event
      if (this.career.activeEvent && this.career.activeEvent.id === 'wcf_contract_offer' && index === 0) {
        this.player.organizationId = 'wcf';
        this.player.rank = 15;
        this.player.isChampion = false;
        this.career.rankings = this.career.generateInitialRankings();
        this.career.generateMatchOffers();
        alert('🎉 TEBRİKLER! WCF (UFC) Organizasyonuna Transfer Oldun!\nDünyanın 1 numaralı liginde başarılar!');
      }

      this.career.resolveActiveEvent(index);
      this.saveGame();
      document.getElementById('event-modal').classList.remove('active');
      this.updateHeaderAndDashboard();
    }
  }

  prepareOctagonView() {
    if (!this.career) return;
    const opponent = this.career.currentOpponent || this.career.findNextOpponent();
    this.fightEngine = new FightEngine(this.player, opponent, 3, this.player.rank === 0);

    document.getElementById('fight-player-name').innerText = this.player.name;
    document.getElementById('fight-player-style').innerText = FIGHT_STYLES[this.player.styleKey]?.name;
    document.getElementById('fight-opp-name').innerText = opponent.name;
    document.getElementById('fight-opp-style').innerText = FIGHT_STYLES[opponent.styleKey]?.name;

    this.renderTacticsButtons();
    this.updateFightUI();
  }

  renderTacticsButtons() {
    const container = document.getElementById('tactics-buttons-container');
    if (!this.fightEngine) return;

    const tactics = this.fightEngine.getAvailableTactics();
    container.innerHTML = tactics.map(t => `
      <div class="tactic-btn" onclick="window.app.playRoundChoice('${t.id}')">
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
      </div>
    `).join('');
  }

  playRoundChoice(tacticId) {
    if (!this.fightEngine || this.fightEngine.isFinished) return;

    sfx.playPunch();
    const outcome = this.fightEngine.playRound(tacticId);

    this.updateFightUI();

    if (outcome && outcome.winner) {
      sfx.playBell();
      if (outcome.winner === 'player') sfx.playCrowdCheer();

      this.career.handlePostFightResults(outcome, this.fightEngine.opponent);
      this.saveGame();
      setTimeout(() => {
        alert(`Dövüş Sona Erdi!\nKazanan: ${outcome.winner === 'player' ? this.player.name : this.fightEngine.opponent.name}\nYöntem: ${outcome.method}`);
        this.switchScreen('screen-dashboard');
      }, 1500);
    }
  }

  updateFightUI() {
    if (!this.fightEngine) return;

    const st = this.fightEngine.state;
    document.getElementById('fight-p-head').style.width = `${Math.max(0, st.player.headHp)}%`;
    document.getElementById('fight-p-stam').style.width = `${Math.max(0, st.player.stamina)}%`;
    document.getElementById('fight-opp-head').style.width = `${Math.max(0, st.opponent.headHp)}%`;
    document.getElementById('fight-opp-stam').style.width = `${Math.max(0, st.opponent.stamina)}%`;

    // Commentary feed
    const box = document.getElementById('fight-commentary-box');
    box.innerHTML = this.fightEngine.commentary.map(c => `
      <div class="commentary-line ${c.type}">${c.text}</div>
    `).join('');
  }

  renderRankingsView() {
    if (!this.career) return;
    const tbody = document.getElementById('rankings-tbody');
    const isEn = this.lang === 'en';

    // Ensure rankings has all 31 slots (rank 0 = champion, rank 1-30 = ranked)
    // Filter out any unranked/amateur fighters (rank >= 99) that may have leaked in
    const cleanedRankings = this.career.rankings.filter(f => f && f.rank !== undefined && f.rank < 99);

    // Build a rank -> fighter lookup map
    const byRank = {};
    cleanedRankings.forEach(f => {
      if (f.id === this.player.id) return; // Skip player — we'll insert them separately
      const r = f.rank;
      // If multiple fighters share a rank (shouldn't happen but just in case), keep highest OVR
      if (!byRank[r] || (f.getOverallRating ? f.getOverallRating() : 0) > (byRank[r].getOverallRating ? byRank[r].getOverallRating() : 0)) {
        byRank[r] = f;
      }
    });

    // Fill any completely missing rank slots with new AI fighters (lazy-fill)
    for (let r = 0; r <= 30; r++) {
      if (r === this.player.rank) continue; // Player occupies this slot
      if (!byRank[r]) {
        const filler = generateAIOpponent ? generateAIOpponent(this.player.weightClass, this.career.getOrgTier(), r, r === 0) : null;
        if (filler) {
          byRank[r] = filler;
          this.career.rankings.push(filler); // Add to persistent rankings
        }
      }
    }

    const champTitle = isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON';
    const youTag = isEn ? '(YOU)' : '(SEN)';
    const isAmateur = this.player.rank >= 99;
    const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');

    let html = '';

    // Show professional rankings (rank 0 to 30)
    for (let r = 0; r <= 30; r++) {
      const rankDisplay = r === 0 ? champTitle : `#${r}`;

      if (r === this.player.rank && !isAmateur) {
        // Insert player row
        html += `
          <tr class="highlight">
            <td>${rankDisplay}</td>
            <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
            <td>${pStyle}</td>
            <td>${this.player.record.wins}-${this.player.record.losses}</td>
            <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
          </tr>
        `;
      } else if (byRank[r]) {
        const f = byRank[r];
        const ovr = f.getOverallRating ? f.getOverallRating() : (f.stats ? Math.round(Object.values(f.stats).reduce((a, b) => a + b, 0) / 11) : 60);
        const fStyle = isEn && FIGHT_STYLES[f.styleKey]?.nameEn ? FIGHT_STYLES[f.styleKey].nameEn : (FIGHT_STYLES[f.styleKey]?.name || 'MMA');
        html += `
          <tr>
            <td>${rankDisplay}</td>
            <td>${f.country?.flag || '🏳️'} ${f.name}</td>
            <td>${fStyle}</td>
            <td>${f.record ? f.record.wins + '-' + f.record.losses : '0-0'}</td>
            <td><strong style="color:var(--accent-cyan);">${ovr}</strong></td>
          </tr>
        `;
      } else {
        // Empty slot fallback (shouldn't happen after fill)
        html += `<tr><td>${rankDisplay}</td><td colspan="4" style="color:var(--text-muted)">—</td></tr>`;
      }
    }

    // Show amateur player below the pro rankings (if still unranked)
    if (isAmateur) {
      html += `
        <tr class="highlight" style="border-top: 2px dashed var(--accent-gold);">
          <td><span style="color: var(--accent-gold); font-weight: 700;">${isEn ? 'Amateur (NR)' : 'Amatör (NR)'}</span></td>
          <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
          <td>${pStyle}</td>
          <td>${this.player.record.wins}-${this.player.record.losses}</td>
          <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:center; font-size:0.75rem; color:var(--text-muted); padding:0.4rem;">
            ${isEn ? '💡 To enter the pro rankings (#30), win 7 amateur fights in the regional promotion.' : '💡 Profesyonel lig sıralamasına (#30) girmek için bölgesel ligde 7 amatör galibiyet almanız gerekir.'}
          </td>
        </tr>
      `;
    }

    tbody.innerHTML = html;
  }


  renderStatsView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    const statLabelsTR = {
      punch: { name: 'Yumruk Gücü', icon: '👊', color: '#ff4d6a' },
      kick: { name: 'Tekme Gücü', icon: '🦵', color: '#ff6b35' },
      clinch: { name: 'Clinch Becerisi', icon: '🤼', color: '#ffa726' },
      wrestling: { name: 'Güreş / Takedown', icon: '💪', color: '#42a5f5' },
      takedownDef: { name: 'Takedown Defansı', icon: '🛡️', color: '#26c6da' },
      submission: { name: 'Submission (Kilit)', icon: '🔒', color: '#ab47bc' },
      cardio: { name: 'Kondisyon (Cardio)', icon: '❤️', color: '#66bb6a' },
      strength: { name: 'Fiziksel Güç', icon: '🏋️', color: '#ef5350' },
      speed: { name: 'Hız & Çabukluk', icon: '⚡', color: '#ffee58' },
      fightIq: { name: 'Dövüş IQ', icon: '🧠', color: '#29b6f6' },
      mental: { name: 'Mental & Özgüven', icon: '🧘', color: '#78909c' }
    };

    const statLabelsEN = {
      punch: { name: 'Punch Power', icon: '👊', color: '#ff4d6a' },
      kick: { name: 'Kick Power', icon: '🦵', color: '#ff6b35' },
      clinch: { name: 'Clinch Skill', icon: '🤼', color: '#ffa726' },
      wrestling: { name: 'Wrestling / Takedown', icon: '💪', color: '#42a5f5' },
      takedownDef: { name: 'Takedown Defense', icon: '🛡️', color: '#26c6da' },
      submission: { name: 'Submission Skill', icon: '🔒', color: '#ab47bc' },
      cardio: { name: 'Cardio & Endurance', icon: '❤️', color: '#66bb6a' },
      strength: { name: 'Physical Strength', icon: '🏋️', color: '#ef5350' },
      speed: { name: 'Speed & Agility', icon: '⚡', color: '#ffee58' },
      fightIq: { name: 'Fight IQ', icon: '🧠', color: '#29b6f6' },
      mental: { name: 'Mental & Confidence', icon: '🧘', color: '#78909c' }
    };

    const statLabels = isEn ? statLabelsEN : statLabelsTR;

    // Fighter header
    document.getElementById('stats-fighter-name').innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    document.getElementById('stats-ovr').innerText = this.player.getOverallRating();
    const ageStrStats = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('stats-age').innerText = ageStrStats;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('stats-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'MMA');

    // Stat bars
    const container = document.getElementById('stats-bars-container');
    container.innerHTML = Object.keys(this.player.stats).map(key => {
      const val = this.player.stats[key];
      const info = statLabels[key] || { name: key, icon: '📊', color: '#90caf9' };
      const pct = Math.min(100, val);
      return `
        <div style="margin-bottom: 0.7rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <span style="font-size: 0.85rem; color: var(--text-main);">${info.icon} ${info.name}</span>
            <strong style="font-family: var(--font-heading); font-size: 1.05rem; color: ${info.color};">${val}</strong>
          </div>
          <div class="bar-container" style="height: 10px;">
            <div class="bar-fill" style="width: ${pct}%; background: ${info.color}; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Career summary
    const summaryDiv = document.getElementById('stats-career-summary');
    const rankText = this.player.rank >= 99 ? (isEn ? 'Unranked' : 'Sıralama Dışı') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    summaryDiv.innerHTML = `
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Record' : 'Rekor'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.record.wins}W - ${this.player.record.losses}L - ${this.player.record.draws}D</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Ranking' : 'Sıralama'}</div>
        <strong style="color:var(--accent-gold);">${rankText}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'KO Wins' : 'KO Galibiyeti'}</div>
        <strong style="color:var(--accent-red);">${this.player.record.koWins}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Sub Wins' : 'Sub Galibiyeti'}</div>
        <strong style="color:#ab47bc;">${this.player.record.subWins}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Money' : 'Bakiye'}</div>
        <strong style="color:var(--accent-gold);">$${this.player.money.toLocaleString()}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Fame' : 'Şöhret'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.fame}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Win Streak' : 'Galibiyet Serisi'}</div>
        <strong style="color:var(--accent-gold);">${this.player.winStreak}🔥</strong>
      </div>
    `;
  }

  renderSocialFeedView() {
    if (!this.career) return;

    // Display player's social handle
    const handleEl = document.getElementById('social-player-handle');
    if (handleEl && this.player) {
      handleEl.innerText = this.player.socialHandle;
    }

    // Update weekly post counter
    const limitText = document.getElementById('social-post-limit-text');
    if (limitText) {
      limitText.innerText = `${this.career.weeklySocialPostsLeft} / 3`;
    }

    // Toggle post buttons based on limit
    const isDisabled = this.career.weeklySocialPostsLeft <= 0;
    ['btn-post-trash', 'btn-post-respect', 'btn-post-flex'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.disabled = isDisabled;
        btn.style.opacity = isDisabled ? '0.4' : '1';
        btn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
      }
    });

    const container = document.getElementById('social-feed-container');
    container.innerHTML = this.career.socialFeed.map(item => `
      <div class="social-item">
        <div class="social-header">
          <strong>${item.author} ${item.handle ? item.handle : ''}</strong>
          <span>${item.time}</span>
        </div>
        <p style="font-size:0.9rem; line-height:1.4;">${item.text}</p>
        <span style="font-size:0.8rem; color:var(--accent-gold); margin-top:0.4rem; display:inline-block;">❤️ ${item.likes.toLocaleString()} ${this.lang === 'en' ? 'Likes' : 'Beğeni'}</span>
      </div>
    `).join('');
  }

  postSocial(type) {
    if (this.career) {
      sfx.playClick();
      const posted = this.career.postSocialMedia(type);
      const isEn = this.lang === 'en';
      if (!posted) {
        alert(isEn ? 'Weekly social post limit reached! (Max 3/week). Resets next week.' : 'Bu haftalık sosyal medya paylaşım hakkınız bitti! (Haftada max 3 gönderi). Sıradaki dövüş/hafta yenilendiğinde hakkınız yenilenecektir.');
        return;
      }
      this.saveGame();
      this.renderSocialFeedView();
      this.updateHeaderAndDashboard();
    }
  }

  renderShopView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    document.getElementById('shop-current-weight').innerText = `${this.player.walkWeight} kg`;
    document.getElementById('shop-target-weight').innerText = `${this.player.targetWeightKg} kg`;

    // Weight class switcher select dropdown
    const wcSelect = document.getElementById('shop-weight-class-select');
    if (wcSelect) {
      const currentTag = isEn ? '★ Current' : '★ Mevcut';
      wcSelect.innerHTML = WEIGHT_CLASSES.map(w => `
        <option value="${w.id}" ${this.player.weightClass === w.id ? 'selected' : ''}>
          ${w.name} (Limit: ${w.limitKg} kg / ${w.limitLbs} lbs) ${this.player.weightClass === w.id ? currentTag : ''}
        </option>
      `).join('');
    }

    // Nutrition items
    const nutContainer = document.getElementById('nutrition-items-container');
    if (nutContainer) {
      const buyText = isEn ? 'Buy & Consume' : 'Satın Al & Ye';
      nutContainer.innerHTML = NUTRITION_ITEMS.map(item => {
        const iName = isEn && item.nameEn ? item.nameEn : item.name;
        const iDesc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
        return `
          <div class="glass-card" style="padding: 0.6rem; border-color: var(--bg-card-border);">
            <h4 style="font-size: 0.88rem; color: var(--accent-gold); margin-bottom: 0.2rem;">${iName}</h4>
            <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.4rem;">${iDesc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--accent-cyan); font-size: 0.95rem;">$${item.cost}</strong>
              <button class="btn btn-gold btn-sm" onclick="window.app.buyNutrition('${item.id}')">${buyText}</button>
            </div>
          </div>
        `;
      }).join('');
    }

    // Gym upgrades
    const gymContainer = document.getElementById('gym-upgrades-container');
    if (gymContainer) {
      const buyLabel = isEn ? 'Purchase' : 'Satın Al';
      const activeLabel = isEn ? 'Active Facility' : 'Aktif Tesis';
      const currentLabel = isEn ? ' (CURRENT)' : ' (MEVCUT)';
      gymContainer.innerHTML = GYM_UPGRADES.map(g => {
        const gName = isEn && g.nameEn ? g.nameEn : g.name;
        const gDesc = isEn && g.descriptionEn ? g.descriptionEn : g.description;
        return `
          <div class="glass-card" style="padding: 0.6rem; border-color:${this.player.gymTier === g.tier ? 'var(--accent-gold)' : 'var(--bg-card-border)'};">
            <h4 style="font-size: 0.88rem; margin-bottom: 0.2rem;">${gName} ${this.player.gymTier === g.tier ? currentLabel : ''}</h4>
            <p style="font-size: 0.72rem; color:var(--text-muted); margin-bottom: 0.4rem;">${gDesc}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color:var(--accent-gold); font-size:0.95rem;">$${g.cost.toLocaleString()}</strong>
              ${this.player.gymTier < g.tier ? `
                <button class="btn btn-gold btn-sm" onclick="window.app.buyGym(${g.tier}, ${g.cost})">${buyLabel}</button>
              ` : `<span style="color:#10b981; font-weight:700; font-size:0.75rem;">${activeLabel}</span>`}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  buyNutrition(itemId) {
    if (!this.career) return;
    const item = NUTRITION_ITEMS.find(i => i.id === itemId);
    if (!item) return;
    const isEn = this.lang === 'en';

    if (this.player.money < item.cost) {
      alert(isEn ? 'Insufficient funds!' : 'Yetersiz bakiye! Yemek/Takviye alacak paranız yok.');
      return;
    }

    sfx.playClick();
    this.career.buyNutrition(item);
    this.saveGame();
    this.renderShopView();
    this.updateHeaderAndDashboard();
    const itemName = isEn && item.nameEn ? item.nameEn : item.name;
    alert(isEn ? `😋 Consumed ${itemName}.\nCurrent Weight: ${this.player.walkWeight} kg` : `😋 Afiyet olsun! ${item.name} tüketildi.\nMevcut Kilonuz: ${this.player.walkWeight} kg`);
  }

  changeWeightClassFromShop() {
    if (!this.career) return;
    const wcSelect = document.getElementById('shop-weight-class-select');
    if (!wcSelect) return;
    const isEn = this.lang === 'en';

    const newWcId = wcSelect.value;
    if (newWcId === this.player.weightClass) {
      alert(isEn ? 'You are already in this weight class!' : 'Zaten bu sıklet sınıfındasınız!');
      return;
    }

    sfx.playClick();
    this.career.changeWeightClass(newWcId);
    this.saveGame();
    this.renderShopView();
    this.updateHeaderAndDashboard();
    const wcObj = WEIGHT_CLASSES.find(w => w.id === newWcId);
    alert(isEn ? `⚖️ CONGRATS! Your division was changed to ${wcObj?.name} (${wcObj?.limitKg} kg)!\nNew match offers generated.` : `⚖️ TEBRİKLER! Sıkletiniz ${wcObj?.name} (${wcObj?.limitKg} kg) olarak değiştirildi!\nYeni rakip teklifleri oluşturuldu.`);
  }

  buyGym(tier, cost) {
    const isEn = this.lang === 'en';
    if (this.player && this.player.money >= cost) {
      sfx.playClick();
      this.player.money -= cost;
      this.player.gymTier = tier;
      this.saveGame();
      this.renderShopView();
      this.updateHeaderAndDashboard();
    } else {
      alert(isEn ? 'Insufficient funds!' : 'Yetersiz bakiye!');
    }
  }

  renderLegacyView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';
    const score = this.player.getGoatScore();
    document.getElementById('legacy-goat-score').innerText = score.toLocaleString();

    const details = document.getElementById('legacy-summary-details');
    if (isEn) {
      details.innerHTML = `
        <p style="margin-bottom:0.4rem;"><strong>Total Record:</strong> ${this.player.record.wins} Wins, ${this.player.record.losses} Losses</p>
        <p style="margin-bottom:0.4rem;"><strong>Knockout Victories:</strong> ${this.player.record.koWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Submission Victories:</strong> ${this.player.record.subWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Title Belts Held:</strong> ${this.player.isChampion ? 1 : 0}</p>
        <p style="margin-bottom:0.4rem;"><strong>Title Defenses:</strong> ${this.player.titleDefenses}</p>
        <p style="margin-bottom:0.4rem;"><strong>Total Wealth:</strong> $${this.player.money.toLocaleString()}</p>
      `;
    } else {
      details.innerHTML = `
        <p style="margin-bottom:0.4rem;"><strong>Toplam Rekor:</strong> ${this.player.record.wins} Galibiyet, ${this.player.record.losses} Yenilgi</p>
        <p style="margin-bottom:0.4rem;"><strong>Nakavt Zaferleri:</strong> ${this.player.record.koWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Pes Ettirme Zaferleri:</strong> ${this.player.record.subWins}</p>
        <p style="margin-bottom:0.4rem;"><strong>Şampiyonluk Kemer Sayısı:</strong> ${this.player.isChampion ? 1 : 0}</p>
        <p style="margin-bottom:0.4rem;"><strong>Kemer Savunmaları:</strong> ${this.player.titleDefenses}</p>
        <p style="margin-bottom:0.4rem;"><strong>Toplam Servet:</strong> $${this.player.money.toLocaleString()}</p>
      `;
    }
  }
}

// Global attachment for inline onclick handlers
window.addEventListener('DOMContentLoaded', () => {
  window.app = new MMAGoatApp();
});
