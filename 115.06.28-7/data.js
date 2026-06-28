// 巴西葡萄牙語國高中課程題庫與資料結構 (Duolingo 風格)
const GAME_DATA = {
  units: [
    {
      id: "unit_1",
      title: "單元 1: 基礎問候與飲料",
      description: "學習巴西日常最常用的問候語與飲料名稱",
      icon: "☕",
      color: "#58cc02", // 綠色
      minExpToNext: 50,
      levels: [
        {
          id: "u1_l1",
          title: "問候與飲料 1",
          description: "基本問候與常見飲料",
          questions: [
            {
              id: "q1",
              type: "picture_choice",
              prompt: "哪個是「茶」呢？",
              audioText: "chá",
              options: [
                { id: "opt1", text: "sanduíche", translation: "三明治", icon: "🥪" },
                { id: "opt2", text: "chá", translation: "茶", icon: "🍵" },
                { id: "opt3", text: "café", translation: "咖啡", icon: "☕" }
              ],
              correctAnswer: "chá"
            },
            {
              id: "q2",
              type: "picture_choice",
              prompt: "哪個是「水」呢？",
              audioText: "água",
              options: [
                { id: "opt1", text: "leite", translation: "牛奶", icon: "🥛" },
                { id: "opt2", text: "água", translation: "水", icon: "💧" },
                { id: "opt3", text: "suco", translation: "果汁", icon: "🧃" }
              ],
              correctAnswer: "água"
            },
            {
              id: "q3",
              type: "text_choice",
              prompt: "聽聽看「Olá! Bom dia!」是什麼意思？",
              audioText: "Olá! Bom dia!",
              options: [
                { id: "opt1", text: "你好！早安！" },
                { id: "opt2", text: "再見！晚安！" },
                { id: "opt3", text: "謝謝！不客氣！" }
              ],
              correctAnswer: "你好！早安！"
            },
            {
              id: "q4",
              type: "listening_choice",
              prompt: "聽聽看，請問這是什麼意思？",
              audioText: "Por favor, um café.",
              options: [
                { id: "opt1", text: "請給我一杯咖啡。" },
                { id: "opt2", text: "請給我一杯茶。" },
                { id: "opt3", text: "非常感謝你。" }
              ],
              correctAnswer: "請給我一杯咖啡。"
            },
            {
              id: "q5",
              type: "sentence_builder",
              prompt: "請聽語音並組合出：「謝謝你，朋友！」",
              audioText: "Obrigado, meu amigo!",
              targetSentence: ["Obrigado", ",", "meu", "amigo", "!"],
              words: ["Obrigado", "amigo", "meu", "água", "por favor", ",", "!"],
              correctOrder: ["Obrigado", ",", "meu", "amigo", "!"]
            }
          ]
        },
        {
          id: "u1_l2",
          title: "問候與飲料 2",
          description: "禮貌用語與表達需求",
          questions: [
            {
              id: "q2_1",
              type: "picture_choice",
              prompt: "哪個是「麵包」呢？",
              audioText: "pão",
              options: [
                { id: "opt1", text: "pão", translation: "麵包", icon: "🍞" },
                { id: "opt2", text: "queijo", translation: "起司", icon: "🧀" },
                { id: "opt3", text: "maçã", translation: "蘋果", icon: "🍎" }
              ],
              correctAnswer: "pão"
            },
            {
              id: "q2_2",
              type: "text_choice",
              prompt: "聽語音，如何用巴西葡萄牙語說「請」？",
              audioText: "Por favor",
              options: [
                { id: "opt1", text: "Por favor" },
                { id: "opt2", text: "De nada" },
                { id: "opt3", text: "Com licença" }
              ],
              correctAnswer: "Por favor"
            },
            {
              id: "q2_3",
              type: "sentence_builder",
              prompt: "請聽語音並組合出：「我想要水。」",
              audioText: "Eu quero água.",
              targetSentence: ["Eu", "quero", "água", "."],
              words: ["Eu", "quero", "água", "chá", "gosto", "."],
              correctOrder: ["Eu", "quero", "água", "."]
            }
          ]
        }
      ]
    },
    {
      id: "unit_2",
      title: "單元 2: 美食與學校生活",
      description: "國高中生最愛的校園生活與各式食物名稱",
      icon: "🍕",
      color: "#1cb0f6", // 藍色
      minExpToNext: 120,
      levels: [
        {
          id: "u2_l1",
          title: "校園日常與學習",
          description: "學校、書本與學習動詞",
          questions: [
            {
              id: "q3_1",
              type: "picture_choice",
              prompt: "哪個是「書本 (livro)」呢？",
              audioText: "livro",
              options: [
                { id: "opt1", text: "caneta", translation: "原子筆", icon: "🖊️" },
                { id: "opt2", text: "livro", translation: "書本", icon: "📚" },
                { id: "opt3", text: "escola", translation: "學校", icon: "🏫" }
              ],
              correctAnswer: "livro"
            },
            {
              id: "q3_2",
              type: "sentence_builder",
              prompt: "請聽語音並組合出：「我喜歡在學校學習。」",
              audioText: "Eu gosto de estudar na escola.",
              targetSentence: ["Eu", "gosto", "de", "estudar", "na", "escola", "."],
              words: ["Eu", "gosto", "de", "estudar", "na", "escola", "café", "."],
              correctOrder: ["Eu", "gosto", "de", "estudar", "na", "escola", "."]
            },
            {
              id: "q3_3",
              type: "text_choice",
              prompt: "聽聽看「O professor é muito legal!」是什麼意思？",
              audioText: "O professor é muito legal!",
              options: [
                { id: "opt1", text: "老師非常棒 / 酷！" },
                { id: "opt2", text: "學校非常大！" },
                { id: "opt3", text: "這本書很有趣！" }
              ],
              correctAnswer: "老師非常棒 / 酷！"
            }
          ]
        },
        {
          id: "u2_l2",
          title: "巴西在地美食",
          description: "認識巴西人最愛的米飯與黑豆飯",
          questions: [
            {
              id: "q4_1",
              type: "picture_choice",
              prompt: "哪個是「披薩 (pizza)」呢？",
              audioText: "pizza",
              options: [
                { id: "opt1", text: "arroz", translation: "米飯", icon: "🍚" },
                { id: "opt2", text: "pizza", translation: "披薩", icon: "🍕" },
                { id: "opt3", text: "sorvete", translation: "冰淇淋", icon: "🍦" }
              ],
              correctAnswer: "pizza"
            },
            {
              id: "q4_2",
              type: "listening_choice",
              prompt: "聽聽看巴西著名美食「arroz e feijão」是什麼？",
              audioText: "Eu adoro arroz e feijão!",
              options: [
                { id: "opt1", text: "我熱愛米飯與黑豆燉肉！" },
                { id: "opt2", text: "我喜歡吃漢堡與薯條！" },
                { id: "opt3", text: "我不吃冰淇淋與蛋糕。" }
              ],
              correctAnswer: "我熱愛米飯與黑豆燉肉！"
            }
          ]
        }
      ]
    },
    {
      id: "unit_3",
      title: "單元 3: 巴西用語與休閒喜好",
      description: "進階動詞、休閒活動與正宗巴西俚語",
      icon: "⚽",
      color: "#ffc800", // 黃色
      minExpToNext: 200,
      levels: [
        {
          id: "u3_l1",
          title: "運動與興趣",
          description: "踢足球與音樂喜好",
          questions: [
            {
              id: "q5_1",
              type: "picture_choice",
              prompt: "哪個是「足球 (futebol)」呢？",
              audioText: "futebol",
              options: [
                { id: "opt1", text: "música", translation: "音樂", icon: "🎵" },
                { id: "opt2", text: "futebol", translation: "足球", icon: "⚽" },
                { id: "opt3", text: "praia", translation: "海灘", icon: "🏖️" }
              ],
              correctAnswer: "futebol"
            },
            {
              id: "q5_2",
              type: "text_choice",
              prompt: "聽聽巴西口語中常用的「Que legal! Beleza!」意思是？",
              audioText: "Que legal! Beleza!",
              options: [
                { id: "opt1", text: "太棒了！沒問題/酷！" },
                { id: "opt2", text: "真可惜！太糟糕了！" },
                { id: "opt3", text: "對不起！請原諒我！" }
              ],
              correctAnswer: "太棒了！沒問題/酷！"
            },
            {
              id: "q5_3",
              type: "sentence_builder",
              prompt: "請聽語音並組合出：「我們在週末踢足球。」",
              audioText: "Nós jogamos futebol no fim de semana.",
              targetSentence: ["Nós", "jogamos", "futebol", "no", "fim", "de", "semana", "."],
              words: ["Nós", "jogamos", "futebol", "no", "fim", "de", "semana", "música", "."],
              correctOrder: ["Nós", "jogamos", "futebol", "no", "fim", "de", "semana", "."]
            }
          ]
        }
      ]
    }
  ]
};
