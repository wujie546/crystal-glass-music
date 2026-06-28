// Vibe Coding Projects Database
const projects = [
    {
        id: "1",
        folder: "115.06.28-1",
        title: "ULI | 網路行銷 & AI 商業品牌導師",
        description: "專為網路行銷與品牌導師設計的精品 Landing Page，跨越程式高牆展現 AI 商業品牌力。包含個人簡歷、服務領域、成功案例以及高轉換率聯絡表單。",
        category: "marketing",
        tags: ["個人品牌", "Landing Page", "AI 行銷", "亮麗設計"],
        icon: "user-check",
        path: "../115.06.28-1/index.html",
        subProjects: []
    },
    {
        id: "2",
        folder: "115.06.28-2",
        title: "MALAN CAFÉ | 曜石黑金烘焙沙龍",
        description: "帶有極致感官設計的咖啡沙龍官網，探索精品咖啡生豆到曜石黑金熟豆的感官煉金術。內建雙向拖動「生熟豆烘焙對比滑桿」、尊榮體驗服務介紹與沈浸式黑金網頁美學。",
        category: "marketing",
        tags: ["咖啡美學", "烘焙對比", "精緻官網", "滑動對比"],
        icon: "coffee",
        path: "../115.06.28-2/index.html",
        subProjects: []
    },
    {
        id: "3",
        folder: "115.06.28-3",
        title: "AI 指揮官教室助手",
        description: "多功能一站式課堂管理工具。提供隨機抽籤點名器與實作倒數計時鐘，隨機抽籤具有防重複選中機制（自動從名單移除），定時器支持暫停/重置與聲音警報回饋，讓課堂管理更有條理。",
        category: "tools",
        tags: ["課堂管理", "隨機點名", "倒數計時", "音效回饋"],
        icon: "graduation-cap",
        path: "../115.06.28-3/deploy-site/index.html",
        subProjects: [
            { title: "單檔備份版", path: "../115.06.28-3/AI指揮官教室助手.html" }
        ]
    },
    {
        id: "4",
        folder: "115.06.28-4",
        title: "VIBE AI | 頂級 AI MV 影像製作招商平台",
        description: "前衛大氣的 AI 音樂影片製作招商合作網站。結合生成式 AI 藝術與前衛影音美學，呈現多元 AI 影像流派（Cyberpunk、Surrealism 等）與四大重構影像工業核心維度，吸引頂尖品牌與投資人。",
        category: "marketing",
        tags: ["AI MV", "影像藝術", "招商合作", "Cyberpunk"],
        icon: "clapperboard",
        path: "../115.06.28-4/index.html",
        subProjects: []
    },
    {
        id: "5",
        folder: "115.06.28-5",
        title: "小畫家 - Web Paint",
        description: "瀏覽器原生運作的高功能小畫家。提供全套繪圖工具，支援筆刷大小調節、多種填充模式（僅框、僅填、兩者）、多重字型文字輸入與自訂形狀（矩形、圓形、三角形、直線），支援復原(Ctrl+Z)、重做(Ctrl+Y)與高畫質 PNG/JPG 匯出。",
        category: "media",
        tags: ["Canvas", "復原重做", "筆刷工具", "自訂形狀"],
        icon: "palette",
        path: "../115.06.28-5/index.html",
        subProjects: [
            { title: "純畫布版", path: "../115.06.28-5/paint.html" }
        ]
    },
    {
        id: "6",
        folder: "115.06.28-6",
        title: "水晶玻璃音樂動畫產生器",
        description: "基於 Web Audio API 與 Canvas 的互動式水晶幾何音樂產生器。內建星空夢幻、冰雪八音盒、琉璃水滴、深海空靈等聲景，搭配流暢幾何動畫，支援無縫播放與聲光即時互動。",
        category: "media",
        tags: ["音效視覺化", "聲景音樂", "水晶玻璃", "互動動畫"],
        icon: "music",
        path: "../115.06.28-6/index.html",
        subProjects: []
    },
    {
        id: "7",
        folder: "115.06.28-7",
        title: "巴葡學習冒險 | Português Divertido",
        description: "針對巴西葡萄牙語初學者的趣味卡通冒險遊戲。提供生動發音單字卡、拖曳互動配對遊戲、實時學習進度儀表板與活潑的動態音效，以遊戲化學習模式突破外語障礙。",
        category: "tools",
        tags: ["語言學習", "卡通風格", "配對遊戲", "發音音效"],
        icon: "languages",
        path: "../115.06.28-7/index.html",
        subProjects: []
    },
    {
        id: "8",
        folder: "115.06.28-8",
        title: "打磚塊遊戲 | 隱藏寶物版",
        description: "經典 Arcade 打磚塊遊戲的創新重製版。包含流暢的擋板及球體碰撞系統、多關卡升級制度、以及六大隱藏隨機道具寶物（板加長、變短、球速加減、火球、機關槍），充滿動作打擊感與音效。",
        category: "games",
        tags: ["經典遊戲", "隱藏寶物", "關卡系統", "音效道具"],
        icon: "gamepad-2",
        path: "../115.06.28-8/index.html",
        subProjects: [
            { title: "獨立單檔版", path: "../115.06.28-8/breakout.html" }
        ]
    }
];

// Elements
const projectGrid = document.getElementById('projectGrid');
const searchInput = document.getElementById('projectSearch');
const filterTabs = document.getElementById('filterTabs');

