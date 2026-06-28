// 遊戲核心應用程式邏輯 (App Engine)

class GameApp {
  constructor() {
    this.profile = this.loadProfile();
    this.currentQuiz = null;
    this.isReviewMode = false;

    this.initDOM();
    this.bindEvents();
    this.updateHeaderUI();
    this.renderMap();
  }

  // 本地儲存讀取與更新
  loadProfile() {
    const saved = localStorage.getItem('pt_game_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      streak: 1,
      gems: 20, // 初始禮物鑽石
      exp: 0,
      unlockedLevels: ['u1_l1']
    };
  }

  saveProfile() {
    localStorage.setItem('pt_game_profile', JSON.stringify(this.profile));
    this.updateHeaderUI();
  }

  initDOM() {
    // 畫面
    this.screenMap = document.getElementById('screen-map');
    this.screenQuiz = document.getElementById('screen-quiz');
    this.screenSummary = document.getElementById('screen-summary');

    // 頂部列
    this.streakEl = document.getElementById('streak-count');
    this.gemsEl = document.getElementById('gems-count');
    this.expEl = document.getElementById('exp-count');

    // 答題組件
    this.quizCloseBtn = document.getElementById('quiz-close-btn');
    this.quizProgressBar = document.getElementById('quiz-progress');
    this.questionContainer = document.getElementById('question-container');
    this.btnCheckAnswer = document.getElementById('btn-check-answer');

    // 反饋底欄
    this.bottomFeedback = document.getElementById('bottom-feedback');
    this.feedbackIcon = document.getElementById('feedback-icon');
    this.feedbackTitle = document.getElementById('feedback-title');
    this.feedbackMsg = document.getElementById('feedback-msg');
    this.btnNextQuestion = document.getElementById('btn-next-question');

    // 結算組件
    this.earnedExpEl = document.getElementById('earned-exp');
    this.earnedGemsEl = document.getElementById('earned-gems');
    this.btnFinishSummary = document.getElementById('btn-finish-summary');

    this.btnStartReview = document.getElementById('btn-start-review');
  }

  bindEvents() {
    this.quizCloseBtn.addEventListener('click', () => {
      audioEngine.playClick();
      this.switchScreen('screen-map');
    });

    this.btnCheckAnswer.addEventListener('click', () => {
      this.checkCurrentAnswer();
    });

    this.btnNextQuestion.addEventListener('click', () => {
      audioEngine.playClick();
      this.advanceQuestion();
    });

    this.btnFinishSummary.addEventListener('click', () => {
      audioEngine.playClick();
      this.switchScreen('screen-map');
      this.renderMap();
    });

    this.btnStartReview.addEventListener('click', () => {
      audioEngine.playClick();
      this.startQuiz(null, true);
    });
  }

  updateHeaderUI() {
    this.streakEl.textContent = this.profile.streak;
    this.gemsEl.textContent = this.profile.gems;
    this.expEl.textContent = this.profile.exp;
  }

  switchScreen(screenId) {
    [this.screenMap, this.screenQuiz, this.screenSummary].forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
  }

  // 渲染地圖視圖
  renderMap() {
    const unitsContainer = document.getElementById('units-container');
    unitsContainer.innerHTML = '';

    GAME_DATA.units.forEach(unit => {
      const unitCard = document.createElement('div');
      unitCard.className = 'unit-card';

      const unitBanner = document.createElement('div');
      unitBanner.className = 'unit-banner';
      unitBanner.style.backgroundColor = unit.color;
      unitBanner.innerHTML = `
        <span>${unit.icon} ${unit.title}</span>
        <span style="font-size: 0.85rem; opacity: 0.9;">${unit.description}</span>
      `;
      unitCard.appendChild(unitBanner);

      const nodesContainer = document.createElement('div');
      nodesContainer.className = 'level-nodes-container';

      unit.levels.forEach((level, idx) => {
        const isUnlocked = this.profile.unlockedLevels.includes(level.id);
        const node = document.createElement('div');
        node.className = `level-node ${isUnlocked ? 'unlocked' : 'locked'}`;
        node.style.backgroundColor = isUnlocked ? unit.color : '#e5e5e5';
        node.innerHTML = `
          <span>${isUnlocked ? '⭐' : '🔒'}</span>
          <div class="level-node-title">${level.title}</div>
        `;

        if (isUnlocked) {
          node.addEventListener('click', () => {
            audioEngine.playClick();
            this.startQuiz(level, false);
          });
        }
        nodesContainer.appendChild(node);
      });

      unitCard.appendChild(nodesContainer);
      unitsContainer.appendChild(unitCard);
    });
  }

