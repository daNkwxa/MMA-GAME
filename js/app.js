// MMA GOAT - Main Application Orchestrator

import { FIGHT_STYLES, WEIGHT_CLASSES, COUNTRIES, ORGANIZATIONS, GYM_UPGRADES, WEIGHT_CUT_STRATEGIES, NUTRITION_ITEMS, GLOVES_CATALOG, DIAMOND_PACKAGES, GOLD_EXCHANGE_PACKAGES } from './data.js';
import { Fighter } from './fighter.js';
import { CareerManager } from './career.js';
import { FightEngine } from './fightEngine.js';
import { AdManager } from './adManager.js';
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
    tabGloves: '🥊 Eldiven',
    tabCamp: '🏋️ Kamp',
    tabOctagon: '🥊 Octagon',
    tabRankings: '🏆 Lig',
    tabSocial: '📱 Sosyal',
    tabShop: '🏬 Mağaza',
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
    totalWealth: 'Toplam Servet:',

    rankHeadRank: 'Sıra',
    rankHeadFighter: 'Dövüşçü',
    rankHeadStyle: 'Stil',
    rankHeadRecord: 'Rekor',
    rankHeadOvr: 'OVR',

    btnRankPro: '👑 Profesyonel',
    btnRankAmateur: '🥊 Amatör Lig',

    statsTitle: '📊 Dövüşçü Statları & Nitelikleri',
    statsFighterLabel: 'Dövüşçü',
    spBannerText: '✨ Kullanılabilir Yetenek Puanı (Skill Points):',
    spBannerDesc: 'Puanlar kampa katılarak kazanılır. Yüksek statlar daha fazla SP gerektirir (Soft Cap: 75).',
    careerSummaryTitle: '🏆 Kariyer Özeti',

    shopDiamondsTitle: '💎 Elmas & Geliştiriciye Bağış Mağazası',
    shopDiamondsDesc: 'Oyunu desteklemek ve efsanevî eldivenler, altın takasları ve VIP ayrıcalıklar açmak için Elmas paketlerini tercih edebilirsiniz:',
    shopVipTitle: '🛡️ Reklam Engelleme & VIP Dövüşçü Statüsü',
    shopVipDesc: '• Reklamsız Kesintisiz Deneyim<br>• Dövüş Kazanımlarında <strong>+%15 Ekstra Altın Bonusu</strong><br>• VIP Profil Rozeti & Altın İsim Parlaması',
    shopExchangeTitle: '💱 Döviz Bürosu (Elmas ➔ Altın Takası)',
    shopExchangeDesc: 'Elmaslarınızı anında oyun içi nakit paraya (💰) dönüştürebilirsiniz:',
    shopGymTitle: '🏬 Salon & Tesis Yükseltmeleri',
    balance: 'Bakiye',

    glovesTitle: '🥊 Eldiven Ekipman Mağazası & Soyunma Odası',
    glovesDesc: 'Eldivenler dövüşte % Stat Bonusu verir'
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
    tabGloves: '🥊 Gloves',
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
    totalWealth: 'Total Wealth:',

    rankHeadRank: 'Rank',
    rankHeadFighter: 'Fighter',
    rankHeadStyle: 'Style',
    rankHeadRecord: 'Record',
    rankHeadOvr: 'OVR',

    btnRankPro: '👑 Professional',
    btnRankAmateur: '🥊 Amateur League',

    statsTitle: '📊 Fighter Stats & Attributes',
    statsFighterLabel: 'Fighter',
    spBannerText: '✨ Available Skill Points (SP):',
    spBannerDesc: 'Points are earned in camp. Higher stats require more SP (Soft Cap: 75).',
    careerSummaryTitle: '🏆 Career Summary',

    shopDiamondsTitle: '💎 Diamond & Supporter Store',
    shopDiamondsDesc: 'Support the game and unlock legendary gloves, gold exchanges, and VIP perks with Diamond packs:',
    shopVipTitle: '🛡️ Ad-Free & VIP Fighter Pass',
    shopVipDesc: '• Seamless Ad-Free Experience<br>• <strong>+15% Extra Gold Bonus</strong> on All Fight Earnings<br>• VIP Profile Badge & Gold Name Glow',
    shopExchangeTitle: '💱 Exchange Bureau (Diamonds ➔ Gold)',
    shopExchangeDesc: 'Convert your Diamonds into in-game Cash (💰) instantly:',
    shopGymTitle: '🏬 Gym & Facility Upgrades',
    balance: 'Balance',

    glovesTitle: '🥊 Gloves Equipment Store & Locker',
    glovesDesc: 'Gloves grant percentage Stat Bonuses in fights'
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
    this.adManager = new AdManager();

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
      this.renderRankingsView();
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
        activeSponsorships: this.career.activeSponsorships || [],
        amateurRankings: this.career.amateurRankings || [],
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
        this.career.activeSponsorships = data.career.activeSponsorships || [];

        // Reconstruct amateur rankings safely
        if (data.career.amateurRankings && Array.isArray(data.career.amateurRankings)) {
          this.career.amateurRankings = data.career.amateurRankings
            .filter(rData => rData !== null && rData !== undefined)
            .map(rData => {
              if (rData.id === this.player.id) return this.player;
              return new Fighter(rData);
            });
        } else {
          this.career.amateurRankings = this.career.generateInitialAmateurRankings();
        }

        // Reconstruct pro ranking Fighter objects safely
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
    if (screenId === 'screen-gloves') this.renderGlovesView();
    if (screenId === 'screen-legacy') this.renderLegacyView();
    if (screenId === 'screen-stats') this.renderStatsView();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateHeaderAndDashboard() {
    if (!this.player) return;

    const isEn = this.lang === 'en';

    // Header updates
    const rankText = this.player.isAmateur ? (isEn ? 'Amateur' : 'Amatör') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    document.getElementById('hdr-org').innerText = this.player.isAmateur ? (isEn ? 'AMATEUR' : 'AMATÖR') : this.player.organizationId.toUpperCase();
    document.getElementById('hdr-weight').innerText = `${this.player.weightClass} (${rankText})`;
    
    const recObj = this.player.isAmateur ? (this.player.amateurRecord || { wins: 0, losses: 0, draws: 0 }) : this.player.record;
    document.getElementById('hdr-record').innerText = `${recObj.wins}-${recObj.losses}-${recObj.draws || 0}`;
    document.getElementById('hdr-money').innerText = `$${this.player.money.toLocaleString()}`;
    const diamondsEl = document.getElementById('hdr-diamonds');
    if (diamondsEl) diamondsEl.innerText = (this.player.diamonds || 0).toLocaleString();
    document.getElementById('hdr-fame').innerText = `${this.player.fame}`;
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

    // Render Feature 11: Dashboard Weight Management Card
    this.renderDashboardWeightCard();

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
                  ${isEn ? 'Rank:' : 'Sıra:'} <strong style="color:var(--accent-gold);">${opp.isAmateur ? 'Amatör' : '#' + opp.rank}</strong> | ${styleName} | OVR: ${opp.getOverallRating()} | (${opp.record.wins}-${opp.record.losses})
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

    // Check and show active career event modal on Dashboard
    if (this.career && this.career.activeEvent) {
      setTimeout(() => {
        this.showEventModal(this.career.activeEvent);
      }, 300);
    }
  }

  showWeighInModal() {
    const modal = document.getElementById('weighin-modal');
    if (!modal || !this.player) return;

    const currentKg = this.player.currentWeight || (this.player.targetWeightKg + 3.8);
    const targetKg = this.player.targetWeightKg;
    const diffKg = Number((currentKg - targetKg).toFixed(1));

    document.getElementById('weighin-current-kg').innerText = `${currentKg} kg`;
    document.getElementById('weighin-target-kg').innerText = `${targetKg} kg`;
    document.getElementById('weighin-diff-kg').innerText = diffKg > 0 ? `+${diffKg} kg` : `${diffKg} kg`;

    document.getElementById('weighin-strategy-section').style.display = 'block';
    document.getElementById('weighin-result-section').style.display = 'none';

    const stratList = document.getElementById('weighin-strategies-list');
    if (stratList) {
      stratList.innerHTML = Object.keys(WEIGHT_CUT_STRATEGIES).map(key => {
        const s = WEIGHT_CUT_STRATEGIES[key];
        const sName = this.lang === 'en' && s.nameEn ? s.nameEn : s.name;
        const sDesc = this.lang === 'en' && s.descEn ? s.descEn : s.desc;
        return `
          <div class="glass-card" style="cursor: pointer; transition: transform 0.2s; border-color: var(--accent-gold); margin-bottom: 0.5rem;" onclick="window.app.handleWeighInChoice('${key}')">
            <h4 style="color: var(--accent-gold); margin-bottom: 0.3rem;">${sName}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.4rem;">${sDesc}</p>
            <div style="font-size: 0.75rem; color: var(--accent-cyan);">⚡ Enerji Düşüşü: -${s.energyPenalty} | Tahmini Kilo Kaybı: ~${s.weightCutKg} kg</div>
          </div>
        `;
      }).join('');
    }

    modal.style.display = 'flex';
  }

  handleWeighInChoice(strategyKey) {
    if (!this.career) return;
    sfx.playClick();
    const res = this.career.processWeighIn(strategyKey);
    this.saveGame();

    document.getElementById('weighin-strategy-section').style.display = 'none';
    const resultSec = document.getElementById('weighin-result-section');
    if (resultSec) resultSec.style.display = 'block';

    const badge = document.getElementById('weighin-status-badge');
    if (badge) {
      if (res.passed) {
        badge.style.background = 'rgba(34, 197, 94, 0.2)';
        badge.style.border = '2px solid #22c55e';
        badge.style.color = '#22c55e';
        badge.innerText = '✅ TARTI PASSED (KİLO TUTTU)';
      } else {
        badge.style.background = 'rgba(239, 68, 68, 0.2)';
        badge.style.border = '2px solid #ef4444';
        badge.style.color = '#ef4444';
        badge.innerText = '❌ TARTI KAÇIRILDI (MAÇ İPTAL)';
      }
    }

    const txt = document.getElementById('weighin-result-text');
    if (txt) txt.innerText = res.message;

    const confirmBtn = document.getElementById('btn-weighin-confirm');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        sfx.playClick();
        const modal = document.getElementById('weighin-modal');
        if (modal) modal.style.display = 'none';
        this.updateHeaderAndDashboard();
        if (res.passed) {
          this.prepareOctagonView();
          this.switchScreen('screen-octagon');
        } else {
          this.switchScreen('screen-dashboard');
        }
      };
    }
  }

  // Feature 11: Render Dashboard Weight Class Card
  renderDashboardWeightCard() {
    const card = document.getElementById('dash-weight-card');
    if (!card || !this.player) return;

    const isEn = this.lang === 'en';
    const wcObj = WEIGHT_CLASSES.find(w => w.id === this.player.weightClass) || WEIGHT_CLASSES[3];
    const currentIndex = WEIGHT_CLASSES.findIndex(w => w.id === this.player.weightClass);

    let statusBadge = '';
    if (this.player.weightAdaptationFightsLeft > 0) {
      let penaltyDesc = isEn ? '-15% Speed Penalty' : '-%15 Hız Cezası (Sıklet Üstü)';
      if (this.player.weightPenaltyType === 'stamina_loss') {
        penaltyDesc = isEn ? '-15% Stamina Penalty' : '-%15 Kondisyon Cezası (Kilo Kesimi)';
      } else if (this.player.weightPenaltyType === 'severe_recovery') {
        penaltyDesc = isEn ? '-12% Speed & Stamina' : '-%12 Hız & Kondisyon (Aşırı Geçiş)';
      }

      statusBadge = `
        <div style="background: rgba(255,42,95,0.15); border: 1px solid var(--accent-red); border-radius: 6px; padding: 0.35rem 0.6rem; color: var(--accent-red); font-size: 0.78rem; font-weight: 700; margin-top: 0.4rem;">
          ⚠️ ${isEn ? 'Weight Adaptation' : 'Sıklet Uyum Süresi'}: ${this.player.weightAdaptationFightsLeft} ${isEn ? 'fights left' : 'maç kaldı'} (${penaltyDesc})
        </div>
      `;
    } else {
      statusBadge = `
        <div style="background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 6px; padding: 0.25rem 0.5rem; color: #22c55e; font-size: 0.75rem; font-weight: 700; margin-top: 0.4rem; display: inline-block;">
          ✅ ${isEn ? 'Fully Adapted to Division' : 'Sıklete Tam Uyumlu'}
        </div>
      `;
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">${isEn ? '⚖️ Division & Weight Target' : '⚖️ Siklet & Kilo Hedefi'}</span>
          <h3 style="font-size: 1.05rem; color: var(--accent-cyan); margin: 0.1rem 0;">${wcObj.name} (${wcObj.limitKg} kg / ${wcObj.limitLbs} lbs)</h3>
          <p style="font-size: 0.8rem; color: #fff;">
            ${isEn ? 'Current Weight:' : 'Mevcut Kilo:'} <strong>${this.player.walkWeight} kg</strong> | ${isEn ? 'Target Limit:' : 'Limit:'} <strong>${wcObj.limitKg} kg</strong>
          </p>
        </div>
        <div style="display: flex; gap: 0.3rem;">
          <button class="btn btn-secondary btn-sm" onclick="window.app.changeWeightClassDashboard(-1)" ${currentIndex <= 0 ? 'disabled style="opacity:0.4;"' : ''}>
            ⬇️ ${isEn ? 'Down' : 'Alt Siklet'}
          </button>
          <button class="btn btn-cyan btn-sm" onclick="window.app.changeWeightClassDashboard(1)" ${currentIndex >= WEIGHT_CLASSES.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
            ⬆️ ${isEn ? 'Up' : 'Üst Siklet'}
          </button>
        </div>
      </div>
      ${statusBadge}
    `;
  }

  changeWeightClassDashboard(direction) {
    if (!this.career || !this.player) return;
    const isEn = this.lang === 'en';
    const currentIndex = WEIGHT_CLASSES.findIndex(w => w.id === this.player.weightClass);
    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= WEIGHT_CLASSES.length) return;

    const targetWc = WEIGHT_CLASSES[newIndex];
    sfx.playClick();
    this.career.changeWeightClass(targetWc.id);
    this.saveGame();
    this.updateHeaderAndDashboard();
    alert(isEn 
      ? `⚖️ Division changed to ${targetWc.name} (${targetWc.limitKg} kg)!\nWeight adaptation period initiated (3 fights).`
      : `⚖️ Sikletiniz ${targetWc.name} (${targetWc.limitKg} kg) olarak değiştirildi!\n3 maçlık sıklet uyum süreci başladı.`
    );
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

  // Feature 10: Training Camp with Nutrition & Meal Plan
  updateCampView() {
    if (!this.career) return;

    const wrapper = document.getElementById('camp-card-wrapper');
    if (!wrapper) return;

    if (this.career.weighInRequired) {
      this.switchScreen('screen-dashboard');
      this.showWeighInModal();
      return;
    }

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

    const isEn = this.lang === 'en';
    const energyColor = this.player.energy < 5 ? 'var(--accent-red)' : 'var(--accent-cyan)';

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
        <h2 style="font-size: 1rem;">🏋️ Kamp (${this.career.currentOpponent?.name || 'Rakip'})</h2>
        <div style="display: flex; gap: 0.4rem;">
          <div class="stat-pill">📅 <strong>${this.career.campDay} / ${this.career.maxCampDays}</strong></div>
          <div class="stat-pill">⚡ <strong style="color: ${energyColor};">${this.player.energy}%</strong></div>
          <div class="stat-pill">🎯 <strong>${this.career.currentDayActivitiesLeft}</strong></div>
        </div>
      </div>

      <div class="tactics-grid" style="margin-bottom: 1rem;">
        <div class="tactic-btn" onclick="window.app.doCampActivity('sparring')">
          <h4>🥊 Ağır Sparring</h4>
          <p>Punch (+1) | +1 SP | -18 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('wrestling_drills')">
          <h4>🤼 Güreş & TDD</h4>
          <p>Wrestling (+1) | +1 SP | -20 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('bjj_rolling')">
          <h4>🥋 BJJ Rolling</h4>
          <p>Submission (+1) | +1 SP | -15 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('conditioning')">
          <h4>🏃 Kondisyon</h4>
          <p>Cardio (+1) | +1 SP | -22 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('video_analysis')">
          <h4>📹 Rakip Analiz</h4>
          <p>Fight IQ (+1) | +1 SP | -5 ⚡</p>
        </div>
        <div class="tactic-btn" onclick="window.app.doCampActivity('rest_sauna')">
          <h4>🧘 Sauna & Dinlen</h4>
          <p>+35 ⚡ | Stres (-)</p>
        </div>
        <div class="tactic-btn" style="border: 1px solid var(--accent-cyan); background: rgba(0,243,255,0.08);" onclick="window.app.watchAdForEnergyBoost()">
          <h4 style="color: var(--accent-cyan);">🎥 ${isEn ? 'Instant Recovery' : 'Hızlı Enerji'}</h4>
          <p>${isEn ? 'Watch Ad (+50 Energy)' : 'Reklam İzle (+50 Enerji)'}</p>
        </div>
      </div>

      <!-- Feature 10: Nutrition Section in Training Camp -->
      <div style="border-top: 1px dashed var(--bg-card-border); padding-top: 0.8rem; margin-top: 0.8rem;">
        <h3 style="font-size: 0.95rem; color: var(--accent-gold); margin-bottom: 0.4rem;">🍎 Kamp Beslenme & Kütle Programı</h3>
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.6rem;">
          Mevcut Kilo: <strong>${this.player.walkWeight} kg</strong> | Limit: <strong>${this.player.targetWeightKg} kg</strong>
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.5rem;">
    `;

    NUTRITION_ITEMS.forEach(item => {
      const iName = isEn && item.nameEn ? item.nameEn : item.name;
      const iDesc = isEn && item.descriptionEn ? item.descriptionEn : item.description;
      html += `
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 0.5rem;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #fff;">${iName}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin: 0.2rem 0;">${iDesc}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.4rem;">
            <strong style="color: var(--accent-gold); font-size: 0.85rem;">$${item.cost}</strong>
            <button class="btn btn-gold btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="window.app.buyNutrition('${item.id}')">${isEn ? 'Eat' : 'Tüket'}</button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    wrapper.innerHTML = html;
  }

  doCampActivity(activityId) {
    if (!this.career) return;

    sfx.playClick();
    const result = this.career.performCampActivity(activityId);

    if (result === 'no_energy') {
      const isEn = this.lang === 'en';
      alert(isEn ? 'Too exhausted to train! Take sauna or rest.' : 'Çok yorgunsunuz! Antrenman yapmak için önce dinlenmeli veya saunaya girmelisiniz.');
      return;
    }

    this.saveGame();
    this.updateCampView();
    this.updateHeaderAndDashboard();
  }

  prepareOctagonView() {
    if (!this.career) return;
    const opponent = this.career.currentOpponent || this.career.findNextOpponent();
    if (!opponent) return;

    this.fightEngine = new FightEngine(this.player, opponent, 3, this.player.rank === 0);

    const isEn = this.lang === 'en';
    const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
    const oppStyle = isEn && FIGHT_STYLES[opponent.styleKey]?.nameEn ? FIGHT_STYLES[opponent.styleKey].nameEn : (FIGHT_STYLES[opponent.styleKey]?.name || 'MMA');

    const pNameEl = document.getElementById('fight-player-name');
    if (pNameEl) pNameEl.innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    const pStyleEl = document.getElementById('fight-player-style');
    if (pStyleEl) pStyleEl.innerText = pStyle;

    const oppNameEl = document.getElementById('fight-opp-name');
    if (oppNameEl) oppNameEl.innerText = `${opponent.country?.flag || ''} ${opponent.name}`;
    const oppStyleEl = document.getElementById('fight-opp-style');
    if (oppStyleEl) oppStyleEl.innerText = oppStyle;

    this.renderTacticsButtons();
    this.updateFightUI();
  }

  renderTacticsButtons() {
    const container = document.getElementById('tactics-buttons-container');
    if (!container || !this.fightEngine) return;

    const tactics = this.fightEngine.getAvailableTactics();
    container.innerHTML = tactics.map(t => {
      const tName = this.lang === 'en' && t.nameEn ? t.nameEn : t.name;
      const tDesc = this.lang === 'en' && t.descEn ? t.descEn : t.desc;
      return `
        <div class="tactic-btn" onclick="window.app.playRoundChoice('${t.id}')">
          <h4>${tName}</h4>
          <p>${tDesc}</p>
        </div>
      `;
    }).join('');
  }

  playRoundChoice(tacticId) {
    if (!this.fightEngine || this.fightEngine.isFinished) return;

    sfx.playPunch();
    const outcome = this.fightEngine.playRound(tacticId);

    this.updateFightUI();

    if (outcome && outcome.winner) {
      sfx.playBell();
      if (outcome.winner === 'player') sfx.playCrowdCheer();

      const resultObj = this.career.handlePostFightResults(outcome, this.fightEngine.opponent);
      this.saveGame();

      setTimeout(() => {
        this.showFightResultModal(outcome, resultObj);
      }, 700);
    }
  }

  showFightResultModal(outcome, resultObj) {
    const modal = document.getElementById('fight-result-modal');
    if (!modal) return;
    const isEn = this.lang === 'en';

    this.lastFightOutcome = outcome;
    this.lastFightResultObj = resultObj;
    this.doubleRewardClaimed = false;

    const isPlayerWin = outcome.winner === 'player';
    const winName = isPlayerWin ? this.player.name : this.fightEngine.opponent.name;
    const winFlag = isPlayerWin ? (this.player.country?.flag || '🇹🇷') : (this.fightEngine.opponent.country?.flag || '🏳️');

    const iconEl = document.getElementById('fight-result-icon');
    if (iconEl) iconEl.innerText = isPlayerWin ? '🏆' : (outcome.winner === 'draw' ? '⚖️' : '💔');

    const titleEl = document.getElementById('fight-result-title');
    if (titleEl) titleEl.innerText = isEn ? '🥊 FIGHT FINISHED' : '🥊 DÖVÜŞ SONA ERDİ';
    
    const winnerBadge = document.getElementById('fight-result-winner-badge');
    if (winnerBadge) {
      if (outcome.winner === 'draw') {
        winnerBadge.innerHTML = isEn ? '⚖️ MATCH DRAW' : '⚖️ BERABERE';
        winnerBadge.style.borderColor = 'var(--text-muted)';
        winnerBadge.style.color = '#fff';
        winnerBadge.style.background = 'rgba(255,255,255,0.1)';
      } else if (isPlayerWin) {
        winnerBadge.innerHTML = `🏆 ${isEn ? 'Winner:' : 'Kazanan:'} ${winFlag} ${winName}`;
        winnerBadge.style.borderColor = 'var(--accent-gold)';
        winnerBadge.style.color = 'var(--accent-gold)';
        winnerBadge.style.background = 'rgba(255,215,0,0.15)';
      } else {
        winnerBadge.innerHTML = `❌ ${isEn ? 'Winner:' : 'Kazanan:'} ${winFlag} ${winName}`;
        winnerBadge.style.borderColor = 'var(--accent-red)';
        winnerBadge.style.color = 'var(--accent-red)';
        winnerBadge.style.background = 'rgba(255,42,95,0.15)';
      }
    }

    const methodEl = document.getElementById('fight-result-method');
    if (methodEl) {
      methodEl.innerText = isEn 
        ? `Method: ${outcome.method}`
        : `Yöntem: ${outcome.method}`;
    }

    this.renderFightResultRewardsGrid();

    const doubleBtn = document.getElementById('btn-fight-result-double-reward');
    if (doubleBtn) {
      doubleBtn.style.display = 'block';
      doubleBtn.disabled = false;
      doubleBtn.style.opacity = '1';
      doubleBtn.innerText = isEn ? '🎥 CLAIM 2X FIGHT REWARD (WATCH AD)' : '🎥 2X MAÇ ÖDÜLÜ KAZAN (REKLAM İZLE)';
    }

    const closeBtn = document.getElementById('btn-fight-result-close');
    if (closeBtn) {
      closeBtn.innerText = isEn 
        ? '🔥 RETURN TO DASHBOARD & CONTINUE CAREER' 
        : '🔥 ANA SAYFAYA DÖN & KARİYERE DEVAM ET';
    }

    modal.classList.add('active');
  }

  renderFightResultRewardsGrid() {
    const grid = document.getElementById('fight-result-rewards-grid');
    if (!grid) return;
    const isEn = this.lang === 'en';
    const resultObj = this.lastFightResultObj || {};
    const isPlayerWin = this.lastFightOutcome?.winner === 'player';

    const multiplier = this.doubleRewardClaimed ? 2 : 1;
    const spVal = (resultObj?.spGained || (isPlayerWin ? 3 : 1)) * multiplier;
    const moneyVal = (resultObj?.totalEarned || 0) * multiplier;
    const fameVal = (resultObj?.fameGained || 0) * multiplier;
    const diaVal = (resultObj?.diamondReward || 0) * multiplier;

    const claimedTag = this.doubleRewardClaimed ? ` <span style="font-size:0.72rem; color:#4caf50;">(2X AKTİF!)</span>` : '';

    grid.innerHTML = `
      <div style="background: rgba(255,215,0,0.1); border: 1px solid var(--accent-gold); border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Skill Points' : 'Yetenek Puanı'}</span>
        <strong style="color: var(--accent-gold); font-size: 1.1rem;">+${spVal} SP${claimedTag}</strong>
      </div>
      <div style="background: rgba(76,175,80,0.1); border: 1px solid #4caf50; border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Purse Money' : 'Para Ödülü'}</span>
        <strong style="color: #4caf50; font-size: 1.1rem;">+$${moneyVal.toLocaleString()}${claimedTag}</strong>
      </div>
      <div style="background: rgba(38,198,218,0.1); border: 1px solid var(--accent-cyan); border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Fame' : 'Şöhret'}</span>
        <strong style="color: var(--accent-cyan); font-size: 1.1rem;">+${fameVal} ⭐${claimedTag}</strong>
      </div>
      <div style="background: rgba(171,71,188,0.1); border: 1px solid #ab47bc; border-radius: 8px; padding: 0.5rem; text-align: center;">
        <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">${isEn ? 'Diamonds' : 'Elmas'}</span>
        <strong style="color: #ab47bc; font-size: 1.1rem;">+${diaVal} 💎${claimedTag}</strong>
      </div>
    `;
  }

  // Rewarded Ad Action 1: 2x Fight Rewards
  watchAdForDoubleReward() {
    if (this.doubleRewardClaimed) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.adManager.showRewardedAd(
      () => {
        // Reward Callback — Grant 2x rewards!
        const resultObj = this.lastFightResultObj || {};
        const bonusMoney = resultObj.totalEarned || 0;
        const bonusSp = resultObj.spGained || 0;
        const bonusFame = resultObj.fameGained || 0;
        const bonusDia = resultObj.diamondReward || 0;

        this.player.money += bonusMoney;
        this.player.skillPoints = (this.player.skillPoints || 0) + bonusSp;
        this.player.fame = Math.min(100, this.player.fame + bonusFame);
        this.player.diamonds = (this.player.diamonds || 0) + bonusDia;

        this.doubleRewardClaimed = true;
        this.saveGame();
        this.updateHeaderAndDashboard();
        this.renderFightResultRewardsGrid();

        const doubleBtn = document.getElementById('btn-fight-result-double-reward');
        if (doubleBtn) {
          doubleBtn.disabled = true;
          doubleBtn.style.opacity = '0.5';
          doubleBtn.innerText = isEn ? '✅ 2X REWARD CLAIMED!' : '✅ 2X ÖDÜL ALINDI!';
        }

        sfx.playCrowdCheer();
        alert(isEn ? '🎉 2x Fight Reward Claimed Successfully!' : '🎉 Tebrikler! 2 Katı Maç Ödülü Hesabınıza Eklendi!');
      },
      (reason) => {
        alert(isEn ? 'Ad was cancelled or not completed. No bonus granted.' : 'Reklam tamamlanmadı veya kapatıldı. Ekstra 2x ödül verilmedi.');
      }
    );
  }

  // Rewarded Ad Action 2: Camp Instant +50 Energy
  watchAdForEnergyBoost() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.adManager.showRewardedAd(
      () => {
        this.player.energy = Math.min(100, this.player.energy + 50);
        this.saveGame();
        this.updateHeaderAndDashboard();
        this.updateCampView();
        sfx.playClick();
        alert(isEn ? '⚡ +50 Energy Boost Claimed!' : '⚡ Tebrikler! Reklam izleyerek +50 Enerji Kazandınız!');
      },
      () => {
        alert(isEn ? 'Ad was cancelled or not completed.' : 'Reklam tamamlanmadı veya kapatıldı. Enerji ödülü verilmedi.');
      }
    );
  }

  closeFightResultModal() {
    sfx.playClick();
    const modal = document.getElementById('fight-result-modal');
    if (modal) modal.classList.remove('active');
    this.switchScreen('screen-dashboard');
  }

  updateFightUI() {
    if (!this.fightEngine) return;

    const st = this.fightEngine.state;
    const pHead = document.getElementById('fight-p-head');
    if (pHead) pHead.style.width = `${Math.max(0, st.player.headHp)}%`;
    const pStam = document.getElementById('fight-p-stam');
    if (pStam) pStam.style.width = `${Math.max(0, st.player.stamina)}%`;

    const oppHead = document.getElementById('fight-opp-head');
    if (oppHead) oppHead.style.width = `${Math.max(0, st.opponent.headHp)}%`;
    const oppStam = document.getElementById('fight-opp-stam');
    if (oppStam) oppStam.style.width = `${Math.max(0, st.opponent.stamina)}%`;

    // Commentary feed — keep scroll position steady without page jump
    const box = document.getElementById('fight-commentary-box');
    if (box) {
      box.innerHTML = this.fightEngine.commentary.map(c => `
        <div class="commentary-line ${c.type}">${c.text}</div>
      `).join('');
      box.scrollTop = 0;
    }
  }

  showEventModal(evt) {
    const modal = document.getElementById('event-modal');
    if (!modal) return;
    document.getElementById('modal-title').innerText = evt.title;
    document.getElementById('modal-desc').innerText = evt.description;

    const optContainer = document.getElementById('modal-options');
    if (optContainer) {
      optContainer.innerHTML = evt.options.map((opt, idx) => `
        <button class="btn btn-secondary" onclick="window.app.resolveEventOption(${idx})">${opt.text}</button>
      `).join('');
    }

    modal.classList.add('active');
  }

  resolveEventOption(index) {
    if (this.career) {
      sfx.playClick();
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
      const modal = document.getElementById('event-modal');
      if (modal) modal.classList.remove('active');
      this.updateHeaderAndDashboard();
    }
  }

  // Feature 5: Rankings Tab Switch (Pro vs Amateur)
  switchRankingsTab(tab) {
    this.currentRankingsTab = tab;
    sfx.playClick();
    this.renderRankingsView();
  }

  renderRankingsView() {
    if (!this.career) return;
    const isEn = this.lang === 'en';

    const proBtn = document.getElementById('btn-rankings-pro');
    const amBtn = document.getElementById('btn-rankings-amateur');

    const showAmateur = this.currentRankingsTab === 'amateur';

    if (proBtn) proBtn.className = `btn btn-sm ${!showAmateur ? 'btn-gold' : 'btn-secondary'}`;
    if (amBtn) amBtn.className = `btn btn-sm ${showAmateur ? 'btn-gold' : 'btn-secondary'}`;

    const tbody = document.getElementById('rankings-tbody');
    if (!tbody) return;

    let html = '';
    const youTag = isEn ? '(YOU)' : '(SEN)';
    const champTitle = isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON';

    if (showAmateur) {
      // Amateur Rankings — Sort by Wins desc, Losses asc, OVR desc
      const amRanks = [...(this.career.amateurRankings || [])];
      
      amRanks.sort((a, b) => {
        const aRec = a.id === this.player.id ? (this.player.amateurRecord || { wins: 0, losses: 0 }) : (a.record || { wins: 0, losses: 0 });
        const bRec = b.id === this.player.id ? (this.player.amateurRecord || { wins: 0, losses: 0 }) : (b.record || { wins: 0, losses: 0 });

        const aWins = aRec.wins || 0;
        const bWins = bRec.wins || 0;
        if (bWins !== aWins) return bWins - aWins;

        const aLosses = aRec.losses || 0;
        const bLosses = bRec.losses || 0;
        if (aLosses !== bLosses) return aLosses - bLosses;

        const aOvr = a.getOverallRating ? a.getOverallRating() : 30;
        const bOvr = b.getOverallRating ? b.getOverallRating() : 30;
        return bOvr - aOvr;
      });

      amRanks.forEach((f, idx) => {
        const isPlayer = this.player.isAmateur && f.id === this.player.id;
        const rankDisplay = idx === 0 ? champTitle : `#${idx}`;
        const fName = `${f.country?.flag || '🇹🇷'} ${f.name}`;
        const fStyle = isEn && FIGHT_STYLES[f.styleKey]?.nameEn ? FIGHT_STYLES[f.styleKey].nameEn : (FIGHT_STYLES[f.styleKey]?.name || 'MMA');
        const ovr = f.getOverallRating ? f.getOverallRating() : 35;
        const rec = f.id === this.player.id 
          ? `${this.player.amateurRecord?.wins || 0}-${this.player.amateurRecord?.losses || 0}`
          : `${f.record?.wins || 0}-${f.record?.losses || 0}`;

        html += `
          <tr class="${isPlayer ? 'highlight' : ''}">
            <td>${rankDisplay}</td>
            <td>${fName} ${isPlayer ? youTag : ''}</td>
            <td>${fStyle}</td>
            <td>${rec}</td>
            <td><strong style="color:var(--accent-cyan);">${ovr}</strong></td>
          </tr>
        `;
      });

      if (this.player.isAmateur && !amRanks.some(f => f.id === this.player.id)) {
        const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
        const amRec = this.player.amateurRecord || { wins: 0, losses: 0 };
        html += `
          <tr class="highlight" style="border-top: 2px dashed var(--accent-gold);">
            <td><span style="color: var(--accent-gold); font-weight: 700;">${isEn ? 'Amateur (NR)' : 'Amatör (NR)'}</span></td>
            <td>⭐ ${this.player.country?.flag || '🇹🇷'} ${this.player.name} ${youTag}</td>
            <td>${pStyle}</td>
            <td>${amRec.wins}-${amRec.losses}</td>
            <td><strong style="color:var(--accent-cyan);">${this.player.getOverallRating()}</strong></td>
          </tr>
        `;
      }
    } else {
      // Pro Rankings
      const proRanks = this.career.rankings || [];
      const byRank = {};
      proRanks.forEach(f => { if (f && f.rank !== undefined) byRank[f.rank] = f; });

      for (let r = 0; r <= 30; r++) {
        const rankDisplay = r === 0 ? champTitle : `#${r}`;

        if (!this.player.isAmateur && r === this.player.rank) {
          const pStyle = isEn && FIGHT_STYLES[this.player.styleKey]?.nameEn ? FIGHT_STYLES[this.player.styleKey].nameEn : (FIGHT_STYLES[this.player.styleKey]?.name || 'MMA');
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
          const ovr = f.getOverallRating ? f.getOverallRating() : 60;
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
        }
      }
    }

    tbody.innerHTML = html;
  }

  // Feature 8 & 2: Manual Stat Point Allocation in Stats View
  allocateStatPoint(statKey, points = 1) {
    if (!this.player) return;
    const isEn = this.lang === 'en';
    const allocated = this.player.allocateSkillPoint(statKey, points);
    if (allocated > 0) {
      sfx.playClick();
      this.saveGame();
      this.renderStatsView();
      this.updateHeaderAndDashboard();
    } else {
      const cost = this.player.getStatUpgradeCost(statKey);
      if (cost === Infinity) {
        alert(isEn ? 'Stat is at maximum (99)!' : 'Bu stat maksimum seviyeye (99) ulaştı!');
      } else {
        alert(isEn ? `Requires at least ${cost} Skill Points!` : `Bu statı geliştirmek için en az ${cost} Yetenek Puanı (SP) gerekiyor!`);
      }
    }
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

    document.getElementById('stats-fighter-name').innerText = `${this.player.country?.flag || ''} ${this.player.name}`;
    document.getElementById('stats-ovr').innerText = this.player.getOverallRating();
    const ageStrStats = isEn 
      ? `${this.player.age} Yo${this.player.ageMonths ? ` ${this.player.ageMonths} Mo` : ''}` 
      : `${this.player.age} Yaş${this.player.ageMonths ? ` ${this.player.ageMonths} Ay` : ''}`;
    document.getElementById('stats-age').innerText = ageStrStats;
    const styleObj = FIGHT_STYLES[this.player.styleKey];
    document.getElementById('stats-style').innerText = (isEn && styleObj?.nameEn) ? styleObj.nameEn : (styleObj?.name || 'MMA');

    // Render Skill Points counter
    const spEl = document.getElementById('stats-sp-count');
    if (spEl) spEl.innerText = this.player.skillPoints || 0;

    // Render Stat bars with [+1] and [+5] buttons
    const container = document.getElementById('stats-bars-container');
    const spAvailable = (this.player.skillPoints || 0);

    container.innerHTML = Object.keys(this.player.stats).map(key => {
      const val = this.player.stats[key];
      const info = statLabels[key] || { name: key, icon: '📊', color: '#90caf9' };
      const pct = Math.min(100, val);
      const cost = this.player.getStatUpgradeCost(key);

      const canUpgrade1 = spAvailable >= cost && val < 99;
      const canUpgrade5 = spAvailable >= cost && val < 99;
      const costTag = cost === Infinity ? 'MAX' : `${cost} SP`;

      return `
        <div style="margin-bottom: 0.7rem; background: rgba(0,0,0,0.2); padding: 0.4rem; border-radius: 8px; border: 1px solid var(--bg-card-border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
            <span style="font-size: 0.85rem; color: var(--text-main);">${info.icon} ${info.name}</span>
            <div style="display: flex; align-items: center; gap: 0.3rem;">
              <strong style="font-family: var(--font-heading); font-size: 1.05rem; color: ${info.color}; margin-right: 0.2rem;">${val}</strong>
              <button class="btn btn-gold btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="window.app.allocateStatPoint('${key}', 1)" ${!canUpgrade1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                +1 (${costTag})
              </button>
              <button class="btn btn-cyan btn-sm" style="padding: 0.15rem 0.45rem; font-size: 0.75rem;" onclick="window.app.allocateStatPoint('${key}', 5)" ${!canUpgrade5 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                +5 SP
              </button>
            </div>
          </div>
          <div class="bar-container" style="height: 10px;">
            <div class="bar-fill" style="width: ${pct}%; background: ${info.color}; transition: width 0.4s ease;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Career summary
    const summaryDiv = document.getElementById('stats-career-summary');
    const rankText = this.player.isAmateur ? (isEn ? 'Amateur' : 'Amatör (NR)') : (this.player.rank === 0 ? (isEn ? '👑 CHAMPION' : '👑 ŞAMPİYON') : `#${this.player.rank}`);
    const rec = this.player.isAmateur ? (this.player.amateurRecord || { wins: 0, losses: 0, draws: 0 }) : this.player.record;

    summaryDiv.innerHTML = `
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Record' : 'Rekor'}</div>
        <strong style="color:var(--accent-cyan);">${rec.wins}W - ${rec.losses}L - ${rec.draws || 0}D</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Ranking' : 'Sıralama'}</div>
        <strong style="color:var(--accent-gold);">${rankText}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'KO Wins' : 'KO Galibiyeti'}</div>
        <strong style="color:var(--accent-red);">${rec.koWins || 0}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Sub Wins' : 'Sub Galibiyeti'}</div>
        <strong style="color:#ab47bc;">${rec.subWins || 0}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Money' : 'Bakiye'}</div>
        <strong style="color:var(--accent-gold);">$${this.player.money.toLocaleString()}</strong>
      </div>
      <div style="background:rgba(0,0,0,0.3); padding:0.5rem; border-radius:8px; text-align:center;">
        <div style="font-size:0.75rem; color:var(--text-muted);">${isEn ? 'Fame' : 'Şöhret'}</div>
        <strong style="color:var(--accent-cyan);">${this.player.fame}</strong>
      </div>
    `;
  }

  // Feature 6: Render Sponsors View in Social Screen
  renderSponsorsView() {
    const container = document.getElementById('sponsors-section-container');
    if (!container || !this.career) return;
    const isEn = this.lang === 'en';

    const activeList = this.career.activeSponsorships || [];
    let html = `
      <h3 style="font-size: 1rem; color: var(--accent-gold); margin-bottom: 0.6rem;">💼 ${isEn ? 'Sponsorship Contracts' : 'Sponsorluk Sözleşmeleri & Kontratlar'}</h3>
    `;

    if (activeList.length > 0) {
      html += `
        <h4 style="font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">${isEn ? 'Active Contracts' : 'Aktif İmzalı Sözleşmeler'}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
      `;

      activeList.forEach(s => {
        const brandName = isEn && s.brandEn ? s.brandEn : s.brand;
        html += `
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--accent-gold); border-radius: 8px; padding: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
              <span style="font-weight: 700; font-size: 0.9rem; color: #fff;">${s.icon || '💼'} ${brandName}</span>
              <span style="font-size: 0.78rem; color: var(--accent-cyan); font-weight: 700;">Kalan: ${s.fightsRemaining} Maç</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.3rem;">${s.objectiveDesc || ''}</p>
            <div style="font-size: 0.75rem; color: var(--accent-gold);">
              Maç Başı Ödeme: <strong>$${s.payPerFight.toLocaleString()}</strong> | Galibiyet Bonusu: <strong>+$${s.winBonus.toLocaleString()}</strong>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `
      <h4 style="font-size: 0.85rem; color: var(--accent-gold); margin-bottom: 0.4rem;">${isEn ? 'Available Sponsor Offers' : 'Mevcut Sponsor Teklifleri'}</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.6rem;">
    `;

    SPONSORS_CATALOG.forEach(s => {
      const isSigned = activeList.some(act => act.sponsorId === s.id);
      const bName = isEn ? s.brandEn : s.brand;
      const bDesc = isEn ? s.descEn : s.desc;
      const bObj = isEn ? s.objectiveDescEn : s.objectiveDesc;

      const totalWins = (this.player.record?.wins || 0) + (this.player.amateurRecord?.wins || 0);
      const meetsFame = this.player.fame >= s.reqFame;
      const meetsWins = totalWins >= s.reqWins;
      const meetsRank = s.minRank === 99 || (s.minRank === 0 ? this.player.isChampion : (!this.player.isAmateur && this.player.rank <= s.minRank));

      const canSign = !isSigned && meetsFame && meetsWins && meetsRank;

      let btnHtml = '';
      if (isSigned) {
        btnHtml = `<button class="btn btn-sm" disabled style="width: 100%; opacity: 0.6; background: rgba(0,243,255,0.2); border: 1px solid var(--accent-cyan); color: var(--accent-cyan);">✅ İMZALANDI</button>`;
      } else if (canSign) {
        btnHtml = `<button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.signSponsor('${s.id}')">✍️ Sözleşmeyi İmzala</button>`;
      } else {
        btnHtml = `<button class="btn btn-secondary btn-sm" disabled style="width: 100%; opacity: 0.5;">🔒 Kilitli</button>`;
      }

      html += `
        <div class="glass-card" style="padding: 0.6rem; border-color: var(--bg-card-border);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.3rem;">
            <span style="font-size: 1.4rem;">${s.icon}</span>
            <span class="rarity-badge rarity-common">${s.tier}</span>
          </div>
          <h4 style="font-size: 0.88rem; color: #fff; margin-bottom: 0.2rem;">${bName}</h4>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.4rem;">${bDesc}</p>
          <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-bottom: 0.4rem;">
            🎯 ${bObj}<br>
            💰 $${s.payPerFight.toLocaleString()} / maç (+$${s.winBonus.toLocaleString()} bonus)
          </div>
          <div style="font-size: 0.68rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            Gereksinim: ${s.reqFame} Şöhret | ${s.reqWins} Galibiyet ${s.minRank === 0 ? '| Şampiyonluk' : (s.minRank < 99 ? `| Top #${s.minRank}` : '')}
          </div>
          ${btnHtml}
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  signSponsor(sponsorId) {
    if (!this.career) return;
    sfx.playClick();
    const res = this.career.signSponsorContract(sponsorId);
    alert(res.message);
    if (res.success) {
      this.saveGame();
      this.renderSocialFeedView();
    }
  }

  renderSocialFeedView() {
    if (!this.career) return;

    const handleEl = document.getElementById('social-player-handle');
    if (handleEl && this.player) {
      handleEl.innerText = this.player.socialHandle;
    }

    const limitText = document.getElementById('social-post-limit-text');
    if (limitText) {
      limitText.innerText = `${this.career.weeklySocialPostsLeft} / 3`;
    }

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
    if (container) {
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

    this.renderSponsorsView();
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

    const diaBalEl = document.getElementById('shop-diamond-balance');
    if (diaBalEl) diaBalEl.innerText = (this.player.diamonds || 0).toLocaleString();

    // 1. Diamond & Donation Packages
    const diamondContainer = document.getElementById('diamond-packages-container');
    if (diamondContainer) {
      diamondContainer.innerHTML = DIAMOND_PACKAGES.map(pkg => {
        const pName = isEn && pkg.nameEn ? pkg.nameEn : pkg.name;
        const priceStr = isEn ? pkg.priceUSD : pkg.priceTL;
        return `
          <div class="glass-card" style="padding: 0.6rem; text-align: center; position: relative; border-color: ${pkg.popular ? 'var(--accent-cyan)' : 'var(--bg-card-border)'};">
            ${pkg.badge ? `<span style="position: absolute; top: -8px; right: 8px; background: var(--accent-cyan); color: #000; font-size: 0.62rem; font-weight: 800; padding: 2px 6px; border-radius: 8px;">${pkg.badge}</span>` : ''}
            <h4 style="font-size: 0.85rem; color: #fff; margin-bottom: 0.2rem;">${pName}</h4>
            <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-cyan); margin: 0.4rem 0;">
              +${pkg.amount} 💎
            </div>
            <button class="btn btn-cyan btn-sm" style="width: 100%; font-size: 0.8rem;" onclick="window.app.buyDiamondPackage('${pkg.id}')">
              ${priceStr} ${isEn ? 'Buy' : 'Satın Al'}
            </button>
          </div>
        `;
      }).join('');
    }

    // 2. No Ads & VIP Pass
    const vipBox = document.getElementById('no-ads-vip-box');
    if (vipBox) {
      if (this.player.hasNoAds) {
        vipBox.innerHTML = `
          <span style="background: rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; color: #22c55e; padding: 0.4rem 0.8rem; border-radius: 8px; font-weight: 800; font-size: 0.85rem; display: inline-block;">
            ✅ VIP AKTİF
          </span>
        `;
      } else {
        vipBox.innerHTML = `
          <button class="btn btn-gold btn-sm" style="margin-bottom: 0.4rem; width: 100%;" onclick="window.app.buyNoAdsPass('diamonds')">
            💎 150 Elmas
          </button>
          <button class="btn btn-secondary btn-sm" style="width: 100%; font-size: 0.75rem;" onclick="window.app.buyNoAdsPass('real')">
            ₺49.99 / $1.99
          </button>
        `;
      }
    }

    // 3. Gem to Gold Exchange
    const exContainer = document.getElementById('gold-exchange-container');
    if (exContainer) {
      exContainer.innerHTML = GOLD_EXCHANGE_PACKAGES.map(ex => {
        const eName = isEn && ex.nameEn ? ex.nameEn : ex.name;
        return `
          <div class="glass-card" style="padding: 0.6rem; text-align: center; border-color: var(--bg-card-border);">
            <h4 style="font-size: 0.82rem; color: var(--accent-gold); margin-bottom: 0.2rem;">${eName}</h4>
            <div style="font-size: 1.1rem; font-weight: 800; color: #fff; margin: 0.3rem 0;">
              +$${ex.goldGain.toLocaleString()} 💰
            </div>
            <button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.exchangeDiamondsForGold('${ex.id}')">
              💎 ${ex.diamondsCost} Elmas
            </button>
          </div>
        `;
      }).join('');
    }

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

  buyDiamondPackage(pkgId) {
    const pkg = DIAMOND_PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;
    const isEn = this.lang === 'en';

    sfx.playClick();
    this.player.diamonds = (this.player.diamonds || 0) + pkg.amount;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    const pName = isEn && pkg.nameEn ? pkg.nameEn : pkg.name;
    alert(isEn 
      ? `💎 THANK YOU FOR SUPPORTING THE DEVELOPER!\n+${pkg.amount} Diamonds added to your account for ${pName}.`
      : `💎 GELİŞTİRİCİYE DESTEK OLDUĞUNUZ İÇİN TEŞEKKÜRLER!\n${pName} satın alımı gerçekleştirildi. +${pkg.amount} Elmas hesabınıza eklendi!`
    );
  }

  buyNoAdsPass(type) {
    const isEn = this.lang === 'en';
    if (this.player.hasNoAds) return;

    if (type === 'diamonds') {
      if ((this.player.diamonds || 0) < 150) {
        alert(isEn ? 'Not enough diamonds! You need 150 💎.' : 'Yetersiz Elmas! 150 💎 Elmasınız olmalıdır.');
        return;
      }
      this.player.diamonds -= 150;
    }

    sfx.playClick();
    this.player.hasNoAds = true;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    alert(isEn 
      ? '🛡️ VIP NO-ADS STATUS UNLOCKED!\nEnjoy ad-free gameplay and +15% extra gold reward on all fights!' 
      : '🛡️ VIP REKLAMSIZ STATÜ AKTİF EDİLDİ!\nReklamsız oyun deneyimi ve tüm dövüşlerde +%15 ekstra altın ödülü tanımlandı!'
    );
  }

  exchangeDiamondsForGold(exId) {
    const ex = GOLD_EXCHANGE_PACKAGES.find(e => e.id === exId);
    if (!ex) return;
    const isEn = this.lang === 'en';

    if ((this.player.diamonds || 0) < ex.diamondsCost) {
      alert(isEn ? 'Insufficient diamonds!' : 'Yetersiz Elmas! Bu işlem için daha fazla elmasa ihtiyacınız var.');
      return;
    }

    sfx.playClick();
    this.player.diamonds -= ex.diamondsCost;
    this.player.money += ex.goldGain;
    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderShopView();

    const eName = isEn && ex.nameEn ? ex.nameEn : ex.name;
    alert(isEn 
      ? `💱 EXCHANGED ${ex.diamondsCost} 💎 FOR $${ex.goldGain.toLocaleString()} 💰!\n${eName} credited.` 
      : `💱 ${ex.diamondsCost} 💎 Elmas, $${ex.goldGain.toLocaleString()} 💰 Altın bakiyesine dönüştürüldü!\n${eName} hesabınıza aktarıldı.`
    );
  }

  renderGlovesView() {
    if (!this.player) return;
    const isEn = this.lang === 'en';

    const currentGlove = this.player.getEquippedGlove();
    const summaryCard = document.getElementById('equipped-glove-summary-card');

    if (summaryCard) {
      const gName = isEn && currentGlove.nameEn ? currentGlove.nameEn : currentGlove.name;
      const gDesc = isEn && currentGlove.descEn ? currentGlove.descEn : currentGlove.desc;
      const rarityUpper = currentGlove.rarity.toUpperCase();

      summaryCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 0.8rem; align-items: center;">
            <div style="font-size: 2.2rem; background: rgba(0,0,0,0.3); padding: 0.4rem 0.8rem; border-radius: 12px; border: 1px solid ${currentGlove.color};">
              ${currentGlove.icon}
            </div>
            <div>
              <span class="rarity-badge rarity-${currentGlove.rarity}">${rarityUpper}</span>
              <h3 style="font-size: 1.1rem; color: #fff; margin-top: 0.2rem;">${gName}</h3>
              <p style="font-size: 0.78rem; color: var(--accent-cyan); font-weight: 600;">${gDesc}</p>
            </div>
          </div>
          <div class="ovr-badge" style="border-color: ${currentGlove.color}; color: ${currentGlove.color};">
            EQUIPPED
          </div>
        </div>
      `;
    }

    const container = document.getElementById('gloves-catalog-container');
    if (container) {
      container.innerHTML = GLOVES_CATALOG.map(g => {
        const isOwned = (this.player.inventory || []).includes(g.id);
        const isEquipped = this.player.equippedGlove === g.id;
        const gName = isEn && g.nameEn ? g.nameEn : g.name;
        const gDesc = isEn && g.descEn ? g.descEn : g.desc;
        const priceLabel = g.price === 0 ? (isEn ? 'Free' : 'Ücretsiz') : (g.currency === 'diamonds' ? `${g.price} 💎` : `$${g.price.toLocaleString()} 💰`);

        let btnHtml = '';
        if (isEquipped) {
          btnHtml = `<button class="btn btn-sm" disabled style="width: 100%; opacity: 0.6; background: rgba(0,243,255,0.2); border: 1px solid var(--accent-cyan); color: var(--accent-cyan);">✅ KUŞANILDI</button>`;
        } else if (isOwned) {
          btnHtml = `<button class="btn btn-cyan btn-sm" style="width: 100%;" onclick="window.app.equipGlove('${g.id}')">🥋 GİY (EQUIP)</button>`;
        } else {
          btnHtml = `<button class="btn btn-gold btn-sm" style="width: 100%;" onclick="window.app.buyGlove('${g.id}')">🛒 ${isEn ? 'Buy' : 'Satın Al'} (${priceLabel})</button>`;
        }

        return `
          <div class="glove-card ${isEquipped ? 'equipped' : ''}" style="border-color: ${g.color};">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                <span style="font-size: 1.8rem;">${g.icon}</span>
                <span class="rarity-badge rarity-${g.rarity}">${g.rarity}</span>
              </div>
              <h4 style="font-size: 0.92rem; color: #fff; margin-bottom: 0.2rem;">${gName}</h4>
              <p style="font-size: 0.74rem; color: var(--text-muted); margin-bottom: 0.6rem; min-height: 2.2em;">${gDesc}</p>
            </div>
            <div>
              ${btnHtml}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  buyGlove(gloveId) {
    const glove = GLOVES_CATALOG.find(g => g.id === gloveId);
    if (!glove || !this.player) return;
    const isEn = this.lang === 'en';

    if (glove.currency === 'diamonds') {
      if ((this.player.diamonds || 0) < glove.price) {
        alert(isEn ? 'Insufficient diamonds!' : 'Yetersiz Elmas! Bu eldiveni satın almak için daha fazla elmasa ihtiyacınız var.');
        return;
      }
      this.player.diamonds -= glove.price;
    } else {
      if (this.player.money < glove.price) {
        alert(isEn ? 'Insufficient funds!' : 'Yetersiz Bakiye! Bu eldiveni almak için yeterli altınınız yok.');
        return;
      }
      this.player.money -= glove.price;
    }

    sfx.playClick();
    if (!this.player.inventory) this.player.inventory = ['glove_default'];
    if (!this.player.inventory.includes(gloveId)) {
      this.player.inventory.push(gloveId);
    }
    this.player.equippedGlove = gloveId;

    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderGlovesView();

    const gName = isEn && glove.nameEn ? glove.nameEn : glove.name;
    alert(isEn ? `🥊 ${gName} purchased and equipped!` : `🥊 ${gName} satın alındı ve karakterinize kuşanıldı!`);
  }

  equipGlove(gloveId) {
    if (!this.player || !this.player.inventory || !this.player.inventory.includes(gloveId)) return;
    sfx.playClick();
    this.player.equippedGlove = gloveId;

    this.saveGame();
    this.updateHeaderAndDashboard();
    this.renderGlovesView();
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
    this.updateCampView();
    this.updateHeaderAndDashboard();
    this.renderShopView();
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