// Modal Elements
const previewModal = document.getElementById('previewModal');
const previewBackdrop = document.getElementById('previewBackdrop');
const previewTitle = document.getElementById('previewTitle');
const previewFolderBadge = document.getElementById('previewFolderBadge');
const previewIframe = document.getElementById('previewIframe');
const previewExternalLink = document.getElementById('previewExternalLink');
const previewReload = document.getElementById('previewReload');
const previewClose = document.getElementById('previewClose');
const iframeLoader = document.getElementById('iframeLoader');
const deviceWrapper = document.getElementById('deviceWrapper');

// Simulator buttons
const simDesktop = document.getElementById('simDesktop');
const simTablet = document.getElementById('simTablet');
const simMobile = document.getElementById('simMobile');

// State variables
let currentCategory = 'all';
let searchQuery = '';
let activeProjectUrl = '';

// Initialize Lucide Icons
lucide.createIcons();

// Render Projects
function renderProjects() {
    // Filter
    const filtered = projects.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery) ||
                             p.description.toLowerCase().includes(searchQuery) ||
                             p.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
                             p.folder.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Clear Grid
    projectGrid.innerHTML = '';

    if (filtered.length === 0) {
        projectGrid.innerHTML = `
            <div class="empty-state">
                <i data-lucide="folder-open"></i>
                <p>找不到符合條件的專案</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    filtered.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'project-card animate-fade-in';
        card.style.animationDelay = `${idx * 0.05}s`;

        const tagsHtml = p.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
        
        // Check for subprojects/alternate versions to show in card
        let subProjectsHtml = '';
        if (p.subProjects && p.subProjects.length > 0) {
            subProjectsHtml = p.subProjects.map(sp => `
                <button class="btn btn-outline" onclick="openPreview('${sp.path}', '${p.title} - ${sp.title}', '${p.folder}')" style="font-size:0.75rem; padding:6px 10px;">
                    ${sp.title}
                </button>
            `).join('');
        }

        // Map categories to names
        const categoryMap = {
            'marketing': '商業行銷',
            'tools': '工具應用',
            'media': '影音繪圖',
            'games': '經典遊戲'
        };

        card.innerHTML = `
            <div class="card-header-visual">
                <div class="card-gradient-bg"></div>
                <div class="card-folder-badge">${p.folder}</div>
                <div class="card-category-badge ${p.category}">${categoryMap[p.category] || p.category}</div>
                <div class="card-icon-container">
                    <i data-lucide="${p.icon}"></i>
                </div>
            </div>
            <div class="card-body">
                <h3>${p.title}</h3>
                <p class="desc">${p.description}</p>
                <div class="card-tags">
                    ${tagsHtml}
                </div>
                
                <!-- Additional alternate versions if any -->
                ${subProjectsHtml ? `<div style="margin-bottom:12px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;"><span style="font-size:0.75rem; color:var(--text-muted);">其他版本:</span> ${subProjectsHtml}</div>` : ''}

                <div class="card-footer" style="margin-top:auto;">
                    <button class="btn btn-primary" onclick="openPreview('${p.path}', '${p.title}', '${p.folder}')">
                        <i data-lucide="play" style="width:14px; height:14px;"></i>進入預覽
                    </button>
                    <a href="${p.path}" target="_blank" class="btn btn-outline">
                        <i data-lucide="external-link" style="width:14px; height:14px;"></i>新分頁
                    </a>
                </div>
            </div>
        `;

        projectGrid.appendChild(card);
    });

    // Re-create icons for new DOM elements
    lucide.createIcons();
}

// Open Preview Modal
window.openPreview = function(url, title, folder) {
    activeProjectUrl = url;
    previewTitle.innerText = title;
    previewFolderBadge.innerText = folder;
    
    // Set external link
    previewExternalLink.href = url;
    
    // Show modal
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
    
    // Load iframe
    loadIframe(url);
};

function loadIframe(url) {
    iframeLoader.style.opacity = '1';
    iframeLoader.style.pointerEvents = 'auto';
    previewIframe.src = url;
}

// Iframe loaded event
previewIframe.addEventListener('load', () => {
    // Fade out loader
    iframeLoader.style.opacity = '0';
    iframeLoader.style.pointerEvents = 'none';
});

// Close Preview Modal
function closePreview() {
    previewModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
    previewIframe.src = ''; // Clear source to stop media/music
}

// Simulator Device Resizing
function setDeviceSize(size) {
    deviceWrapper.className = `device-wrapper ${size}`;
    
    // Manage active buttons
    [simDesktop, simTablet, simMobile].forEach(btn => btn.classList.remove('active'));
    
    if (size === 'desktop') simDesktop.classList.add('active');
    if (size === 'tablet') simTablet.classList.add('active');
    if (size === 'mobile') simMobile.classList.add('active');
}

// Events
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProjects();
});

filterTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
        // Toggle Active
        document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        currentCategory = e.target.getAttribute('data-category');
        renderProjects();
    }
});

// Modal Events
previewClose.addEventListener('click', closePreview);
previewBackdrop.addEventListener('click', closePreview);

previewReload.addEventListener('click', () => {
    loadIframe(activeProjectUrl);
});

// Simulator toggles click events
simDesktop.addEventListener('click', () => setDeviceSize('desktop'));
simTablet.addEventListener('click', () => setDeviceSize('tablet'));
simMobile.addEventListener('click', () => setDeviceSize('mobile'));

// Keyboard escape to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && previewModal.classList.contains('active')) {
        closePreview();
    }
});

// Initial Render
renderProjects();