  // 開始測驗/複習
  startQuiz(level, isReview = false) {
    this.isReviewMode = isReview;
    let questions = [];

    if (isReview) {
      GAME_DATA.units.forEach(u => {
        u.levels.forEach(l => {
          if (this.profile.unlockedLevels.includes(l.id)) {
            questions = questions.concat(l.questions);
          }
        });
      });
      questions = questions.sort(() => 0.5 - Math.random()).slice(0, 4);
    } else {
      questions = [...level.questions];
    }

    this.currentQuiz = {
      level: level,
      questions: questions,
      currentIndex: 0,
      earnedExp: 0,
      earnedGems: 0,
      userSelection: null,
      selectedWords: []
    };

    this.switchScreen('screen-quiz');
    this.renderQuestion();
  }

  // 渲染當前題目
  renderQuestion() {
    const q = this.currentQuiz.questions[this.currentQuiz.currentIndex];
    this.currentQuiz.userSelection = null;
    this.currentQuiz.selectedWords = [];
    this.btnCheckAnswer.disabled = true;
    this.bottomFeedback.classList.remove('active', 'correct', 'wrong');

    // 更新進度條
    const progressPct = ((this.currentQuiz.currentIndex) / this.currentQuiz.questions.length) * 100;
    this.quizProgressBar.style.width = `${progressPct}%`;

    this.questionContainer.innerHTML = '';

    // 題型標籤
    const tagEl = document.createElement('div');
    tagEl.className = 'question-tag';
    tagEl.innerHTML = `✨ ${this.isReviewMode ? '無盡複習模式' : '新單字/句型練習'}`;
    this.questionContainer.appendChild(tagEl);

    // 題目提示
    const promptEl = document.createElement('div');
    promptEl.className = 'question-prompt';
    promptEl.innerHTML = q.prompt;
    this.questionContainer.appendChild(promptEl);

    // 顯眼的語音播放區塊 (Prominent Audio Banner)
    const audioText = q.audioText || q.targetWord || q.sentence;
    if (audioText) {
      const audioBanner = document.createElement('div');
      audioBanner.className = 'audio-player-banner';

      const bigBtn = document.createElement('button');
      bigBtn.className = 'audio-big-btn';
      bigBtn.innerHTML = '🔊 點擊聽葡萄牙語發音';
      bigBtn.addEventListener('click', () => {
        audioEngine.speak(audioText, false);
      });

      const slowBtn = document.createElement('button');
      slowBtn.className = 'audio-slow-btn';
      slowBtn.innerHTML = '🐢 慢速';
      slowBtn.addEventListener('click', () => {
        audioEngine.speak(audioText, true);
      });

      audioBanner.appendChild(bigBtn);
      audioBanner.appendChild(slowBtn);
      this.questionContainer.appendChild(audioBanner);

      // 自動播報一次
      setTimeout(() => audioEngine.speak(audioText, false), 300);
    }

    // 根據題型渲染選項
    if (q.type === 'picture_choice') {
      this.renderPictureChoice(q);
    } else if (q.type === 'text_choice' || q.type === 'listening_choice') {
      this.renderTextChoice(q);
    } else if (q.type === 'sentence_builder') {
      this.renderSentenceBuilder(q);
    }
  }

