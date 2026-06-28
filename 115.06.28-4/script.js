// ==========================================
// AI MV Video Showcase & Investment Portal
// Main JavaScript Logic
// ==========================================

let player; // Global YouTube Player instance
const videoId = 'gfJIfgiMR1o'; // Background Video ID

// 1. YouTube Iframe Player API Initializer
// Note: This must be globally accessible for the YouTube API script to invoke it.
window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('youtube-bg', {
    videoId: videoId,
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'rel': 0,
      'showinfo': 0,
      'showsearch': 0,
      'loop': 1,
      'playlist': videoId, // Mandatory for loop support
      'mute': 1, // Start muted to guarantee autoplay compatibility
      'wmode': 'transparent',
      'iv_load_policy': 3,
      'cc_load_policy': 0,
      'autohide': 1,
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  event.target.playVideo();
  // Add loaded class to container to fade video in smoothly
  document.getElementById('video-bg-container').classList.add('loaded');
}

function onPlayerStateChange(event) {
  // Restart playback if ended (failsafe loop fallback)
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo();
  }
}

// 2. Portal Dismiss & Sound Activation
document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enter-btn');
  const portalOverlay = document.getElementById('portal-overlay');
  
  const playPauseBtn = document.getElementById('play-pause-btn');
  const volumeBtn = document.getElementById('volume-btn');
  const bgInfo = document.getElementById('bg-info');
  
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const muteIcon = document.getElementById('mute-icon');
  const unmuteIcon = document.getElementById('unmute-icon');
  
  let isVideoPlaying = true;
  let isMuted = true;

  // Click to Enter Experience
  enterBtn.addEventListener('click', () => {
    // Fade out overlay
    portalOverlay.classList.add('fade-out');
    
    // Once overlay fades out, remove it from flow
    setTimeout(() => {
      portalOverlay.style.display = 'none';
    }, 1000);

    // Unmute YouTube Background video (User gesture allows audio autoplay)
    if (player && typeof player.unMute === 'function') {
      player.unMute();
      player.setVolume(60); // Moderate starting volume
      isMuted = false;
      
      // Update UI dashboard icons
      muteIcon.style.display = 'none';
      unmuteIcon.style.display = 'block';
      bgInfo.innerText = '音效：開啟中 (60%)';
    }
  });

  // Media Play/Pause Controls
  playPauseBtn.addEventListener('click', () => {
    if (!player || typeof player.getPlayerState !== 'function') return;
    
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      isVideoPlaying = false;
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    } else {
      player.playVideo();
      isVideoPlaying = true;
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }
  });

  // Media Mute/Unmute Controls
  volumeBtn.addEventListener('click', () => {
    if (!player || typeof player.isMuted !== 'function') return;

    if (isMuted) {
      player.unMute();
      player.setVolume(60);
      isMuted = false;
      muteIcon.style.display = 'none';
      unmuteIcon.style.display = 'block';
      bgInfo.innerText = '音效：開啟中 (60%)';
    } else {
      player.mute();
      isMuted = true;
      muteIcon.style.display = 'block';
      unmuteIcon.style.display = 'none';
      bgInfo.innerText = '音效：已靜音';
    }
  });

  // 3. Header Styling and Navigation State on Scroll
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // 3.1 Toggle header glass-mode on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 3.2 Scroll Spy active navigation marker
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // offset for nav bar
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // 4. Form Mock Submission
  const leadForm = document.getElementById('lead-form');
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Gather inputs
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const company = document.getElementById('contact-company').value;
    const tier = document.getElementById('contact-tier').value;
    const msg = document.getElementById('contact-msg').value;

    // Simulate sending data to endpoint
    const formBtn = leadForm.querySelector('.form-btn');
    const originalText = formBtn.innerText;
    
    formBtn.disabled = true;
    formBtn.innerText = '傳送中 SENDING...';
    formBtn.style.background = '#6c757d';

    setTimeout(() => {
      // Complete mock submission
      formBtn.innerText = '✓ 提交成功 SUCCESS';
      formBtn.style.background = '#00ffc8';
      formBtn.style.color = '#000';
      
      alert(`感謝您的諮詢，${name}！\n您的招商合作需求（方案：${tier}）已成功登記，VIBE AI 專案導演將在 24 小時內發送提案信件至 ${email}，期待與您的合作！`);
      
      // Reset form
      leadForm.reset();
      
      // Restore button status after a short delay
      setTimeout(() => {
        formBtn.disabled = false;
        formBtn.innerText = originalText;
        formBtn.style.background = 'var(--primary-neon)';
        formBtn.style.color = '#000';
      }, 3000);
    }, 1500);
  });
});