  // 題型 A: 看圖選單字 (圖片卡片選單)
  renderPictureChoice(q) {
    const grid = document.createElement('div');
    grid.className = 'options-grid-picture';

    q.options.forEach((opt, idx) => {
      const card = document.createElement('div');
      card.className = 'picture-card';
      card.innerHTML = `
        <div class="picture-card-icon">${opt.icon}</div>
        <div class="picture-card-footer">
          <span class="picture-card-text">${opt.text}</span>
          <span class="picture-card-number">${idx + 1}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        audioEngine.playClick();
        audioEngine.speak(opt.text, false);
        grid.querySelectorAll('.picture-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.currentQuiz.userSelection = opt.text;
        this.btnCheckAnswer.disabled = false;
      });

      grid.appendChild(card);
    });

    this.questionContainer.appendChild(grid);
  }

  // 題型 B: 文字/聽力選擇題
  renderTextChoice(q) {
    const list = document.createElement('div');
    list.className = 'options-list-text';

    q.options.forEach((opt) => {
      const card = document.createElement('div');
      card.className = 'text-option-card';
      card.textContent = opt.text;

      card.addEventListener('click', () => {
        audioEngine.playClick();
        list.querySelectorAll('.text-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.currentQuiz.userSelection = opt.text;
        this.btnCheckAnswer.disabled = false;
      });

      list.appendChild(card);
    });

    this.questionContainer.appendChild(list);
  }

  // 題型 C: 句子拼圖
  renderSentenceBuilder(q) {
    const dropZone = document.createElement('div');
    dropZone.className = 'sentence-drop-zone';

    const wordBank = document.createElement('div');
    wordBank.className = 'word-bank';

    q.words.forEach((word, wordIdx) => {
      const tile = document.createElement('div');
      tile.className = 'word-tile';
      tile.textContent = word;
      tile.dataset.index = wordIdx;

      tile.addEventListener('click', () => {
        audioEngine.playClick();
        audioEngine.speak(word, false);

        if (!tile.classList.contains('used')) {
          tile.classList.add('used');
          this.currentQuiz.selectedWords.push({ word, tile });
          this.renderDropZoneTiles(dropZone, q);
        }
      });

      wordBank.appendChild(tile);
    });

    this.questionContainer.appendChild(dropZone);
    this.questionContainer.appendChild(wordBank);
  }

  renderDropZoneTiles(dropZone, q) {
    dropZone.innerHTML = '';
    this.currentQuiz.selectedWords.forEach((item, idx) => {
      const tile = document.createElement('div');
      tile.className = 'word-tile';
      tile.textContent = item.word;
      tile.addEventListener('click', () => {
        audioEngine.playClick();
        item.tile.classList.remove('used');
        this.currentQuiz.selectedWords.splice(idx, 1);
        this.renderDropZoneTiles(dropZone, q);
      });
      dropZone.appendChild(tile);
    });

    this.btnCheckAnswer.disabled = this.currentQuiz.selectedWords.length === 0;
  }

  // 檢查答案
  checkCurrentAnswer() {
    const q = this.currentQuiz.questions[this.currentQuiz.currentIndex];
    let isCorrect = false;

    if (q.type === 'sentence_builder') {
      const userWords = this.currentQuiz.selectedWords.map(w => w.word);
      isCorrect = JSON.stringify(userWords) === JSON.stringify(q.correctOrder);
    } else {
      isCorrect = this.currentQuiz.userSelection === q.correctAnswer;
    }

    this.bottomFeedback.classList.add('active');

    if (isCorrect) {
      audioEngine.playCorrect();
      audioEngine.playGem();
      this.currentQuiz.earnedExp += 5;
      this.currentQuiz.earnedGems += 3;

      this.bottomFeedback.className = 'bottom-feedback active correct';
      this.feedbackIcon.textContent = '🎉';
      this.feedbackTitle.textContent = '非常正確！Excelente!';
      this.feedbackMsg.textContent = '太棒了，獲得 +5 經驗值與 +3 鑽石！';
      this.btnNextQuestion.className = 'btn-cartoon btn-green';
    } else {
      audioEngine.playWrong();
      this.bottomFeedback.className = 'bottom-feedback active wrong';
      this.feedbackIcon.textContent = '😅';
      this.feedbackTitle.textContent = '差一點點！';
      const correctText = q.type === 'sentence_builder' ? q.correctOrder.join(' ') : q.correctAnswer;
      this.feedbackMsg.textContent = `正確答案是：${correctText}`;
      this.btnNextQuestion.className = 'btn-cartoon btn-red';
      this.btnNextQuestion.style.backgroundColor = 'var(--primary-red)';
      this.btnNextQuestion.style.boxShadow = '0 4px 0 var(--primary-red-dark)';
    }

    this.btnCheckAnswer.disabled = true;
  }

  // 前進下一題或完成
  advanceQuestion() {
    this.currentQuiz.currentIndex++;
    if (this.currentQuiz.currentIndex < this.currentQuiz.questions.length) {
      this.renderQuestion();
    } else {
      this.finishQuiz();
    }
  }

  // 結算測驗
  finishQuiz() {
    audioEngine.playLevelUp();

    this.profile.exp += this.currentQuiz.earnedExp;
    this.profile.gems += this.currentQuiz.earnedGems;

    if (!this.isReviewMode && this.currentQuiz.level) {
      let foundCurrent = false;
      GAME_DATA.units.forEach(u => {
        u.levels.forEach(l => {
          if (foundCurrent && !this.profile.unlockedLevels.includes(l.id)) {
            this.profile.unlockedLevels.push(l.id);
            foundCurrent = false;
          }
          if (l.id === this.currentQuiz.level.id) {
            foundCurrent = true;
          }
        });
      });
    }

    this.saveProfile();

    this.earnedExpEl.textContent = `+${this.currentQuiz.earnedExp}`;
    this.earnedGemsEl.textContent = `+${this.currentQuiz.earnedGems}`;
    this.switchScreen('screen-summary');
  }
}

// 初始化應用程式
window.addEventListener('DOMContentLoaded', () => {
  window.app = new GameApp();
});
